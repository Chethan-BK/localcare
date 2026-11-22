# Justdial LocalCare Infinity - Full-Stack Local Discovery Platform

> **India's #1 AI-Powered Hyper-Local Discovery, B2B Marketplace & Doorstep Services Engine**

Inspired by **Justdial**, featuring an enterprise-grade **Node.js REST API Backend**, **ACID-compliant Relational Database**, and an ultra-modern **Responsive Frontend**.

---

## 🚀 Quick Start (One-Click Launch)

### Option 1: Double-Click Batch File (Recommended on Windows)

Simply double-click:

```text
start-server.bat
```

This automatically starts the backend server on `http://localhost:3000` and launches your web browser directly to the homepage.

### Option 2: Command Line

```bash
npm start
```

Or:

```bash
node server.js
```

Then visit:

**http://localhost:3000**

---

## 🌟 Key Features (Justdial-Grade Architecture)

### 1. 🔍 Nationwide Pan-India Discovery & Google Maps Integration

- **All 28 States & 8 Union Territories:** Full nationwide administrative coverage from metropolitan hubs to rural village clusters, taluks, and tehsils.
- **Village & PIN Code Search:** Search by exact 6-digit Indian PIN code (e.g. `575028`, `342303`) or village name (e.g. `Olachi / Valachil`, `Wayanad`, `Manipal`, `Osian`).
- **Google Places Platform (New API):** Official backend proxy integration for `places:searchNearby`, `places:searchText`, and Google Geocoding with local caching.
- **Haversine Distance & Smart Auto-Expansion:** Search within 1 km, 5 km, 10 km, 15 km, 25 km, or 50 km. Automatically expands radius for rural hamlets so customers never see a false "Not Found" error.
- **Turn-by-Turn Directions:** 1-click Google Maps Navigation directions directly to any verified business.
- **Natural Language AI Omnibox:** Search with human queries like "Restaurants in Olachi, Mangalore", "AC repair in Valachil today", and "Hotels in Wayanad".
- **Voice Search (Microphone):** Speech-to-text recognition in English and Indian accents.
- **19 Comprehensive Categories:** Healthcare, Home Maintenance, Electrical, Automobile, Salons, Real Estate, Tutors, Car Services, Packers & Movers, Stays & Hospitality, B2B Wholesale, and Emergency SOS.

### 2. 🛡️ Justdial Trust & Verification

- **JD Verified & Trust Stamp:** Verified business badges with background checks and GST validation.
- **Direct Lead Triggers:**
  - 📞 **Show Number / Click to Call:** Instant dialer with lead logging.
  - 💬 **WhatsApp Chat:** Automated WhatsApp message with enquiry text.
  - ⚡ **Get Best Deal:** Broadcast requirement to top 5 verified professionals.
  - 📅 **Book Now:** Slot selection, instant booking confirmation and doorstep OTP.

### 3. 🔥 Live Pro Reverse-Bidding Arena

- Customers post a requirement (e.g., "2BHK deep cleaning needed today").
- Verified local contractors compete in real time, bidding downwards with automated AI negotiation to give the customer the lowest rate!

### 4. 🏭 JD Mart B2B Marketplace

- Wholesale suppliers and bulk raw materials.
- Commercial machinery.
- Minimum Order Quantity (MOQ) toggles.
- Instant bulk RFQs (Request For Quotation).

### 5. 💳 JD Pay & Escrow Utility Center

- Mobile recharges and electricity bill payments.
- Service escrow payments.
- Razorpay HMAC verification.
- Automated 5% GST invoice generation.

### 6. 🚨 24/7 Emergency SOS Hub

- Sub-10-minute rapid dispatch for:
  - Ambulance (108).
  - Hospital Trauma Centers.
  - Burst Pipe Plumbers.
  - Roadside Vehicle Towing.

### 7. 💼 Partner Center & Admin CRM

**Business Owners:**
- Manage business listings.
- View incoming customer leads and calls.
- Accept customer quotes.

**Super Admin:**
- View platform metrics (revenue, transactions, active bookings).
- Access audit logs.
- Google Sheets CRM sync.

---

## 🧱 Backend Architecture & REST API Endpoints

The backend is built with pure Node.js (zero heavy external framework lock-in), hosting a relational data store:

`data/db.json`

Contains 226+ pre-seeded verified Indian businesses.

### API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/businesses` | Filter by city, category, query, rating and verified status |
| GET | `/api/businesses/:id` | Full profile with services, pricing and customer reviews |
| POST | `/api/businesses` | Business onboarding (Free Listing) |
| POST | `/api/reviews` | Submit customer review and recalculate ratings |
| POST | `/api/quotes` | Broadcast requirement for instant quotes |
| POST | `/api/bookings` | Create confirmed appointment with concurrency lock and OTP |
| GET | `/api/bookings` | View user bookings |
| POST | `/api/payments/create-order` | Generate payment order with 5% GST |
| POST | `/api/payments/verify` | Verify payment and issue digital invoice |
| POST | `/api/ai/search` | Natural language intent parser |
| GET | `/api/crm/overview` | Platform health and Google Sheets sync status |

---

## 🧪 Testing the Platform

Run the automated test suite across all engines:

```bash
node tests/backend.test.js
node tests/api.test.js
node tests/pan_india_geo.test.js
```

Executes **69 enterprise tests (100% pass rate)** covering:

- **Relational Integrity & ACID Transactions (20 tests):** Foreign key constraints, password scrypt hashing, booking concurrency, and Razorpay GST invoicing.
- **REST API Integration & Dynamic Category Discovery (38 tests):** Natural language search, filter combinations, pagination, and multi-hub query matching.
- **Pan-India Geographical Coverage & Google Places Proxy (11 tests):** All 28 States & 8 UTs, rural village geocoding (e.g. Olachi/Valachil, Wayanad, Osian), PIN code resolution, Haversine distance sorting, and auto-expansion logic.

---

## 🛠️ Technologies Used

- **Frontend:** HTML, CSS, JavaScript.
- **Backend:** Node.js.
- **Database:** JSON-based relational data store.
- **Payments:** Razorpay integration.
- **APIs:** REST API architecture.
- **Tools:** Git and GitHub.

---

## 📍 Project Information

**Project Name:** LocalCare Infinity

**Project Type:** Full-Stack Local Discovery Platform

**Inspired By:** Justdial

**Repository:** `Chethan-BK/localcare`

---

## 👨‍💻 Developer

**Chethan B.K.**

GitHub: https://github.com/Chethan-BK

---

⭐ If you like this project, consider giving the repository a star!