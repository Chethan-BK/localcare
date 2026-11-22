-- ==============================================================================
-- LOCALCARE INFINITY - RELATIONAL DATABASE SCHEMA (PostgreSQL / Relational Store)
-- Production Architecture with Foreign Keys, Unique Constraints, and Indexes
-- ==============================================================================

-- 1. Users (Core authentication identities)
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(64) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(64) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('customer', 'business_owner', 'admin')),
    phone VARCHAR(20) UNIQUE NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- 2. Customer Profiles
CREATE TABLE IF NOT EXISTS customer_profiles (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    full_name VARCHAR(150) NOT NULL,
    mobile VARCHAR(20) NOT NULL,
    city VARCHAR(100) NOT NULL,
    locality VARCHAR(150),
    address TEXT,
    account_status VARCHAR(32) DEFAULT 'Active',
    ltv_spend DECIMAL(12, 2) DEFAULT 0.00,
    bookings_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_customers_city ON customer_profiles(city);

-- 3. Business Owners
CREATE TABLE IF NOT EXISTS business_owners (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    pan_number VARCHAR(20),
    aadhar_last4 VARCHAR(4),
    kyc_status VARCHAR(32) DEFAULT 'Pending' CHECK (kyc_status IN ('Pending', 'Verified', 'Rejected')),
    kyc_submitted_at TIMESTAMP WITH TIME ZONE,
    kyc_verified_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Business Categories
CREATE TABLE IF NOT EXISTS business_categories (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    icon VARCHAR(64),
    subcategories JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Businesses (Directory Listings)
CREATE TABLE IF NOT EXISTS businesses (
    id VARCHAR(64) PRIMARY KEY,
    owner_id VARCHAR(64) REFERENCES business_owners(id) ON DELETE SET NULL,
    name VARCHAR(200) NOT NULL,
    category_id VARCHAR(64) NOT NULL REFERENCES business_categories(id),
    subcategory VARCHAR(100),
    city VARCHAR(100) NOT NULL,
    locality VARCHAR(150) NOT NULL,
    address TEXT,
    phone VARCHAR(20) NOT NULL,
    whatsapp VARCHAR(20),
    operating_hours VARCHAR(100) DEFAULT '9:00 AM - 8:00 PM',
    starting_price DECIMAL(10, 2) DEFAULT 399.00,
    rating DECIMAL(3, 1) DEFAULT 5.0,
    reviews_count INT DEFAULT 0,
    verified BOOLEAN DEFAULT FALSE,
    trust_score INT DEFAULT 85,
    police_verified BOOLEAN DEFAULT FALSE,
    gst_number VARCHAR(30),
    image_url TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_businesses_city_cat ON businesses(city, category_id);
CREATE INDEX IF NOT EXISTS idx_businesses_verified ON businesses(verified);

-- 6. Services
CREATE TABLE IF NOT EXISTS services (
    id VARCHAR(64) PRIMARY KEY,
    business_id VARCHAR(64) NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    duration VARCHAR(50) DEFAULT '45 mins',
    price DECIMAL(10, 2) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_services_biz ON services(business_id);

-- 7. Service Pricing Tiers
CREATE TABLE IF NOT EXISTS service_pricing (
    id VARCHAR(64) PRIMARY KEY,
    service_id VARCHAR(64) NOT NULL REFERENCES services(id) ON DELETE CASCADE,
    tier_name VARCHAR(50) NOT NULL, -- 'Standard', 'Premium', 'Emergency'
    price DECIMAL(10, 2) NOT NULL,
    discount_percent INT DEFAULT 0,
    effective_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Business Availability & Slots
CREATE TABLE IF NOT EXISTS business_availability (
    id VARCHAR(64) PRIMARY KEY,
    business_id VARCHAR(64) NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    day_of_week INT NOT NULL CHECK (day_of_week BETWEEN 0 AND 6), -- 0=Sun, 6=Sat
    open_time TIME NOT NULL DEFAULT '09:00:00',
    close_time TIME NOT NULL DEFAULT '20:00:00',
    slot_duration_mins INT DEFAULT 60,
    max_concurrent_bookings INT DEFAULT 2,
    UNIQUE (business_id, day_of_week)
);

-- 9. Bookings
CREATE TABLE IF NOT EXISTS bookings (
    id VARCHAR(64) PRIMARY KEY,
    customer_id VARCHAR(64) NOT NULL REFERENCES customer_profiles(id),
    business_id VARCHAR(64) NOT NULL REFERENCES businesses(id),
    service_id VARCHAR(64) REFERENCES services(id),
    scheduled_date DATE NOT NULL,
    time_slot VARCHAR(50) NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'Pending' 
        CHECK (status IN ('Pending', 'Confirmed', 'On The Way', 'In Progress', 'Completed', 'Cancelled', 'Rescheduled', 'Refunded')),
    amount DECIMAL(10, 2) NOT NULL,
    otp VARCHAR(10) NOT NULL,
    technician_name VARCHAR(100),
    technician_phone VARCHAR(20),
    technician_vehicle VARCHAR(50),
    address TEXT NOT NULL,
    notes TEXT,
    payment_method VARCHAR(32) DEFAULT 'UPI',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_bookings_conflict ON bookings(business_id, scheduled_date, time_slot, status);
CREATE INDEX IF NOT EXISTS idx_bookings_cust ON bookings(customer_id);

-- 10. Payments & Escrow Ledger
CREATE TABLE IF NOT EXISTS payments (
    id VARCHAR(64) PRIMARY KEY,
    booking_id VARCHAR(64) NOT NULL REFERENCES bookings(id),
    customer_id VARCHAR(64) NOT NULL REFERENCES customer_profiles(id),
    amount DECIMAL(10, 2) NOT NULL,
    gst_amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    payment_gateway VARCHAR(32) DEFAULT 'Razorpay',
    gateway_order_id VARCHAR(100),
    gateway_payment_id VARCHAR(100),
    status VARCHAR(32) NOT NULL DEFAULT 'Captured' 
        CHECK (status IN ('Created', 'Authorized', 'Captured', 'Escrow_Locked', 'Released', 'Refunded', 'Failed')),
    merchant_vpa VARCHAR(100) DEFAULT 'localcare.merchant@icici',
    refund_id VARCHAR(100),
    refund_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_payments_booking ON payments(booking_id);

-- 11. Reviews
CREATE TABLE IF NOT EXISTS reviews (
    id VARCHAR(64) PRIMARY KEY,
    business_id VARCHAR(64) NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    customer_id VARCHAR(64) NOT NULL REFERENCES customer_profiles(id),
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT NOT NULL,
    verified_booking BOOLEAN DEFAULT TRUE,
    aspect_tags JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_reviews_biz ON reviews(business_id);

-- 12. Enquiries & Quote Requests
CREATE TABLE IF NOT EXISTS enquiries (
    id VARCHAR(64) PRIMARY KEY,
    customer_id VARCHAR(64) NOT NULL REFERENCES customer_profiles(id),
    category_id VARCHAR(64) NOT NULL REFERENCES business_categories(id),
    requirement TEXT NOT NULL,
    locality VARCHAR(150) NOT NULL,
    urgency VARCHAR(50) DEFAULT 'Today anytime',
    budget VARCHAR(50) DEFAULT 'Flexible',
    status VARCHAR(50) DEFAULT 'Open',
    bids JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 13. Complaints & AI Triage
CREATE TABLE IF NOT EXISTS complaints (
    id VARCHAR(64) PRIMARY KEY,
    customer_id VARCHAR(64) NOT NULL REFERENCES customer_profiles(id),
    booking_id VARCHAR(64) REFERENCES bookings(id),
    category VARCHAR(100) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    description TEXT,
    severity VARCHAR(20) NOT NULL CHECK (severity IN ('Low', 'Medium', 'High', 'Critical')),
    status VARCHAR(32) NOT NULL DEFAULT 'Open' CHECK (status IN ('Open', 'In Progress', 'Resolved', 'Escalated')),
    ai_triage_action TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP WITH TIME ZONE
);
CREATE INDEX IF NOT EXISTS idx_complaints_status ON complaints(status);

-- 14. Notifications
CREATE TABLE IF NOT EXISTS notifications (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'info',
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 15. Subscriptions (Partner Tiers)
CREATE TABLE IF NOT EXISTS subscriptions (
    id VARCHAR(64) PRIMARY KEY,
    business_id VARCHAR(64) NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    plan_name VARCHAR(100) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    billing_cycle VARCHAR(20) DEFAULT 'Monthly',
    status VARCHAR(20) DEFAULT 'Active' CHECK (status IN ('Active', 'Expired', 'Cancelled')),
    start_date DATE NOT NULL,
    renewal_date DATE NOT NULL,
    benefits TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 16. Financial Transactions Ledger
CREATE TABLE IF NOT EXISTS transactions (
    id VARCHAR(64) PRIMARY KEY,
    payment_id VARCHAR(64) NOT NULL REFERENCES payments(id),
    type VARCHAR(32) NOT NULL CHECK (type IN ('Payment', 'Payout', 'Refund', 'Fee')),
    amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(32) DEFAULT 'Success',
    reference_id VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 17. AI Interaction Logs (Tracking & Cost Analysis)
CREATE TABLE IF NOT EXISTS ai_interaction_logs (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64),
    service_name VARCHAR(100) NOT NULL,
    prompt_tokens INT DEFAULT 0,
    completion_tokens INT DEFAULT 0,
    latency_ms INT DEFAULT 0,
    cost_estimate_inr DECIMAL(8, 4) DEFAULT 0.0000,
    fallback_used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 18. Admin Audit Trail Logs
CREATE TABLE IF NOT EXISTS admin_activity_logs (
    id VARCHAR(64) PRIMARY KEY,
    admin_user_id VARCHAR(64) REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    target_type VARCHAR(50),
    target_id VARCHAR(64),
    details TEXT,
    ip_address VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_audit_created ON admin_activity_logs(created_at DESC);

