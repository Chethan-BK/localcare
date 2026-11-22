# Justdial LocalCare Infinity - Full-Stack Local Discovery Platform

> **India's #1 AI-Powered Hyper-Local Discovery, B2B Marketplace & Doorstep Services Engine**  
> Inspired by **Justdial**, featuring an enterprise-grade **Node.js REST API Backend**, **ACID-compliant Relational Database**, and an ultra-modern **Responsive Frontend**.

---

## 🚀 Quick Start (One-Click Launch)

### Option 1: Double-Click Batch File (Recommended on Windows)
Simply double-click:
```
start-server.bat
```
This automatically starts the backend server on `http://localhost:3000` and launches your web browser directly to the homepage.

### Option 2: Command Line
```bash
npm start
# or
node server.js
```
Then visit **[http://localhost:3000](http://localhost:3000)** in Chrome, Edge, or Firefox.

---

## 🌟 Key Features (Justdial-Grade Architecture)

### 1. 🔍 Mega Search & Discovery
- **City & Pincode Selector**: Instant switching between 12+ major Indian metros (Bengaluru, Mumbai, Delhi NCR, Hyderabad, Chennai, Pune, Mangaluru/Valachil, etc.).
- **Natural Language AI Omnibox**: Search with human queries like *"AC repair under 500"*, *"Emergency plumber near me"*, *"Pure veg restaurant in Indiranagar"*.
- **Voice Search (Microphone)**: Speech-to-text recognition in English and Indian accents.
- **14 Core Categories**: Doctors, Dentists, Home Maintenance, AC Repair, Electrical, Real Estate, Beauty & Spa, Weddings, Tutors, Car Services, Packers & Movers, B2B Wholesale, and Emergency SOS.

### 2. 🛡️ Justdial Trust & Verification
- **JD Verified & Trust Stamp**: Verified business badges with background checks and GST validation.
- **Direct Lead Triggers**:
  - 📞 **Show Number / Click to Call**: Instant dialer with lead logging.
  - 💬 **WhatsApp Chat**: Automated WhatsApp message with enquiry text.
  - ⚡ **Get Best Deal**: Broadcast requirement to top 5 verified pros.
  - 📅 **Book Now**: Slot selection, instant booking confirmation & doorstep OTP.

### 3. 🔥 Live Pro Reverse-Bidding Arena
- Customers post a requirement (e.g. *"2BHK deep cleaning needed today"*).
- Verified local contractors compete in real time, bidding downwards with automated AI negotiation to give the customer the lowest rate!

### 4. 🏭 JD Mart B2B Marketplace
- Wholesale suppliers, bulk raw materials, commercial machinery.
- Minimum Order Quantity (MOQ) toggles and instant bulk RFQs (Request For Quotation).

### 5. 💳 JD Pay & Escrow Utility Center
- Mobile recharges, electricity bill payments, and service escrow payments.
- Zero-trust Razorpay HMAC verification with automated 5% GST invoice generation.

### 6. 🚨 24/7 Emergency SOS Hub
- Sub-10 minute rapid dispatch for Ambulance (108), Hospital Trauma Centers, Burst Pipe Plumbers, and Roadside Vehicle Towing.

### 7. 💼 Partner Center & Admin CRM
- **Business Owners**: Manage listing, view incoming customer leads and calls, accept quotes.
- **Super Admin**: View platform metrics (revenue, transactions, active bookings), audit logs, and Google Sheets CRM sync.

---

## 🧱 Backend Architecture & REST API Endpoints

The backend is built with pure Node.js (zero heavy external framework lock-in), hosting an ACID relational store (`data/db.json` with 226+ pre-seeded verified Indian businesses):

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/businesses` | Filter by city, category, query, rating, verified status |
| `GET` | `/api/businesses/:id` | Full profile with services, pricing & customer reviews |
| `POST` | `/api/businesses` | Business onboarding ("Free Listing") |
| `POST` | `/api/reviews` | Submit verified customer review & recalculate ratings |
| `POST` | `/api/quotes` | Broadcast requirement for instant quotes |
| `POST` | `/api/bookings` | Create confirmed appointment with concurrency lock & OTP |
| `GET` | `/api/bookings` | View user bookings |
| `POST` | `/api/payments/create-order` | Generate payment order with 5% GST |
| `POST` | `/api/payments/verify` | Verify payment and issue digital invoice |
| `POST` | `/api/ai/search` | Natural language intent parser |
| `GET` | `/api/crm/overview` | Platform health & Google Sheets sync status |

---

## 🧪 Testing the Backend
Run the automated test suite:
```bash
npm test
```
*Executes 20 enterprise tests covering Relational Integrity, Auth, Booking Concurrency, Payments, and AI Intent Parsing.*
