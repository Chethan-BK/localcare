/* ==============================================================================
   LOCALCARE INFINITY - REAL BOOKING ENGINE & CONCURRENCY CONTROLLER
   Double-Booking Prevention, Operating Hours & Slot Validation,
   State Transition Machine, Concurrency Locking, and Digital OTP Handoff
   ============================================================================== */

const crypto = require('crypto');
const db = require('./database.js');

// Mutex locks for concurrency protection on specific slot keys
const activeSlotLocks = new Set();

class BookingEngine {
  /* --------------------------------------------------------------------------
     Validate Slot & Operating Schedule
     -------------------------------------------------------------------------- */
  validateSchedule(businessId, scheduledDate, timeSlot) {
    const biz = db.findById('businesses', businessId);
    if (!biz) throw new Error(`Business listing ${businessId} not found`);

    // Verify date is not in the past
    const apptDate = new Date(scheduledDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (apptDate < today) {
      throw new Error(`Appointment date ${scheduledDate} cannot be in the past.`);
    }

    const dayOfWeek = apptDate.getDay();
    const availability = db.findOne('business_availability', a =>
      a.business_id === businessId && a.day_of_week === dayOfWeek
    );

    // If custom availability is specified, check max concurrent bookings
    const maxConcurrent = availability ? availability.max_concurrent_bookings : 2;

    const existingActiveBookings = db.find('bookings', b =>
      b.business_id === businessId &&
      b.scheduled_date === scheduledDate &&
      b.time_slot === timeSlot &&
      !['Cancelled', 'Refunded', 'Completed'].includes(b.status)
    );

    if (existingActiveBookings.length >= maxConcurrent) {
      const err = new Error(`Double-booking prevention: Slot "${timeSlot}" on ${scheduledDate} is already at full capacity (${existingActiveBookings.length}/${maxConcurrent} booked).`);
      err.statusCode = 409;
      throw err;
    }

    return { biz, availability, maxConcurrent };
  }

  /* --------------------------------------------------------------------------
     Create Appointment with Concurrency Lock & Transaction
     -------------------------------------------------------------------------- */
  async createBooking(params) {
    const {
      customerId,
      businessId,
      serviceId = null,
      scheduledDate,
      timeSlot,
      address,
      notes = '',
      paymentMethod = 'UPI',
      price = null
    } = params;

    if (!customerId) throw new Error('Customer ID is required');
    if (!businessId) throw new Error('Business ID is required');
    if (!scheduledDate) throw new Error('Scheduled date is required (YYYY-MM-DD)');
    if (!timeSlot) throw new Error('Time slot is required (e.g. 2:00 PM - 3:00 PM)');
    if (!address) throw new Error('Service delivery address is required');

    const customer = db.findById('customer_profiles', customerId);
    if (!customer) throw new Error(`Customer profile ${customerId} not found`);

    // Concurrency Lock on (businessId_date_slot)
    const lockKey = `${businessId}_${scheduledDate}_${timeSlot}`;
    if (activeSlotLocks.has(lockKey)) {
      const err = new Error('Slot lock conflict: Another customer is currently reserving this exact time slot. Please retry in 5 seconds.');
      err.statusCode = 409;
      throw err;
    }

    activeSlotLocks.add(lockKey);
    try {
      // Validate slot availability under lock
      const { biz } = this.validateSchedule(businessId, scheduledDate, timeSlot);

      // Determine final price
      let finalPrice = price ? parseFloat(price) : biz.starting_price;
      if (serviceId) {
        const srv = db.findById('services', serviceId);
        if (srv) finalPrice = srv.price;
      }

      // Generate secure 4-digit verification OTP
      const otp = crypto.randomInt(1000, 9999).toString();
      let bookingId = `LC-BK-${Math.floor(1000 + Math.random() * 9000)}`;
      while (db.findById('bookings', bookingId)) {
        bookingId = `LC-BK-${Math.floor(1000 + Math.random() * 9000)}`;
      }

      return await db.transaction(async (tx) => {
        const newBooking = tx.insert('bookings', {
          id: bookingId,
          customer_id: customerId,
          business_id: businessId,
          service_id: serviceId,
          scheduled_date: scheduledDate,
          time_slot: timeSlot,
          status: 'Confirmed',
          amount: finalPrice,
          otp: otp,
          technician_name: 'Suresh Gowda',
          technician_phone: biz.phone,
          technician_vehicle: 'KA-01-EA-4921 (Hero Splendor)',
          address: address,
          notes: notes,
          payment_method: paymentMethod
        });

        // Update customer profile spend & bookings count
        tx.update('customer_profiles', customerId, {
          ltv_spend: (customer.ltv_spend || 0) + finalPrice,
          bookings_count: (customer.bookings_count || 0) + 1
        });

        // Notify customer
        tx.insert('notifications', {
          id: `notif_${crypto.randomUUID()}`,
          user_id: customer.user_id,
          title: 'Booking Confirmed',
          message: `Your service booking ${bookingId} with ${biz.name} is confirmed for ${scheduledDate} (${timeSlot}). OTP: ${otp}.`,
          type: 'booking'
        });

        return newBooking;
      });
    } finally {
      activeSlotLocks.delete(lockKey);
    }
  }

  /* --------------------------------------------------------------------------
     State Machine Transition Management
     -------------------------------------------------------------------------- */
  async transitionStatus(bookingId, targetStatus, actor = { role: 'admin' }) {
    const booking = db.findById('bookings', bookingId);
    if (!booking) {
      const err = new Error(`Booking ${bookingId} not found`);
      err.statusCode = 404;
      throw err;
    }

    const currentStatus = booking.status;
    const VALID_TRANSITIONS = {
      'Pending': ['Confirmed', 'Cancelled'],
      'Confirmed': ['On The Way', 'Rescheduled', 'Cancelled'],
      'On The Way': ['In Progress', 'Cancelled'],
      'In Progress': ['Completed'],
      'Completed': [], // Terminal
      'Cancelled': ['Refunded'],
      'Refunded': [], // Terminal
      'Rescheduled': ['Confirmed', 'Cancelled']
    };

    const allowed = VALID_TRANSITIONS[currentStatus] || [];
    if (!allowed.includes(targetStatus)) {
      throw new Error(`Invalid status transition: Cannot transition booking from "${currentStatus}" to "${targetStatus}".`);
    }

    return await db.transaction(async (tx) => {
      const updated = tx.update('bookings', bookingId, {
        status: targetStatus
      });

      const customer = db.findById('customer_profiles', booking.customer_id);
      if (customer) {
        tx.insert('notifications', {
          id: `notif_${crypto.randomUUID()}`,
          user_id: customer.user_id,
          title: `Booking ${targetStatus}`,
          message: `Booking ${bookingId} has been updated to "${targetStatus}".`,
          type: 'booking'
        });
      }

      return updated;
    });
  }

  /* --------------------------------------------------------------------------
     Cancellation with Automated Refund Trigger
     -------------------------------------------------------------------------- */
  async cancelBooking(bookingId, reason = 'Customer request', actor = {}) {
    const booking = db.findById('bookings', bookingId);
    if (!booking) throw new Error(`Booking ${bookingId} not found`);

    if (booking.status === 'Completed') {
      throw new Error('Completed services cannot be cancelled.');
    }
    if (booking.status === 'Cancelled' || booking.status === 'Refunded') {
      throw new Error(`Booking ${bookingId} is already cancelled.`);
    }

    return await db.transaction(async (tx) => {
      const cancelled = tx.update('bookings', bookingId, {
        status: 'Cancelled',
        notes: booking.notes ? `${booking.notes} | Cancellation Reason: ${reason}` : `Cancellation Reason: ${reason}`
      });

      // Check if payment was captured
      const payment = db.findOne('payments', p => p.booking_id === bookingId && p.status === 'Captured');
      if (payment) {
        tx.update('payments', payment.id, {
          status: 'Refunded',
          refund_id: `REF_${crypto.randomUUID().slice(0, 8)}`,
          refund_reason: reason
        });
        tx.insert('transactions', {
          id: `txn_${crypto.randomUUID()}`,
          payment_id: payment.id,
          type: 'Refund',
          amount: payment.amount,
          status: 'Success',
          reference_id: `REF_${payment.id}`
        });
      }

      return cancelled;
    });
  }
}

module.exports = new BookingEngine();

