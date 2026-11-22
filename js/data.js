/* ==========================================================================
   Local Care - Comprehensive Seed Database & Schema
   Expanded for next-generation local services platform across 10 major Indian hubs
   ========================================================================== */

var CITIES = [
  {
    "id": "bengaluru",
    "name": "Bengaluru",
    "lat": 12.9716,
    "lng": 77.5946,
    "areas": [
      "Koramangala",
      "Indiranagar",
      "HSR Layout",
      "Whitefield",
      "Jayanagar",
      "Marathahalli"
    ]
  },
  {
    "id": "mangaluru",
    "name": "Mangaluru",
    "lat": 12.9141,
    "lng": 74.856,
    "areas": [
      "Valachil",
      "Kadri",
      "Hampankatta",
      "Bejai",
      "Surathkal",
      "Falnir"
    ]
  },
  {
    "id": "mysuru",
    "name": "Mysuru",
    "lat": 12.2958,
    "lng": 76.6394,
    "areas": [
      "Gokulam",
      "Jayalakshmipuram",
      "Vijayanagar",
      "Kuvempunagar"
    ]
  },
  {
    "id": "mumbai",
    "name": "Mumbai",
    "lat": 19.076,
    "lng": 72.8777,
    "areas": [
      "Bandra West",
      "Andheri East",
      "Powai",
      "Juhu",
      "Colaba",
      "Thane West"
    ]
  },
  {
    "id": "delhi",
    "name": "Delhi NCR",
    "lat": 28.6139,
    "lng": 77.209,
    "areas": [
      "Connaught Place",
      "Hauz Khas",
      "Saket",
      "Cyber Hub Gurgaon",
      "Noida Sector 18"
    ]
  },
  {
    "id": "hyderabad",
    "name": "Hyderabad",
    "lat": 17.385,
    "lng": 78.4867,
    "areas": [
      "Gachibowli",
      "Hitec City",
      "Banjara Hills",
      "Jubilee Hills",
      "Madhapur"
    ]
  },
  {
    "id": "pune",
    "name": "Pune",
    "lat": 18.5204,
    "lng": 73.8567,
    "areas": [
      "Koregaon Park",
      "Kothrud",
      "Viman Nagar",
      "Baner",
      "Hinjewadi"
    ]
  },
  {
    "id": "chennai",
    "name": "Chennai",
    "lat": 13.0827,
    "lng": 80.2707,
    "areas": [
      "T Nagar",
      "Adyar",
      "Anna Nagar",
      "Velachery",
      "Nungambakkam"
    ]
  },
  {
    "id": "kochi",
    "name": "Kochi",
    "lat": 9.9312,
    "lng": 76.2673,
    "areas": [
      "Panampilly Nagar",
      "Kakkanad",
      "Fort Kochi",
      "Marine Drive"
    ]
  },
  {
    "id": "ahmedabad",
    "name": "Ahmedabad",
    "lat": 23.0225,
    "lng": 72.5714,
    "areas": [
      "Satellite",
      "Bodakdev",
      "SG Highway",
      "Navrangpura"
    ]
  },
  {
    "id": "kolkata",
    "name": "Kolkata",
    "lat": 22.5726,
    "lng": 88.3639,
    "areas": [
      "Park Street",
      "Salt Lake",
      "New Town",
      "Ballygunge"
    ]
  },
  {
    "id": "jaipur",
    "name": "Jaipur",
    "lat": 26.9124,
    "lng": 75.7873,
    "areas": [
      "C-Scheme",
      "Malviya Nagar",
      "Vaishali Nagar",
      "Raja Park"
    ]
  }
];

var CATEGORIES = [
  {
    id: 'health',
    title: 'Doctors & Clinics',
    icon: '🩺',
    badgeClass: 'cat-health',
    count: '3,200+ listings',
    subcategories: ['Dentists', 'General Physicians', 'Pediatricians', 'Dermatologists', 'Orthopedic', 'Diagnostics & Labs', 'Cardiologists']
  },
  {
    id: 'home',
    title: 'Plumbers & Repairs',
    icon: '🔧',
    badgeClass: 'cat-home',
    count: '4,100+ listings',
    subcategories: ['Plumbers', 'Bathroom Leakage', 'Pipe Fitting', 'Water Heater Repair', 'Carpenters', 'Water Tank Cleaning']
  },
  {
    id: 'electrical',
    title: 'AC & Electricians',
    icon: '⚡',
    badgeClass: 'cat-electrical',
    count: '2,900+ listings',
    subcategories: ['AC Repair & Gas Refill', 'Electricians', 'Inverter Service', 'Fan & Wiring', 'Appliance Repair']
  },
  {
    id: 'food',
    title: 'Restaurants & Dining',
    icon: '🍽️',
    badgeClass: 'cat-food',
    count: '6,400+ listings',
    subcategories: ['Casual Dining', 'Pure Veg', 'Cafes & Bakeries', 'Biryani & North Indian', 'South Indian', 'Pubs & Lounges', 'Seafood']
  },
  {
    id: 'cleaning',
    title: 'Cleaning & Pest',
    icon: '✨',
    badgeClass: 'cat-cleaning',
    count: '1,800+ listings',
    subcategories: ['Deep Home Cleaning', 'Bathroom Deep Clean', 'Kitchen Cleaning', 'Pest Control', 'Sofa & Carpet Cleaning']
  },
  {
    id: 'stays',
    title: 'PGs & Real Estate',
    icon: '🏢',
    badgeClass: 'cat-stays',
    count: '2,500+ listings',
    subcategories: ['Co-living PGs', 'Flat Rentals (1/2/3 BHK)', 'Gated Societies', 'Commercial Office Spaces', 'Real Estate Brokers']
  },
  {
    id: 'auto',
    title: 'Car & Bike Services',
    icon: '🚗',
    badgeClass: 'cat-auto',
    count: '2,150+ listings',
    subcategories: ['Car Wash & Detailing', 'Multi-brand Garages', '24/7 Roadside Towing', 'Bike Mechanics', 'Tyre & Battery Care']
  },
  {
    id: 'salon',
    title: 'Salons & Wellness',
    icon: '✂️',
    badgeClass: 'cat-salon',
    count: '2,800+ listings',
    subcategories: ['Unisex Salons', 'Spa & Massages', 'Bridal Makeup', 'Skin & Hair Clinics', 'Men\'s Grooming']
  },
  {
    id: 'tutor',
    title: 'Education & Tutors',
    icon: '📚',
    badgeClass: 'cat-tutor',
    count: '1,950+ listings',
    subcategories: ['Home Tutors (CBSE/ICSE)', 'IIT-JEE/NEET Coaching', 'Language Classes', 'Music & Dance Schools', 'Coding Classes']
  },
  {
    id: 'events',
    title: 'Weddings & Events',
    icon: '🎉',
    badgeClass: 'cat-events',
    count: '1,200+ listings',
    subcategories: ['Event Planners', 'Banquet Halls', 'Caterers', 'Wedding Photographers', 'Decorators & Florists']
  },
  {
    id: 'tech',
    title: 'Computer & Mobile',
    icon: '💻',
    badgeClass: 'cat-tech',
    count: '1,450+ listings',
    subcategories: ['Laptop Screen Repair', 'Mobile Display Fixing', 'Data Recovery', 'Printer Service', 'CCTV Installation']
  },
  {
    id: 'emergency',
    title: '24/7 Emergency',
    icon: '🚨',
    badgeClass: 'cat-emergency',
    count: '820+ verified',
    subcategories: ['24/7 Ambulance', 'Emergency Blood Banks', '24/7 Hospitals', '24/7 Locksmiths', 'Emergency Pet Care', '24/7 Pharmacies']
  },
  {
    id: 'packers',
    title: 'Packers & Movers',
    icon: '📦',
    badgeClass: 'cat-packers',
    count: '1,120+ listings',
    subcategories: ['Household Shifting', 'Intercity Moving', 'Office Relocation', 'Vehicle Transport', 'Storage & Warehousing']
  },
  {
    id: 'b2b',
    title: 'B2B Wholesale / LocalCare Mart',
    icon: '🏭',
    badgeClass: 'cat-b2b',
    count: '2,650+ suppliers',
    subcategories: ['Industrial Tools', 'Bulk Medical Supplies', 'Building Materials', 'Commercial Kitchen', 'Packaging Wholesale']
  },
  {
    id: 'shopping',
    title: 'Shopping & Stores',
    icon: '🛍️',
    badgeClass: 'cat-shopping',
    count: '3,800+ stores',
    subcategories: ['Electronics', 'Clothing & Fashion', 'Furniture', 'Grocery Stores', 'Supermarkets', 'Mobile Shops']
  },
  {
    id: 'pro',
    title: 'Professional Services',
    icon: '⚖️',
    badgeClass: 'cat-pro',
    count: '1,650+ experts',
    subcategories: ['Lawyers & Advocates', 'Chartered Accountants (CA)', 'Consultants', 'Photographers', 'Event Planners']
  },
  {
    id: 'daily',
    title: 'Daily Needs',
    icon: '🧺',
    badgeClass: 'cat-daily',
    count: '2,400+ services',
    subcategories: ['Laundry & Dry Cleaning', 'Courier Services', 'Grocery Delivery', 'Repair Shops', 'Local Utility Services']
  },
  {
    id: 'travel',
    title: 'Travel & Hospitality',
    icon: '✈️',
    badgeClass: 'cat-travel',
    count: '1,920+ listings',
    subcategories: ['Hotels & Resorts', 'Travel Agencies', 'Tour Operators', 'Car Rentals', 'Bus & Flight Bookings']
  },
  {
    id: 'jobs',
    title: 'Jobs & Careers',
    icon: '💼',
    badgeClass: 'cat-jobs',
    count: '980+ openings',
    subcategories: ['Full-Time Jobs', 'Part-Time Jobs', 'Internships', 'Freelance Projects', 'Walk-in Interviews']
  }
];

var INITIAL_BUSINESSES = [
  {
    "id": "b-stay-101",
    "name": "Zolo Stays Tech Hub Co-Living & Luxury PG",
    "category": "stays",
    "subcategory": "Hostels & PGs",
    "city": "Bengaluru",
    "locality": "Koramangala 1st Block",
    "rating": 4.8,
    "reviewsCount": 390,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "24 Hours Open",
    "startingPrice": 6500,
    "priceRange": "₹₹₹",
    "responseTime": "~5 min",
    "trustScore": 98,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 390
    },
    "phone": "+91 80 4999 5511",
    "whatsapp": "918049995511",
    "address": "Near Wipro Park, Koramangala 1st Block, Bengaluru",
    "image": "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
    "description": "Fully furnished private & twin sharing executive rooms with high-speed 300 Mbps Wi-Fi, daily housekeeping, 3-time meals, gaming lounge, and biometrics security.",
    "services": [
      {
        "id": "s-st-1",
        "name": "Private Executive Studio Room (Monthly)",
        "price": 12500,
        "duration": "Per Month"
      },
      {
        "id": "s-st-2",
        "name": "Twin Sharing Deluxe Room with Meals (Monthly)",
        "price": 7500,
        "duration": "Per Month"
      }
    ],
    "features": [
      "3 Times Nutritious Meals",
      "300 Mbps Fiber WiFi",
      "Daily Housekeeping",
      "No Brokerage Fee"
    ],
    "reviews": [
      {
        "author": "Siddharth M.",
        "rating": 5,
        "date": "2 days ago",
        "verifiedBooking": true,
        "comment": "Cleanest PG in Koramangala. Food tastes like home."
      }
    ],
    "lat": 12.9279,
    "lng": 77.6322,
    "photos": [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-stay-102",
    "name": "Olive Serviced Executive Apartments & Studios",
    "category": "stays",
    "subcategory": "Serviced Apartments",
    "city": "Bengaluru",
    "locality": "Indiranagar",
    "rating": 4.9,
    "reviewsCount": 275,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "24 Hours Open",
    "startingPrice": 1999,
    "priceRange": "₹₹₹₹",
    "responseTime": "~5 min",
    "trustScore": 99,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 275
    },
    "phone": "+91 80 4888 1122",
    "whatsapp": "918048881122",
    "address": "Defense Colony, Indiranagar, Bengaluru 560038",
    "image": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    "description": "Luxury serviced studio apartments with modular kitchen, gym access, air conditioning, and 24/7 power backup for business travelers and long stays.",
    "services": [
      {
        "id": "s-st-3",
        "name": "Studio Suite Stay (Nightly)",
        "price": 1999,
        "duration": "Per Night"
      },
      {
        "id": "s-st-4",
        "name": "1BHK Luxury Apartment (Monthly Stay)",
        "price": 34999,
        "duration": "Per Month"
      }
    ],
    "features": [
      "Modular Kitchen & Microwave",
      "Dedicated Workspace",
      "Gym & Terrace Garden"
    ],
    "reviews": [
      {
        "author": "Priyanka Sen",
        "rating": 5,
        "date": "1 week ago",
        "verifiedBooking": true,
        "comment": "Stayed for 3 weeks during relocation. Felt super safe and convenient."
      }
    ],
    "lat": 12.9784,
    "lng": 77.6408,
    "photos": [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-elec-101",
    "name": "CoolAir Master AC Deep Jet Servicing & Installation",
    "category": "electrical",
    "subcategory": "AC Repair & Service",
    "city": "Bengaluru",
    "locality": "Indiranagar",
    "rating": 4.9,
    "reviewsCount": 540,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "8:00 AM - 9:00 PM",
    "startingPrice": 449,
    "priceRange": "₹₹",
    "responseTime": "~10 min",
    "trustScore": 99,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 540
    },
    "phone": "+91 80 4111 9988",
    "whatsapp": "918041119988",
    "address": "100ft Road, Indiranagar, Bengaluru",
    "image": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
    "description": "High-pressure power jet AC servicing, gas charging (R32/R410A), PCB repair, and copper pipe installation with 60-day cool air guarantee.",
    "services": [
      {
        "id": "s-el-1",
        "name": "Split AC Power Jet Deep Clean Service",
        "price": 449,
        "duration": "45 mins"
      },
      {
        "id": "s-el-2",
        "name": "AC Gas Leak Fixing & Full Refrigerant Charge",
        "price": 1499,
        "duration": "60 mins"
      },
      {
        "id": "s-el-3",
        "name": "AC Uninstallation & New Installation",
        "price": 999,
        "duration": "90 mins"
      }
    ],
    "features": [
      "60-Day Service Guarantee",
      "Zero Mess Foam Technology",
      "Certified HVAC Technicians",
      "Transparent Rate Card"
    ],
    "reviews": [
      {
        "author": "Kiran Varun",
        "rating": 5,
        "date": "Yesterday",
        "verifiedBooking": true,
        "comment": "AC is cooling like brand new. Technician arrived in 25 mins with jet machine."
      }
    ],
    "lat": 12.9784,
    "lng": 77.6408,
    "photos": [
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-elec-102",
    "name": "Suraksha 24/7 Master Electricians & Short Circuit Rescue",
    "category": "electrical",
    "subcategory": "Electricians",
    "city": "Bengaluru",
    "locality": "HSR Layout",
    "rating": 4.8,
    "reviewsCount": 310,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "24 Hours Open",
    "startingPrice": 199,
    "priceRange": "₹",
    "responseTime": "~12 min",
    "trustScore": 98,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 310
    },
    "phone": "+91 80 4222 1199",
    "whatsapp": "918042221199",
    "address": "Sector 3, HSR Layout, Bengaluru 560102",
    "image": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    "description": "Emergency MCB tripping resolution, inverter wiring, ceiling fan / chandelier fitting, and complete residential electrical rewiring.",
    "services": [
      {
        "id": "s-el-4",
        "name": "Emergency MCB / Short Circuit Triage",
        "price": 349,
        "duration": "30 mins"
      },
      {
        "id": "s-el-5",
        "name": "Ceiling Fan & Switchboard Installation",
        "price": 199,
        "duration": "30 mins"
      }
    ],
    "features": [
      "Govt Licensed Wiremen",
      "Insulated Toolkits",
      "30-Minute Doorstep SLA"
    ],
    "reviews": [
      {
        "author": "Gautam Das",
        "rating": 5,
        "date": "3 days ago",
        "verifiedBooking": true,
        "comment": "Fixed the geyser MCB trip quickly on a Sunday morning."
      }
    ],
    "lat": 12.9116,
    "lng": 77.6389,
    "photos": [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-job-101",
    "name": "NexGen Tech Staffing & Software Recruitment Labs",
    "category": "jobs",
    "subcategory": "Full-Time Jobs",
    "city": "Bengaluru",
    "locality": "Koramangala 4th Block",
    "rating": 4.9,
    "reviewsCount": 380,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 7:30 PM",
    "startingPrice": 0,
    "priceRange": "FREE",
    "responseTime": "~5 min",
    "trustScore": 99,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 380
    },
    "phone": "+91 80 4120 7700",
    "whatsapp": "918041207700",
    "address": "80 Feet Road, Koramangala 4th Block, Bengaluru 560034",
    "image": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    "description": "Premier tier-1 tech recruiting consultancy connecting senior software engineers, product managers, and AI specialists to high-growth unicorns and MNCs in Bengaluru.",
    "services": [
      {
        "id": "s-job-1",
        "name": "Software Engineer Placement (Direct Hire)",
        "price": 0,
        "duration": "Immediate Walk-in"
      },
      {
        "id": "s-job-2",
        "name": "Resume Review & Mock Tech Interview",
        "price": 499,
        "duration": "45 mins"
      },
      {
        "id": "s-job-3",
        "name": "Executive Leadership Search",
        "price": 0,
        "duration": "Confidential"
      }
    ],
    "features": [
      "Zero Fee for Candidates",
      "Direct Interview Scheduling",
      "100+ Hiring Partners",
      "Verified MNC Openings"
    ],
    "reviews": [
      {
        "author": "Vikram Sundaram",
        "rating": 5,
        "date": "2 days ago",
        "verifiedBooking": true,
        "comment": "Secured an SDE-2 offer with ₹28 LPA package in 10 days flat!"
      }
    ],
    "lat": 12.9345,
    "lng": 77.6256,
    "photos": [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-job-102",
    "name": "CareerCrafters Executive Search & IT Staffing Hub",
    "category": "jobs",
    "subcategory": "Full-Time Jobs",
    "city": "Bengaluru",
    "locality": "Indiranagar 100ft Road",
    "rating": 4.8,
    "reviewsCount": 295,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:30 AM - 7:00 PM",
    "startingPrice": 0,
    "priceRange": "FREE",
    "responseTime": "~8 min",
    "trustScore": 98,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 295
    },
    "phone": "+91 80 4222 3344",
    "whatsapp": "918042223344",
    "address": "100 Feet Road, Indiranagar, Bengaluru 560038",
    "image": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    "description": "Leading executive headhunting and technical career advisory firm. Walk-in candidate evaluations, salary benchmarking, and overseas sponsorship opportunities.",
    "services": [
      {
        "id": "s-job-4",
        "name": "Product Management & Data Science Hiring",
        "price": 0,
        "duration": "Daily Slots"
      },
      {
        "id": "s-job-5",
        "name": "Executive Salary Benchmarking Report",
        "price": 999,
        "duration": "Instant Delivery"
      }
    ],
    "features": [
      "Top Global Tech Employers",
      "Fast-Track Interviews",
      "Dedicated Talent Advisor"
    ],
    "reviews": [
      {
        "author": "Meera Nambiar",
        "rating": 5,
        "date": "Yesterday",
        "verifiedBooking": true,
        "comment": "Professional headhunters who actually listen to career goals."
      }
    ],
    "lat": 12.9784,
    "lng": 77.6408,
    "photos": [
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-job-103",
    "name": "Apex Placement & Walk-In Career Bureau",
    "category": "jobs",
    "subcategory": "Walk-in Interviews",
    "city": "Bengaluru",
    "locality": "Whitefield ITPL Road",
    "rating": 4.7,
    "reviewsCount": 210,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 6:30 PM",
    "startingPrice": 0,
    "priceRange": "FREE",
    "responseTime": "~10 min",
    "trustScore": 96,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 210
    },
    "phone": "+91 80 4333 5566",
    "whatsapp": "918043335566",
    "address": "ITPL Main Road, Whitefield, Bengaluru 560066",
    "image": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    "description": "Daily walk-in placement center specializing in non-voice BPO, tech support, accounting, and fresher software engineering drives with on-the-spot offer letters.",
    "services": [
      {
        "id": "s-job-6",
        "name": "Daily Walk-in Interview Registration",
        "price": 0,
        "duration": "1 Hour Drive"
      },
      {
        "id": "s-job-7",
        "name": "Fresher Aptitude & English Comm Test",
        "price": 299,
        "duration": "30 mins"
      }
    ],
    "features": [
      "Same-Day Offer Letters",
      "IT & Non-IT Openings",
      "Whitefield Campus Hub"
    ],
    "reviews": [
      {
        "author": "Rohan Deshmukh",
        "rating": 5,
        "date": "3 days ago",
        "verifiedBooking": true,
        "comment": "Attended the walk-in and walked out with a customer support lead role!"
      }
    ],
    "lat": 12.983,
    "lng": 77.75,
    "photos": [
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-job-104",
    "name": "TalentSprint Fresher Job & Tech Internship Accelerator",
    "category": "jobs",
    "subcategory": "Internships",
    "city": "Bengaluru",
    "locality": "HSR Layout Sector 2",
    "rating": 4.9,
    "reviewsCount": 340,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 8:00 PM",
    "startingPrice": 0,
    "priceRange": "FREE",
    "responseTime": "~5 min",
    "trustScore": 99,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 340
    },
    "phone": "+91 80 4555 9900",
    "whatsapp": "918045559900",
    "address": "27th Main, HSR Layout Sector 2, Bengaluru 560102",
    "image": "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    "description": "Top-rated tech talent incubator. Paid internships and direct fresher software developer placements across 80+ funded startups and IT product companies.",
    "services": [
      {
        "id": "s-job-8",
        "name": "Paid Tech Internship Matching",
        "price": 0,
        "duration": "Immediate Match"
      },
      {
        "id": "s-job-9",
        "name": "Full-Stack Developer Placement Drive",
        "price": 0,
        "duration": "Weekly Batches"
      }
    ],
    "features": [
      "Stipend Guaranteed Internships",
      "Full-Stack & Cloud Tracks",
      "Verified Startup Backing"
    ],
    "reviews": [
      {
        "author": "Ananya Sharma",
        "rating": 5,
        "date": "1 week ago",
        "verifiedBooking": true,
        "comment": "Landed a paid React internship which converted to full-time in 3 months!"
      }
    ],
    "lat": 12.9116,
    "lng": 77.6389,
    "photos": [
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-job-105",
    "name": "MetroForce Staffing & Corporate HR Solutions",
    "category": "jobs",
    "subcategory": "Full-Time Jobs",
    "city": "Mumbai",
    "locality": "Bandra Kurla Complex (BKC)",
    "rating": 4.8,
    "reviewsCount": 310,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 7:00 PM",
    "startingPrice": 0,
    "priceRange": "FREE",
    "responseTime": "~10 min",
    "trustScore": 98,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 310
    },
    "phone": "+91 22 4111 8899",
    "whatsapp": "912241118899",
    "address": "G Block, BKC, Bandra East, Mumbai 400051",
    "image": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    "description": "Leading finance, banking, fintech, and media staffing solutions across Mumbai metropolitan region.",
    "services": [
      {
        "id": "s-job-10",
        "name": "Banking & Financial Analyst Openings",
        "price": 0,
        "duration": "Daily Drives"
      }
    ],
    "features": [
      "BKC Corporate Network",
      "Zero Candidate Fees",
      "Top Investment Banks"
    ],
    "reviews": [
      {
        "author": "Karan Mehta",
        "rating": 5,
        "date": "3 days ago",
        "verifiedBooking": true,
        "comment": "Secured an equity research associate position quickly."
      }
    ],
    "lat": 19.0657,
    "lng": 72.8687,
    "photos": [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-daily-101",
    "name": "Spin & Sparkle Express 24-Hr Dry Cleaners",
    "category": "daily",
    "subcategory": "Laundry & Dry Cleaning",
    "city": "Bengaluru",
    "locality": "Koramangala 5th Block",
    "rating": 4.9,
    "reviewsCount": 420,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "8:00 AM - 9:30 PM",
    "startingPrice": 99,
    "priceRange": "₹",
    "responseTime": "~10 min",
    "trustScore": 99,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 420
    },
    "phone": "+91 80 4777 2211",
    "whatsapp": "918047772211",
    "address": "Near Jyoti Nivas College, Koramangala 5th Block, Bengaluru",
    "image": "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=800&q=80",
    "description": "Eco-friendly European dry cleaning, steam ironing, shoe restoration, and express doorstep pick & drop within 24 hours.",
    "services": [
      {
        "id": "s-dl-1",
        "name": "Premium Suit / Blazer Dry Cleaning",
        "price": 299,
        "duration": "24 Hours"
      },
      {
        "id": "s-dl-2",
        "name": "Express Steam Pressing (5 Clothes)",
        "price": 99,
        "duration": "2 Hours"
      },
      {
        "id": "s-dl-3",
        "name": "Curtains & Blanket Deep Sanitization",
        "price": 499,
        "duration": "48 Hours"
      }
    ],
    "features": [
      "Doorstep Pick & Drop",
      "Eco-Friendly Detergents",
      "Same-Day Urgent Delivery",
      "Fabric Guarantee"
    ],
    "reviews": [
      {
        "author": "Sunil Rao",
        "rating": 5,
        "date": "Yesterday",
        "verifiedBooking": true,
        "comment": "Removed stubborn ink stains from my white silk shirt. Superb work!"
      }
    ],
    "lat": 12.9352,
    "lng": 77.6189,
    "photos": [
      "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-daily-102",
    "name": "SwiftDrop Hyperlocal Courier & Parcel Dispatch Hub",
    "category": "daily",
    "subcategory": "Courier Services",
    "city": "Bengaluru",
    "locality": "Indiranagar",
    "rating": 4.8,
    "reviewsCount": 310,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "8:30 AM - 10:00 PM",
    "startingPrice": 49,
    "priceRange": "₹",
    "responseTime": "~5 min",
    "trustScore": 98,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 310
    },
    "phone": "+91 80 4888 3355",
    "whatsapp": "918048883355",
    "address": "CMH Road, Indiranagar, Bengaluru 560038",
    "image": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    "description": "Instant same-day city courier, domestic air cargo, and international DHL/FedEx partner point with safe bubble packaging.",
    "services": [
      {
        "id": "s-dl-4",
        "name": "Same-Day Intra-City Express Courier",
        "price": 99,
        "duration": "2 Hours"
      },
      {
        "id": "s-dl-5",
        "name": "All-India Document Speed Courier",
        "price": 149,
        "duration": "24 Hours"
      }
    ],
    "features": [
      "Live GPS Tracking",
      "Instant Doorstep Pickup",
      "Secure Bubble Wrap Packaging"
    ],
    "reviews": [
      {
        "author": "Tanvi Murthy",
        "rating": 5,
        "date": "3 days ago",
        "verifiedBooking": true,
        "comment": "Delivered urgent legal documents from Indiranagar to Electronic City in 45 mins."
      }
    ],
    "lat": 12.9784,
    "lng": 77.6408,
    "photos": [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-daily-103",
    "name": "MasterKey 24x7 Locksmith & Laser Duplicate Studio",
    "category": "daily",
    "subcategory": "Repair Shops",
    "city": "Bengaluru",
    "locality": "HSR Layout",
    "rating": 4.9,
    "reviewsCount": 185,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "24 Hours Open",
    "startingPrice": 199,
    "priceRange": "₹",
    "responseTime": "~15 min",
    "trustScore": 97,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 185
    },
    "phone": "+91 98451 98765",
    "whatsapp": "919845198765",
    "address": "14th Main, HSR Layout Sector 4, Bengaluru 560102",
    "image": "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=800&q=80",
    "description": "Emergency home and car lockout service, computerized laser duplicate key cutting, digital biometric door lock installation.",
    "services": [
      {
        "id": "s-dl-6",
        "name": "Emergency Door Lockout Unlock",
        "price": 499,
        "duration": "20 mins"
      },
      {
        "id": "s-dl-7",
        "name": "Computerized Laser Key Duplicate",
        "price": 199,
        "duration": "10 mins"
      }
    ],
    "features": [
      "24/7 Mobile Van Dispatch",
      "Laser Key Precision",
      "Car Sensor Keys Supported"
    ],
    "reviews": [
      {
        "author": "Rajesh G.",
        "rating": 5,
        "date": "1 week ago",
        "verifiedBooking": true,
        "comment": "Arrived at 1 AM when I locked myself out of my apartment. Life saver!"
      }
    ],
    "lat": 12.9116,
    "lng": 77.6389,
    "photos": [
      "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-shop-101",
    "name": "Croma & Digital Hub Megastore Flagship",
    "category": "shopping",
    "subcategory": "Electronics",
    "city": "Bengaluru",
    "locality": "Koramangala",
    "rating": 4.8,
    "reviewsCount": 890,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "10:00 AM - 10:00 PM",
    "startingPrice": 499,
    "priceRange": "₹₹₹",
    "responseTime": "~5 min",
    "trustScore": 99,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 890
    },
    "phone": "+91 80 4999 1100",
    "whatsapp": "918049991100",
    "address": "Near Forum Mall, Hosur Road, Koramangala, Bengaluru 560095",
    "image": "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80",
    "description": "Official electronics destination for laptops, smartphones, 4K Smart TVs, air conditioners, home theater systems, and genuine accessories with brand warranty.",
    "services": [
      {
        "id": "s-sh-1",
        "name": "In-Store Product Demo & Consult",
        "price": 0,
        "duration": "Walk-in"
      },
      {
        "id": "s-sh-2",
        "name": "Express 3-Hour Home Delivery & Setup",
        "price": 199,
        "duration": "3 Hours"
      }
    ],
    "features": [
      "Official Brand Warranty",
      "Zero Cost EMI Available",
      "3-Hour Home Delivery",
      "Live Gadget Demo"
    ],
    "reviews": [
      {
        "author": "Akash Reddy",
        "rating": 5,
        "date": "Yesterday",
        "verifiedBooking": true,
        "comment": "Purchased an OLED TV with free installation done within 4 hours."
      }
    ],
    "lat": 12.9345,
    "lng": 77.615,
    "photos": [
      "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-shop-102",
    "name": "FabIndia & Handloom Heritage Lounge",
    "category": "shopping",
    "subcategory": "Clothing & Fashion",
    "city": "Bengaluru",
    "locality": "Jayanagar 4th Block",
    "rating": 4.9,
    "reviewsCount": 520,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "10:30 AM - 9:30 PM",
    "startingPrice": 799,
    "priceRange": "₹₹₹",
    "responseTime": "~8 min",
    "trustScore": 98,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 520
    },
    "phone": "+91 80 4666 7788",
    "whatsapp": "918046667788",
    "address": "11th Main, Jayanagar 4th Block, Bengaluru 560011",
    "image": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
    "description": "Pure artisan ethnic apparel, organic cotton kurtas, handcrafted home furnishings, pottery, and natural Ayurvedic beauty care.",
    "services": [
      {
        "id": "s-sh-3",
        "name": "Personal Styling & Trial Room Assistance",
        "price": 0,
        "duration": "Walk-in"
      }
    ],
    "features": [
      "100% Organic Cotton",
      "Artisan Handcrafted",
      "Exchange Guarantee"
    ],
    "reviews": [
      {
        "author": "Pooja Bhat",
        "rating": 5,
        "date": "4 days ago",
        "verifiedBooking": true,
        "comment": "Beautiful festive collection and top-notch customer service."
      }
    ],
    "lat": 12.925,
    "lng": 77.5838,
    "photos": [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-pro-101",
    "name": "LexOmnis High Court Advocates & Corporate Legal Counsel",
    "category": "pro",
    "subcategory": "Lawyers & Advocates",
    "city": "Bengaluru",
    "locality": "MG Road / High Court",
    "rating": 4.9,
    "reviewsCount": 340,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:30 AM - 7:30 PM",
    "startingPrice": 999,
    "priceRange": "₹₹₹",
    "responseTime": "~10 min",
    "trustScore": 99,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 340
    },
    "phone": "+91 80 4111 2233",
    "whatsapp": "918041112233",
    "address": "Prestige Meridian, MG Road, Bengaluru 560001",
    "image": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
    "description": "Senior High Court advocates offering property legal verification, builder dispute litigation, corporate compliance, startup agreements, and civil law counseling.",
    "services": [
      {
        "id": "s-pro-1",
        "name": "Property Title Verification & Legal Opinion",
        "price": 2999,
        "duration": "24 Hours"
      },
      {
        "id": "s-pro-2",
        "name": "Startup Employment / Founder Contract Drafting",
        "price": 1999,
        "duration": "48 Hours"
      },
      {
        "id": "s-pro-3",
        "name": "In-Chamber Legal Consultation (30 mins)",
        "price": 999,
        "duration": "30 mins"
      }
    ],
    "features": [
      "High Court Bar Council Verified",
      "Confidential Consultation",
      "Digital Verified Legal Opinion"
    ],
    "reviews": [
      {
        "author": "Sanjay Hegde",
        "rating": 5,
        "date": "3 days ago",
        "verifiedBooking": true,
        "comment": "Saved me from buying an encumbered land plot. Incredible attention to title deeds!"
      }
    ],
    "lat": 12.9756,
    "lng": 77.6097,
    "photos": [
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-pro-102",
    "name": "Venkatesh & Associates Chartered Accountants (CA & GST)",
    "category": "pro",
    "subcategory": "Chartered Accountants (CA)",
    "city": "Bengaluru",
    "locality": "Jayanagar",
    "rating": 4.9,
    "reviewsCount": 280,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 8:00 PM",
    "startingPrice": 799,
    "priceRange": "₹₹",
    "responseTime": "~15 min",
    "trustScore": 98,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 280
    },
    "phone": "+91 80 4333 8811",
    "whatsapp": "918043338811",
    "address": "9th Main, Jayanagar 3rd Block, Bengaluru 560011",
    "image": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    "description": "ICAI certified Chartered Accountants. Income tax return filing, GST registration, company incorporation, and financial audit services for SMEs and individuals.",
    "services": [
      {
        "id": "s-pro-4",
        "name": "Individual Income Tax Return (ITR) Filing",
        "price": 799,
        "duration": "Same Day"
      },
      {
        "id": "s-pro-5",
        "name": "Pvt Ltd Company Incorporation & PAN/TAN",
        "price": 4999,
        "duration": "5 Days"
      }
    ],
    "features": [
      "ICAI Fellow CA",
      "Maximum Tax Refund Strategies",
      "100% Paperless Process"
    ],
    "reviews": [
      {
        "author": "Naveen Kumar",
        "rating": 5,
        "date": "1 week ago",
        "verifiedBooking": true,
        "comment": "Sorted out complex stock market capital gains tax smoothly."
      }
    ],
    "lat": 12.928,
    "lng": 77.585,
    "photos": [
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-b2b-101",
    "name": "Peenya Industrial Fasteners & Hardware Wholesale Mart",
    "category": "b2b",
    "subcategory": "Industrial Tools",
    "city": "Bengaluru",
    "locality": "Peenya Industrial Area",
    "rating": 4.8,
    "reviewsCount": 390,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "8:30 AM - 7:30 PM",
    "startingPrice": 1999,
    "priceRange": "₹₹₹₹",
    "responseTime": "~15 min",
    "trustScore": 99,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 390
    },
    "phone": "+91 80 4222 9911",
    "whatsapp": "918042229911",
    "address": "Peenya 2nd Stage, Industrial Estate, Bengaluru 560058",
    "image": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    "description": "Bulk wholesale supplier of stainless steel fasteners, power tools, CNC lathe spares, pneumatic valves, and safety gear for engineering factories.",
    "services": [
      {
        "id": "s-b2b-1",
        "name": "Bulk Fasteners & Bolts (Per 50kg Batch)",
        "price": 2999,
        "duration": "Same Day Dispatch"
      },
      {
        "id": "s-b2b-2",
        "name": "Heavy Duty Power Tool Bundle",
        "price": 7999,
        "duration": "Express Delivery"
      }
    ],
    "features": [
      "ISO 9001:2015 Certified",
      "GST Invoice with Input Credit",
      "Wholesale Bulk Discount",
      "All-India Logistics"
    ],
    "reviews": [
      {
        "author": "Manjunath Engineering",
        "rating": 5,
        "date": "3 days ago",
        "verifiedBooking": true,
        "comment": "Best industrial rates in Peenya. Top quality SS-304 hardware."
      }
    ],
    "lat": 13.0298,
    "lng": 77.5256,
    "photos": [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-b2b-102",
    "name": "MedEquip Bulk Hospital Supplies & Diagnostics Wholesale",
    "category": "b2b",
    "subcategory": "Bulk Medical Supplies",
    "city": "Bengaluru",
    "locality": "Basavanagudi",
    "rating": 4.9,
    "reviewsCount": 260,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 8:00 PM",
    "startingPrice": 1499,
    "priceRange": "₹₹₹",
    "responseTime": "~10 min",
    "trustScore": 98,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 260
    },
    "phone": "+91 80 4333 4455",
    "whatsapp": "918043334455",
    "address": "Near National College, Basavanagudi, Bengaluru 560004",
    "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
    "description": "Direct distributor of surgical gloves, oxygen concentrators, hospital beds, autoclaves, disposable PPE, and clinical diagnostic kits.",
    "services": [
      {
        "id": "s-b2b-3",
        "name": "Nitrile Examination Gloves (Carton 1000 Pcs)",
        "price": 1499,
        "duration": "Immediate Dispatch"
      }
    ],
    "features": [
      "FDA & CE Approved",
      "Bulk Hospital Supply",
      "24-Hour Emergency Dispatch"
    ],
    "reviews": [
      {
        "author": "Dr. Ramesh Babu",
        "rating": 5,
        "date": "1 week ago",
        "verifiedBooking": true,
        "comment": "Reliable supplier for our nursing home in South Bengaluru."
      }
    ],
    "lat": 12.9422,
    "lng": 77.575,
    "photos": [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-pack-101",
    "name": "SafeMove All-India Intercity Movers & Warehousing",
    "category": "packers",
    "subcategory": "Household Shifting",
    "city": "Bengaluru",
    "locality": "Koramangala",
    "rating": 4.9,
    "reviewsCount": 460,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "24 Hours Open",
    "startingPrice": 3499,
    "priceRange": "₹₹₹",
    "responseTime": "~10 min",
    "trustScore": 99,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 460
    },
    "phone": "+91 80 4999 7733",
    "whatsapp": "918049997733",
    "address": "80ft Road, Koramangala 4th Block, Bengaluru",
    "image": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
    "description": "IBA approved professional packers & movers. 5-layer bubble packing, hydraulic ramp vehicle carriers, goods transit insurance, and safe household relocation.",
    "services": [
      {
        "id": "s-pk-1",
        "name": "1BHK / 2BHK Local Bengaluru Shifting",
        "price": 3499,
        "duration": "4-6 Hours"
      },
      {
        "id": "s-pk-2",
        "name": "Intercity Shifting (Bengaluru to Mumbai/Delhi/Hyd)",
        "price": 14999,
        "duration": "2-3 Days"
      },
      {
        "id": "s-pk-3",
        "name": "Car / Bike Safe Hydraulic Transport",
        "price": 4499,
        "duration": "Scheduled"
      }
    ],
    "features": [
      "100% Damage Protection Insurance",
      "5-Layer Bubble Packing",
      "GPS Tracked Container Trucks",
      "Trained Uniformed Crew"
    ],
    "reviews": [
      {
        "author": "Abhishek Roy",
        "rating": 5,
        "date": "Yesterday",
        "verifiedBooking": true,
        "comment": "Shifted my 3BHK from Koramangala to Whitefield without a single scratch on glassware!"
      }
    ],
    "lat": 12.9345,
    "lng": 77.6256,
    "photos": [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-pack-102",
    "name": "UrbanRelocate Corporate Office & Villa Specialists",
    "category": "packers",
    "subcategory": "Office Relocation",
    "city": "Bengaluru",
    "locality": "Whitefield",
    "rating": 4.8,
    "reviewsCount": 320,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "7:00 AM - 10:00 PM",
    "startingPrice": 4999,
    "priceRange": "₹₹₹",
    "responseTime": "~8 min",
    "trustScore": 98,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 320
    },
    "phone": "+91 80 4888 6622",
    "whatsapp": "918048886622",
    "address": "Near Hope Farm, Whitefield, Bengaluru 560066",
    "image": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    "description": "Expertise in corporate IT server room relocation, luxury villa shifting, climate-controlled warehousing, and piano/antique packing.",
    "services": [
      {
        "id": "s-pk-4",
        "name": "Corporate Office IT & Workstation Shifting",
        "price": 9999,
        "duration": "Weekend Drive"
      }
    ],
    "features": [
      "Server Rack De-install & Re-install",
      "Zero Business Downtime",
      "Transit Insurance"
    ],
    "reviews": [
      {
        "author": "Cognitive Labs HR",
        "rating": 5,
        "date": "2 weeks ago",
        "verifiedBooking": true,
        "comment": "Moved our 50-seater office over Saturday and Sunday smoothly."
      }
    ],
    "lat": 12.983,
    "lng": 77.75,
    "photos": [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-emg-101",
    "name": "LifeLine 24/7 Advanced Cardiac ICU Ambulance Network",
    "category": "emergency",
    "subcategory": "24/7 Ambulance",
    "city": "Bengaluru",
    "locality": "Central Bengaluru",
    "rating": 5,
    "reviewsCount": 640,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "24 Hours Open",
    "startingPrice": 1499,
    "priceRange": "₹₹",
    "responseTime": "~5 min",
    "trustScore": 100,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 640
    },
    "phone": "+91 80 108 0000",
    "whatsapp": "91801080000",
    "address": "Victoria Hospital Junction, Fort, Bengaluru 560002",
    "image": "https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=800&q=80",
    "description": "Emergency ventilator and defibrillator equipped ICU ambulances with emergency doctor on board. 12-minute guaranteed arrival across all Bengaluru zones.",
    "services": [
      {
        "id": "s-em-1",
        "name": "Advanced Cardiac ICU Ambulance with Doctor",
        "price": 2499,
        "duration": "Sub-15m Dispatch"
      },
      {
        "id": "s-em-2",
        "name": "Basic Life Support (BLS) Oxygen Ambulance",
        "price": 1499,
        "duration": "Immediate Dispatch"
      }
    ],
    "features": [
      "Paramedic & Doctor On-Board",
      "Live Hospital Tele-Link",
      "Ventilator & Cardiac Monitor",
      "Sub-15 Min SLA"
    ],
    "reviews": [
      {
        "author": "Pradeep Shenoy",
        "rating": 5,
        "date": "Yesterday",
        "verifiedBooking": true,
        "comment": "Arrived in 9 minutes during my father chest pain emergency. True angels."
      }
    ],
    "lat": 12.962,
    "lng": 77.575,
    "photos": [
      "https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-emg-102",
    "name": "Apollo 24/7 Night Pharmacy & Emergency Blood Bank Match",
    "category": "emergency",
    "subcategory": "24/7 Pharmacies",
    "city": "Bengaluru",
    "locality": "Bannerghatta Road",
    "rating": 4.9,
    "reviewsCount": 510,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "24 Hours Open",
    "startingPrice": 99,
    "priceRange": "₹",
    "responseTime": "~5 min",
    "trustScore": 99,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 510
    },
    "phone": "+91 80 2630 4050",
    "whatsapp": "918026304050",
    "address": "Opp. IIM Bangalore, Bannerghatta Road, Bengaluru 560076",
    "image": "https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=800&q=80",
    "description": "Round-the-clock emergency pharmacy holding critical care injections, antivenom, cardiac medications, oxygen canisters, and rare blood group matching.",
    "services": [
      {
        "id": "s-em-3",
        "name": "24/7 Midnight Medicine Express Home Delivery",
        "price": 99,
        "duration": "30 mins"
      }
    ],
    "features": [
      "24 Hours Night Open",
      "Critical Care Injections Stocked",
      "Cold Chain Maintained"
    ],
    "reviews": [
      {
        "author": "Aarthi Swaminathan",
        "rating": 5,
        "date": "4 days ago",
        "verifiedBooking": true,
        "comment": "Got critical asthma nebulizer medication delivered at 2:30 AM."
      }
    ],
    "lat": 12.898,
    "lng": 77.599,
    "photos": [
      "https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-1793195224603",
    "name": "Apex Robotics & Laptop Lab",
    "category": "tech",
    "subcategory": "General Services",
    "city": "Bengaluru",
    "locality": "Koramangala 5th Block",
    "rating": 5,
    "reviewsCount": 1,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 8:00 PM",
    "startingPrice": 599,
    "priceRange": "₹₹",
    "responseTime": "~15 min",
    "trustScore": 95,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": false,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 1
    },
    "phone": "+91 98450 65809",
    "whatsapp": "919845065809",
    "address": "Koramangala 5th Block, Bengaluru",
    "image": "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80",
    "description": "Verified local service provider on LocalCare Infinity.",
    "services": [
      {
        "id": "s-1",
        "name": "Motherboard & Screen Diagnostics",
        "price": 599,
        "duration": "45 mins"
      }
    ],
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Punctual and highly professional service."
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-1793194977595",
    "name": "Apex Robotics & Laptop Lab",
    "category": "tech",
    "subcategory": "General Services",
    "city": "Bengaluru",
    "locality": "Koramangala 5th Block",
    "rating": 5,
    "reviewsCount": 1,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 8:00 PM",
    "startingPrice": 599,
    "priceRange": "₹₹",
    "responseTime": "~15 min",
    "trustScore": 95,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": false,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 1
    },
    "phone": "+91 98450 82814",
    "whatsapp": "919845082814",
    "address": "Koramangala 5th Block, Bengaluru",
    "image": "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=800&q=80",
    "description": "Verified local service provider on LocalCare Infinity.",
    "services": [
      {
        "id": "s-1",
        "name": "Motherboard & Screen Diagnostics",
        "price": 599,
        "duration": "45 mins"
      }
    ],
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Punctual and highly professional service."
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-1793193818361",
    "name": "Apex Robotics & Laptop Lab",
    "category": "tech",
    "subcategory": "General Services",
    "city": "Bengaluru",
    "locality": "Koramangala 5th Block",
    "rating": 5,
    "reviewsCount": 1,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 8:00 PM",
    "startingPrice": 599,
    "priceRange": "₹₹",
    "responseTime": "~15 min",
    "trustScore": 95,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": false,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 1
    },
    "phone": "+91 98450 68981",
    "whatsapp": "919845068981",
    "address": "Koramangala 5th Block, Bengaluru",
    "image": "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?auto=format&fit=crop&w=800&q=80",
    "description": "Verified local service provider on LocalCare Infinity.",
    "services": [
      {
        "id": "s-1",
        "name": "Motherboard & Screen Diagnostics",
        "price": 599,
        "duration": "45 mins"
      }
    ],
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Punctual and highly professional service."
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-1793191038436",
    "name": "Apex Robotics & Laptop Lab",
    "category": "tech",
    "subcategory": "General Services",
    "city": "Bengaluru",
    "locality": "Koramangala 5th Block",
    "rating": 5,
    "reviewsCount": 1,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 8:00 PM",
    "startingPrice": 599,
    "priceRange": "₹₹",
    "responseTime": "~15 min",
    "trustScore": 95,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": false,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 1
    },
    "phone": "+91 98450 66937",
    "whatsapp": "919845066937",
    "address": "Koramangala 5th Block, Bengaluru",
    "image": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    "description": "Verified local service provider on LocalCare Infinity.",
    "services": [
      {
        "id": "s-1",
        "name": "Motherboard & Screen Diagnostics",
        "price": 599,
        "duration": "45 mins"
      }
    ],
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Punctual and highly professional service."
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-1792932250460",
    "name": "Apex Robotics & Laptop Lab",
    "category": "tech",
    "subcategory": "General Services",
    "city": "Bengaluru",
    "locality": "Koramangala 5th Block",
    "rating": 5,
    "reviewsCount": 1,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 8:00 PM",
    "startingPrice": 599,
    "priceRange": "₹₹",
    "responseTime": "~15 min",
    "trustScore": 95,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": false,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 1
    },
    "phone": "+91 98450 24961",
    "whatsapp": "919845024961",
    "address": "Koramangala 5th Block, Bengaluru",
    "image": "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80",
    "description": "Verified local service provider on LocalCare Infinity.",
    "services": [
      {
        "id": "s-1",
        "name": "Motherboard & Screen Diagnostics",
        "price": 599,
        "duration": "45 mins"
      }
    ],
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Punctual and highly professional service."
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-1792930339002",
    "name": "Apex Robotics & Laptop Lab",
    "category": "tech",
    "subcategory": "General Services",
    "city": "Bengaluru",
    "locality": "Koramangala 5th Block",
    "rating": 5,
    "reviewsCount": 1,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 8:00 PM",
    "startingPrice": 599,
    "priceRange": "₹₹",
    "responseTime": "~15 min",
    "trustScore": 95,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": false,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 1
    },
    "phone": "+91 98450 44526",
    "whatsapp": "919845044526",
    "address": "Koramangala 5th Block, Bengaluru",
    "image": "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=800&q=80",
    "description": "Verified local service provider on LocalCare Infinity.",
    "services": [
      {
        "id": "s-1",
        "name": "Motherboard & Screen Diagnostics",
        "price": 599,
        "duration": "45 mins"
      }
    ],
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Punctual and highly professional service."
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-1792928799980",
    "name": "Apex Robotics & Laptop Lab",
    "category": "tech",
    "subcategory": "General Services",
    "city": "Bengaluru",
    "locality": "Koramangala 5th Block",
    "rating": 5,
    "reviewsCount": 1,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 8:00 PM",
    "startingPrice": 599,
    "priceRange": "₹₹",
    "responseTime": "~15 min",
    "trustScore": 95,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": false,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 1
    },
    "phone": "+91 98450 16954",
    "whatsapp": "919845016954",
    "address": "Koramangala 5th Block, Bengaluru",
    "image": "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?auto=format&fit=crop&w=800&q=80",
    "description": "Verified local service provider on LocalCare Infinity.",
    "services": [
      {
        "id": "s-1",
        "name": "Motherboard & Screen Diagnostics",
        "price": 599,
        "duration": "45 mins"
      }
    ],
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Punctual and highly professional service."
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-1792927977499",
    "name": "Apex Robotics & Laptop Lab",
    "category": "tech",
    "subcategory": "General Services",
    "city": "Bengaluru",
    "locality": "Koramangala 5th Block",
    "rating": 5,
    "reviewsCount": 1,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 8:00 PM",
    "startingPrice": 599,
    "priceRange": "₹₹",
    "responseTime": "~15 min",
    "trustScore": 95,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": false,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 1
    },
    "phone": "+91 98450 86241",
    "whatsapp": "919845086241",
    "address": "Koramangala 5th Block, Bengaluru",
    "image": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    "description": "Verified local service provider on LocalCare Infinity.",
    "services": [
      {
        "id": "s-1",
        "name": "Motherboard & Screen Diagnostics",
        "price": 599,
        "duration": "45 mins"
      }
    ],
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Punctual and highly professional service."
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-1792926834467",
    "name": "Apex Robotics & Laptop Lab",
    "category": "tech",
    "subcategory": "General Services",
    "city": "Bengaluru",
    "locality": "Koramangala 5th Block",
    "rating": 5,
    "reviewsCount": 1,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 8:00 PM",
    "startingPrice": 599,
    "priceRange": "₹₹",
    "responseTime": "~15 min",
    "trustScore": 95,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": false,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 1
    },
    "phone": "+91 98450 85642",
    "whatsapp": "919845085642",
    "address": "Koramangala 5th Block, Bengaluru",
    "image": "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80",
    "description": "Verified local service provider on LocalCare Infinity.",
    "services": [
      {
        "id": "s-1",
        "name": "Motherboard & Screen Diagnostics",
        "price": 599,
        "duration": "45 mins"
      }
    ],
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Punctual and highly professional service."
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-1792926675598",
    "name": "Apex Robotics & Laptop Lab",
    "category": "tech",
    "subcategory": "General Services",
    "city": "Bengaluru",
    "locality": "Koramangala 5th Block",
    "rating": 5,
    "reviewsCount": 1,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 8:00 PM",
    "startingPrice": 599,
    "priceRange": "₹₹",
    "responseTime": "~15 min",
    "trustScore": 95,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": false,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 1
    },
    "phone": "+91 98450 49615",
    "whatsapp": "919845049615",
    "address": "Koramangala 5th Block, Bengaluru",
    "image": "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=800&q=80",
    "description": "Verified local service provider on LocalCare Infinity.",
    "services": [
      {
        "id": "s-1",
        "name": "Motherboard & Screen Diagnostics",
        "price": 599,
        "duration": "45 mins"
      }
    ],
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Punctual and highly professional service."
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-1792925724940",
    "name": "Apex Robotics & Laptop Lab",
    "category": "tech",
    "subcategory": "General Services",
    "city": "Bengaluru",
    "locality": "Koramangala 5th Block",
    "rating": 5,
    "reviewsCount": 1,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 8:00 PM",
    "startingPrice": 599,
    "priceRange": "₹₹",
    "responseTime": "~15 min",
    "trustScore": 95,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": false,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 1
    },
    "phone": "+91 98450 13098",
    "whatsapp": "919845013098",
    "address": "Koramangala 5th Block, Bengaluru",
    "image": "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?auto=format&fit=crop&w=800&q=80",
    "description": "Verified local service provider on LocalCare Infinity.",
    "services": [
      {
        "id": "s-1",
        "name": "Motherboard & Screen Diagnostics",
        "price": 599,
        "duration": "45 mins"
      }
    ],
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Punctual and highly professional service."
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-1792924736135",
    "name": "Apex Robotics & Laptop Lab",
    "category": "tech",
    "subcategory": "General Services",
    "city": "Bengaluru",
    "locality": "Koramangala 5th Block",
    "rating": 5,
    "reviewsCount": 1,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 8:00 PM",
    "startingPrice": 599,
    "priceRange": "₹₹",
    "responseTime": "~15 min",
    "trustScore": 95,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": false,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 1
    },
    "phone": "+91 98450 29733",
    "whatsapp": "919845029733",
    "address": "Koramangala 5th Block, Bengaluru",
    "image": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    "description": "Verified local service provider on LocalCare Infinity.",
    "services": [
      {
        "id": "s-1",
        "name": "Motherboard & Screen Diagnostics",
        "price": 599,
        "duration": "45 mins"
      }
    ],
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Punctual and highly professional service."
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-1792853097405",
    "name": "Apex Robotics & Laptop Lab",
    "category": "tech",
    "subcategory": "General Services",
    "city": "Bengaluru",
    "locality": "Koramangala 5th Block",
    "rating": 5,
    "reviewsCount": 1,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 8:00 PM",
    "startingPrice": 599,
    "priceRange": "₹₹",
    "responseTime": "~15 min",
    "trustScore": 95,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": false,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 1
    },
    "phone": "+91 98450 58367",
    "whatsapp": "919845058367",
    "address": "Koramangala 5th Block, Bengaluru",
    "image": "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80",
    "description": "Verified local service provider on LocalCare Infinity.",
    "services": [
      {
        "id": "s-1",
        "name": "Motherboard & Screen Diagnostics",
        "price": 599,
        "duration": "45 mins"
      }
    ],
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Punctual and highly professional service."
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-1792853026390",
    "name": "Apex Robotics & Laptop Lab",
    "category": "tech",
    "subcategory": "General Services",
    "city": "Bengaluru",
    "locality": "Koramangala 5th Block",
    "rating": 5,
    "reviewsCount": 1,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 8:00 PM",
    "startingPrice": 599,
    "priceRange": "₹₹",
    "responseTime": "~15 min",
    "trustScore": 95,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": false,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 1
    },
    "phone": "+91 98450 91952",
    "whatsapp": "919845091952",
    "address": "Koramangala 5th Block, Bengaluru",
    "image": "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=800&q=80",
    "description": "Verified local service provider on LocalCare Infinity.",
    "services": [
      {
        "id": "s-1",
        "name": "Motherboard & Screen Diagnostics",
        "price": 599,
        "duration": "45 mins"
      }
    ],
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Punctual and highly professional service."
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-1792852415700",
    "name": "Apex Robotics & Laptop Lab",
    "category": "tech",
    "subcategory": "General Services",
    "city": "Bengaluru",
    "locality": "Koramangala 5th Block",
    "rating": 5,
    "reviewsCount": 1,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 8:00 PM",
    "startingPrice": 599,
    "priceRange": "₹₹",
    "responseTime": "~15 min",
    "trustScore": 95,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": false,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 1
    },
    "phone": "+91 98450 92572",
    "whatsapp": "919845092572",
    "address": "Koramangala 5th Block, Bengaluru",
    "image": "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?auto=format&fit=crop&w=800&q=80",
    "description": "Verified local service provider on LocalCare Infinity.",
    "services": [
      {
        "id": "s-1",
        "name": "Motherboard & Screen Diagnostics",
        "price": 599,
        "duration": "45 mins"
      }
    ],
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Punctual and highly professional service."
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-1792852348155",
    "name": "Apex Robotics & Laptop Lab",
    "category": "tech",
    "subcategory": "General Services",
    "city": "Bengaluru",
    "locality": "Koramangala 5th Block",
    "rating": 5,
    "reviewsCount": 1,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 8:00 PM",
    "startingPrice": 599,
    "priceRange": "₹₹",
    "responseTime": "~15 min",
    "trustScore": 95,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": false,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 1
    },
    "phone": "+91 98450 24836",
    "whatsapp": "919845024836",
    "address": "Koramangala 5th Block, Bengaluru",
    "image": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    "description": "Verified local service provider on LocalCare Infinity.",
    "services": [
      {
        "id": "s-1",
        "name": "Motherboard & Screen Diagnostics",
        "price": 599,
        "duration": "45 mins"
      }
    ],
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Punctual and highly professional service."
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-1792850645209",
    "name": "Apex Robotics & Laptop Lab",
    "category": "tech",
    "subcategory": "General Services",
    "city": "Bengaluru",
    "locality": "Koramangala 5th Block",
    "rating": 5,
    "reviewsCount": 1,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 8:00 PM",
    "startingPrice": 599,
    "priceRange": "₹₹",
    "responseTime": "~15 min",
    "trustScore": 95,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": false,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 1
    },
    "phone": "+91 98450 73875",
    "whatsapp": "919845073875",
    "address": "Koramangala 5th Block, Bengaluru",
    "image": "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80",
    "description": "Verified local service provider on LocalCare Infinity.",
    "services": [
      {
        "id": "s-1",
        "name": "Motherboard & Screen Diagnostics",
        "price": 599,
        "duration": "45 mins"
      }
    ],
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Punctual and highly professional service."
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-1791716981755",
    "name": "Apex Robotics & Laptop Lab",
    "category": "tech",
    "subcategory": "General Services",
    "city": "Bengaluru",
    "locality": "Koramangala 5th Block",
    "rating": 5,
    "reviewsCount": 1,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 8:00 PM",
    "startingPrice": 599,
    "priceRange": "₹₹",
    "responseTime": "~15 min",
    "trustScore": 95,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": false,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 1
    },
    "phone": "+91 98450 61756",
    "whatsapp": "919845061756",
    "address": "Koramangala 5th Block, Bengaluru",
    "image": "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=800&q=80",
    "description": "Verified local service provider on LocalCare Infinity.",
    "services": [
      {
        "id": "s-1",
        "name": "Motherboard & Screen Diagnostics",
        "price": 599,
        "duration": "45 mins"
      }
    ],
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Punctual and highly professional service."
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-1791655187772",
    "name": "Apex Robotics & Laptop Lab",
    "category": "tech",
    "subcategory": "General Services",
    "city": "Bengaluru",
    "locality": "Koramangala 5th Block",
    "rating": 5,
    "reviewsCount": 1,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 8:00 PM",
    "startingPrice": 599,
    "priceRange": "₹₹",
    "responseTime": "~15 min",
    "trustScore": 95,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": false,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 1
    },
    "phone": "+91 98450 63574",
    "whatsapp": "919845063574",
    "address": "Koramangala 5th Block, Bengaluru",
    "image": "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?auto=format&fit=crop&w=800&q=80",
    "description": "Verified local service provider on LocalCare Infinity.",
    "services": [
      {
        "id": "s-1",
        "name": "Motherboard & Screen Diagnostics",
        "price": 599,
        "duration": "45 mins"
      }
    ],
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Punctual and highly professional service."
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-1791653685154",
    "name": "Apex Robotics & Laptop Lab",
    "category": "tech",
    "subcategory": "General Services",
    "city": "Bengaluru",
    "locality": "Koramangala 5th Block",
    "rating": 5,
    "reviewsCount": 1,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 8:00 PM",
    "startingPrice": 599,
    "priceRange": "₹₹",
    "responseTime": "~15 min",
    "trustScore": 95,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": false,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 1
    },
    "phone": "+91 98450 28940",
    "whatsapp": "919845028940",
    "address": "Koramangala 5th Block, Bengaluru",
    "image": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    "description": "Verified local service provider on LocalCare Infinity.",
    "services": [
      {
        "id": "s-1",
        "name": "Motherboard & Screen Diagnostics",
        "price": 599,
        "duration": "45 mins"
      }
    ],
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Punctual and highly professional service."
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-1791653574519",
    "name": "Apex Robotics & Laptop Lab",
    "category": "tech",
    "subcategory": "General Services",
    "city": "Bengaluru",
    "locality": "Koramangala 5th Block",
    "rating": 5,
    "reviewsCount": 1,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 8:00 PM",
    "startingPrice": 599,
    "priceRange": "₹₹",
    "responseTime": "~15 min",
    "trustScore": 95,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": false,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 1
    },
    "phone": "+91 98450 14557",
    "whatsapp": "919845014557",
    "address": "Koramangala 5th Block, Bengaluru",
    "image": "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80",
    "description": "Verified local service provider on LocalCare Infinity.",
    "services": [
      {
        "id": "s-1",
        "name": "Motherboard & Screen Diagnostics",
        "price": 599,
        "duration": "45 mins"
      }
    ],
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Punctual and highly professional service."
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-1791652386955",
    "name": "Apex Robotics & Laptop Lab",
    "category": "tech",
    "subcategory": "General Services",
    "city": "Bengaluru",
    "locality": "Koramangala 5th Block",
    "rating": 5,
    "reviewsCount": 1,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 8:00 PM",
    "startingPrice": 599,
    "priceRange": "₹₹",
    "responseTime": "~15 min",
    "trustScore": 95,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": false,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 1
    },
    "phone": "+91 98450 18967",
    "whatsapp": "919845018967",
    "address": "Koramangala 5th Block, Bengaluru",
    "image": "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=800&q=80",
    "description": "Verified local service provider on LocalCare Infinity.",
    "services": [
      {
        "id": "s-1",
        "name": "Motherboard & Screen Diagnostics",
        "price": 599,
        "duration": "45 mins"
      }
    ],
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Punctual and highly professional service."
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-1791645459712",
    "name": "Apex Robotics & Laptop Lab",
    "category": "tech",
    "subcategory": "General Services",
    "city": "Bengaluru",
    "locality": "Koramangala 5th Block",
    "rating": 5,
    "reviewsCount": 1,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 8:00 PM",
    "startingPrice": 599,
    "priceRange": "₹₹",
    "responseTime": "~15 min",
    "trustScore": 95,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": false,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 1
    },
    "phone": "+91 98450 88208",
    "whatsapp": "919845088208",
    "address": "Koramangala 5th Block, Bengaluru",
    "image": "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?auto=format&fit=crop&w=800&q=80",
    "description": "Verified local service provider on LocalCare Infinity.",
    "services": [
      {
        "id": "s-1",
        "name": "Motherboard & Screen Diagnostics",
        "price": 599,
        "duration": "45 mins"
      }
    ],
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Punctual and highly professional service."
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-1791643761883",
    "name": "Apex Robotics & Laptop Lab",
    "category": "tech",
    "subcategory": "General Services",
    "city": "Bengaluru",
    "locality": "Koramangala 5th Block",
    "rating": 5,
    "reviewsCount": 1,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 8:00 PM",
    "startingPrice": 599,
    "priceRange": "₹₹",
    "responseTime": "~15 min",
    "trustScore": 95,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": false,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 1
    },
    "phone": "+91 98450 23068",
    "whatsapp": "919845023068",
    "address": "Koramangala 5th Block, Bengaluru",
    "image": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    "description": "Verified local service provider on LocalCare Infinity.",
    "services": [
      {
        "id": "s-1",
        "name": "Motherboard & Screen Diagnostics",
        "price": 599,
        "duration": "45 mins"
      }
    ],
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Punctual and highly professional service."
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-1791643606425",
    "name": "Apex Robotics & Laptop Lab",
    "category": "tech",
    "subcategory": "General Services",
    "city": "Bengaluru",
    "locality": "Koramangala 5th Block",
    "rating": 5,
    "reviewsCount": 1,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 8:00 PM",
    "startingPrice": 599,
    "priceRange": "₹₹",
    "responseTime": "~15 min",
    "trustScore": 95,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": false,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 1
    },
    "phone": "+91 98450 65798",
    "whatsapp": "919845065798",
    "address": "Koramangala 5th Block, Bengaluru",
    "image": "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80",
    "description": "Verified local service provider on LocalCare Infinity.",
    "services": [
      {
        "id": "s-1",
        "name": "Motherboard & Screen Diagnostics",
        "price": 599,
        "duration": "45 mins"
      }
    ],
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Punctual and highly professional service."
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-1791642708660",
    "name": "Apex Robotics & Laptop Lab",
    "category": "tech",
    "subcategory": "General Services",
    "city": "Bengaluru",
    "locality": "Koramangala 5th Block",
    "rating": 5,
    "reviewsCount": 1,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 8:00 PM",
    "startingPrice": 599,
    "priceRange": "₹₹",
    "responseTime": "~15 min",
    "trustScore": 95,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": false,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 1
    },
    "phone": "+91 98450 38152",
    "whatsapp": "919845038152",
    "address": "Koramangala 5th Block, Bengaluru",
    "image": "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=800&q=80",
    "description": "Verified local service provider on LocalCare Infinity.",
    "services": [
      {
        "id": "s-1",
        "name": "Motherboard & Screen Diagnostics",
        "price": 599,
        "duration": "45 mins"
      }
    ],
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Punctual and highly professional service."
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-101",
    "name": "Apollo Dental & Laser Clinic",
    "category": "health",
    "subcategory": "Dentists",
    "city": "Bengaluru",
    "locality": "Koramangala 4th Block",
    "rating": 5,
    "reviewsCount": 410,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 499,
    "priceRange": "₹₹",
    "responseTime": "~8 min",
    "trustScore": 96,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 384
    },
    "phone": "+91 98450 11223",
    "whatsapp": "919845011223",
    "address": "Plot 48, 80 Feet Road, 4th Block, Koramangala, Bengaluru, Karnataka 560034",
    "image": "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
    "lat": 12.9345,
    "lng": 77.6265,
    "distance": "0.8 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Digitally Scanned 3D OPG",
      "Painless Laser Tech",
      "Insurance Cashless",
      "NABH Accredited"
    ],
    "services": [
      {
        "id": "s-101-1",
        "name": "Comprehensive Dental Consultation",
        "price": 499,
        "duration": "30 mins"
      },
      {
        "id": "s-101-2",
        "name": "Painless Single-Sitting Root Canal",
        "price": 3499,
        "duration": "60 mins"
      },
      {
        "id": "s-101-3",
        "name": "Teeth Whitening & Polishing",
        "price": 1999,
        "duration": "45 mins"
      },
      {
        "id": "s-101-4",
        "name": "Titanium Dental Implant Surgery",
        "price": 17999,
        "duration": "90 mins"
      }
    ],
    "offer": "20% OFF on Dental Scaling & Polishing this week",
    "description": "Premier multi-speciality dental healthcare clinic in Koramangala with 15+ years of verified clinical experience. Fully sanitized operatories with German painless imaging systems.",
    "reviews": [
      {
        "id": "rev-1793195224693",
        "author": "Priya Sharma",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Outstanding painless dental cleaning. Very hygienic!",
        "aspectTags": []
      },
      {
        "id": "rev-1793194977743",
        "author": "Priya Sharma",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Outstanding painless dental cleaning. Very hygienic!",
        "aspectTags": []
      },
      {
        "id": "rev-1793193818441",
        "author": "Priya Sharma",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Outstanding painless dental cleaning. Very hygienic!",
        "aspectTags": []
      },
      {
        "id": "rev-1793191038519",
        "author": "Priya Sharma",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Outstanding painless dental cleaning. Very hygienic!",
        "aspectTags": []
      },
      {
        "id": "rev-1792932250511",
        "author": "Priya Sharma",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Outstanding painless dental cleaning. Very hygienic!",
        "aspectTags": []
      },
      {
        "id": "rev-1792930339053",
        "author": "Priya Sharma",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Outstanding painless dental cleaning. Very hygienic!",
        "aspectTags": []
      },
      {
        "id": "rev-1792928800035",
        "author": "Priya Sharma",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Outstanding painless dental cleaning. Very hygienic!",
        "aspectTags": []
      },
      {
        "id": "rev-1792927977582",
        "author": "Priya Sharma",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Outstanding painless dental cleaning. Very hygienic!",
        "aspectTags": []
      },
      {
        "id": "rev-1792926834507",
        "author": "Priya Sharma",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Outstanding painless dental cleaning. Very hygienic!",
        "aspectTags": []
      },
      {
        "id": "rev-1792926675641",
        "author": "Priya Sharma",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Outstanding painless dental cleaning. Very hygienic!",
        "aspectTags": []
      },
      {
        "id": "rev-1792925725024",
        "author": "Priya Sharma",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Outstanding painless dental cleaning. Very hygienic!",
        "aspectTags": []
      },
      {
        "id": "rev-1792924736179",
        "author": "Priya Sharma",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Outstanding painless dental cleaning. Very hygienic!",
        "aspectTags": []
      },
      {
        "id": "rev-1792853097446",
        "author": "Priya Sharma",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Outstanding painless dental cleaning. Very hygienic!",
        "aspectTags": []
      },
      {
        "id": "rev-1792853026428",
        "author": "Priya Sharma",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Outstanding painless dental cleaning. Very hygienic!",
        "aspectTags": []
      },
      {
        "id": "rev-1792852415743",
        "author": "Priya Sharma",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Outstanding painless dental cleaning. Very hygienic!",
        "aspectTags": []
      },
      {
        "id": "rev-1792852348214",
        "author": "Priya Sharma",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Outstanding painless dental cleaning. Very hygienic!",
        "aspectTags": []
      },
      {
        "id": "rev-1792850645238",
        "author": "Priya Sharma",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Outstanding painless dental cleaning. Very hygienic!",
        "aspectTags": []
      },
      {
        "id": "rev-1791716981793",
        "author": "Priya Sharma",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Outstanding painless dental cleaning. Very hygienic!",
        "aspectTags": []
      },
      {
        "id": "rev-1791655187830",
        "author": "Priya Sharma",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Outstanding painless dental cleaning. Very hygienic!",
        "aspectTags": []
      },
      {
        "id": "rev-1791653685182",
        "author": "Priya Sharma",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Outstanding painless dental cleaning. Very hygienic!",
        "aspectTags": []
      },
      {
        "id": "rev-1791653574558",
        "author": "Priya Sharma",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Outstanding painless dental cleaning. Very hygienic!",
        "aspectTags": []
      },
      {
        "id": "rev-1791652386983",
        "author": "Priya Sharma",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Outstanding painless dental cleaning. Very hygienic!",
        "aspectTags": []
      },
      {
        "id": "rev-1791645459739",
        "author": "Priya Sharma",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Outstanding painless dental cleaning. Very hygienic!",
        "aspectTags": []
      },
      {
        "id": "rev-1791643761907",
        "author": "Priya Sharma",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Outstanding painless dental cleaning. Very hygienic!",
        "aspectTags": []
      },
      {
        "id": "rev-1791643606458",
        "author": "Priya Sharma",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Outstanding painless dental cleaning. Very hygienic!",
        "aspectTags": []
      },
      {
        "id": "rev-1791642708685",
        "author": "Priya Sharma",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Outstanding painless dental cleaning. Very hygienic!",
        "aspectTags": []
      },
      {
        "author": "Ananya Deshmukh",
        "rating": 5,
        "date": "Yesterday",
        "verifiedBooking": true,
        "comment": "Dr. Vivek was extremely gentle and thorough. The single-sitting root canal was 100% painless! Highly recommended."
      },
      {
        "author": "Karthik Raman",
        "rating": 5,
        "date": "1 week ago",
        "verifiedBooking": true,
        "comment": "Pristine hygiene standards, digital X-rays shown on screen before procedure, and transparent pricing."
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-102",
    "name": "QuickFix Pro AC & Electricals",
    "category": "electrical",
    "subcategory": "AC Repair & Gas Refill",
    "city": "Bengaluru",
    "locality": "HSR Layout Sector 2",
    "rating": 4.8,
    "reviewsCount": 512,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "8:00 AM - 10:00 PM",
    "startingPrice": 399,
    "priceRange": "₹",
    "responseTime": "~6 min",
    "trustScore": 94,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 490
    },
    "phone": "+91 98450 44556",
    "whatsapp": "919845044556",
    "address": "14th Main, 17th Cross, Sector 2, HSR Layout, Bengaluru 560102",
    "image": "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80",
    "lat": 12.9116,
    "lng": 77.6389,
    "distance": "1.2 km",
    "homeService": true,
    "onlineBooking": true,
    "features": [
      "30-Day Service Warranty",
      "High-Pressure Jet Clean",
      "Certified Technicians",
      "Transparent Rate Card"
    ],
    "services": [
      {
        "id": "s-102-1",
        "name": "Split AC Power Jet Servicing",
        "price": 449,
        "duration": "45 mins"
      },
      {
        "id": "s-102-2",
        "name": "AC Gas Leakage Check & Top-up",
        "price": 1899,
        "duration": "60 mins"
      },
      {
        "id": "s-102-3",
        "name": "Complete Home Electrical Inspection",
        "price": 299,
        "duration": "40 mins"
      },
      {
        "id": "s-102-4",
        "name": "Ceiling Fan & Switchboard Fixing",
        "price": 199,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat ₹150 OFF on 2 or more AC services",
    "description": "Certified HVAC technicians providing rapid door-step AC servicing, high-pressure foam jet cleaning, compressor diagnostics, and residential electrical repairs across Bengaluru.",
    "reviews": [
      {
        "author": "Vikram Sethi",
        "rating": 5,
        "date": "2 days ago",
        "verifiedBooking": true,
        "comment": "Technician Suresh arrived in 25 minutes flat! Solved the water dripping issue in my Daikin split AC in no time."
      },
      {
        "author": "Pooja Hegde",
        "rating": 5,
        "date": "3 days ago",
        "verifiedBooking": true,
        "comment": "Very professional, wore shoe covers and left the area spotless after pressure jet cleaning."
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-103",
    "name": "RapidFlow 24/7 Plumbers & Leak Experts",
    "category": "home",
    "subcategory": "Plumbers",
    "city": "Bengaluru",
    "locality": "Indiranagar 100ft Road",
    "rating": 4.8,
    "reviewsCount": 290,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "24 Hours Open",
    "startingPrice": 349,
    "priceRange": "₹",
    "responseTime": "~5 min",
    "trustScore": 95,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 275
    },
    "phone": "+91 98450 77889",
    "whatsapp": "919845077889",
    "address": "Near Metro Pillar 84, 100 Feet Road, Indiranagar, Bengaluru 560038",
    "image": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
    "lat": 12.9784,
    "lng": 77.6408,
    "distance": "2.1 km",
    "homeService": true,
    "onlineBooking": true,
    "features": [
      "Emergency 30-Min Arrival",
      "Concealed Leak Detection",
      "No Hidden Fees",
      "Standard Parts Used"
    ],
    "services": [
      {
        "id": "s-103-1",
        "name": "Emergency Pipe Burst & Leak Fix",
        "price": 399,
        "duration": "40 mins"
      },
      {
        "id": "s-103-2",
        "name": "Bathroom Tap / Mixer Installation",
        "price": 299,
        "duration": "30 mins"
      },
      {
        "id": "s-103-3",
        "name": "Drainage & Clog Blockage Clearance",
        "price": 499,
        "duration": "45 mins"
      },
      {
        "id": "s-103-4",
        "name": "Overhead Water Tank Deep Cleaning",
        "price": 999,
        "duration": "90 mins"
      }
    ],
    "offer": "Free plumbing inspection with every major repair",
    "description": "Emergency licensed plumbers on standby 24 hours a day for water seepage, pipe bursts, bathroom fittings, and motor repairs with prompt response.",
    "reviews": [
      {
        "author": "Rahul Nair",
        "rating": 5,
        "date": "Today",
        "verifiedBooking": true,
        "comment": "Called at 11 PM for a burst kitchen pipe. Plumber reached in 20 minutes with tools and replacement valves."
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-104",
    "name": "Meghana Biryani & Coastal Kitchen",
    "category": "food",
    "subcategory": "Biryani & North Indian",
    "city": "Bengaluru",
    "locality": "Koramangala 5th Block",
    "rating": 4.7,
    "reviewsCount": 1420,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "11:30 AM - 11:30 PM",
    "startingPrice": 280,
    "priceRange": "₹₹",
    "responseTime": "~10 min",
    "trustScore": 92,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 1350
    },
    "phone": "+91 80 4110 5566",
    "whatsapp": "918041105566",
    "address": "124, 1st Cross, 5th Block, KHB Colony, Koramangala, Bengaluru 560095",
    "image": "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80",
    "lat": 12.9352,
    "lng": 77.6189,
    "distance": "1.5 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "AC Family Dining",
      "Authentic Andhra Spices",
      "Pure Veg Section Available",
      "Valet Parking"
    ],
    "services": [
      {
        "id": "s-104-1",
        "name": "Special Chicken Boneless Biryani",
        "price": 340,
        "duration": "Serve"
      },
      {
        "id": "s-104-2",
        "name": "Paneer Biryani (Pure Veg)",
        "price": 290,
        "duration": "Serve"
      },
      {
        "id": "s-104-3",
        "name": "Apollo Fish Fry",
        "price": 360,
        "duration": "Serve"
      },
      {
        "id": "s-104-4",
        "name": "Table Reservation (Up to 6 People)",
        "price": 0,
        "duration": "Reservation"
      }
    ],
    "offer": "Free Dessert with family feast orders above ₹1200",
    "description": "Iconic South Indian culinary landmark famed for spicy Andhra style biryani, tender coastal gravies, and delicious vegetarian platters.",
    "reviews": [
      {
        "author": "Sunil Rao",
        "rating": 5,
        "date": "3 days ago",
        "verifiedBooking": true,
        "comment": "The boneless chicken biryani is unbeatable in Bengaluru. Super quick service even on Sunday rush."
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-105",
    "name": "Sutra Unisex Salon & Luxury Spa",
    "category": "salon",
    "subcategory": "Unisex Salons",
    "city": "Bengaluru",
    "locality": "Whitefield Main Road",
    "rating": 4.8,
    "reviewsCount": 420,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "10:00 AM - 9:00 PM",
    "startingPrice": 299,
    "priceRange": "₹₹",
    "responseTime": "~12 min",
    "trustScore": 93,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 405
    },
    "phone": "+91 98450 88990",
    "whatsapp": "919845088990",
    "address": "Sigma Soft Tech Park, Varthur Kodi, Whitefield, Bengaluru 560066",
    "image": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    "lat": 12.9698,
    "lng": 77.7499,
    "distance": "3.4 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "L'Oréal & Kerastase Products",
      "Private Spa Suites",
      "Beverage Bar",
      "Zero Wait Booking"
    ],
    "services": [
      {
        "id": "s-105-1",
        "name": "Designer Haircut & Blow Dry",
        "price": 499,
        "duration": "40 mins"
      },
      {
        "id": "s-105-2",
        "name": "Keratin Hair Spa & Treatment",
        "price": 1899,
        "duration": "60 mins"
      },
      {
        "id": "s-105-3",
        "name": "Detox Charcoal Facial & Glow",
        "price": 1499,
        "duration": "50 mins"
      },
      {
        "id": "s-105-4",
        "name": "Swedish Full Body Aromatherapy Massage",
        "price": 2199,
        "duration": "60 mins"
      }
    ],
    "offer": "Flat 25% OFF for first-time LocalCare bookings",
    "description": "High-end styling and wellness lounge offering certified hair stylists, rejuvenating therapies, bridal glow packages, and organic hair care.",
    "reviews": [
      {
        "author": "Divya Krishnan",
        "rating": 5,
        "date": "Last week",
        "verifiedBooking": true,
        "comment": "Loved the ambiance and my stylist Maya gave me the exact layered cut I requested!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-106",
    "name": "SparkleClean Deep Cleaning & Pest Solutions",
    "category": "cleaning",
    "subcategory": "Deep Home Cleaning",
    "city": "Bengaluru",
    "locality": "Jayanagar 4th Block",
    "rating": 4.9,
    "reviewsCount": 310,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "7:30 AM - 8:30 PM",
    "startingPrice": 699,
    "priceRange": "₹₹",
    "responseTime": "~8 min",
    "trustScore": 97,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 300
    },
    "phone": "+91 98450 33221",
    "whatsapp": "919845033221",
    "address": "33, 11th Main Rd, 4th Block, Jayanagar, Bengaluru 560011",
    "image": "https://images.unsplash.com/photo-1581579186913-45ac3e6efe93?auto=format&fit=crop&w=800&q=80",
    "lat": 12.9299,
    "lng": 77.5833,
    "distance": "2.5 km",
    "homeService": true,
    "onlineBooking": true,
    "features": [
      "Eco-Friendly Herbal Chemicals",
      "Industrial Buffing Machines",
      "Govt Approved Pest License",
      "Free Follow-up"
    ],
    "services": [
      {
        "id": "s-106-1",
        "name": "Bathroom Intensive Scrub & Descaling",
        "price": 699,
        "duration": "60 mins"
      },
      {
        "id": "s-106-2",
        "name": "Full Home Deep Cleaning (2 BHK)",
        "price": 2899,
        "duration": "240 mins"
      },
      {
        "id": "s-106-3",
        "name": "Anti-Termite & Cockroach Gel Treatment",
        "price": 1199,
        "duration": "75 mins"
      },
      {
        "id": "s-106-4",
        "name": "Sofa & Fabric Mattress Shampooing",
        "price": 899,
        "duration": "60 mins"
      }
    ],
    "offer": "₹300 Cashback on Full Home Deep Cleaning",
    "description": "Expert residential and commercial cleaning crew equipped with high-grade vacuum cleaners, steam sanitizers, and non-toxic herbal pest treatments.",
    "reviews": [
      {
        "author": "Deepak Mohan",
        "rating": 5,
        "date": "Yesterday",
        "verifiedBooking": true,
        "comment": "Transformed our 3BHK before housewarming. Bathrooms look like a 5-star hotel now!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1581579186913-45ac3e6efe93?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-107",
    "name": "LifeCare 24/7 Ambulance & Emergency Trauma Hospital",
    "category": "emergency",
    "subcategory": "24/7 Ambulance",
    "city": "Bengaluru",
    "locality": "Koramangala 1st Block",
    "rating": 4.9,
    "reviewsCount": 780,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "24 Hours Open",
    "startingPrice": 999,
    "priceRange": "₹₹",
    "responseTime": "~3 min",
    "trustScore": 99,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 760
    },
    "phone": "+91 80 2553 0000",
    "whatsapp": "918025530000",
    "address": "Near Wipro Park, 80 Feet Road, 1st Block Koramangala, Bengaluru 560034",
    "image": "https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=800&q=80",
    "lat": 12.9279,
    "lng": 77.6271,
    "distance": "0.6 km",
    "homeService": true,
    "onlineBooking": true,
    "features": [
      "GPS Tracked ACLS Ambulances",
      "ICU on Wheels with Ventilators",
      "24/7 Blood Bank Onsite",
      "Emergency Triage Doctors"
    ],
    "services": [
      {
        "id": "s-107-1",
        "name": "Emergency ICU / Ventilator Ambulance",
        "price": 2499,
        "duration": "Immediate Dispatch"
      },
      {
        "id": "s-107-2",
        "name": "Basic Life Support (BLS) Ambulance",
        "price": 999,
        "duration": "Immediate Dispatch"
      },
      {
        "id": "s-107-3",
        "name": "Emergency Physician Consultation (ER)",
        "price": 750,
        "duration": "Immediate"
      },
      {
        "id": "s-107-4",
        "name": "24/7 Pharmacy Urgent Home Delivery",
        "price": 99,
        "duration": "30 mins"
      }
    ],
    "offer": "Zero response delay protocol under 10 minutes",
    "description": "Premier Level-1 emergency trauma care facility with synchronized GPS ambulance dispatch, certified paramedics, emergency ICU, and 24/7 life-support fleet.",
    "reviews": [
      {
        "author": "Meera Shenoy",
        "rating": 5,
        "date": "4 days ago",
        "verifiedBooking": true,
        "comment": "Ambulance arrived within 9 minutes when my father had breathing distress. Paramedics were calm, skilled, and saved his life."
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-201",
    "name": "Mangalore Care PolyClinic & Derma Center",
    "category": "health",
    "subcategory": "Dermatologists",
    "city": "Mangaluru",
    "locality": "Valachil",
    "rating": 4.9,
    "reviewsCount": 215,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 8:30 PM",
    "startingPrice": 400,
    "priceRange": "₹",
    "responseTime": "~5 min",
    "trustScore": 97,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 205
    },
    "phone": "+91 824 227 4500",
    "whatsapp": "918242274500",
    "address": "Near Sahyadri Campus, NH 75, Valachil, Mangaluru, Karnataka 575029",
    "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    "lat": 12.8682,
    "lng": 74.9248,
    "distance": "0.4 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Top MD Dermatologists",
      "Acne & Skin Laser Treatment",
      "Walk-ins & Online Booking",
      "Student Discount Available"
    ],
    "services": [
      {
        "id": "s-201-1",
        "name": "Dermatologist Specialist Consultation",
        "price": 400,
        "duration": "20 mins"
      },
      {
        "id": "s-201-2",
        "name": "Clinical Acne & Scar Laser Session",
        "price": 1499,
        "duration": "45 mins"
      },
      {
        "id": "s-201-3",
        "name": "Full Body Health & Blood Panel",
        "price": 899,
        "duration": "15 mins"
      },
      {
        "id": "s-201-4",
        "name": "General Physician Consultation",
        "price": 300,
        "duration": "15 mins"
      }
    ],
    "offer": "Free follow-up checkup within 7 days",
    "description": "Trusted multi-speciality medical and dermatology center in Valachil, Mangaluru. Helmed by renowned skin specialists, pediatricians, and internal medicine doctors.",
    "reviews": [
      {
        "author": "Chethan Alva",
        "rating": 5,
        "date": "2 days ago",
        "verifiedBooking": true,
        "comment": "Dr. Shruti diagnosed my skin allergy in minutes. Very reasonable consultation fee and friendly clinic staff near Valachil."
      },
      {
        "author": "Sharath Shetty",
        "rating": 5,
        "date": "1 week ago",
        "verifiedBooking": true,
        "comment": "Clean, modern facility right near Sahyadri college. No long waiting lines with LocalCare booking."
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512290900672-1f55b9e078c1?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-202",
    "name": "Coastal Cool AC Repair & Electrical Works",
    "category": "electrical",
    "subcategory": "AC Repair & Gas Refill",
    "city": "Mangaluru",
    "locality": "Valachil",
    "rating": 4.8,
    "reviewsCount": 168,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "8:30 AM - 9:00 PM",
    "startingPrice": 349,
    "priceRange": "₹",
    "responseTime": "~7 min",
    "trustScore": 94,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 160
    },
    "phone": "+91 94801 22334",
    "whatsapp": "919480122334",
    "address": "Main Road, Valachil Junction, Mangaluru 575029",
    "image": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
    "lat": 12.8695,
    "lng": 74.9221,
    "distance": "0.6 km",
    "homeService": true,
    "onlineBooking": true,
    "features": [
      "Available Today Guaranteed",
      "Anti-Rust Coating for Coastal Weather",
      "Genuine Spare Parts",
      "Doorstep in 30 Mins"
    ],
    "services": [
      {
        "id": "s-202-1",
        "name": "Coastal Anti-Corrosion AC Foam Wash",
        "price": 499,
        "duration": "45 mins"
      },
      {
        "id": "s-202-2",
        "name": "Split AC Gas Top-Up & Cooling Fix",
        "price": 1650,
        "duration": "60 mins"
      },
      {
        "id": "s-202-3",
        "name": "Inverter & Home Wiring Repair",
        "price": 299,
        "duration": "30 mins"
      },
      {
        "id": "s-202-4",
        "name": "Refrigerator Gas & Thermostat Fix",
        "price": 599,
        "duration": "45 mins"
      }
    ],
    "offer": "Free electrical safety audit with every AC repair",
    "description": "Specialized in combating coastal humidity and salt-air corrosion for split and window ACs. Servicing Valachil, Farangipete, Adyar, and Padil areas with same-day technicians.",
    "reviews": [
      {
        "author": "Praveen Poojary",
        "rating": 5,
        "date": "Yesterday",
        "verifiedBooking": true,
        "comment": "Technician reached our house in Valachil within 30 minutes! AC was blowing warm air and he recharged the refrigerant quickly."
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-203",
    "name": "Machali Seafood & Coastal Dining",
    "category": "food",
    "subcategory": "Casual Dining",
    "city": "Mangaluru",
    "locality": "Kadri",
    "rating": 4.9,
    "reviewsCount": 2210,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "11:30 AM - 10:30 PM",
    "startingPrice": 220,
    "priceRange": "₹₹",
    "responseTime": "~8 min",
    "trustScore": 98,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 2150
    },
    "phone": "+91 824 244 8899",
    "whatsapp": "918242448899",
    "address": "Near Kadri Temple Road, Kadri, Mangaluru 575002",
    "image": "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
    "lat": 12.8885,
    "lng": 74.8582,
    "distance": "3.1 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Fresh Daily Sea Catch",
      "Authentic Ghee Roast",
      "Pure Ghee Dosas",
      "AC Family Hall"
    ],
    "services": [
      {
        "id": "s-203-1",
        "name": "Anjal (King Fish) Tawa Fry / Masala",
        "price": 380,
        "duration": "Serve"
      },
      {
        "id": "s-203-2",
        "name": "Mangalorean Prawn Ghee Roast",
        "price": 420,
        "duration": "Serve"
      },
      {
        "id": "s-203-3",
        "name": "Traditional Fish Curry Meals with Rice",
        "price": 220,
        "duration": "Serve"
      },
      {
        "id": "s-203-4",
        "name": "Paneer Kundapuri Ghee Roast (Veg)",
        "price": 290,
        "duration": "Serve"
      }
    ],
    "offer": "Complimentary Sol Kadi drink with any fish thali",
    "description": "The legendary culinary institution of Mangalore, beloved for pristine seafood caught fresh every dawn, fiery Kundapur ghee roasts, and soothing coastal fish curries.",
    "reviews": [
      {
        "author": "Aditi Pai",
        "rating": 5,
        "date": "3 days ago",
        "verifiedBooking": true,
        "comment": "Best Anjal tawa fry on planet earth. Tender fish, aromatic spices, and lightning fast service!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-204",
    "name": "Valachil Pro Plumbers & Borewell Services",
    "category": "home",
    "subcategory": "Plumbers",
    "city": "Mangaluru",
    "locality": "Valachil",
    "rating": 4.8,
    "reviewsCount": 142,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "24 Hours Open",
    "startingPrice": 300,
    "priceRange": "₹",
    "responseTime": "~6 min",
    "trustScore": 93,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 135
    },
    "phone": "+91 97412 88991",
    "whatsapp": "919741288991",
    "address": "Near Valachil Bridge, Mangalore-Bangalore Highway, Valachil 575029",
    "image": "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
    "lat": 12.8712,
    "lng": 74.9215,
    "distance": "0.3 km",
    "homeService": true,
    "onlineBooking": true,
    "features": [
      "Available Now in 20 Mins",
      "Submersible Pump Specialists",
      "Bathroom Fitting Experts",
      "Bilingual (Kannada, Tulu, English)"
    ],
    "services": [
      {
        "id": "s-204-1",
        "name": "Water Leakage & Tap Replacement",
        "price": 300,
        "duration": "30 mins"
      },
      {
        "id": "s-204-2",
        "name": "Borewell & Motor Pump Repair",
        "price": 650,
        "duration": "60 mins"
      },
      {
        "id": "s-204-3",
        "name": "Drainage Pipe Cleaning & Unclogging",
        "price": 450,
        "duration": "40 mins"
      },
      {
        "id": "s-204-4",
        "name": "Water Tank Level Sensor Installation",
        "price": 550,
        "duration": "45 mins"
      }
    ],
    "offer": "₹100 OFF on full bathroom plumbing overhauls",
    "description": "Expert local plumbing team based right in Valachil. Prompt assistance for homes, student hostels, and businesses across Valachil, Adyar, and Padil.",
    "reviews": [
      {
        "author": "Gautham Shenoy",
        "rating": 5,
        "date": "1 week ago",
        "verifiedBooking": true,
        "comment": "Our hostel bathroom pipe started gushing water at 8 PM. They arrived in 15 minutes and fixed it completely."
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-205",
    "name": "Mangalore 24/7 Roadside Assistance & Car Towing",
    "category": "auto",
    "subcategory": "24/7 Roadside Towing",
    "city": "Mangaluru",
    "locality": "Hampankatta",
    "rating": 4.8,
    "reviewsCount": 310,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "24 Hours Open",
    "startingPrice": 799,
    "priceRange": "₹₹",
    "responseTime": "~4 min",
    "trustScore": 96,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 295
    },
    "phone": "+91 824 242 1100",
    "whatsapp": "918242421100",
    "address": "K.S. Rao Road, Hampankatta, Mangaluru 575001",
    "image": "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80",
    "lat": 12.8698,
    "lng": 74.8431,
    "distance": "4.2 km",
    "homeService": true,
    "onlineBooking": true,
    "features": [
      "Flatbed Hydraulic Tow Trucks",
      "Highway Rescue NH 66 & NH 75",
      "Onsite Jumpstart & Battery",
      "Tyre Puncture Mobile Van"
    ],
    "services": [
      {
        "id": "s-205-1",
        "name": "Flatbed Vehicle Towing (Up to 10 km)",
        "price": 1499,
        "duration": "Immediate Dispatch"
      },
      {
        "id": "s-205-2",
        "name": "Battery Dead Jumpstart & Voltage Check",
        "price": 499,
        "duration": "20 mins"
      },
      {
        "id": "s-205-3",
        "name": "On-spot Tubeless Tyre Puncture Fix",
        "price": 349,
        "duration": "20 mins"
      },
      {
        "id": "s-205-4",
        "name": "Emergency Fuel Delivery (5 Litres)",
        "price": 399,
        "duration": "25 mins"
      }
    ],
    "offer": "Free battery health checkup with towing assistance",
    "description": "24/7 emergency roadside rescue fleet operating across Mangaluru, Surathkal, Valachil, Ullal, and national highway corridors.",
    "reviews": [
      {
        "author": "Rohan D'Souza",
        "rating": 5,
        "date": "5 days ago",
        "verifiedBooking": true,
        "comment": "Car broke down on NH 75 near Valachil at midnight. Tow truck reached in 22 minutes. Saved my family great stress."
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-301",
    "name": "Bandra Smiles Dental Boutique",
    "category": "health",
    "subcategory": "Dentists",
    "city": "Mumbai",
    "locality": "Bandra West",
    "rating": 4.9,
    "reviewsCount": 620,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:30 AM - 9:30 PM",
    "startingPrice": 600,
    "priceRange": "₹₹₹",
    "responseTime": "~5 min",
    "trustScore": 98,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 600
    },
    "phone": "+91 22 2640 1234",
    "whatsapp": "912226401234",
    "address": "Linking Road, Near Khar Telephone Exchange, Bandra West, Mumbai 400052",
    "image": "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
    "lat": 19.0596,
    "lng": 72.8295,
    "distance": "1.1 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Celebrity Smile Makeovers",
      "Invisalign Diamond Provider",
      "Laser Teeth Whitening",
      "Zero-Interest EMI"
    ],
    "services": [
      {
        "id": "s-301-1",
        "name": "Complete Dental & Cosmetic Checkup",
        "price": 600,
        "duration": "30 mins"
      },
      {
        "id": "s-301-2",
        "name": "Invisalign Digital Alignment Scan",
        "price": 999,
        "duration": "40 mins"
      },
      {
        "id": "s-301-3",
        "name": "Zoom Advanced Laser Teeth Whitening",
        "price": 5499,
        "duration": "60 mins"
      },
      {
        "id": "s-301-4",
        "name": "Porcelain Veneer Consultation",
        "price": 1200,
        "duration": "45 mins"
      }
    ],
    "offer": "Free 3D Smile Simulation Scan on first appointment",
    "description": "State-of-the-art cosmetic and restorative dental studio in Bandra West, renowned for painless procedures, gentle doctors, and celebrity smile transformations.",
    "reviews": [
      {
        "author": "Natasha Poonawalla",
        "rating": 5,
        "date": "3 days ago",
        "verifiedBooking": true,
        "comment": "World-class clinic! Dr. Roy made me feel at ease, and the laser teeth whitening was brilliant."
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-302",
    "name": "Bombay Auto Pro Garage & Detailing",
    "category": "auto",
    "subcategory": "Car Wash & Detailing",
    "city": "Mumbai",
    "locality": "Andheri East",
    "rating": 4.8,
    "reviewsCount": 480,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "8:30 AM - 8:30 PM",
    "startingPrice": 499,
    "priceRange": "₹₹",
    "responseTime": "~8 min",
    "trustScore": 94,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 460
    },
    "phone": "+91 98200 44332",
    "whatsapp": "919820044332",
    "address": "Saki Naka Metro Station Road, Andheri East, Mumbai 400072",
    "image": "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",
    "lat": 19.1136,
    "lng": 72.8697,
    "distance": "2.3 km",
    "homeService": true,
    "onlineBooking": true,
    "features": [
      "Ceramic Coating Experts",
      "Free Doorstep Pickup & Drop",
      "Computerized Engine Diagnostics",
      "Genuine Bosch Parts"
    ],
    "services": [
      {
        "id": "s-302-1",
        "name": "Foam Wash & Interior Vacuuming",
        "price": 499,
        "duration": "45 mins"
      },
      {
        "id": "s-302-2",
        "name": "Comprehensive Periodic Car Service",
        "price": 2999,
        "duration": "180 mins"
      },
      {
        "id": "s-302-3",
        "name": "9H Ceramic Coating Protection",
        "price": 9999,
        "duration": "360 mins"
      },
      {
        "id": "s-302-4",
        "name": "AC Disinfection & Evaporator Cleaning",
        "price": 999,
        "duration": "45 mins"
      }
    ],
    "offer": "Free 40-Point Car Health Inspection with every foam wash",
    "description": "Modern multi-brand automobile workshop offering computerized engine scanning, 3M ceramic detailing, periodic maintenance, and bumper repairs.",
    "reviews": [
      {
        "author": "Farhan Merchant",
        "rating": 5,
        "date": "1 week ago",
        "verifiedBooking": true,
        "comment": "Pickup and drop was right on schedule. Car drives like brand new after the periodic service!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-401",
    "name": "Delhi 24/7 Master Plumbers & Drain Jetting",
    "category": "home",
    "subcategory": "Plumbers",
    "city": "Delhi NCR",
    "locality": "Connaught Place",
    "rating": 4.8,
    "reviewsCount": 395,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "24 Hours Open",
    "startingPrice": 399,
    "priceRange": "₹",
    "responseTime": "~6 min",
    "trustScore": 95,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 380
    },
    "phone": "+91 11 2334 5566",
    "whatsapp": "911123345566",
    "address": "Block E, Inner Circle, Connaught Place, New Delhi 110001",
    "image": "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80",
    "lat": 28.6315,
    "lng": 77.2167,
    "distance": "1.4 km",
    "homeService": true,
    "onlineBooking": true,
    "features": [
      "High-Pressure Sewer Jetting",
      "Zero Pipe Breakage Repair",
      "Commercial & Residential",
      "Standardized Pricing"
    ],
    "services": [
      {
        "id": "s-401-1",
        "name": "Kitchen & Bathroom Tap Repair",
        "price": 399,
        "duration": "30 mins"
      },
      {
        "id": "s-401-2",
        "name": "Clogged Sewer Jetting Clearance",
        "price": 899,
        "duration": "60 mins"
      },
      {
        "id": "s-401-3",
        "name": "Geyser & Water Heater Installation",
        "price": 499,
        "duration": "40 mins"
      },
      {
        "id": "s-401-4",
        "name": "Submersible Water Motor Overhaul",
        "price": 799,
        "duration": "60 mins"
      }
    ],
    "offer": "Flat ₹100 OFF for first-time Delhi bookings",
    "description": "Fastest responding licensed master plumbers covering Central Delhi, South Delhi, and NCR corridors with industrial snake jetters and leak locator tech.",
    "reviews": [
      {
        "author": "Manish Tyagi",
        "rating": 5,
        "date": "Yesterday",
        "verifiedBooking": true,
        "comment": "Unclogged our main bathroom sewer line cleanly in 30 minutes. Transparent pricing with no extra demands."
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-402",
    "name": "Gurgaon AC Master Cool & Heating Systems",
    "category": "electrical",
    "subcategory": "AC Repair & Gas Refill",
    "city": "Delhi NCR",
    "locality": "Cyber Hub Gurgaon",
    "rating": 4.9,
    "reviewsCount": 540,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "8:00 AM - 10:00 PM",
    "startingPrice": 450,
    "priceRange": "₹₹",
    "responseTime": "~5 min",
    "trustScore": 97,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 520
    },
    "phone": "+91 124 455 6677",
    "whatsapp": "911244556677",
    "address": "DLF Cyber City, Phase 2, Sector 24, Gurugram, Haryana 122002",
    "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
    "lat": 28.495,
    "lng": 77.0895,
    "distance": "1.9 km",
    "homeService": true,
    "onlineBooking": true,
    "features": [
      "Inverter PCB Repair Specialists",
      "Ductable & VRV AC Experts",
      "Environmentally Safe Gas",
      "30-Day Guarantee"
    ],
    "services": [
      {
        "id": "s-402-1",
        "name": "Power Jet Wash AC Deep Service",
        "price": 499,
        "duration": "45 mins"
      },
      {
        "id": "s-402-2",
        "name": "R32 / R410A Refrigerant Refill",
        "price": 1999,
        "duration": "60 mins"
      },
      {
        "id": "s-402-3",
        "name": "Inverter PCB Board Diagnostics & Repair",
        "price": 1299,
        "duration": "75 mins"
      },
      {
        "id": "s-402-4",
        "name": "New AC Installation & Copper Piping",
        "price": 1199,
        "duration": "90 mins"
      }
    ],
    "offer": "Free indoor air filter sanitization with every full service",
    "description": "Top-tier HVAC engineering team trusted by corporate offices and residences in Gurugram and South Delhi for precision climate repair.",
    "reviews": [
      {
        "author": "Tanvi Khanna",
        "rating": 5,
        "date": "2 days ago",
        "verifiedBooking": true,
        "comment": "Technician reached our DLF apartment in 20 minutes. Diagnosed the inverter PCB fault quickly and repaired it same day."
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-501",
    "name": "Bawarchi Spice & Nizami Biryani Palace",
    "category": "food",
    "subcategory": "Biryani & North Indian",
    "city": "Hyderabad",
    "locality": "Gachibowli",
    "rating": 4.8,
    "reviewsCount": 1850,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "11:00 AM - 11:30 PM",
    "startingPrice": 260,
    "priceRange": "₹₹",
    "responseTime": "~9 min",
    "trustScore": 94,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 1780
    },
    "phone": "+91 40 2311 7788",
    "whatsapp": "914023117788",
    "address": "Near Bio-Diversity Junction, Gachibowli, Hyderabad 500081",
    "image": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80",
    "lat": 17.4399,
    "lng": 78.3607,
    "distance": "1.0 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Authentic Dum Cooking in Copper Handis",
      "Mirchi Ka Salan & Dahi Chutney",
      "Private Banquet for 50+",
      "Pure Veg Handi"
    ],
    "services": [
      {
        "id": "s-501-1",
        "name": "Nizami Mutton Dum Biryani (Full)",
        "price": 390,
        "duration": "Serve"
      },
      {
        "id": "s-501-2",
        "name": "Special Chicken Dum Biryani",
        "price": 310,
        "duration": "Serve"
      },
      {
        "id": "s-501-3",
        "name": "Paneer Zafrani Dum Biryani (Veg)",
        "price": 260,
        "duration": "Serve"
      },
      {
        "id": "s-501-4",
        "name": "Double Ka Meetha & Shahi Tukda",
        "price": 120,
        "duration": "Serve"
      }
    ],
    "offer": "Free Dessert Platter for tables reserved via LocalCare",
    "description": "Celebrated Nizami feast destination in Gachibowli serving long-grain basmati biryani slow-cooked over wood charcoal embers.",
    "reviews": [
      {
        "author": "Syed Aslam",
        "rating": 5,
        "date": "Yesterday",
        "verifiedBooking": true,
        "comment": "The mutton melts in your mouth! Authentic Hyderabadi flavor with exact spice balance."
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-502",
    "name": "CyberClean Home & Tech Disinfection",
    "category": "cleaning",
    "subcategory": "Deep Home Cleaning",
    "city": "Hyderabad",
    "locality": "Hitec City",
    "rating": 4.8,
    "reviewsCount": 380,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "7:00 AM - 9:00 PM",
    "startingPrice": 599,
    "priceRange": "₹₹",
    "responseTime": "~7 min",
    "trustScore": 96,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 360
    },
    "phone": "+91 99890 11223",
    "whatsapp": "919989011223",
    "address": "Madhapur Main Road, Near Inorbit Mall, Hitec City, Hyderabad 500081",
    "image": "https://images.unsplash.com/photo-1581579186913-45ac3e6efe93?auto=format&fit=crop&w=800&q=80",
    "lat": 17.4411,
    "lng": 78.3911,
    "distance": "1.8 km",
    "homeService": true,
    "onlineBooking": true,
    "features": [
      "Hospital-Grade UV Sterilization",
      "Trained Uniformed Crews",
      "Pet Safe Products",
      "Zero Spot Guarantee"
    ],
    "services": [
      {
        "id": "s-502-1",
        "name": "Complete 2BHK Deep Sanitization",
        "price": 2499,
        "duration": "180 mins"
      },
      {
        "id": "s-502-2",
        "name": "Kitchen Chimney & Degreasing",
        "price": 799,
        "duration": "60 mins"
      },
      {
        "id": "s-502-3",
        "name": "Balcony & Glass Window Restoration",
        "price": 499,
        "duration": "40 mins"
      },
      {
        "id": "s-502-4",
        "name": "Odorless Cockroach Pest Control",
        "price": 999,
        "duration": "60 mins"
      }
    ],
    "offer": "Flat 20% OFF on weekend slots",
    "description": "Premier deep cleaning experts for modern high-rise apartments and IT villas across Hyderabad Hitec City corridor.",
    "reviews": [
      {
        "author": "Swati Reddy",
        "rating": 5,
        "date": "3 days ago",
        "verifiedBooking": true,
        "comment": "Super fast, punctual, and cleaned behind heavy wardrobes thoroughly!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1581579186913-45ac3e6efe93?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-601",
    "name": "Koregaon Wellness Clinic & Physio Care",
    "category": "health",
    "subcategory": "Orthopedic",
    "city": "Pune",
    "locality": "Koregaon Park",
    "rating": 4.9,
    "reviewsCount": 310,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "8:30 AM - 8:30 PM",
    "startingPrice": 500,
    "priceRange": "₹₹",
    "responseTime": "~8 min",
    "trustScore": 97,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 300
    },
    "phone": "+91 20 2615 4400",
    "whatsapp": "912026154400",
    "address": "Lane 7, Near South Main Road, Koregaon Park, Pune 411001",
    "image": "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80",
    "lat": 18.5362,
    "lng": 73.8958,
    "distance": "1.2 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Sports Injury Specialists",
      "Ergonomic Posture Rehab",
      "Spine Laser Therapy",
      "Home Physio Available"
    ],
    "services": [
      {
        "id": "s-601-1",
        "name": "Orthopedic & Spine Consultation",
        "price": 500,
        "duration": "30 mins"
      },
      {
        "id": "s-601-2",
        "name": "Advanced Physiotherapy & Ultrasound",
        "price": 750,
        "duration": "45 mins"
      },
      {
        "id": "s-601-3",
        "name": "Dry Needling & Sports Recovery Session",
        "price": 950,
        "duration": "45 mins"
      },
      {
        "id": "s-601-4",
        "name": "Doorstep Home Physiotherapy",
        "price": 1100,
        "duration": "60 mins"
      }
    ],
    "offer": "Free ergonomic desk posture assessment on first visit",
    "description": "Renowned orthopedic and physical rehabilitation center in Koregaon Park catering to athletes, IT professionals, and senior citizens with targeted pain relief.",
    "reviews": [
      {
        "author": "Omkar Kulkarni",
        "rating": 5,
        "date": "1 week ago",
        "verifiedBooking": true,
        "comment": "Cured my chronic lower back stiffness in 4 sessions. Dr. Ketan is phenomenal!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-701",
    "name": "Madras Auto Care & Bike Express",
    "category": "auto",
    "subcategory": "Bike Mechanics",
    "city": "Chennai",
    "locality": "T Nagar",
    "rating": 4.8,
    "reviewsCount": 380,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 299,
    "priceRange": "₹",
    "responseTime": "~6 min",
    "trustScore": 95,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 365
    },
    "phone": "+91 44 2815 6677",
    "whatsapp": "914428156677",
    "address": "Usman Road, Near Panagal Park, T Nagar, Chennai 600017",
    "image": "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
    "lat": 13.0418,
    "lng": 80.2341,
    "distance": "0.9 km",
    "homeService": true,
    "onlineBooking": true,
    "features": [
      "Royal Enfield & Superbike Specialists",
      "Genuine Castrol Oil",
      "Doorstep Breakdown Assistance",
      "Pick & Drop"
    ],
    "services": [
      {
        "id": "s-701-1",
        "name": "Complete 2-Wheeler General Service",
        "price": 499,
        "duration": "90 mins"
      },
      {
        "id": "s-701-2",
        "name": "Synthetic Engine Oil Flush & Change",
        "price": 699,
        "duration": "30 mins"
      },
      {
        "id": "s-701-3",
        "name": "Brake Disc & Pad Replacement",
        "price": 299,
        "duration": "30 mins"
      },
      {
        "id": "s-701-4",
        "name": "Carburetor / EFI Fuel Injection Clean",
        "price": 450,
        "duration": "40 mins"
      }
    ],
    "offer": "Free chain lubrication and water wash with service",
    "description": "Trusted two-wheeler mechanic workshop in T Nagar delivering fast servicing, genuine OEM spares, and roadside breakdown rescue across Chennai.",
    "reviews": [
      {
        "author": "Senthil Murugan",
        "rating": 5,
        "date": "Yesterday",
        "verifiedBooking": true,
        "comment": "Serviced my Classic 350 Royal Enfield. Engine is butter smooth now and vibrations eliminated."
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-801",
    "name": "Heritage City Dental & Orthodontics",
    "category": "health",
    "subcategory": "Dentists",
    "city": "Mysuru",
    "locality": "Gokulam 3rd Stage",
    "rating": 4.9,
    "reviewsCount": 220,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 8:30 PM",
    "startingPrice": 399,
    "priceRange": "₹",
    "responseTime": "~7 min",
    "trustScore": 97,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 215
    },
    "phone": "+91 821 241 8899",
    "whatsapp": "918212418899",
    "address": "Contour Road, Gokulam 3rd Stage, Mysuru, Karnataka 570002",
    "image": "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
    "lat": 12.3312,
    "lng": 76.6341,
    "distance": "1.1 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "German Painless Laser Tech",
      "Children Friendly Operatory",
      "Digital Dental Scans"
    ],
    "services": [
      {
        "id": "s-801-1",
        "name": "Comprehensive Dental Consultation & X-Ray",
        "price": 399,
        "duration": "30 mins"
      },
      {
        "id": "s-801-2",
        "name": "Single-Sitting Rotary Root Canal",
        "price": 2999,
        "duration": "50 mins"
      },
      {
        "id": "s-801-3",
        "name": "Ultrasonic Teeth Scaling & Stain Removal",
        "price": 1299,
        "duration": "40 mins"
      }
    ],
    "offer": "Free digital X-Ray with dental checkup",
    "description": "Trusted family dental practice in Gokulam Mysuru known for gentle painless treatments and modern sterile protocols.",
    "reviews": [
      {
        "author": "Divya Rao",
        "rating": 5,
        "date": "3 days ago",
        "verifiedBooking": true,
        "comment": "Clean, spotless clinic and very gentle treatment. Highly recommended in Gokulam!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-802",
    "name": "Chamundi AC & Electrical Pros",
    "category": "electrical",
    "subcategory": "AC Repair & Gas Refill",
    "city": "Mysuru",
    "locality": "Jayalakshmipuram",
    "rating": 4.8,
    "reviewsCount": 195,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "8:00 AM - 9:00 PM",
    "startingPrice": 349,
    "priceRange": "₹",
    "responseTime": "~10 min",
    "trustScore": 94,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 180
    },
    "phone": "+91 821 251 7733",
    "whatsapp": "918212517733",
    "address": "Kalidasa Road, Jayalakshmipuram, Mysuru 570012",
    "image": "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80",
    "lat": 12.3211,
    "lng": 76.6289,
    "distance": "1.4 km",
    "homeService": true,
    "onlineBooking": true,
    "features": [
      "Doorstep Jet Cleaning",
      "All Brand Inverter ACs",
      "30-Day Cooling Warranty"
    ],
    "services": [
      {
        "id": "s-802-1",
        "name": "Power Jet Split AC Servicing",
        "price": 449,
        "duration": "45 mins"
      },
      {
        "id": "s-802-2",
        "name": "Gas Leakage Repair & Refill",
        "price": 1899,
        "duration": "60 mins"
      }
    ],
    "offer": "₹100 OFF on 2 or more AC units",
    "description": "Expert residential and commercial cooling repair engineers with same-day doorstep response in Jayalakshmipuram and Vijayanagar.",
    "reviews": [
      {
        "author": "Manjunath K",
        "rating": 5,
        "date": "1 week ago",
        "verifiedBooking": true,
        "comment": "Prompt arrival within 40 minutes. Fixed our cooling issue in no time."
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-901",
    "name": "Malabar Coastal Seafood & Grill",
    "category": "food",
    "subcategory": "Seafood",
    "city": "Kochi",
    "locality": "Panampilly Nagar",
    "rating": 4.9,
    "reviewsCount": 420,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "11:30 AM - 11:00 PM",
    "startingPrice": 450,
    "priceRange": "₹₹",
    "responseTime": "~5 min",
    "trustScore": 96,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 410
    },
    "phone": "+91 484 231 9900",
    "whatsapp": "914842319900",
    "address": "Main Avenue, Panampilly Nagar, Kochi, Kerala 682036",
    "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    "lat": 9.9612,
    "lng": 76.2954,
    "distance": "0.8 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Catch of the Day Live Counter",
      "Authentic Malabar Spices",
      "Air Conditioned Family Dining"
    ],
    "services": [
      {
        "id": "s-901-1",
        "name": "Karimeen Pollichathu (Banana Leaf Pearl Spot)",
        "price": 550,
        "duration": "Fresh to Order"
      },
      {
        "id": "s-901-2",
        "name": "Tiger Prawns Roast & Appam Combo",
        "price": 650,
        "duration": "Specialty"
      },
      {
        "id": "s-901-3",
        "name": "Malabar Fish Curry Meals",
        "price": 280,
        "duration": "Lunch Special"
      }
    ],
    "offer": "Free tender coconut pudding with orders above ₹1,000",
    "description": "Iconic authentic coastal dining in Panampilly Nagar celebrating fresh Kerala sea catches and traditional claypot preparations.",
    "reviews": [
      {
        "author": "Rahul Varma",
        "rating": 5,
        "date": "Yesterday",
        "verifiedBooking": true,
        "comment": "Best Karimeen Pollichathu in Kochi! Melt-in-the-mouth flavors and wonderful ambiance."
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-902",
    "name": "Cochin 24/7 Rapid Ambulance & ER Casualty",
    "category": "emergency",
    "subcategory": "24/7 Ambulance",
    "city": "Kochi",
    "locality": "Kakkanad",
    "rating": 5,
    "reviewsCount": 310,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "24 Hours / 7 Days",
    "startingPrice": 999,
    "priceRange": "₹₹",
    "responseTime": "~6 min",
    "trustScore": 99,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 300
    },
    "phone": "+91 484 242 1108",
    "whatsapp": "914842421108",
    "address": "Seaport-Airport Road, Near Infopark, Kakkanad, Kochi 682030",
    "image": "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
    "lat": 10.0123,
    "lng": 76.3541,
    "distance": "0.5 km",
    "homeService": true,
    "onlineBooking": true,
    "features": [
      "Advanced Cardiac Life Support (ACLS)",
      "Ventilator Fitted Ambulances",
      "Sub-8 Min Arrival Kakkanad"
    ],
    "services": [
      {
        "id": "s-902-1",
        "name": "Emergency ICU Advanced Ambulance Dispatch",
        "price": 1499,
        "duration": "Immediate"
      },
      {
        "id": "s-902-2",
        "name": "Hospital Transfer & Oxygen Support",
        "price": 999,
        "duration": "24/7"
      }
    ],
    "offer": "Zero waiting toll-free priority dispatch",
    "description": "Immediate ICU and basic life support ambulance rescue covering Kochi SmartCity, Kakkanad, and Marine Drive.",
    "reviews": [
      {
        "author": "Faisal Mohammed",
        "rating": 5,
        "date": "3 days ago",
        "verifiedBooking": true,
        "comment": "Arrived in literally 7 minutes during a medical emergency at Infopark. God bless the team."
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-1001",
    "name": "Sabarmati Smart Home Repairs & Electricians",
    "category": "electrical",
    "subcategory": "Electricians",
    "city": "Ahmedabad",
    "locality": "SG Highway",
    "rating": 4.8,
    "reviewsCount": 260,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "8:30 AM - 9:30 PM",
    "startingPrice": 299,
    "priceRange": "₹",
    "responseTime": "~8 min",
    "trustScore": 95,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 250
    },
    "phone": "+91 79 2685 1122",
    "whatsapp": "917926851122",
    "address": "Sarkhej - Gandhinagar Hwy, Bodakdev, Ahmedabad, Gujarat 380054",
    "image": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
    "lat": 23.0331,
    "lng": 72.5123,
    "distance": "1.2 km",
    "homeService": true,
    "onlineBooking": true,
    "features": [
      "Licensed Wiremen",
      "Inverter & Solar Grid Checkup",
      "Circuit Breaker Specialists"
    ],
    "services": [
      {
        "id": "s-1001-1",
        "name": "Electrical Short Circuit & Fuse Diagnosis",
        "price": 299,
        "duration": "30 mins"
      },
      {
        "id": "s-1001-2",
        "name": "Ceiling Fan & Chandelier Installation",
        "price": 399,
        "duration": "45 mins"
      },
      {
        "id": "s-1001-3",
        "name": "Inverter Wiring & Battery Servicing",
        "price": 599,
        "duration": "60 mins"
      }
    ],
    "offer": "Free switchboard safety load inspection",
    "description": "Certified electrical contracting and emergency troubleshooting across SG Highway, Bodakdev, and Satellite.",
    "reviews": [
      {
        "author": "Chirag Patel",
        "rating": 5,
        "date": "2 days ago",
        "verifiedBooking": true,
        "comment": "Identified the tripping MCB issue within 10 minutes and repaired it neatly."
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-1002",
    "name": "Swaminarayan Pure Veg Thali & Dining",
    "category": "food",
    "subcategory": "Pure Veg",
    "city": "Ahmedabad",
    "locality": "Satellite",
    "rating": 4.9,
    "reviewsCount": 540,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "11:00 AM - 10:30 PM",
    "startingPrice": 350,
    "priceRange": "₹₹",
    "responseTime": "~5 min",
    "trustScore": 98,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 520
    },
    "phone": "+91 79 2676 4488",
    "whatsapp": "917926764488",
    "address": "Prernatirth Derasar Road, Satellite, Ahmedabad 380015",
    "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    "lat": 23.0212,
    "lng": 72.5289,
    "distance": "0.9 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "100% Pure Ghee Preparations",
      "Unlimited Gujarati Royal Thali",
      "Jain Food Available"
    ],
    "services": [
      {
        "id": "s-1002-1",
        "name": "Royal Gujarati Grand Thali (Unlimited)",
        "price": 380,
        "duration": "Dining"
      },
      {
        "id": "s-1002-2",
        "name": "Special Jain Executive Box",
        "price": 320,
        "duration": "Takeaway"
      }
    ],
    "offer": "10% discount on family table reservations of 4+",
    "description": "Premier traditional vegetarian culinary experience in Satellite, Ahmedabad serving authentic wholesome Gujarati thalis in pure desi ghee.",
    "reviews": [
      {
        "author": "Meera Shah",
        "rating": 5,
        "date": "Yesterday",
        "verifiedBooking": true,
        "comment": "The basundi and puran poli were divine! Exceptional warm hospitality."
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-108",
    "name": "Apex Laptop & MacBook Repair Lab",
    "category": "tech",
    "subcategory": "Laptop & Mobile Repair",
    "city": "Bengaluru",
    "locality": "Koramangala 5th Block",
    "rating": 4.8,
    "reviewsCount": 380,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:30 AM - 8:30 PM",
    "startingPrice": 499,
    "priceRange": "₹₹",
    "responseTime": "~10 min",
    "trustScore": 98,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 360
    },
    "phone": "+91 80 4120 7788",
    "whatsapp": "918041207788",
    "address": "80 Feet Road, Koramangala 5th Block, Bengaluru 560095",
    "image": "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80",
    "lat": 12.9352,
    "lng": 77.6245,
    "distance": "1.2 km",
    "homeService": true,
    "onlineBooking": true,
    "features": [
      "Doorstep Laptop Pickup & Drop",
      "Genuine OEM Spares",
      "90-Day Service Warranty",
      "Chip-Level Lab"
    ],
    "services": [
      {
        "id": "s-108-1",
        "name": "Laptop Motherboard Diagnostics & General Service",
        "price": 499,
        "duration": "45 mins"
      },
      {
        "id": "s-108-2",
        "name": "Thermal Paste Reapplication & Overheating Fix",
        "price": 650,
        "duration": "1 hour"
      },
      {
        "id": "s-108-3",
        "name": "Laptop Screen & Keyboard Replacement Labor",
        "price": 899,
        "duration": "2 hours"
      }
    ],
    "offer": "Free antivirus scan & thermal check with all repairs",
    "description": "Premier chip-level computer and laptop repair center in Koramangala. Certified technicians for Apple MacBook, Dell, HP, Lenovo, and Asus.",
    "reviews": [
      {
        "author": "Rahul Deshmukh",
        "rating": 5,
        "date": "2 days ago",
        "verifiedBooking": true,
        "comment": "Fixed my liquid-damaged MacBook in 4 hours. Super transparent pricing under ₹1000!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-206",
    "name": "Valachil Silicon Tech & Laptop Repair",
    "category": "tech",
    "subcategory": "Laptop & Mobile Repair",
    "city": "Mangaluru",
    "locality": "Valachil",
    "rating": 4.8,
    "reviewsCount": 160,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 7:30 PM",
    "startingPrice": 399,
    "priceRange": "₹",
    "responseTime": "~15 min",
    "trustScore": 95,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 150
    },
    "phone": "+91 824 227 4411",
    "whatsapp": "918242274411",
    "address": "Near Srinivas Campus, Valachil, Mangaluru 574143",
    "image": "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=800&q=80",
    "lat": 12.871,
    "lng": 74.922,
    "distance": "0.4 km",
    "homeService": true,
    "onlineBooking": true,
    "features": [
      "Student Discount Available",
      "Fast 2-Hour Turnaround",
      "Genuine SSD Upgrades"
    ],
    "services": [
      {
        "id": "s-206-1",
        "name": "Laptop OS Tune-up & Virus Removal",
        "price": 399,
        "duration": "1 hour"
      },
      {
        "id": "s-206-2",
        "name": "Laptop Screen Replacement & Hinge Fix",
        "price": 750,
        "duration": "2 hours"
      },
      {
        "id": "s-206-3",
        "name": "Laptop Battery & Adapter Replacement",
        "price": 850,
        "duration": "1 hour"
      }
    ],
    "offer": "15% student discount with valid college ID",
    "description": "Trusted local computer repair lab in Valachil, Mangaluru. Fast repairs for laptops, PCs, printers, and SSD speed upgrades.",
    "reviews": [
      {
        "author": "Farhan Sheikh",
        "rating": 5,
        "date": "1 week ago",
        "verifiedBooking": true,
        "comment": "Saved my laptop right before exams. Highly affordable service in Valachil."
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-803",
    "name": "Mylari Heritage Pure Veg Restaurant",
    "category": "food",
    "subcategory": "Pure Veg",
    "city": "Mysuru",
    "locality": "Gokulam",
    "rating": 4.9,
    "reviewsCount": 3120,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "7:00 AM - 10:00 PM",
    "startingPrice": 120,
    "priceRange": "₹",
    "responseTime": "~5 min",
    "trustScore": 99,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 3000
    },
    "phone": "+91 821 242 1199",
    "whatsapp": "918212421199",
    "address": "Gokulam 3rd Stage, Near Temple Road, Mysuru 570002",
    "image": "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80",
    "lat": 12.332,
    "lng": 76.628,
    "distance": "0.8 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "100% Pure Vegetarian",
      "Mylari Butter Dosa",
      "Pure Filter Coffee",
      "Traditional Plantain Leaf Dining"
    ],
    "services": [
      {
        "id": "s-803-1",
        "name": "Mylari Special Desi Butter Dosa",
        "price": 120,
        "duration": "Dining"
      },
      {
        "id": "s-803-2",
        "name": "South Indian Pure Veg Traditional Thali",
        "price": 160,
        "duration": "Dining"
      },
      {
        "id": "s-803-3",
        "name": "Traditional Degree Filter Coffee",
        "price": 35,
        "duration": "Dining"
      }
    ],
    "offer": "Free piping hot Mysore Pak with every family thali",
    "description": "Iconic pure vegetarian dining institution in Mysuru, celebrated for pristine melt-in-mouth Mylari butter dosas, rich coconut chutneys, and authentic Karnataka filter coffee.",
    "reviews": [
      {
        "author": "Kavitha Rao",
        "rating": 5,
        "date": "Yesterday",
        "verifiedBooking": true,
        "comment": "Hands down the best pure vegetarian dosa in Mysuru. Heavenly taste and very hygienic!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-804",
    "name": "Mysuru TechPro Laptop & Computer Repair",
    "category": "tech",
    "subcategory": "Laptop & Mobile Repair",
    "city": "Mysuru",
    "locality": "Jayalakshmipuram",
    "rating": 4.8,
    "reviewsCount": 220,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:30 AM - 8:00 PM",
    "startingPrice": 450,
    "priceRange": "₹₹",
    "responseTime": "~12 min",
    "trustScore": 96,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 210
    },
    "phone": "+91 821 251 4455",
    "whatsapp": "918212514455",
    "address": "Kalidasa Road, Jayalakshmipuram, Mysuru 570012",
    "image": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    "lat": 12.325,
    "lng": 76.634,
    "distance": "1.4 km",
    "homeService": true,
    "onlineBooking": true,
    "features": [
      "Hardware Diagnostic Bench",
      "Same-Day Service",
      "Genuine Parts"
    ],
    "services": [
      {
        "id": "s-804-1",
        "name": "Laptop Hardware Diagnostics & Servicing",
        "price": 450,
        "duration": "45 mins"
      },
      {
        "id": "s-804-2",
        "name": "Laptop SSD Upgrade & RAM Boost",
        "price": 850,
        "duration": "1 hour"
      }
    ],
    "offer": "₹100 OFF on full laptop servicing",
    "description": "Reliable laptop and desktop computer repairs in Jayalakshmipuram, Mysuru. Specializing in hardware troubleshooting, screen replacements, and OS recovery.",
    "reviews": [
      {
        "author": "Sunil Kumar",
        "rating": 5,
        "date": "3 days ago",
        "verifiedBooking": true,
        "comment": "Quick and honest laptop servicing in Mysuru. Repaired my keyboard within 2 hours."
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-805",
    "name": "Cauvery Master Plumbers & Pipe Fitters",
    "category": "home",
    "subcategory": "Plumbers",
    "city": "Mysuru",
    "locality": "Gokulam",
    "rating": 4.9,
    "reviewsCount": 430,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "24 Hours Open",
    "startingPrice": 299,
    "priceRange": "₹",
    "responseTime": "~8 min",
    "trustScore": 98,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 410
    },
    "phone": "+91 821 241 8899",
    "whatsapp": "918212418899",
    "address": "Near KD Circle, Gokulam 2nd Stage, Mysuru 570002",
    "image": "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
    "lat": 12.331,
    "lng": 76.626,
    "distance": "0.6 km",
    "homeService": true,
    "onlineBooking": true,
    "features": [
      "24/7 Emergency Plumber",
      "Advanced Acoustic Leak Detection",
      "Fixed Rate Card"
    ],
    "services": [
      {
        "id": "s-805-1",
        "name": "Concealed Pipe Leakage Detection & Repair",
        "price": 299,
        "duration": "45 mins"
      },
      {
        "id": "s-805-2",
        "name": "Bathroom Tap, Shower & Mixer Installation",
        "price": 350,
        "duration": "1 hour"
      },
      {
        "id": "s-805-3",
        "name": "Water Tank Deep Cleaning & Disinfection",
        "price": 699,
        "duration": "2 hours"
      }
    ],
    "offer": "Free plumbing inspection with every fixture installation",
    "description": "Top-rated licensed plumbing contractor serving Mysuru for over 15 years. Instant doorstep response for residential and commercial plumbing emergencies.",
    "reviews": [
      {
        "author": "Naveen Prasad",
        "rating": 5,
        "date": "Yesterday",
        "verifiedBooking": true,
        "comment": "Arrived in Gokulam in 15 mins and stopped a major kitchen pipe leakage immediately. Highly professional."
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-113",
    "name": "SafeMove India Packers & Movers",
    "category": "packers",
    "subcategory": "Household Shifting",
    "city": "Bengaluru",
    "locality": "HSR Layout Sector 3",
    "rating": 4.9,
    "reviewsCount": 420,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "24 Hours Open",
    "startingPrice": 3499,
    "priceRange": "₹₹",
    "responseTime": "~5 min",
    "trustScore": 98,
    "yearsInBusiness": 14,
    "enquiriesCount": 310,
    "landmark": "Near BDA Complex, 17th Cross",
    "gst": "29AABCS5521M1ZN",
    "b2b": true,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 420
    },
    "phone": "+91 98450 67112",
    "whatsapp": "919845067112",
    "address": "Plot 74, Sector 3, HSR Layout, Bengaluru 560102",
    "image": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    "photos": [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80"
    ],
    "lat": 12.9125,
    "lng": 77.641,
    "distance": "1.4 km",
    "homeService": true,
    "onlineBooking": true,
    "features": [
      "5-Layer Bubble Packing",
      "Free Transit Insurance",
      "GPS Live Truck Tracking",
      "Zero Damage Guarantee"
    ],
    "services": [
      {
        "id": "s-113-1",
        "name": "1 BHK Complete Home Shifting",
        "price": 3499,
        "duration": "4 hours"
      },
      {
        "id": "s-113-2",
        "name": "2 BHK Household Moving & Unpacking",
        "price": 5999,
        "duration": "6 hours"
      },
      {
        "id": "s-113-3",
        "name": "Two-Wheeler / Bike Transport",
        "price": 2499,
        "duration": "Same Day"
      },
      {
        "id": "s-113-4",
        "name": "Intercity Bangalore to Mumbai/Delhi Relocation",
        "price": 14999,
        "duration": "48 hours"
      }
    ],
    "offer": "Flat ₹500 OFF on weekday shifting with coupon JDPAY50",
    "description": "IBA-approved national packers and movers with 14 years of certified experience. Multi-layer safety packing, hydraulic container trucks, and 24x7 customer support.",
    "reviews": [
      {
        "author": "Gautam Singhal",
        "rating": 5,
        "date": "3 days ago",
        "verifiedBooking": true,
        "comment": "Shifted my 2BHK from HSR to Whitefield. Not a single scratch on my glassware or 65-inch TV! Superb crew."
      }
    ]
  },
  {
    "id": "b-114",
    "name": "National Express Cargo & Movers",
    "category": "packers",
    "subcategory": "Intercity Moving",
    "city": "Mangaluru",
    "locality": "Valachil NH-75",
    "rating": 4.8,
    "reviewsCount": 195,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "7:00 AM - 11:00 PM",
    "startingPrice": 2999,
    "priceRange": "₹₹",
    "responseTime": "~8 min",
    "trustScore": 95,
    "yearsInBusiness": 9,
    "enquiriesCount": 180,
    "landmark": "Next to Srinivas Campus, Valachil",
    "gst": "29AACCN4489K1ZR",
    "b2b": true,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 190
    },
    "phone": "+91 98450 88221",
    "whatsapp": "919845088221",
    "address": "Near Srinivas University, Valachil, Mangaluru 574143",
    "image": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
    "photos": [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
    ],
    "lat": 12.8715,
    "lng": 74.9255,
    "distance": "0.5 km",
    "homeService": true,
    "onlineBooking": true,
    "features": [
      "Valachil Local Specialist",
      "Interstate Closed Container",
      "College Student Discount",
      "Secure Warehouse"
    ],
    "services": [
      {
        "id": "s-114-1",
        "name": "Valachil Local Room/Flat Shifting",
        "price": 2999,
        "duration": "3 hours"
      },
      {
        "id": "s-114-2",
        "name": "Mangaluru to Bengaluru Express Moving",
        "price": 7499,
        "duration": "24 hours"
      },
      {
        "id": "s-114-3",
        "name": "Secure Monthly Luggage & Furniture Storage",
        "price": 1499,
        "duration": "Per Month"
      }
    ],
    "offer": "Special student shifting package at flat ₹1,999 in Valachil",
    "description": "Mangaluru and Valachil trusted transport and packing specialists. Over 9 years providing safe domestic relocations, vehicle carriers, and student room shifting.",
    "reviews": [
      {
        "author": "Pranav Shetty",
        "rating": 5,
        "date": "1 week ago",
        "verifiedBooking": true,
        "comment": "Moved all my luggage from Valachil campus to Hampankatta. Extremely punctual and polite staff."
      }
    ]
  },
  {
    "id": "b-115",
    "name": "Apex Industrial Tools & B2B Wholesale",
    "category": "b2b",
    "subcategory": "Industrial Tools",
    "city": "Bengaluru",
    "locality": "Peenya Industrial Area",
    "rating": 4.9,
    "reviewsCount": 310,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 7:30 PM",
    "startingPrice": 1200,
    "priceRange": "₹₹₹",
    "responseTime": "~10 min",
    "trustScore": 97,
    "yearsInBusiness": 18,
    "enquiriesCount": 450,
    "landmark": "Near Peenya Metro, Phase 1",
    "gst": "29AABCA9912P1ZL",
    "b2b": true,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 310
    },
    "phone": "+91 98450 99334",
    "whatsapp": "919845099334",
    "address": "Phase 1, Peenya Industrial Area, Bengaluru 560058",
    "image": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
    "photos": [
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
    ],
    "lat": 13.0285,
    "lng": 77.5255,
    "distance": "3.2 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "GST Tax Invoices",
      "Wholesale Bulk Discount",
      "Authorised Bosch & Makita Distributor",
      "Same-Day Dispatch"
    ],
    "services": [
      {
        "id": "s-115-1",
        "name": "Bosch Professional Rotary Hammer (MOQ 5)",
        "price": 4999,
        "duration": "Bulk Delivery"
      },
      {
        "id": "s-115-2",
        "name": "Complete Factory Industrial Safety Helmet & Shoe Kit",
        "price": 1200,
        "duration": "Bulk Pack"
      },
      {
        "id": "s-115-3",
        "name": "Commercial 50L Air Compressor Unit",
        "price": 14500,
        "duration": "24 hours"
      }
    ],
    "offer": "Extra 8% discount on bulk orders above ₹25,000 via LocalCare Mart",
    "description": "Leading South India distributor for industrial machine tools, pneumatic equipment, safety gear, and hardware supplies with 18 years of wholesale leadership.",
    "reviews": [
      {
        "author": "Manish Agarwal",
        "rating": 5,
        "date": "2 days ago",
        "verifiedBooking": true,
        "comment": "Received 20 units of power tools delivered to our Whitefield factory in 4 hours with proper GST bill."
      }
    ]
  },
  {
    "id": "b-116",
    "name": "Karnataka Bulk Medical Supplies & Labs",
    "category": "b2b",
    "subcategory": "Bulk Medical Supplies",
    "city": "Mangaluru",
    "locality": "Hampankatta Market",
    "rating": 4.8,
    "reviewsCount": 215,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "8:30 AM - 8:30 PM",
    "startingPrice": 850,
    "priceRange": "₹₹",
    "responseTime": "~6 min",
    "trustScore": 96,
    "yearsInBusiness": 11,
    "enquiriesCount": 220,
    "landmark": "Opp. Milagres Church, Hampankatta",
    "gst": "29AABCK3114R1ZH",
    "b2b": true,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 210
    },
    "phone": "+91 98450 44119",
    "whatsapp": "919845044119",
    "address": "Light House Hill Road, Hampankatta, Mangaluru 575001",
    "image": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    "photos": [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80"
    ],
    "lat": 12.87,
    "lng": 74.842,
    "distance": "1.1 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Hospital & Clinic Wholesale",
      "CE & ISO Certified Items",
      "Cold Chain Delivery",
      "Bulk Credit Available"
    ],
    "services": [
      {
        "id": "s-116-1",
        "name": "Nitrile Examination Gloves Bulk Box (1000 pcs)",
        "price": 850,
        "duration": "Bulk Supply"
      },
      {
        "id": "s-116-2",
        "name": "Digital Clinical BP Monitor Clinic 5-Pack",
        "price": 1400,
        "duration": "Same Day"
      },
      {
        "id": "s-116-3",
        "name": "Hospital Grade Autoclave Sterilizer Unit",
        "price": 8900,
        "duration": "24 hours"
      }
    ],
    "offer": "Wholesale clinic starter pack at flat 25% OFF",
    "description": "Premier medical, diagnostic, and clinic wholesale distributor supplying major hospitals and nursing homes across coastal Karnataka.",
    "reviews": [
      {
        "author": "Dr. Sharath Rai",
        "rating": 5,
        "date": "4 days ago",
        "verifiedBooking": true,
        "comment": "Our hospital in Mangalore procures all PPE and diagnostic kits from Karnataka Medical. Unmatched wholesale prices."
      }
    ]
  },
  {
    "name": "Max Healthcare Advanced Diagnostics & Lab",
    "category": "health",
    "subcategory": "Diagnostics & Labs",
    "city": "Delhi NCR",
    "locality": "Saket District Centre",
    "rating": 4.9,
    "reviewsCount": 642,
    "startingPrice": 350,
    "priceRange": "₹₹",
    "responseTime": "~10 min",
    "trustScore": 98,
    "phone": "+91 98110 55441",
    "address": "1, Press Enclave Road, Saket, New Delhi 110017",
    "lat": 28.5244,
    "lng": 77.2155,
    "features": [
      "NABL Accredited",
      "Home Sample Collection in 30 Mins",
      "Digital WhatsApp Reports",
      "Smart Health Packages"
    ],
    "services": [
      {
        "id": "s-h-1",
        "name": "Comprehensive Full Body Blood Profile (68 Tests)",
        "price": 999,
        "duration": "20 mins"
      },
      {
        "id": "s-h-2",
        "name": "HbA1c & Fasting Glucose Screening",
        "price": 350,
        "duration": "15 mins"
      },
      {
        "id": "s-h-3",
        "name": "Thyroid Panel (T3, T4, TSH)",
        "price": 450,
        "duration": "15 mins"
      }
    ],
    "offer": "Flat 50% OFF on Full Body Health Checkup today",
    "description": "Premier diagnostic laboratory center in South Delhi with robotic automated pathology analysers and home phlebotomy visits.",
    "reviews": [
      {
        "author": "Meera Kapoor",
        "rating": 5,
        "date": "Yesterday",
        "verifiedBooking": true,
        "comment": "Phlebotomist came within 25 minutes of booking, painless needle prick, report delivered on WhatsApp by 4 PM!"
      }
    ],
    "id": "b-gen-58",
    "image": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
    "photos": [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "name": "Cloudnine Maternity & Pediatric Clinic",
    "category": "health",
    "subcategory": "Pediatricians",
    "city": "Bengaluru",
    "locality": "Jayanagar 3rd Block",
    "rating": 4.9,
    "reviewsCount": 420,
    "startingPrice": 650,
    "priceRange": "₹₹₹",
    "responseTime": "~5 min",
    "trustScore": 97,
    "phone": "+91 98451 77882",
    "address": "1533, 9th Main, Jayanagar 3rd Block, Bengaluru 560011",
    "lat": 12.9304,
    "lng": 77.5835,
    "features": [
      "Neonatal ICU On-Site",
      "Vaccination Schedule Tracking",
      "24/7 Pediatrician Hotline",
      "Play Area Clinic"
    ],
    "services": [
      {
        "id": "s-h-4",
        "name": "Pediatric General Checkup & Growth Milestone Audit",
        "price": 650,
        "duration": "30 mins"
      },
      {
        "id": "s-h-5",
        "name": "Infant Painless DTaP & Polio Vaccination",
        "price": 1850,
        "duration": "20 mins"
      },
      {
        "id": "s-h-6",
        "name": "Child Allergy & Asthma Consultation",
        "price": 800,
        "duration": "40 mins"
      }
    ],
    "offer": "Free Growth Chart & Digital Health Card with consultation",
    "description": "Specialized maternal and newborn child health center in Jayanagar featuring top pediatricians and child-friendly examination rooms.",
    "reviews": [
      {
        "author": "Suma Prasanna",
        "rating": 5,
        "date": "3 days ago",
        "verifiedBooking": true,
        "comment": "Doctor listened patiently and baby did not even cry during the vaccination. Top class facility."
      }
    ],
    "id": "b-gen-59",
    "image": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    "photos": [
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "name": "Apollo Sugar & Endocrinology Clinic",
    "category": "health",
    "subcategory": "General Physicians",
    "city": "Chennai",
    "locality": "T Nagar",
    "rating": 4.8,
    "reviewsCount": 310,
    "startingPrice": 500,
    "priceRange": "₹₹",
    "responseTime": "~12 min",
    "trustScore": 95,
    "phone": "+91 98401 22334",
    "address": "22, Venkatanarayana Road, T Nagar, Chennai 600017",
    "lat": 13.0418,
    "lng": 80.2341,
    "features": [
      "Diabetic Foot Scan",
      "Continuous Glucose Monitoring (CGM)",
      "Dietitian Diet Plan",
      "Direct Insulin Guidance"
    ],
    "services": [
      {
        "id": "s-h-7",
        "name": "Diabetic Health Audit & HbA1c Consultation",
        "price": 500,
        "duration": "30 mins"
      },
      {
        "id": "s-h-8",
        "name": "Diabetic Neuropathy & Foot Doppler Scan",
        "price": 1200,
        "duration": "45 mins"
      }
    ],
    "offer": "15% OFF for Senior Citizens on all diagnostic packages",
    "description": "Specialized diabetes management and lifestyle reversal clinic in T Nagar, Chennai.",
    "reviews": [
      {
        "author": "S. Ramanathan",
        "rating": 5,
        "date": "1 week ago",
        "verifiedBooking": true,
        "comment": "Dr. Jayashree brought my HbA1c from 9.2 to 6.8 in three months with customized diet. Remarkable!"
      }
    ],
    "id": "b-gen-60",
    "image": "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
    "photos": [
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "name": "CareFirst Orthopedic & Sports Rehab",
    "category": "health",
    "subcategory": "Orthopedic",
    "city": "Hyderabad",
    "locality": "Jubilee Hills Road No. 36",
    "rating": 4.9,
    "reviewsCount": 528,
    "startingPrice": 700,
    "priceRange": "₹₹₹",
    "responseTime": "~7 min",
    "trustScore": 96,
    "phone": "+91 98490 88771",
    "address": "Plot 412, Road No 36, Jubilee Hills, Hyderabad 500033",
    "lat": 17.4319,
    "lng": 78.4073,
    "features": [
      "Robotic Knee Therapy",
      "Sports Injury Rehab Gymnasium",
      "Digital Cryotherapy",
      "Spine Alignment Studio"
    ],
    "services": [
      {
        "id": "s-h-9",
        "name": "Orthopedic Joint & Spine Assessment",
        "price": 700,
        "duration": "30 mins"
      },
      {
        "id": "s-h-10",
        "name": "Physiotherapy & Dry Needling Session",
        "price": 850,
        "duration": "45 mins"
      }
    ],
    "offer": "First physiotherapy session at 30% OFF",
    "description": "Elite sports medicine and orthopedic consultation center in Jubilee Hills, Hyderabad.",
    "reviews": [
      {
        "author": "Vikramaditya Rao",
        "rating": 5,
        "date": "2 days ago",
        "verifiedBooking": true,
        "comment": "Cured my chronic lower back stiffness within 4 sessions of targeted physio. Highly recommended."
      }
    ],
    "id": "b-gen-61",
    "image": "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
    "photos": [
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "name": "Lifeline 24/7 Critical Care & Trauma Hospital",
    "category": "health",
    "subcategory": "General Physicians",
    "city": "Mangaluru",
    "locality": "Falnir Road",
    "rating": 4.9,
    "reviewsCount": 388,
    "startingPrice": 400,
    "priceRange": "₹₹",
    "responseTime": "~4 min",
    "trustScore": 99,
    "phone": "+91 98450 33991",
    "address": "Kankanady Bypass, Falnir, Mangaluru, Karnataka 575002",
    "lat": 12.8688,
    "lng": 74.8569,
    "features": [
      "24/7 Trauma Emergency",
      "Cashless TPA Insurance",
      "In-house Pharmacy & CT Scan",
      "Ambulance GPS Dispatch"
    ],
    "services": [
      {
        "id": "s-h-11",
        "name": "Emergency Physician Triage Consultation",
        "price": 400,
        "duration": "20 mins"
      },
      {
        "id": "s-h-12",
        "name": "Wound Suturing & Dressing Care",
        "price": 650,
        "duration": "30 mins"
      }
    ],
    "offer": "Zero waiting time on pre-booked emergency triage",
    "description": "Premier round-the-clock emergency hospital and surgical center serving Mangaluru and coastal Karnataka.",
    "reviews": [
      {
        "author": "Prashanth Shetty",
        "rating": 5,
        "date": "4 days ago",
        "verifiedBooking": true,
        "comment": "Emergency staff were prompt and polite. Attended to my mother immediately."
      }
    ],
    "id": "b-gen-62",
    "image": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
    "photos": [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "name": "SRL Diagnostics & Digital Pathology",
    "category": "health",
    "subcategory": "Diagnostics & Labs",
    "city": "Kolkata",
    "locality": "Park Street",
    "rating": 4.8,
    "reviewsCount": 460,
    "startingPrice": 300,
    "priceRange": "₹",
    "responseTime": "~15 min",
    "trustScore": 94,
    "phone": "+91 98300 11992",
    "address": "74, Park Street, Mullick Bazar, Kolkata 700017",
    "lat": 22.5512,
    "lng": 88.3582,
    "features": [
      "CAP Accredited",
      "Barcode Sample Integrity",
      "Home Phlebotomy",
      "WhatsApp Smart Reports"
    ],
    "services": [
      {
        "id": "s-h-13",
        "name": "Complete Hemogram CBC Test",
        "price": 300,
        "duration": "15 mins"
      },
      {
        "id": "s-h-14",
        "name": "Cardiac Lipid Profile & Risk Index",
        "price": 650,
        "duration": "15 mins"
      }
    ],
    "offer": "₹200 Cashback on first booking above ₹1000",
    "description": "Leading diagnostic network lab on Park Street Kolkata offering over 2,500 clinical assays.",
    "reviews": [
      {
        "author": "Debolina Sen",
        "rating": 5,
        "date": "5 days ago",
        "verifiedBooking": true,
        "comment": "Very clean facility and polite staff. Home collection was right on time."
      }
    ],
    "id": "b-gen-63",
    "image": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    "photos": [
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "name": "UrbanPipes Master Plumbing & Leakage Fix",
    "category": "home",
    "subcategory": "Plumbers",
    "city": "Bengaluru",
    "locality": "Indiranagar 100 Feet Road",
    "rating": 4.9,
    "reviewsCount": 712,
    "startingPrice": 299,
    "priceRange": "₹",
    "responseTime": "~8 min",
    "trustScore": 97,
    "phone": "+91 98450 66221",
    "address": "428, 100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru 560038",
    "lat": 12.9784,
    "lng": 77.6408,
    "homeService": true,
    "features": [
      "Acoustic Seepage Detection",
      "30-Day Workmanship Warranty",
      "Fixed Rate Card",
      "Background Checked Pros"
    ],
    "services": [
      {
        "id": "s-pl-1",
        "name": "Tap & Shower Mixer Repair / Cartridge Replacement",
        "price": 299,
        "duration": "30 mins"
      },
      {
        "id": "s-pl-2",
        "name": "Concealed Bathroom Pipe Seepage Diagnosis & Repair",
        "price": 799,
        "duration": "60 mins"
      },
      {
        "id": "s-pl-3",
        "name": "Overhead Tank Ball Valve & Float Switch Fix",
        "price": 499,
        "duration": "45 mins"
      }
    ],
    "offer": "₹150 OFF on full bathroom plumbing overhaul",
    "description": "Expert residential plumbing crew in Indiranagar specializing in German ceramic valves and acoustic ultrasonic leak detection.",
    "reviews": [
      {
        "author": "Naveen Kumar",
        "rating": 5,
        "date": "Yesterday",
        "verifiedBooking": true,
        "comment": "Fixed our concealed flush valve in 20 minutes without breaking any tiles. Super neat!"
      }
    ],
    "id": "b-gen-64",
    "image": "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80",
    "photos": [
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "name": "MetroLeak Water Proofing & Slab Injection",
    "category": "home",
    "subcategory": "Bathroom Leakage",
    "city": "Mumbai",
    "locality": "Bandra West",
    "rating": 4.8,
    "reviewsCount": 394,
    "startingPrice": 899,
    "priceRange": "₹₹₹",
    "responseTime": "~14 min",
    "trustScore": 96,
    "phone": "+91 98200 44119",
    "address": "Hill Road, Near Mehboob Studio, Bandra West, Mumbai 400050",
    "lat": 19.0544,
    "lng": 72.8285,
    "homeService": true,
    "features": [
      "PU Injection Without Breaking Tiles",
      "5-Year Written Guarantee",
      "Thermal Camera Inspection",
      "Elastomeric Membrane"
    ],
    "services": [
      {
        "id": "s-pl-4",
        "name": "Thermal Imaging Inspection of Wall Dampness",
        "price": 899,
        "duration": "45 mins"
      },
      {
        "id": "s-pl-5",
        "name": "Non-Invasive PU Grouting & Seepage Barrier (Per Bath)",
        "price": 4499,
        "duration": "120 mins"
      }
    ],
    "offer": "Free Thermal Imaging dampness scan with waterproofing work",
    "description": "Top-tier water-leakage remediation company in Mumbai specializing in high-rise coastal waterproofing.",
    "reviews": [
      {
        "author": "Zoya Merchant",
        "rating": 5,
        "date": "3 days ago",
        "verifiedBooking": true,
        "comment": "Saved our living room ceiling from monsoon seepage completely without breaking tiles."
      }
    ],
    "id": "b-gen-65",
    "image": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
    "photos": [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "name": "AquaFlow Sanitary & Pressure Pump Services",
    "category": "home",
    "subcategory": "Pipe Fitting",
    "city": "Delhi NCR",
    "locality": "Cyber Hub Gurgaon",
    "rating": 4.9,
    "reviewsCount": 512,
    "startingPrice": 349,
    "priceRange": "₹₹",
    "responseTime": "~10 min",
    "trustScore": 95,
    "phone": "+91 98101 99228",
    "address": "DLF Phase 2, Adjacent Cyber Hub, Gurgaon 122002",
    "lat": 28.495,
    "lng": 77.0895,
    "homeService": true,
    "features": [
      "High-Pressure Water Boosters",
      "CPVC Solvent Welding",
      "RO Water Filter Fitting",
      "24/7 Leakage Dispatch"
    ],
    "services": [
      {
        "id": "s-pl-6",
        "name": "Pressure Booster Pump Installation & Service",
        "price": 849,
        "duration": "60 mins"
      },
      {
        "id": "s-pl-7",
        "name": "Kitchen Sink Drain Clog Jet Clearance",
        "price": 349,
        "duration": "30 mins"
      }
    ],
    "offer": "₹100 OFF with coupon code CLEANFLOW",
    "description": "Modern sanitary solutions and automated pressure pumps specialist for luxury villas and corporate offices across Gurgaon.",
    "reviews": [
      {
        "author": "Aditya Oberoi",
        "rating": 5,
        "date": "1 week ago",
        "verifiedBooking": true,
        "comment": "Technician arrived in uniform with ID card. Very professional and fixed the booster pump in 40 mins."
      }
    ],
    "id": "b-gen-66",
    "image": "https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=800&q=80",
    "photos": [
      "https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "name": "Royal Carpenters & Modular Furniture Care",
    "category": "home",
    "subcategory": "Carpenters",
    "city": "Pune",
    "locality": "Baner",
    "rating": 4.8,
    "reviewsCount": 340,
    "startingPrice": 399,
    "priceRange": "₹",
    "responseTime": "~12 min",
    "trustScore": 93,
    "phone": "+91 98220 88334",
    "address": "Baner-Pashan Link Road, Baner, Pune 411045",
    "lat": 18.559,
    "lng": 73.7868,
    "homeService": true,
    "features": [
      "Hettich / Hafele Fitting Specialists",
      "Modular Kitchen Hinge Replacement",
      "Bed Assembling",
      "Dust-Free Sanding"
    ],
    "services": [
      {
        "id": "s-carp-1",
        "name": "Cabinet Soft-Close Hinge Replacement (Up to 4)",
        "price": 399,
        "duration": "40 mins"
      },
      {
        "id": "s-carp-2",
        "name": "King / Queen Bed Assembly & Dismantling",
        "price": 799,
        "duration": "75 mins"
      }
    ],
    "offer": "Free furniture polish with any hinge replacement over ₹1000",
    "description": "Master carpentry team in Baner Pune with 12+ years experience in imported modular kitchen fittings.",
    "reviews": [
      {
        "author": "Tanvi Joshi",
        "rating": 5,
        "date": "4 days ago",
        "verifiedBooking": true,
        "comment": "Replaced all kitchen drawer runners smoothly. Very polite."
      }
    ],
    "id": "b-gen-67",
    "image": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    "photos": [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "name": "Coastal Plumbers & Borewell Services",
    "category": "home",
    "subcategory": "Plumbers",
    "city": "Mangaluru",
    "locality": "Valachil",
    "rating": 4.9,
    "reviewsCount": 295,
    "startingPrice": 250,
    "priceRange": "₹",
    "responseTime": "~6 min",
    "trustScore": 98,
    "phone": "+91 98450 77114",
    "address": "Valachil Junction, NH-73, Mangaluru, Karnataka 574143",
    "lat": 12.8711,
    "lng": 74.9245,
    "homeService": true,
    "features": [
      "Emergency Response in Valachil & Farangipete",
      "Submersible Motor Repairs",
      "Tank Cleaning",
      "Low Cost Spares"
    ],
    "services": [
      {
        "id": "s-pl-8",
        "name": "Emergency Pipe Burst Fix in Valachil",
        "price": 250,
        "duration": "30 mins"
      },
      {
        "id": "s-pl-9",
        "name": "Borewell Submersible Pump Wiring & Starter Service",
        "price": 550,
        "duration": "60 mins"
      },
      {
        "id": "s-pl-10",
        "name": "Overhead 1000L Water Tank Deep Disinfection",
        "price": 699,
        "duration": "90 mins"
      }
    ],
    "offer": "₹100 OFF for local residents in Valachil & Arkula",
    "description": "Hyperlocal licensed plumbing team stationed right in Valachil Mangaluru for rapid 15-minute doorstep dispatch.",
    "reviews": [
      {
        "author": "Harish Rai",
        "rating": 5,
        "date": "Yesterday",
        "verifiedBooking": true,
        "comment": "Arrived at our house in Valachil within 12 minutes! Replaced broken valve quickly."
      }
    ],
    "id": "b-gen-68",
    "image": "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
    "photos": [
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "name": "CoolWave Heavy AC Repair & Gas Charging",
    "category": "electrical",
    "subcategory": "AC Repair & Gas Refill",
    "city": "Mumbai",
    "locality": "Powai",
    "rating": 4.9,
    "reviewsCount": 684,
    "startingPrice": 449,
    "priceRange": "₹₹",
    "responseTime": "~8 min",
    "trustScore": 97,
    "phone": "+91 98200 77332",
    "address": "Central Avenue, Hiranandani Gardens, Powai, Mumbai 400076",
    "lat": 19.1176,
    "lng": 72.906,
    "homeService": true,
    "features": [
      "Anti-Bacterial Foam Jet Cleaning",
      "R32 / R410A Pure Refrigerant Gas",
      "90-Day Gas Leak Warranty",
      "PCB Chip Repair"
    ],
    "services": [
      {
        "id": "s-ac-1",
        "name": "Split AC Deep Foam & High Pressure Power Jet Clean",
        "price": 449,
        "duration": "45 mins"
      },
      {
        "id": "s-ac-2",
        "name": "100% Full Refrigerant Gas Refill & Vacuuming",
        "price": 2199,
        "duration": "60 mins"
      },
      {
        "id": "s-ac-3",
        "name": "Inverter AC Sensor & PCB Board Circuit Fix",
        "price": 1299,
        "duration": "75 mins"
      }
    ],
    "offer": "Flat ₹300 OFF on 2 or more AC servicings",
    "description": "Top-rated AC service engineering team in Powai specializing in Daikin, Mitsubishi, and Voltas split units.",
    "reviews": [
      {
        "author": "Kunal Singhania",
        "rating": 5,
        "date": "Yesterday",
        "verifiedBooking": true,
        "comment": "The foam jet cleaning removed all foul odors and cooling is like a brand new AC now."
      }
    ],
    "id": "b-gen-69",
    "image": "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80",
    "photos": [
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "name": "Delhi PowerJet AC & Duct Cleaning Engineers",
    "category": "electrical",
    "subcategory": "AC Repair & Gas Refill",
    "city": "Delhi NCR",
    "locality": "Connaught Place",
    "rating": 4.8,
    "reviewsCount": 520,
    "startingPrice": 399,
    "priceRange": "₹",
    "responseTime": "~10 min",
    "trustScore": 96,
    "phone": "+91 98110 99441",
    "address": "Block E, Inner Circle, Connaught Place, New Delhi 110001",
    "lat": 28.6328,
    "lng": 77.2197,
    "homeService": true,
    "features": [
      "360° Indoor Coil Washing",
      "UV Disinfection",
      "Ampere & Compressor Testing",
      "Uniformed Technicians"
    ],
    "services": [
      {
        "id": "s-ac-4",
        "name": "PowerJet Split AC Deep Clean",
        "price": 399,
        "duration": "40 mins"
      },
      {
        "id": "s-ac-5",
        "name": "Window AC Complete Dismantle & Chemical Wash",
        "price": 499,
        "duration": "50 mins"
      }
    ],
    "offer": "Free refrigerant pressure check with every service",
    "description": "Serving Central Delhi and Noida with professional certified HVAC technicians.",
    "reviews": [
      {
        "author": "Pooja Aggarwal",
        "rating": 5,
        "date": "2 days ago",
        "verifiedBooking": true,
        "comment": "Technician showed the dirty water collected in bucket. Outstanding cleaning."
      }
    ],
    "id": "b-gen-70",
    "image": "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=800&q=80",
    "photos": [
      "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "name": "Telangana Inverter & Solar Solutions",
    "category": "electrical",
    "subcategory": "Inverter Service",
    "city": "Hyderabad",
    "locality": "Gachibowli",
    "rating": 4.8,
    "reviewsCount": 310,
    "startingPrice": 350,
    "priceRange": "₹₹",
    "responseTime": "~12 min",
    "trustScore": 94,
    "phone": "+91 98490 22119",
    "address": "Near Bio-Diversity Park, Gachibowli, Hyderabad 500081",
    "lat": 17.4399,
    "lng": 78.36,
    "homeService": true,
    "features": [
      "Tubular Battery Water Topping",
      "Pure Sine Wave Inverter Repair",
      "Solar Hybrid Setup",
      "Same-Day Battery Replacement"
    ],
    "services": [
      {
        "id": "s-elec-1",
        "name": "Inverter & Battery Health Diagnostics + Water Top-up",
        "price": 350,
        "duration": "30 mins"
      },
      {
        "id": "s-elec-2",
        "name": "Main Power Distribution Box MCB Tripping Fix",
        "price": 450,
        "duration": "45 mins"
      }
    ],
    "offer": "Free battery acid specific gravity check with every visit",
    "description": "Specialists in uninterrupted home power, solar backup inverters, and high-load MCB rewiring across Hyderabad tech corridors.",
    "reviews": [
      {
        "author": "Srinivas Reddy",
        "rating": 5,
        "date": "1 week ago",
        "verifiedBooking": true,
        "comment": "Fixed our home inverter backup issue on a Sunday evening. Lifesaver!"
      }
    ],
    "id": "b-gen-71",
    "image": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
    "photos": [
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "name": "Chennai Electricians & Smart Home Wiring",
    "category": "electrical",
    "subcategory": "Electricians",
    "city": "Chennai",
    "locality": "Adyar",
    "rating": 4.9,
    "reviewsCount": 440,
    "startingPrice": 299,
    "priceRange": "₹",
    "responseTime": "~9 min",
    "trustScore": 96,
    "phone": "+91 98400 66551",
    "address": "Lattice Bridge Road, Adyar, Chennai 600020",
    "lat": 13.0012,
    "lng": 80.2565,
    "homeService": true,
    "features": [
      "Earthing & Ground Resistance Test",
      "Smart Switchboard Automation",
      "Chandelier Hanging",
      "Short Circuit Isolation"
    ],
    "services": [
      {
        "id": "s-elec-3",
        "name": "Ceiling Fan Installation & Regulator Fix",
        "price": 299,
        "duration": "30 mins"
      },
      {
        "id": "s-elec-4",
        "name": "Complete 2BHK Electrical Safety & Earthing Audit",
        "price": 699,
        "duration": "60 mins"
      }
    ],
    "offer": "10% OFF on all smart touch-switch installations",
    "description": "Licensed wiremen and government certified electrical contractors in South Chennai.",
    "reviews": [
      {
        "author": "K. Balaji",
        "rating": 5,
        "date": "3 days ago",
        "verifiedBooking": true,
        "comment": "Diagnosed a dangerous burning smell in our switchboard within 5 minutes. Highly recommended."
      }
    ],
    "id": "b-gen-72",
    "image": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
    "photos": [
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "name": "Vidyarthi Bhavan Heritage Restaurant",
    "category": "food",
    "subcategory": "South Indian",
    "city": "Bengaluru",
    "locality": "Gandhi Bazaar, Basavanagudi",
    "rating": 4.9,
    "reviewsCount": 3120,
    "startingPrice": 90,
    "priceRange": "₹",
    "responseTime": "~5 min",
    "trustScore": 99,
    "phone": "+91 80 2667 7588",
    "address": "32, Gandhi Bazaar Main Road, Basavanagudi, Bengaluru 560004",
    "lat": 12.9438,
    "lng": 77.5702,
    "features": [
      "Crispy Ghee Masala Dosa",
      "Pure Filter Coffee",
      "75+ Years Legacy",
      "Fresh Coconut Chutney"
    ],
    "services": [
      {
        "id": "s-fd-1",
        "name": "Iconic Benne Masala Dosa (Ghee Roasted)",
        "price": 90,
        "duration": "15 mins"
      },
      {
        "id": "s-fd-2",
        "name": "Traditional South Indian Filter Coffee",
        "price": 35,
        "duration": "5 mins"
      },
      {
        "id": "s-fd-3",
        "name": "Crispy Rava Vada with Chutney",
        "price": 55,
        "duration": "10 mins"
      }
    ],
    "offer": "Free mini filter coffee with family breakfast platter",
    "description": "Iconic Bangalore legacy restaurant founded in 1943, celebrated across India for legendary crispy ghee masala dosas.",
    "reviews": [
      {
        "author": "Raghavan S.",
        "rating": 5,
        "date": "Yesterday",
        "verifiedBooking": true,
        "comment": "The gold standard of Bengaluru breakfast. The dosa texture cannot be beaten anywhere."
      }
    ],
    "id": "b-gen-73",
    "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    "photos": [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "name": "Gajalee Coastal Seafood & Mangalorean Curry",
    "category": "food",
    "subcategory": "Seafood",
    "city": "Mumbai",
    "locality": "Andheri East",
    "rating": 4.8,
    "reviewsCount": 1840,
    "startingPrice": 380,
    "priceRange": "₹₹₹",
    "responseTime": "~8 min",
    "trustScore": 98,
    "phone": "+91 98201 11229",
    "address": "Kadam Marg, Off Western Express Highway, Andheri East, Mumbai 400069",
    "lat": 19.1136,
    "lng": 72.8697,
    "features": [
      "Fresh Butter Garlic Crab",
      "Tandoori Pomfret",
      "Bombil Fry",
      "Neer Dosa with Ghee Roast"
    ],
    "services": [
      {
        "id": "s-fd-4",
        "name": "Butter Garlic Jumbo Mud Crab",
        "price": 1450,
        "duration": "25 mins"
      },
      {
        "id": "s-fd-5",
        "name": "Tandoori Whole Silver Pomfret",
        "price": 850,
        "duration": "20 mins"
      },
      {
        "id": "s-fd-6",
        "name": "Neer Dosa with Mangalorean Prawn Curry",
        "price": 420,
        "duration": "15 mins"
      }
    ],
    "offer": "Complimentary Sol Kadhi with every seafood platter",
    "description": "Renowned coastal cuisine temple in Mumbai famous for freshest catches and authentic coastal masala recipes.",
    "reviews": [
      {
        "author": "Nikhil Prabhu",
        "rating": 5,
        "date": "3 days ago",
        "verifiedBooking": true,
        "comment": "Best butter garlic crab in Mumbai, hands down. Neer dosa was melt-in-mouth soft."
      }
    ],
    "id": "b-gen-74",
    "image": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80",
    "photos": [
      "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "name": "Karim's Original Mughlai Since 1913",
    "category": "food",
    "subcategory": "Biryani & North Indian",
    "city": "Delhi NCR",
    "locality": "Connaught Place",
    "rating": 4.8,
    "reviewsCount": 2450,
    "startingPrice": 320,
    "priceRange": "₹₹",
    "responseTime": "~10 min",
    "trustScore": 97,
    "phone": "+91 98111 44558",
    "address": "Regal Building, Connaught Place, New Delhi 110001",
    "lat": 28.63,
    "lng": 77.218,
    "features": [
      "Royal Mutton Burra",
      "Dum Biryani with Raita",
      "Slow-Cooked Nihari",
      "Khamiri Roti"
    ],
    "services": [
      {
        "id": "s-fd-7",
        "name": "Royal Mutton Dum Biryani Special",
        "price": 420,
        "duration": "20 mins"
      },
      {
        "id": "s-fd-8",
        "name": "Original Tandoori Mutton Burra Kebab",
        "price": 650,
        "duration": "25 mins"
      },
      {
        "id": "s-fd-9",
        "name": "Chicken Jahangiri with 2 Khamiri Rotis",
        "price": 480,
        "duration": "20 mins"
      }
    ],
    "offer": "10% OFF on takeaway orders over ₹1500",
    "description": "Historic culinary royal heritage from the royal kitchens of Mughal Emperor Bahadur Shah Zafar.",
    "reviews": [
      {
        "author": "Farhan Zaidi",
        "rating": 5,
        "date": "4 days ago",
        "verifiedBooking": true,
        "comment": "The Mutton Burra is unparalleled. Authentic flavors preserved for over a century."
      }
    ],
    "id": "b-gen-75",
    "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    "photos": [
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "name": "Paradise Royal Biryani & Kebabs",
    "category": "food",
    "subcategory": "Biryani & North Indian",
    "city": "Hyderabad",
    "locality": "Hitec City",
    "rating": 4.8,
    "reviewsCount": 2890,
    "startingPrice": 280,
    "priceRange": "₹₹",
    "responseTime": "~6 min",
    "trustScore": 98,
    "phone": "+91 98491 55667",
    "address": "Cyber Towers Quadrangle, Hitec City, Hyderabad 500081",
    "lat": 17.4504,
    "lng": 78.3808,
    "features": [
      "World Famous Hyderabadi Dum Biryani",
      "Mirchi Ka Salan",
      "Double Ka Meetha",
      "Sealed Handi Serving"
    ],
    "services": [
      {
        "id": "s-fd-10",
        "name": "Royal Special Mutton Dum Biryani (Serves 2)",
        "price": 440,
        "duration": "15 mins"
      },
      {
        "id": "s-fd-11",
        "name": "Chicken Tikka Kebab Skewer Platter",
        "price": 340,
        "duration": "20 mins"
      },
      {
        "id": "s-fd-12",
        "name": "Authentic Shahi Double Ka Meetha",
        "price": 120,
        "duration": "5 mins"
      }
    ],
    "offer": "Complimentary dessert with Biryani Family Pack",
    "description": "The world's favorite Hyderabadi Biryani destination, bringing legendary authentic dum biryani to Hitec City techies.",
    "reviews": [
      {
        "author": "Chaitanya V.",
        "rating": 5,
        "date": "Yesterday",
        "verifiedBooking": true,
        "comment": "Fragrant long grain rice, juicy tender mutton, and perfect spice balance. Super fast service."
      }
    ],
    "id": "b-gen-76",
    "image": "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80",
    "photos": [
      "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "name": "HygienicPro 3BHK Deep Cleaning & Sanitization",
    "category": "cleaning",
    "subcategory": "Deep Home Cleaning",
    "city": "Bengaluru",
    "locality": "Whitefield",
    "rating": 4.9,
    "reviewsCount": 480,
    "startingPrice": 1499,
    "priceRange": "₹₹",
    "responseTime": "~10 min",
    "trustScore": 96,
    "phone": "+91 98450 99882",
    "address": "ITPL Main Road, Near Hope Farm, Whitefield, Bengaluru 560066",
    "lat": 12.9698,
    "lng": 77.7499,
    "homeService": true,
    "features": [
      "Single-Disc Machine Scrubbing",
      "Vacuum Extraction of Mattresses",
      "Kitchen Degreasing",
      "Eco-Friendly Chemicals"
    ],
    "services": [
      {
        "id": "s-cl-1",
        "name": "2BHK / 3BHK Complete Home Deep Scrub & Clean",
        "price": 2499,
        "duration": "240 mins"
      },
      {
        "id": "s-cl-2",
        "name": "Intense Bathroom Descaling & Tile Stain Removal (Per Bath)",
        "price": 599,
        "duration": "60 mins"
      },
      {
        "id": "s-cl-3",
        "name": "Fabric Sofa & Dining Chair Shampoo Extraction",
        "price": 899,
        "duration": "90 mins"
      }
    ],
    "offer": "₹500 OFF on Full Villa / 3BHK deep cleaning package",
    "description": "Premier deep sanitization service in Whitefield with industrial scrubbers and Taski hospital-grade cleaning compounds.",
    "reviews": [
      {
        "author": "Priyanka Sen",
        "rating": 5,
        "date": "2 days ago",
        "verifiedBooking": true,
        "comment": "Our bathrooms look like a 5-star hotel now! All hard water stains vanished."
      }
    ],
    "id": "b-gen-77",
    "image": "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
    "photos": [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581579186913-45ac3e6efe93?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "name": "PestShield Termite & Herbal Cockroach Control",
    "category": "cleaning",
    "subcategory": "Pest Control",
    "city": "Mumbai",
    "locality": "Thane West",
    "rating": 4.8,
    "reviewsCount": 360,
    "startingPrice": 699,
    "priceRange": "₹",
    "responseTime": "~12 min",
    "trustScore": 95,
    "phone": "+91 98200 88221",
    "address": "Ghodbunder Road, Thane West, Maharashtra 400607",
    "lat": 19.2183,
    "lng": 72.9781,
    "homeService": true,
    "features": [
      "Odorless Herbal Gel Treatment",
      "1-Year Termite Drill-Fill Warranty",
      "Bedbug Eradication",
      "Safe for Pets and Kids"
    ],
    "services": [
      {
        "id": "s-cl-4",
        "name": "Complete Home Herbal Cockroach Gel Treatment (2BHK)",
        "price": 699,
        "duration": "45 mins"
      },
      {
        "id": "s-cl-5",
        "name": "Post-Construction Chemical Termite Barrier Drill",
        "price": 2999,
        "duration": "180 mins"
      }
    ],
    "offer": "Free Kitchen Drain Fly treatment with any pest control order",
    "description": "Government certified pest control operators providing 100% odorless and pet-safe pest elimination across Mumbai & Thane.",
    "reviews": [
      {
        "author": "Ashwin Chitre",
        "rating": 5,
        "date": "1 week ago",
        "verifiedBooking": true,
        "comment": "Zero smell, no need to empty kitchen cabinets, and cockroaches disappeared within 48 hours."
      }
    ],
    "id": "b-gen-78",
    "image": "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80",
    "photos": [
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581579186913-45ac3e6efe93?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "name": "iCare Apple Certified Mac & iPhone Lab",
    "category": "tech",
    "subcategory": "Laptop & Mobile Repair",
    "city": "Bengaluru",
    "locality": "Koramangala 5th Block",
    "rating": 4.9,
    "reviewsCount": 578,
    "startingPrice": 499,
    "priceRange": "₹₹₹",
    "responseTime": "~6 min",
    "trustScore": 98,
    "phone": "+91 98450 12890",
    "address": "80 Feet Road, Near Sony World Signal, Koramangala, Bengaluru 560095",
    "lat": 12.9352,
    "lng": 77.6245,
    "features": [
      "Genuine Retina Display Replacements",
      "BGA Logic Board Micro-Soldering",
      "Liquid Spill Recovery",
      "90-Day Warranty"
    ],
    "services": [
      {
        "id": "s-tc-1",
        "name": "MacBook Air / Pro Thermal Paste & Fan Dust Overhaul",
        "price": 799,
        "duration": "45 mins"
      },
      {
        "id": "s-tc-2",
        "name": "iPhone Original Screen & Battery Replacement (In 30 Mins)",
        "price": 2499,
        "duration": "30 mins"
      },
      {
        "id": "s-tc-3",
        "name": "Chip-Level Motherboard Diagnostic & Short-Circuit Fix",
        "price": 1899,
        "duration": "90 mins"
      }
    ],
    "offer": "Free tempered glass with every iPhone screen repair",
    "description": "Specialized Apple and premium Ultrabook diagnostic repair lab with ESD-safe cleanroom stations.",
    "reviews": [
      {
        "author": "Rahul Menon",
        "rating": 5,
        "date": "Yesterday",
        "verifiedBooking": true,
        "comment": "Official Apple service quoted ₹42,000 for logic board replacement. iCare fixed the short circuit for ₹3,500!"
      }
    ],
    "id": "b-gen-79",
    "image": "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?auto=format&fit=crop&w=800&q=80",
    "photos": [
      "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "name": "LapFix Chip-Level Laptop Specialists",
    "category": "tech",
    "subcategory": "Laptop & Mobile Repair",
    "city": "Delhi NCR",
    "locality": "Nehru Place",
    "rating": 4.8,
    "reviewsCount": 820,
    "startingPrice": 350,
    "priceRange": "₹",
    "responseTime": "~8 min",
    "trustScore": 96,
    "phone": "+91 98100 77665",
    "address": "Building 45, Asia's Largest IT Market, Nehru Place, New Delhi 110019",
    "lat": 28.5492,
    "lng": 77.2529,
    "features": [
      "Dell, Lenovo, HP, Asus Parts Stock",
      "Data Recovery from Dead SSD",
      "Same-Day Keyboard Swap",
      "Instant Diagnostics"
    ],
    "services": [
      {
        "id": "s-tc-4",
        "name": "Laptop Motherboard Power No-Display Diagnostic",
        "price": 350,
        "duration": "30 mins"
      },
      {
        "id": "s-tc-5",
        "name": "Broken Hinge & Top Cover Body Fabrication",
        "price": 850,
        "duration": "60 mins"
      },
      {
        "id": "s-tc-6",
        "name": "512GB NVMe High-Speed SSD Upgrade with OS Clone",
        "price": 2999,
        "duration": "45 mins"
      }
    ],
    "offer": "Free laptop deep interior cleaning with SSD upgrade",
    "description": "The definitive chip-level repair lab in Nehru Place with infrared soldering workstations and original OEM spares.",
    "reviews": [
      {
        "author": "Simran Walia",
        "rating": 5,
        "date": "3 days ago",
        "verifiedBooking": true,
        "comment": "Recovered my thesis data from a dead laptop within 3 hours. Forever grateful!"
      }
    ],
    "id": "b-gen-80",
    "image": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    "photos": [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "name": "3M Car Care & Ceramic Detailing Studio",
    "category": "auto",
    "subcategory": "Car Wash & Detailing",
    "city": "Bengaluru",
    "locality": "HSR Layout Sector 1",
    "rating": 4.9,
    "reviewsCount": 610,
    "startingPrice": 599,
    "priceRange": "₹₹₹",
    "responseTime": "~8 min",
    "trustScore": 97,
    "phone": "+91 98450 33445",
    "address": "27th Main, Sector 1, HSR Layout, Bengaluru 560102",
    "lat": 12.915,
    "lng": 77.65,
    "features": [
      "9H Ceramic Coating (3-Year Warranty)",
      "Underbody Anti-Rust Coating",
      "Steam Foam Interior Wash",
      "Paint Protection Film (PPF)"
    ],
    "services": [
      {
        "id": "s-au-1",
        "name": "Complete Exterior Foam Wash & Interior Vacuuming",
        "price": 599,
        "duration": "45 mins"
      },
      {
        "id": "s-au-2",
        "name": "3M High-Gloss Machine Paint Compound & Wax Polish",
        "price": 2499,
        "duration": "120 mins"
      },
      {
        "id": "s-au-3",
        "name": "Deep Interior GermKleen Anti-Microbial Upholstery Wash",
        "price": 1899,
        "duration": "90 mins"
      }
    ],
    "offer": "20% OFF on 9H Nano Ceramic Coating Packages",
    "description": "Authorized 3M flagship detailing center featuring dust-free application booths and master certified detailers.",
    "reviews": [
      {
        "author": "Deepak Nambiar",
        "rating": 5,
        "date": "Yesterday",
        "verifiedBooking": true,
        "comment": "My 5-year-old Creta looks showroom fresh after the 3M machine wax. Outstanding craftsmanship."
      }
    ],
    "id": "b-gen-81",
    "image": "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",
    "photos": [
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "name": "Coastal Roadside Hydraulic Towing & Recovery 24/7",
    "category": "auto",
    "subcategory": "24/7 Roadside Towing",
    "city": "Mangaluru",
    "locality": "Kadri",
    "rating": 4.9,
    "reviewsCount": 420,
    "startingPrice": 999,
    "priceRange": "₹₹",
    "responseTime": "~5 min",
    "trustScore": 99,
    "phone": "+91 98450 88992",
    "address": "Kadri Hills, NH-66 Junction, Mangaluru, Karnataka 575004",
    "lat": 12.89,
    "lng": 74.86,
    "features": [
      "Hydraulic Tilt-Tray Flatbed Trucks",
      "Underlift Towing for Low-Ground Clearance",
      "Jumpstart Battery Service",
      "Accident Winch Recovery"
    ],
    "services": [
      {
        "id": "s-au-4",
        "name": "24/7 Hydraulic Flatbed Car Towing (Within 10 km)",
        "price": 999,
        "duration": "30 mins"
      },
      {
        "id": "s-au-5",
        "name": "Instant Battery Jumpstart & Flat Tyre Replacement on Highway",
        "price": 499,
        "duration": "20 mins"
      }
    ],
    "offer": "Zero night surge charges on toll-free emergency call",
    "description": "Premier heavy hydraulic towing and accident recovery service serving Mangaluru, Udupi, and Valachil highway stretches.",
    "reviews": [
      {
        "author": "Sharath Kumar",
        "rating": 5,
        "date": "3 days ago",
        "verifiedBooking": true,
        "comment": "My car stalled near Valachil at 2 AM. Towing truck arrived in 18 minutes. Extremely polite driver."
      }
    ],
    "id": "b-gen-82",
    "image": "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
    "photos": [
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "name": "Agarwal Express Relocations & Household Shifting",
    "category": "packers",
    "subcategory": "Household Shifting",
    "city": "Bengaluru",
    "locality": "Koramangala",
    "rating": 4.8,
    "reviewsCount": 1120,
    "startingPrice": 3499,
    "priceRange": "₹₹₹",
    "responseTime": "~10 min",
    "trustScore": 97,
    "phone": "+91 98450 66778",
    "address": "Inner Ring Road, Koramangala, Bengaluru 560047",
    "lat": 12.94,
    "lng": 77.63,
    "features": [
      "5-Layer Bubble & Corrugated Packing",
      "Free Transit Insurance",
      "Zero Hidden Charges",
      "GPS Tracked Container Trucks"
    ],
    "services": [
      {
        "id": "s-pm-1",
        "name": "1BHK Local Household Shifting within Bengaluru",
        "price": 3499,
        "duration": "300 mins"
      },
      {
        "id": "s-pm-2",
        "name": "2BHK / 3BHK Complete Shifting with Unpacking & Setup",
        "price": 6999,
        "duration": "480 mins"
      },
      {
        "id": "s-pm-3",
        "name": "Safe Vehicle Car / Bike Container Transport",
        "price": 4500,
        "duration": "240 mins"
      }
    ],
    "offer": "Free 20 sturdy carton boxes + packing tape included",
    "description": "Trusted nationwide relocations specialist with ISO 9001 certified packing materials and dedicated relocation managers.",
    "reviews": [
      {
        "author": "Meenakshi Sundaram",
        "rating": 5,
        "date": "4 days ago",
        "verifiedBooking": true,
        "comment": "Not a single scratch on our delicate glassware or TV. Best packers in Bangalore."
      }
    ],
    "id": "b-gen-83",
    "image": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
    "photos": [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "name": "Apex Industrial Hardware & Wholesale Electricals",
    "category": "b2b",
    "subcategory": "Industrial Tools",
    "city": "Mumbai",
    "locality": "Lower Parel",
    "rating": 4.9,
    "reviewsCount": 380,
    "startingPrice": 1500,
    "priceRange": "₹₹₹",
    "responseTime": "~12 min",
    "trustScore": 98,
    "phone": "+91 98200 11993",
    "address": "Senapati Bapat Marg, Lower Parel, Mumbai 400013",
    "lat": 19,
    "lng": 72.83,
    "features": [
      "GST Input Tax Credit Invoices",
      "Bulk MOQ Discounts",
      "Bosch & DeWalt Authorized",
      "Same-Day Dispatch"
    ],
    "services": [
      {
        "id": "s-b2b-1",
        "name": "Wholesale Industrial Rotary Hammer Drill (Carton of 5)",
        "price": 18500,
        "duration": "1 day"
      },
      {
        "id": "s-b2b-2",
        "name": "Bulk 2.5 Sq mm Copper Armored Wire Roll (100m Coils x 10)",
        "price": 28900,
        "duration": "1 day"
      }
    ],
    "offer": "Additional 5% cash discount on commercial orders above ₹50,000",
    "description": "Major B2B industrial machinery and commercial building materials distributor serving contractors and factories across Maharashtra.",
    "reviews": [
      {
        "author": "Rajesh Shah",
        "rating": 5,
        "date": "1 week ago",
        "verifiedBooking": true,
        "comment": "Genuine GST bill, best wholesale trade pricing in Mumbai, and delivery right to our site."
      }
    ],
    "id": "b-gen-84",
    "image": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
    "photos": [
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-150",
    "name": "Envi Luxury Hair & Glow Studio - Bengaluru",
    "category": "salon",
    "subcategory": "Unisex Salons",
    "city": "Bengaluru",
    "locality": "Koramangala",
    "rating": 4.7,
    "reviewsCount": 476,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 499,
    "priceRange": "₹",
    "responseTime": "~10 min",
    "trustScore": 94,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 225
    },
    "phone": "+91 9820955708",
    "whatsapp": "919887398686",
    "address": "86, Main Boulevard, Koramangala, Bengaluru",
    "image": "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
    "lat": 12.9797,
    "lng": 77.5744,
    "distance": "1.7 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-151-1",
        "name": "Signature Keratin Hair Spa & Scalp Detox",
        "price": 499,
        "duration": "60 mins"
      },
      {
        "id": "s-151-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 200,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Unisex Salons provider in Koramangala, Bengaluru. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-151",
    "name": "Glamour Queen Bridal & Glow Lounge - Bengaluru",
    "category": "salon",
    "subcategory": "Bridal Makeup",
    "city": "Bengaluru",
    "locality": "Indiranagar",
    "rating": 4.8,
    "reviewsCount": 393,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 1200,
    "priceRange": "₹₹",
    "responseTime": "~11 min",
    "trustScore": 92,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 338
    },
    "phone": "+91 9841842819",
    "whatsapp": "919845101131",
    "address": "64, Main Boulevard, Indiranagar, Bengaluru",
    "image": "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
    "lat": 12.9458,
    "lng": 77.6144,
    "distance": "0.9 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-152-1",
        "name": "HD Bridal Glow & Airbrush Makeup",
        "price": 1200,
        "duration": "60 mins"
      },
      {
        "id": "s-152-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 480,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Bridal Makeup provider in Indiranagar, Bengaluru. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-152",
    "name": "Zenith Home Tutors & Academic Mentors - Bengaluru",
    "category": "tutor",
    "subcategory": "Home Tutors (CBSE/ICSE)",
    "city": "Bengaluru",
    "locality": "HSR Layout",
    "rating": 4.8,
    "reviewsCount": 471,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 500,
    "priceRange": "₹",
    "responseTime": "~13 min",
    "trustScore": 93,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 253
    },
    "phone": "+91 9863825936",
    "whatsapp": "919883815937",
    "address": "13, Main Boulevard, HSR Layout, Bengaluru",
    "image": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
    "lat": 12.9333,
    "lng": 77.6329,
    "distance": "1.4 km",
    "homeService": true,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-153-1",
        "name": "Class 9-12 Maths & Science 1-on-1 Tutoring",
        "price": 500,
        "duration": "60 mins"
      },
      {
        "id": "s-153-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 200,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Home Tutors (CBSE/ICSE) provider in HSR Layout, Bengaluru. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-153",
    "name": "Edge Achievers NEET & JEE Foundation - Bengaluru",
    "category": "tutor",
    "subcategory": "IIT-JEE/NEET Coaching",
    "city": "Bengaluru",
    "locality": "Whitefield",
    "rating": 5,
    "reviewsCount": 562,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 1500,
    "priceRange": "₹₹",
    "responseTime": "~13 min",
    "trustScore": 95,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 410
    },
    "phone": "+91 9814521918",
    "whatsapp": "919812956393",
    "address": "39, Main Boulevard, Whitefield, Bengaluru",
    "image": "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    "lat": 12.9618,
    "lng": 77.6185,
    "distance": "3.3 km",
    "homeService": true,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-154-1",
        "name": "Intensive Physics & Organic Chemistry Prep",
        "price": 1500,
        "duration": "60 mins"
      },
      {
        "id": "s-154-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 600,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified IIT-JEE/NEET Coaching provider in Whitefield, Bengaluru. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-154",
    "name": "Cinematic Memories Candid Wedding Films - Bengaluru",
    "category": "events",
    "subcategory": "Wedding Photographers",
    "city": "Bengaluru",
    "locality": "Jayanagar",
    "rating": 4.8,
    "reviewsCount": 515,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 25000,
    "priceRange": "₹₹₹",
    "responseTime": "~6 min",
    "trustScore": 97,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 297
    },
    "phone": "+91 9859822291",
    "whatsapp": "919894251372",
    "address": "54, Main Boulevard, Jayanagar, Bengaluru",
    "image": "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    "lat": 13.0057,
    "lng": 77.5737,
    "distance": "2.8 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-155-1",
        "name": "Full Day Cinematic Drone & Candid 4K Coverage",
        "price": 25000,
        "duration": "60 mins"
      },
      {
        "id": "s-155-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 10000,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Wedding Photographers provider in Jayanagar, Bengaluru. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-155",
    "name": "Annapurna Royal Feasts & Catering - Bengaluru",
    "category": "events",
    "subcategory": "Caterers",
    "city": "Bengaluru",
    "locality": "Marathahalli",
    "rating": 4.8,
    "reviewsCount": 425,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 450,
    "priceRange": "₹",
    "responseTime": "~13 min",
    "trustScore": 96,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 301
    },
    "phone": "+91 9846786769",
    "whatsapp": "919815916695",
    "address": "17, Main Boulevard, Marathahalli, Bengaluru",
    "image": "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
    "lat": 12.9901,
    "lng": 77.6082,
    "distance": "4.7 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-156-1",
        "name": "Authentic 24-Item Traditional Feast (Per Plate)",
        "price": 450,
        "duration": "60 mins"
      },
      {
        "id": "s-156-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 180,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Caterers provider in Marathahalli, Bengaluru. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-156",
    "name": "Nestaway Smart Executive Co-Living - Bengaluru",
    "category": "stays",
    "subcategory": "Co-living PGs",
    "city": "Bengaluru",
    "locality": "Malleshwaram",
    "rating": 5,
    "reviewsCount": 465,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 8500,
    "priceRange": "₹₹₹",
    "responseTime": "~9 min",
    "trustScore": 93,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 335
    },
    "phone": "+91 9850558055",
    "whatsapp": "919831676087",
    "address": "58, Main Boulevard, Malleshwaram, Bengaluru",
    "image": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    "lat": 12.989,
    "lng": 77.5911,
    "distance": "1.7 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-157-1",
        "name": "Fully Furnished Single/Twin Room with High-Speed WiFi & Meals",
        "price": 8500,
        "duration": "60 mins"
      },
      {
        "id": "s-157-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 3400,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Co-living PGs provider in Malleshwaram, Bengaluru. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-157",
    "name": "AutoCraft Multi-Brand Car Service Hub - Bengaluru",
    "category": "auto",
    "subcategory": "Multi-brand Garages",
    "city": "Bengaluru",
    "locality": "Koramangala",
    "rating": 4.6,
    "reviewsCount": 507,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 1899,
    "priceRange": "₹₹",
    "responseTime": "~9 min",
    "trustScore": 94,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 428
    },
    "phone": "+91 9895840894",
    "whatsapp": "919853727156",
    "address": "84, Main Boulevard, Koramangala, Bengaluru",
    "image": "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
    "lat": 12.9862,
    "lng": 77.5871,
    "distance": "3.0 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-158-1",
        "name": "Comprehensive Periodic Engine Oil & Brake Overhaul",
        "price": 1899,
        "duration": "60 mins"
      },
      {
        "id": "s-158-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 760,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Multi-brand Garages provider in Koramangala, Bengaluru. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-158",
    "name": "Envi Luxury Hair & Glow Studio - Mangaluru",
    "category": "salon",
    "subcategory": "Unisex Salons",
    "city": "Mangaluru",
    "locality": "Valachil",
    "rating": 4.7,
    "reviewsCount": 358,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 499,
    "priceRange": "₹",
    "responseTime": "~9 min",
    "trustScore": 94,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 155
    },
    "phone": "+91 9854037088",
    "whatsapp": "919856500781",
    "address": "29, Main Boulevard, Valachil, Mangaluru",
    "image": "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
    "lat": 12.9021,
    "lng": 74.8219,
    "distance": "1.1 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-159-1",
        "name": "Signature Keratin Hair Spa & Scalp Detox",
        "price": 499,
        "duration": "60 mins"
      },
      {
        "id": "s-159-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 200,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Unisex Salons provider in Valachil, Mangaluru. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-159",
    "name": "Glamour Queen Bridal & Glow Lounge - Mangaluru",
    "category": "salon",
    "subcategory": "Bridal Makeup",
    "city": "Mangaluru",
    "locality": "Kadri",
    "rating": 4.8,
    "reviewsCount": 443,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 1200,
    "priceRange": "₹₹",
    "responseTime": "~14 min",
    "trustScore": 97,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 327
    },
    "phone": "+91 9865331726",
    "whatsapp": "919813489564",
    "address": "61, Main Boulevard, Kadri, Mangaluru",
    "image": "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
    "lat": 12.9153,
    "lng": 74.822,
    "distance": "4.1 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-160-1",
        "name": "HD Bridal Glow & Airbrush Makeup",
        "price": 1200,
        "duration": "60 mins"
      },
      {
        "id": "s-160-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 480,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Bridal Makeup provider in Kadri, Mangaluru. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-160",
    "name": "Zenith Home Tutors & Academic Mentors - Mangaluru",
    "category": "tutor",
    "subcategory": "Home Tutors (CBSE/ICSE)",
    "city": "Mangaluru",
    "locality": "Hampankatta",
    "rating": 4.7,
    "reviewsCount": 562,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 500,
    "priceRange": "₹",
    "responseTime": "~7 min",
    "trustScore": 93,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 329
    },
    "phone": "+91 9810509573",
    "whatsapp": "919838713377",
    "address": "13, Main Boulevard, Hampankatta, Mangaluru",
    "image": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
    "lat": 12.8986,
    "lng": 74.8304,
    "distance": "4.3 km",
    "homeService": true,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-161-1",
        "name": "Class 9-12 Maths & Science 1-on-1 Tutoring",
        "price": 500,
        "duration": "60 mins"
      },
      {
        "id": "s-161-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 200,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Home Tutors (CBSE/ICSE) provider in Hampankatta, Mangaluru. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-161",
    "name": "Edge Achievers NEET & JEE Foundation - Mangaluru",
    "category": "tutor",
    "subcategory": "IIT-JEE/NEET Coaching",
    "city": "Mangaluru",
    "locality": "Bejai",
    "rating": 4.9,
    "reviewsCount": 299,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 1500,
    "priceRange": "₹₹",
    "responseTime": "~9 min",
    "trustScore": 92,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 327
    },
    "phone": "+91 9823285771",
    "whatsapp": "919858445964",
    "address": "95, Main Boulevard, Bejai, Mangaluru",
    "image": "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    "lat": 12.9422,
    "lng": 74.8507,
    "distance": "2.5 km",
    "homeService": true,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-162-1",
        "name": "Intensive Physics & Organic Chemistry Prep",
        "price": 1500,
        "duration": "60 mins"
      },
      {
        "id": "s-162-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 600,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified IIT-JEE/NEET Coaching provider in Bejai, Mangaluru. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-162",
    "name": "Cinematic Memories Candid Wedding Films - Mangaluru",
    "category": "events",
    "subcategory": "Wedding Photographers",
    "city": "Mangaluru",
    "locality": "Surathkal",
    "rating": 4.7,
    "reviewsCount": 572,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 25000,
    "priceRange": "₹₹₹",
    "responseTime": "~7 min",
    "trustScore": 94,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 262
    },
    "phone": "+91 9828340355",
    "whatsapp": "919861138146",
    "address": "99, Main Boulevard, Surathkal, Mangaluru",
    "image": "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    "lat": 12.9295,
    "lng": 74.856,
    "distance": "3.2 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-163-1",
        "name": "Full Day Cinematic Drone & Candid 4K Coverage",
        "price": 25000,
        "duration": "60 mins"
      },
      {
        "id": "s-163-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 10000,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Wedding Photographers provider in Surathkal, Mangaluru. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-163",
    "name": "Annapurna Royal Feasts & Catering - Mangaluru",
    "category": "events",
    "subcategory": "Caterers",
    "city": "Mangaluru",
    "locality": "Falnir",
    "rating": 4.8,
    "reviewsCount": 379,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 450,
    "priceRange": "₹",
    "responseTime": "~5 min",
    "trustScore": 92,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 272
    },
    "phone": "+91 9891920623",
    "whatsapp": "919848548749",
    "address": "92, Main Boulevard, Falnir, Mangaluru",
    "image": "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
    "lat": 12.912,
    "lng": 74.8679,
    "distance": "2.2 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-164-1",
        "name": "Authentic 24-Item Traditional Feast (Per Plate)",
        "price": 450,
        "duration": "60 mins"
      },
      {
        "id": "s-164-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 180,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Caterers provider in Falnir, Mangaluru. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-164",
    "name": "Nestaway Smart Executive Co-Living - Mangaluru",
    "category": "stays",
    "subcategory": "Co-living PGs",
    "city": "Mangaluru",
    "locality": "Valachil",
    "rating": 4.9,
    "reviewsCount": 281,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 8500,
    "priceRange": "₹₹₹",
    "responseTime": "~6 min",
    "trustScore": 92,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 344
    },
    "phone": "+91 9841339357",
    "whatsapp": "919839790851",
    "address": "89, Main Boulevard, Valachil, Mangaluru",
    "image": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    "lat": 12.9269,
    "lng": 74.8632,
    "distance": "2.0 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-165-1",
        "name": "Fully Furnished Single/Twin Room with High-Speed WiFi & Meals",
        "price": 8500,
        "duration": "60 mins"
      },
      {
        "id": "s-165-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 3400,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Co-living PGs provider in Valachil, Mangaluru. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-165",
    "name": "AutoCraft Multi-Brand Car Service Hub - Mangaluru",
    "category": "auto",
    "subcategory": "Multi-brand Garages",
    "city": "Mangaluru",
    "locality": "Kadri",
    "rating": 5,
    "reviewsCount": 627,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 1899,
    "priceRange": "₹₹",
    "responseTime": "~5 min",
    "trustScore": 93,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 201
    },
    "phone": "+91 9888822778",
    "whatsapp": "919860691801",
    "address": "47, Main Boulevard, Kadri, Mangaluru",
    "image": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80",
    "lat": 12.9056,
    "lng": 74.8383,
    "distance": "2.2 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-166-1",
        "name": "Comprehensive Periodic Engine Oil & Brake Overhaul",
        "price": 1899,
        "duration": "60 mins"
      },
      {
        "id": "s-166-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 760,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Multi-brand Garages provider in Kadri, Mangaluru. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-166",
    "name": "Envi Luxury Hair & Glow Studio - Mysuru",
    "category": "salon",
    "subcategory": "Unisex Salons",
    "city": "Mysuru",
    "locality": "Gokulam",
    "rating": 4.8,
    "reviewsCount": 516,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 499,
    "priceRange": "₹",
    "responseTime": "~6 min",
    "trustScore": 97,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 403
    },
    "phone": "+91 9890924697",
    "whatsapp": "919821990408",
    "address": "48, Main Boulevard, Gokulam, Mysuru",
    "image": "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
    "lat": 12.2901,
    "lng": 76.6273,
    "distance": "2.0 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-167-1",
        "name": "Signature Keratin Hair Spa & Scalp Detox",
        "price": 499,
        "duration": "60 mins"
      },
      {
        "id": "s-167-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 200,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Unisex Salons provider in Gokulam, Mysuru. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-167",
    "name": "Glamour Queen Bridal & Glow Lounge - Mysuru",
    "category": "salon",
    "subcategory": "Bridal Makeup",
    "city": "Mysuru",
    "locality": "Jayalakshmipuram",
    "rating": 4.8,
    "reviewsCount": 359,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 1200,
    "priceRange": "₹₹",
    "responseTime": "~12 min",
    "trustScore": 94,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 211
    },
    "phone": "+91 9884457644",
    "whatsapp": "919821506781",
    "address": "11, Main Boulevard, Jayalakshmipuram, Mysuru",
    "image": "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
    "lat": 12.2794,
    "lng": 76.6372,
    "distance": "2.6 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-168-1",
        "name": "HD Bridal Glow & Airbrush Makeup",
        "price": 1200,
        "duration": "60 mins"
      },
      {
        "id": "s-168-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 480,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Bridal Makeup provider in Jayalakshmipuram, Mysuru. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-168",
    "name": "Zenith Home Tutors & Academic Mentors - Mysuru",
    "category": "tutor",
    "subcategory": "Home Tutors (CBSE/ICSE)",
    "city": "Mysuru",
    "locality": "Vijayanagar",
    "rating": 4.8,
    "reviewsCount": 456,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 500,
    "priceRange": "₹",
    "responseTime": "~11 min",
    "trustScore": 94,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 193
    },
    "phone": "+91 9815722432",
    "whatsapp": "919839583803",
    "address": "72, Main Boulevard, Vijayanagar, Mysuru",
    "image": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
    "lat": 12.2597,
    "lng": 76.6672,
    "distance": "1.0 km",
    "homeService": true,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-169-1",
        "name": "Class 9-12 Maths & Science 1-on-1 Tutoring",
        "price": 500,
        "duration": "60 mins"
      },
      {
        "id": "s-169-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 200,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Home Tutors (CBSE/ICSE) provider in Vijayanagar, Mysuru. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-169",
    "name": "Edge Achievers NEET & JEE Foundation - Mysuru",
    "category": "tutor",
    "subcategory": "IIT-JEE/NEET Coaching",
    "city": "Mysuru",
    "locality": "Kuvempunagar",
    "rating": 5,
    "reviewsCount": 622,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 1500,
    "priceRange": "₹₹",
    "responseTime": "~10 min",
    "trustScore": 98,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 426
    },
    "phone": "+91 9821382459",
    "whatsapp": "919822076569",
    "address": "94, Main Boulevard, Kuvempunagar, Mysuru",
    "image": "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    "lat": 12.2578,
    "lng": 76.6181,
    "distance": "3.8 km",
    "homeService": true,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-170-1",
        "name": "Intensive Physics & Organic Chemistry Prep",
        "price": 1500,
        "duration": "60 mins"
      },
      {
        "id": "s-170-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 600,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified IIT-JEE/NEET Coaching provider in Kuvempunagar, Mysuru. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-170",
    "name": "Cinematic Memories Candid Wedding Films - Mysuru",
    "category": "events",
    "subcategory": "Wedding Photographers",
    "city": "Mysuru",
    "locality": "Gokulam",
    "rating": 4.6,
    "reviewsCount": 225,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 25000,
    "priceRange": "₹₹₹",
    "responseTime": "~14 min",
    "trustScore": 95,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 411
    },
    "phone": "+91 9818747458",
    "whatsapp": "919839484853",
    "address": "90, Main Boulevard, Gokulam, Mysuru",
    "image": "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    "lat": 12.3291,
    "lng": 76.6592,
    "distance": "1.9 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-171-1",
        "name": "Full Day Cinematic Drone & Candid 4K Coverage",
        "price": 25000,
        "duration": "60 mins"
      },
      {
        "id": "s-171-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 10000,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Wedding Photographers provider in Gokulam, Mysuru. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-171",
    "name": "Annapurna Royal Feasts & Catering - Mysuru",
    "category": "events",
    "subcategory": "Caterers",
    "city": "Mysuru",
    "locality": "Jayalakshmipuram",
    "rating": 4.6,
    "reviewsCount": 215,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 450,
    "priceRange": "₹",
    "responseTime": "~11 min",
    "trustScore": 92,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 277
    },
    "phone": "+91 9869523311",
    "whatsapp": "919894471603",
    "address": "52, Main Boulevard, Jayalakshmipuram, Mysuru",
    "image": "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
    "lat": 12.3252,
    "lng": 76.6513,
    "distance": "1.5 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-172-1",
        "name": "Authentic 24-Item Traditional Feast (Per Plate)",
        "price": 450,
        "duration": "60 mins"
      },
      {
        "id": "s-172-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 180,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Caterers provider in Jayalakshmipuram, Mysuru. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-172",
    "name": "Nestaway Smart Executive Co-Living - Mysuru",
    "category": "stays",
    "subcategory": "Co-living PGs",
    "city": "Mysuru",
    "locality": "Vijayanagar",
    "rating": 4.7,
    "reviewsCount": 203,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 8500,
    "priceRange": "₹₹₹",
    "responseTime": "~5 min",
    "trustScore": 96,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 160
    },
    "phone": "+91 9810976158",
    "whatsapp": "919898804355",
    "address": "44, Main Boulevard, Vijayanagar, Mysuru",
    "image": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    "lat": 12.3032,
    "lng": 76.6231,
    "distance": "2.9 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-173-1",
        "name": "Fully Furnished Single/Twin Room with High-Speed WiFi & Meals",
        "price": 8500,
        "duration": "60 mins"
      },
      {
        "id": "s-173-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 3400,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Co-living PGs provider in Vijayanagar, Mysuru. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-173",
    "name": "AutoCraft Multi-Brand Car Service Hub - Mysuru",
    "category": "auto",
    "subcategory": "Multi-brand Garages",
    "city": "Mysuru",
    "locality": "Kuvempunagar",
    "rating": 4.6,
    "reviewsCount": 437,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 1899,
    "priceRange": "₹₹",
    "responseTime": "~7 min",
    "trustScore": 97,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 296
    },
    "phone": "+91 9844386120",
    "whatsapp": "919819343979",
    "address": "63, Main Boulevard, Kuvempunagar, Mysuru",
    "image": "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80",
    "lat": 12.2978,
    "lng": 76.6445,
    "distance": "3.7 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-174-1",
        "name": "Comprehensive Periodic Engine Oil & Brake Overhaul",
        "price": 1899,
        "duration": "60 mins"
      },
      {
        "id": "s-174-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 760,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Multi-brand Garages provider in Kuvempunagar, Mysuru. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-174",
    "name": "Envi Luxury Hair & Glow Studio - Mumbai",
    "category": "salon",
    "subcategory": "Unisex Salons",
    "city": "Mumbai",
    "locality": "Bandra West",
    "rating": 4.7,
    "reviewsCount": 293,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 499,
    "priceRange": "₹",
    "responseTime": "~5 min",
    "trustScore": 94,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 396
    },
    "phone": "+91 9811536064",
    "whatsapp": "919834821865",
    "address": "91, Main Boulevard, Bandra West, Mumbai",
    "image": "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
    "lat": 19.0768,
    "lng": 72.8448,
    "distance": "2.8 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-175-1",
        "name": "Signature Keratin Hair Spa & Scalp Detox",
        "price": 499,
        "duration": "60 mins"
      },
      {
        "id": "s-175-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 200,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Unisex Salons provider in Bandra West, Mumbai. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-175",
    "name": "Glamour Queen Bridal & Glow Lounge - Mumbai",
    "category": "salon",
    "subcategory": "Bridal Makeup",
    "city": "Mumbai",
    "locality": "Andheri East",
    "rating": 4.6,
    "reviewsCount": 367,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 1200,
    "priceRange": "₹₹",
    "responseTime": "~11 min",
    "trustScore": 93,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 182
    },
    "phone": "+91 9829709054",
    "whatsapp": "919818392355",
    "address": "57, Main Boulevard, Andheri East, Mumbai",
    "image": "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
    "lat": 19.0489,
    "lng": 72.891,
    "distance": "1.5 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-176-1",
        "name": "HD Bridal Glow & Airbrush Makeup",
        "price": 1200,
        "duration": "60 mins"
      },
      {
        "id": "s-176-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 480,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Bridal Makeup provider in Andheri East, Mumbai. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-176",
    "name": "Zenith Home Tutors & Academic Mentors - Mumbai",
    "category": "tutor",
    "subcategory": "Home Tutors (CBSE/ICSE)",
    "city": "Mumbai",
    "locality": "Powai",
    "rating": 4.6,
    "reviewsCount": 316,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 500,
    "priceRange": "₹",
    "responseTime": "~14 min",
    "trustScore": 93,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 231
    },
    "phone": "+91 9810671780",
    "whatsapp": "919833832070",
    "address": "66, Main Boulevard, Powai, Mumbai",
    "image": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
    "lat": 19.1135,
    "lng": 72.8969,
    "distance": "3.2 km",
    "homeService": true,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-177-1",
        "name": "Class 9-12 Maths & Science 1-on-1 Tutoring",
        "price": 500,
        "duration": "60 mins"
      },
      {
        "id": "s-177-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 200,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Home Tutors (CBSE/ICSE) provider in Powai, Mumbai. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-177",
    "name": "Edge Achievers NEET & JEE Foundation - Mumbai",
    "category": "tutor",
    "subcategory": "IIT-JEE/NEET Coaching",
    "city": "Mumbai",
    "locality": "Juhu",
    "rating": 4.9,
    "reviewsCount": 300,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 1500,
    "priceRange": "₹₹",
    "responseTime": "~7 min",
    "trustScore": 94,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 163
    },
    "phone": "+91 9863178440",
    "whatsapp": "919827242469",
    "address": "95, Main Boulevard, Juhu, Mumbai",
    "image": "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    "lat": 19.0895,
    "lng": 72.8958,
    "distance": "2.0 km",
    "homeService": true,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-178-1",
        "name": "Intensive Physics & Organic Chemistry Prep",
        "price": 1500,
        "duration": "60 mins"
      },
      {
        "id": "s-178-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 600,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified IIT-JEE/NEET Coaching provider in Juhu, Mumbai. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-178",
    "name": "Cinematic Memories Candid Wedding Films - Mumbai",
    "category": "events",
    "subcategory": "Wedding Photographers",
    "city": "Mumbai",
    "locality": "Colaba",
    "rating": 4.9,
    "reviewsCount": 274,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 25000,
    "priceRange": "₹₹₹",
    "responseTime": "~11 min",
    "trustScore": 95,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 422
    },
    "phone": "+91 9849533345",
    "whatsapp": "919814858806",
    "address": "60, Main Boulevard, Colaba, Mumbai",
    "image": "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    "lat": 19.0511,
    "lng": 72.8871,
    "distance": "2.7 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-179-1",
        "name": "Full Day Cinematic Drone & Candid 4K Coverage",
        "price": 25000,
        "duration": "60 mins"
      },
      {
        "id": "s-179-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 10000,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Wedding Photographers provider in Colaba, Mumbai. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-179",
    "name": "Annapurna Royal Feasts & Catering - Mumbai",
    "category": "events",
    "subcategory": "Caterers",
    "city": "Mumbai",
    "locality": "Thane West",
    "rating": 4.9,
    "reviewsCount": 478,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 450,
    "priceRange": "₹",
    "responseTime": "~9 min",
    "trustScore": 96,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 247
    },
    "phone": "+91 9896936133",
    "whatsapp": "919830629069",
    "address": "36, Main Boulevard, Thane West, Mumbai",
    "image": "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
    "lat": 19.0795,
    "lng": 72.884,
    "distance": "3.4 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-180-1",
        "name": "Authentic 24-Item Traditional Feast (Per Plate)",
        "price": 450,
        "duration": "60 mins"
      },
      {
        "id": "s-180-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 180,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Caterers provider in Thane West, Mumbai. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-180",
    "name": "Nestaway Smart Executive Co-Living - Mumbai",
    "category": "stays",
    "subcategory": "Co-living PGs",
    "city": "Mumbai",
    "locality": "Bandra West",
    "rating": 5,
    "reviewsCount": 549,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 8500,
    "priceRange": "₹₹₹",
    "responseTime": "~6 min",
    "trustScore": 96,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 253
    },
    "phone": "+91 9816081532",
    "whatsapp": "919834810004",
    "address": "88, Main Boulevard, Bandra West, Mumbai",
    "image": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    "lat": 19.0635,
    "lng": 72.8658,
    "distance": "4.1 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-181-1",
        "name": "Fully Furnished Single/Twin Room with High-Speed WiFi & Meals",
        "price": 8500,
        "duration": "60 mins"
      },
      {
        "id": "s-181-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 3400,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Co-living PGs provider in Bandra West, Mumbai. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-181",
    "name": "AutoCraft Multi-Brand Car Service Hub - Mumbai",
    "category": "auto",
    "subcategory": "Multi-brand Garages",
    "city": "Mumbai",
    "locality": "Andheri East",
    "rating": 4.8,
    "reviewsCount": 410,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 1899,
    "priceRange": "₹₹",
    "responseTime": "~10 min",
    "trustScore": 96,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 357
    },
    "phone": "+91 9884729730",
    "whatsapp": "919887477277",
    "address": "49, Main Boulevard, Andheri East, Mumbai",
    "image": "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",
    "lat": 19.1043,
    "lng": 72.8383,
    "distance": "2.8 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-182-1",
        "name": "Comprehensive Periodic Engine Oil & Brake Overhaul",
        "price": 1899,
        "duration": "60 mins"
      },
      {
        "id": "s-182-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 760,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Multi-brand Garages provider in Andheri East, Mumbai. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-182",
    "name": "Envi Luxury Hair & Glow Studio - Delhi NCR",
    "category": "salon",
    "subcategory": "Unisex Salons",
    "city": "Delhi NCR",
    "locality": "Connaught Place",
    "rating": 4.9,
    "reviewsCount": 246,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 499,
    "priceRange": "₹",
    "responseTime": "~14 min",
    "trustScore": 93,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 430
    },
    "phone": "+91 9822708730",
    "whatsapp": "919826796120",
    "address": "86, Main Boulevard, Connaught Place, Delhi NCR",
    "image": "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
    "lat": 28.6108,
    "lng": 77.1867,
    "distance": "1.9 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-183-1",
        "name": "Signature Keratin Hair Spa & Scalp Detox",
        "price": 499,
        "duration": "60 mins"
      },
      {
        "id": "s-183-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 200,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Unisex Salons provider in Connaught Place, Delhi NCR. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-183",
    "name": "Glamour Queen Bridal & Glow Lounge - Delhi NCR",
    "category": "salon",
    "subcategory": "Bridal Makeup",
    "city": "Delhi NCR",
    "locality": "Hauz Khas",
    "rating": 4.7,
    "reviewsCount": 456,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 1200,
    "priceRange": "₹₹",
    "responseTime": "~12 min",
    "trustScore": 97,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 255
    },
    "phone": "+91 9890179584",
    "whatsapp": "919889931494",
    "address": "56, Main Boulevard, Hauz Khas, Delhi NCR",
    "image": "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
    "lat": 28.6371,
    "lng": 77.1806,
    "distance": "4.2 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-184-1",
        "name": "HD Bridal Glow & Airbrush Makeup",
        "price": 1200,
        "duration": "60 mins"
      },
      {
        "id": "s-184-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 480,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Bridal Makeup provider in Hauz Khas, Delhi NCR. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-184",
    "name": "Zenith Home Tutors & Academic Mentors - Delhi NCR",
    "category": "tutor",
    "subcategory": "Home Tutors (CBSE/ICSE)",
    "city": "Delhi NCR",
    "locality": "Saket",
    "rating": 4.9,
    "reviewsCount": 440,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 500,
    "priceRange": "₹",
    "responseTime": "~11 min",
    "trustScore": 98,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 296
    },
    "phone": "+91 9874797406",
    "whatsapp": "919843386019",
    "address": "77, Main Boulevard, Saket, Delhi NCR",
    "image": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
    "lat": 28.6237,
    "lng": 77.2479,
    "distance": "1.9 km",
    "homeService": true,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-185-1",
        "name": "Class 9-12 Maths & Science 1-on-1 Tutoring",
        "price": 500,
        "duration": "60 mins"
      },
      {
        "id": "s-185-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 200,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Home Tutors (CBSE/ICSE) provider in Saket, Delhi NCR. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-185",
    "name": "Edge Achievers NEET & JEE Foundation - Delhi NCR",
    "category": "tutor",
    "subcategory": "IIT-JEE/NEET Coaching",
    "city": "Delhi NCR",
    "locality": "Cyber Hub Gurgaon",
    "rating": 4.9,
    "reviewsCount": 353,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 1500,
    "priceRange": "₹₹",
    "responseTime": "~13 min",
    "trustScore": 92,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 438
    },
    "phone": "+91 9820300271",
    "whatsapp": "919811420207",
    "address": "47, Main Boulevard, Cyber Hub Gurgaon, Delhi NCR",
    "image": "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    "lat": 28.6233,
    "lng": 77.2054,
    "distance": "1.8 km",
    "homeService": true,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-186-1",
        "name": "Intensive Physics & Organic Chemistry Prep",
        "price": 1500,
        "duration": "60 mins"
      },
      {
        "id": "s-186-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 600,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified IIT-JEE/NEET Coaching provider in Cyber Hub Gurgaon, Delhi NCR. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-186",
    "name": "Cinematic Memories Candid Wedding Films - Delhi NCR",
    "category": "events",
    "subcategory": "Wedding Photographers",
    "city": "Delhi NCR",
    "locality": "Noida Sector 18",
    "rating": 4.9,
    "reviewsCount": 532,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 25000,
    "priceRange": "₹₹₹",
    "responseTime": "~5 min",
    "trustScore": 98,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 187
    },
    "phone": "+91 9854258129",
    "whatsapp": "919857531971",
    "address": "21, Main Boulevard, Noida Sector 18, Delhi NCR",
    "image": "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    "lat": 28.6513,
    "lng": 77.2351,
    "distance": "1.5 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-187-1",
        "name": "Full Day Cinematic Drone & Candid 4K Coverage",
        "price": 25000,
        "duration": "60 mins"
      },
      {
        "id": "s-187-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 10000,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Wedding Photographers provider in Noida Sector 18, Delhi NCR. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-187",
    "name": "Annapurna Royal Feasts & Catering - Delhi NCR",
    "category": "events",
    "subcategory": "Caterers",
    "city": "Delhi NCR",
    "locality": "Connaught Place",
    "rating": 5,
    "reviewsCount": 586,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 450,
    "priceRange": "₹",
    "responseTime": "~8 min",
    "trustScore": 96,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 355
    },
    "phone": "+91 9843133085",
    "whatsapp": "919867405262",
    "address": "50, Main Boulevard, Connaught Place, Delhi NCR",
    "image": "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
    "lat": 28.6446,
    "lng": 77.1756,
    "distance": "1.5 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-188-1",
        "name": "Authentic 24-Item Traditional Feast (Per Plate)",
        "price": 450,
        "duration": "60 mins"
      },
      {
        "id": "s-188-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 180,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Caterers provider in Connaught Place, Delhi NCR. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-188",
    "name": "Nestaway Smart Executive Co-Living - Delhi NCR",
    "category": "stays",
    "subcategory": "Co-living PGs",
    "city": "Delhi NCR",
    "locality": "Hauz Khas",
    "rating": 4.7,
    "reviewsCount": 272,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 8500,
    "priceRange": "₹₹₹",
    "responseTime": "~7 min",
    "trustScore": 93,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 348
    },
    "phone": "+91 9828473861",
    "whatsapp": "919834966021",
    "address": "43, Main Boulevard, Hauz Khas, Delhi NCR",
    "image": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    "lat": 28.599,
    "lng": 77.2281,
    "distance": "1.3 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-189-1",
        "name": "Fully Furnished Single/Twin Room with High-Speed WiFi & Meals",
        "price": 8500,
        "duration": "60 mins"
      },
      {
        "id": "s-189-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 3400,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Co-living PGs provider in Hauz Khas, Delhi NCR. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-189",
    "name": "AutoCraft Multi-Brand Car Service Hub - Delhi NCR",
    "category": "auto",
    "subcategory": "Multi-brand Garages",
    "city": "Delhi NCR",
    "locality": "Saket",
    "rating": 4.9,
    "reviewsCount": 528,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 1899,
    "priceRange": "₹₹",
    "responseTime": "~13 min",
    "trustScore": 96,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 384
    },
    "phone": "+91 9895280636",
    "whatsapp": "919819342703",
    "address": "63, Main Boulevard, Saket, Delhi NCR",
    "image": "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80",
    "lat": 28.653,
    "lng": 77.1719,
    "distance": "2.6 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-190-1",
        "name": "Comprehensive Periodic Engine Oil & Brake Overhaul",
        "price": 1899,
        "duration": "60 mins"
      },
      {
        "id": "s-190-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 760,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Multi-brand Garages provider in Saket, Delhi NCR. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-190",
    "name": "Envi Luxury Hair & Glow Studio - Hyderabad",
    "category": "salon",
    "subcategory": "Unisex Salons",
    "city": "Hyderabad",
    "locality": "Gachibowli",
    "rating": 4.8,
    "reviewsCount": 398,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 499,
    "priceRange": "₹",
    "responseTime": "~12 min",
    "trustScore": 95,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 427
    },
    "phone": "+91 9840192755",
    "whatsapp": "919857804884",
    "address": "30, Main Boulevard, Gachibowli, Hyderabad",
    "image": "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
    "lat": 17.3963,
    "lng": 78.4649,
    "distance": "5.0 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-191-1",
        "name": "Signature Keratin Hair Spa & Scalp Detox",
        "price": 499,
        "duration": "60 mins"
      },
      {
        "id": "s-191-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 200,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Unisex Salons provider in Gachibowli, Hyderabad. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-191",
    "name": "Glamour Queen Bridal & Glow Lounge - Hyderabad",
    "category": "salon",
    "subcategory": "Bridal Makeup",
    "city": "Hyderabad",
    "locality": "Hitec City",
    "rating": 5,
    "reviewsCount": 367,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 1200,
    "priceRange": "₹₹",
    "responseTime": "~9 min",
    "trustScore": 96,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 266
    },
    "phone": "+91 9891233597",
    "whatsapp": "919898232546",
    "address": "43, Main Boulevard, Hitec City, Hyderabad",
    "image": "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
    "lat": 17.3642,
    "lng": 78.4979,
    "distance": "4.8 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-192-1",
        "name": "HD Bridal Glow & Airbrush Makeup",
        "price": 1200,
        "duration": "60 mins"
      },
      {
        "id": "s-192-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 480,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Bridal Makeup provider in Hitec City, Hyderabad. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-192",
    "name": "Zenith Home Tutors & Academic Mentors - Hyderabad",
    "category": "tutor",
    "subcategory": "Home Tutors (CBSE/ICSE)",
    "city": "Hyderabad",
    "locality": "Banjara Hills",
    "rating": 4.9,
    "reviewsCount": 433,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 500,
    "priceRange": "₹",
    "responseTime": "~14 min",
    "trustScore": 97,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 207
    },
    "phone": "+91 9822964069",
    "whatsapp": "919898680716",
    "address": "27, Main Boulevard, Banjara Hills, Hyderabad",
    "image": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
    "lat": 17.4202,
    "lng": 78.4701,
    "distance": "1.4 km",
    "homeService": true,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-193-1",
        "name": "Class 9-12 Maths & Science 1-on-1 Tutoring",
        "price": 500,
        "duration": "60 mins"
      },
      {
        "id": "s-193-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 200,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Home Tutors (CBSE/ICSE) provider in Banjara Hills, Hyderabad. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-193",
    "name": "Edge Achievers NEET & JEE Foundation - Hyderabad",
    "category": "tutor",
    "subcategory": "IIT-JEE/NEET Coaching",
    "city": "Hyderabad",
    "locality": "Jubilee Hills",
    "rating": 4.8,
    "reviewsCount": 281,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 1500,
    "priceRange": "₹₹",
    "responseTime": "~11 min",
    "trustScore": 98,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 423
    },
    "phone": "+91 9878154994",
    "whatsapp": "919814739164",
    "address": "50, Main Boulevard, Jubilee Hills, Hyderabad",
    "image": "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    "lat": 17.4024,
    "lng": 78.5206,
    "distance": "2.1 km",
    "homeService": true,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-194-1",
        "name": "Intensive Physics & Organic Chemistry Prep",
        "price": 1500,
        "duration": "60 mins"
      },
      {
        "id": "s-194-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 600,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified IIT-JEE/NEET Coaching provider in Jubilee Hills, Hyderabad. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-194",
    "name": "Cinematic Memories Candid Wedding Films - Hyderabad",
    "category": "events",
    "subcategory": "Wedding Photographers",
    "city": "Hyderabad",
    "locality": "Madhapur",
    "rating": 4.8,
    "reviewsCount": 442,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 25000,
    "priceRange": "₹₹₹",
    "responseTime": "~10 min",
    "trustScore": 96,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 287
    },
    "phone": "+91 9892295933",
    "whatsapp": "919835462519",
    "address": "29, Main Boulevard, Madhapur, Hyderabad",
    "image": "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    "lat": 17.3656,
    "lng": 78.5143,
    "distance": "1.3 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-195-1",
        "name": "Full Day Cinematic Drone & Candid 4K Coverage",
        "price": 25000,
        "duration": "60 mins"
      },
      {
        "id": "s-195-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 10000,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Wedding Photographers provider in Madhapur, Hyderabad. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-195",
    "name": "Annapurna Royal Feasts & Catering - Hyderabad",
    "category": "events",
    "subcategory": "Caterers",
    "city": "Hyderabad",
    "locality": "Gachibowli",
    "rating": 4.9,
    "reviewsCount": 486,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 450,
    "priceRange": "₹",
    "responseTime": "~5 min",
    "trustScore": 97,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 371
    },
    "phone": "+91 9815532854",
    "whatsapp": "919888197296",
    "address": "96, Main Boulevard, Gachibowli, Hyderabad",
    "image": "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
    "lat": 17.4014,
    "lng": 78.4752,
    "distance": "4.6 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-196-1",
        "name": "Authentic 24-Item Traditional Feast (Per Plate)",
        "price": 450,
        "duration": "60 mins"
      },
      {
        "id": "s-196-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 180,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Caterers provider in Gachibowli, Hyderabad. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-196",
    "name": "Nestaway Smart Executive Co-Living - Hyderabad",
    "category": "stays",
    "subcategory": "Co-living PGs",
    "city": "Hyderabad",
    "locality": "Hitec City",
    "rating": 4.7,
    "reviewsCount": 545,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 8500,
    "priceRange": "₹₹₹",
    "responseTime": "~10 min",
    "trustScore": 96,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 282
    },
    "phone": "+91 9882910788",
    "whatsapp": "919884120875",
    "address": "53, Main Boulevard, Hitec City, Hyderabad",
    "image": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    "lat": 17.3675,
    "lng": 78.4861,
    "distance": "4.4 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-197-1",
        "name": "Fully Furnished Single/Twin Room with High-Speed WiFi & Meals",
        "price": 8500,
        "duration": "60 mins"
      },
      {
        "id": "s-197-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 3400,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Co-living PGs provider in Hitec City, Hyderabad. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-197",
    "name": "AutoCraft Multi-Brand Car Service Hub - Hyderabad",
    "category": "auto",
    "subcategory": "Multi-brand Garages",
    "city": "Hyderabad",
    "locality": "Banjara Hills",
    "rating": 4.8,
    "reviewsCount": 618,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 1899,
    "priceRange": "₹₹",
    "responseTime": "~10 min",
    "trustScore": 95,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 372
    },
    "phone": "+91 9867657960",
    "whatsapp": "919822615868",
    "address": "15, Main Boulevard, Banjara Hills, Hyderabad",
    "image": "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
    "lat": 17.3691,
    "lng": 78.5032,
    "distance": "2.5 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-198-1",
        "name": "Comprehensive Periodic Engine Oil & Brake Overhaul",
        "price": 1899,
        "duration": "60 mins"
      },
      {
        "id": "s-198-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 760,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Multi-brand Garages provider in Banjara Hills, Hyderabad. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-198",
    "name": "Envi Luxury Hair & Glow Studio - Pune",
    "category": "salon",
    "subcategory": "Unisex Salons",
    "city": "Pune",
    "locality": "Koregaon Park",
    "rating": 4.6,
    "reviewsCount": 531,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 499,
    "priceRange": "₹",
    "responseTime": "~9 min",
    "trustScore": 94,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 218
    },
    "phone": "+91 9877978790",
    "whatsapp": "919839309287",
    "address": "54, Main Boulevard, Koregaon Park, Pune",
    "image": "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
    "lat": 18.4887,
    "lng": 73.8301,
    "distance": "4.9 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-199-1",
        "name": "Signature Keratin Hair Spa & Scalp Detox",
        "price": 499,
        "duration": "60 mins"
      },
      {
        "id": "s-199-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 200,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Unisex Salons provider in Koregaon Park, Pune. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-199",
    "name": "Glamour Queen Bridal & Glow Lounge - Pune",
    "category": "salon",
    "subcategory": "Bridal Makeup",
    "city": "Pune",
    "locality": "Kothrud",
    "rating": 4.7,
    "reviewsCount": 543,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 1200,
    "priceRange": "₹₹",
    "responseTime": "~12 min",
    "trustScore": 97,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 157
    },
    "phone": "+91 9886104569",
    "whatsapp": "919883664595",
    "address": "40, Main Boulevard, Kothrud, Pune",
    "image": "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
    "lat": 18.5474,
    "lng": 73.8856,
    "distance": "2.7 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-200-1",
        "name": "HD Bridal Glow & Airbrush Makeup",
        "price": 1200,
        "duration": "60 mins"
      },
      {
        "id": "s-200-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 480,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Bridal Makeup provider in Kothrud, Pune. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-200",
    "name": "Zenith Home Tutors & Academic Mentors - Pune",
    "category": "tutor",
    "subcategory": "Home Tutors (CBSE/ICSE)",
    "city": "Pune",
    "locality": "Viman Nagar",
    "rating": 4.8,
    "reviewsCount": 591,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 500,
    "priceRange": "₹",
    "responseTime": "~13 min",
    "trustScore": 98,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 194
    },
    "phone": "+91 9870488462",
    "whatsapp": "919895912543",
    "address": "85, Main Boulevard, Viman Nagar, Pune",
    "image": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
    "lat": 18.5158,
    "lng": 73.8535,
    "distance": "3.2 km",
    "homeService": true,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-201-1",
        "name": "Class 9-12 Maths & Science 1-on-1 Tutoring",
        "price": 500,
        "duration": "60 mins"
      },
      {
        "id": "s-201-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 200,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Home Tutors (CBSE/ICSE) provider in Viman Nagar, Pune. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-207",
    "name": "Glamour Queen Bridal & Glow Lounge - Chennai",
    "category": "salon",
    "subcategory": "Bridal Makeup",
    "city": "Chennai",
    "locality": "Adyar",
    "rating": 4.7,
    "reviewsCount": 410,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 1200,
    "priceRange": "₹₹",
    "responseTime": "~10 min",
    "trustScore": 96,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 283
    },
    "phone": "+91 9836218587",
    "whatsapp": "919862503293",
    "address": "76, Main Boulevard, Adyar, Chennai",
    "image": "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
    "lat": 13.0765,
    "lng": 80.2892,
    "distance": "2.6 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-208-1",
        "name": "HD Bridal Glow & Airbrush Makeup",
        "price": 1200,
        "duration": "60 mins"
      },
      {
        "id": "s-208-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 480,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Bridal Makeup provider in Adyar, Chennai. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-208",
    "name": "Zenith Home Tutors & Academic Mentors - Chennai",
    "category": "tutor",
    "subcategory": "Home Tutors (CBSE/ICSE)",
    "city": "Chennai",
    "locality": "Anna Nagar",
    "rating": 4.9,
    "reviewsCount": 586,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 500,
    "priceRange": "₹",
    "responseTime": "~14 min",
    "trustScore": 96,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 315
    },
    "phone": "+91 9847165336",
    "whatsapp": "919840898454",
    "address": "75, Main Boulevard, Anna Nagar, Chennai",
    "image": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
    "lat": 13.0559,
    "lng": 80.2565,
    "distance": "3.4 km",
    "homeService": true,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-209-1",
        "name": "Class 9-12 Maths & Science 1-on-1 Tutoring",
        "price": 500,
        "duration": "60 mins"
      },
      {
        "id": "s-209-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 200,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Home Tutors (CBSE/ICSE) provider in Anna Nagar, Chennai. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-209",
    "name": "Edge Achievers NEET & JEE Foundation - Chennai",
    "category": "tutor",
    "subcategory": "IIT-JEE/NEET Coaching",
    "city": "Chennai",
    "locality": "Velachery",
    "rating": 4.6,
    "reviewsCount": 343,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 1500,
    "priceRange": "₹₹",
    "responseTime": "~14 min",
    "trustScore": 96,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 253
    },
    "phone": "+91 9859405574",
    "whatsapp": "919859646704",
    "address": "80, Main Boulevard, Velachery, Chennai",
    "image": "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",
    "lat": 13.1087,
    "lng": 80.2634,
    "distance": "1.7 km",
    "homeService": true,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-210-1",
        "name": "Intensive Physics & Organic Chemistry Prep",
        "price": 1500,
        "duration": "60 mins"
      },
      {
        "id": "s-210-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 600,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified IIT-JEE/NEET Coaching provider in Velachery, Chennai. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-210",
    "name": "Cinematic Memories Candid Wedding Films - Chennai",
    "category": "events",
    "subcategory": "Wedding Photographers",
    "city": "Chennai",
    "locality": "Nungambakkam",
    "rating": 4.8,
    "reviewsCount": 249,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 25000,
    "priceRange": "₹₹₹",
    "responseTime": "~12 min",
    "trustScore": 96,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 271
    },
    "phone": "+91 9893082561",
    "whatsapp": "919815475005",
    "address": "67, Main Boulevard, Nungambakkam, Chennai",
    "image": "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80",
    "lat": 13.1032,
    "lng": 80.2734,
    "distance": "2.8 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-211-1",
        "name": "Full Day Cinematic Drone & Candid 4K Coverage",
        "price": 25000,
        "duration": "60 mins"
      },
      {
        "id": "s-211-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 10000,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Wedding Photographers provider in Nungambakkam, Chennai. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-211",
    "name": "Annapurna Royal Feasts & Catering - Chennai",
    "category": "events",
    "subcategory": "Caterers",
    "city": "Chennai",
    "locality": "T Nagar",
    "rating": 4.9,
    "reviewsCount": 228,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 450,
    "priceRange": "₹",
    "responseTime": "~6 min",
    "trustScore": 97,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 393
    },
    "phone": "+91 9841283915",
    "whatsapp": "919877919113",
    "address": "66, Main Boulevard, T Nagar, Chennai",
    "image": "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
    "lat": 13.0482,
    "lng": 80.3033,
    "distance": "0.8 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-212-1",
        "name": "Authentic 24-Item Traditional Feast (Per Plate)",
        "price": 450,
        "duration": "60 mins"
      },
      {
        "id": "s-212-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 180,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Caterers provider in T Nagar, Chennai. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-212",
    "name": "Nestaway Smart Executive Co-Living - Chennai",
    "category": "stays",
    "subcategory": "Co-living PGs",
    "city": "Chennai",
    "locality": "Adyar",
    "rating": 4.7,
    "reviewsCount": 459,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 8500,
    "priceRange": "₹₹₹",
    "responseTime": "~10 min",
    "trustScore": 93,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 282
    },
    "phone": "+91 9893685817",
    "whatsapp": "919874593559",
    "address": "14, Main Boulevard, Adyar, Chennai",
    "image": "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
    "lat": 13.0761,
    "lng": 80.2468,
    "distance": "2.1 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-213-1",
        "name": "Fully Furnished Single/Twin Room with High-Speed WiFi & Meals",
        "price": 8500,
        "duration": "60 mins"
      },
      {
        "id": "s-213-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 3400,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Co-living PGs provider in Adyar, Chennai. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-213",
    "name": "AutoCraft Multi-Brand Car Service Hub - Chennai",
    "category": "auto",
    "subcategory": "Multi-brand Garages",
    "city": "Chennai",
    "locality": "Anna Nagar",
    "rating": 5,
    "reviewsCount": 479,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 1899,
    "priceRange": "₹₹",
    "responseTime": "~12 min",
    "trustScore": 96,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 429
    },
    "phone": "+91 9896185144",
    "whatsapp": "919813732230",
    "address": "84, Main Boulevard, Anna Nagar, Chennai",
    "image": "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
    "lat": 13.0505,
    "lng": 80.2434,
    "distance": "1.4 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-214-1",
        "name": "Comprehensive Periodic Engine Oil & Brake Overhaul",
        "price": 1899,
        "duration": "60 mins"
      },
      {
        "id": "s-214-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 760,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Multi-brand Garages provider in Anna Nagar, Chennai. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-214",
    "name": "Envi Luxury Hair & Glow Studio - Kochi",
    "category": "salon",
    "subcategory": "Unisex Salons",
    "city": "Kochi",
    "locality": "Panampilly Nagar",
    "rating": 4.7,
    "reviewsCount": 233,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 499,
    "priceRange": "₹",
    "responseTime": "~13 min",
    "trustScore": 94,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 312
    },
    "phone": "+91 9895574903",
    "whatsapp": "919824377652",
    "address": "11, Main Boulevard, Panampilly Nagar, Kochi",
    "image": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    "lat": 9.9675,
    "lng": 76.2444,
    "distance": "1.4 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-215-1",
        "name": "Signature Keratin Hair Spa & Scalp Detox",
        "price": 499,
        "duration": "60 mins"
      },
      {
        "id": "s-215-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 200,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Unisex Salons provider in Panampilly Nagar, Kochi. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-215",
    "name": "Glamour Queen Bridal & Glow Lounge - Kochi",
    "category": "salon",
    "subcategory": "Bridal Makeup",
    "city": "Kochi",
    "locality": "Kakkanad",
    "rating": 4.7,
    "reviewsCount": 628,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 1200,
    "priceRange": "₹₹",
    "responseTime": "~13 min",
    "trustScore": 95,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 292
    },
    "phone": "+91 9818146223",
    "whatsapp": "919839024454",
    "address": "14, Main Boulevard, Kakkanad, Kochi",
    "image": "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
    "lat": 9.9054,
    "lng": 76.307,
    "distance": "3.6 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-216-1",
        "name": "HD Bridal Glow & Airbrush Makeup",
        "price": 1200,
        "duration": "60 mins"
      },
      {
        "id": "s-216-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 480,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Bridal Makeup provider in Kakkanad, Kochi. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-216",
    "name": "Zenith Home Tutors & Academic Mentors - Kochi",
    "category": "tutor",
    "subcategory": "Home Tutors (CBSE/ICSE)",
    "city": "Kochi",
    "locality": "Fort Kochi",
    "rating": 4.9,
    "reviewsCount": 304,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 500,
    "priceRange": "₹",
    "responseTime": "~13 min",
    "trustScore": 95,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 232
    },
    "phone": "+91 9818687007",
    "whatsapp": "919851167006",
    "address": "81, Main Boulevard, Fort Kochi, Kochi",
    "image": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
    "lat": 9.9668,
    "lng": 76.2792,
    "distance": "2.2 km",
    "homeService": true,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-217-1",
        "name": "Class 9-12 Maths & Science 1-on-1 Tutoring",
        "price": 500,
        "duration": "60 mins"
      },
      {
        "id": "s-217-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 200,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Home Tutors (CBSE/ICSE) provider in Fort Kochi, Kochi. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-217",
    "name": "Edge Achievers NEET & JEE Foundation - Kochi",
    "category": "tutor",
    "subcategory": "IIT-JEE/NEET Coaching",
    "city": "Kochi",
    "locality": "Marine Drive",
    "rating": 4.7,
    "reviewsCount": 560,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 1500,
    "priceRange": "₹₹",
    "responseTime": "~13 min",
    "trustScore": 97,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 278
    },
    "phone": "+91 9896274714",
    "whatsapp": "919852351649",
    "address": "81, Main Boulevard, Marine Drive, Kochi",
    "image": "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",
    "lat": 9.9336,
    "lng": 76.3052,
    "distance": "4.2 km",
    "homeService": true,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-218-1",
        "name": "Intensive Physics & Organic Chemistry Prep",
        "price": 1500,
        "duration": "60 mins"
      },
      {
        "id": "s-218-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 600,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified IIT-JEE/NEET Coaching provider in Marine Drive, Kochi. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-218",
    "name": "Cinematic Memories Candid Wedding Films - Kochi",
    "category": "events",
    "subcategory": "Wedding Photographers",
    "city": "Kochi",
    "locality": "Panampilly Nagar",
    "rating": 4.9,
    "reviewsCount": 503,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 25000,
    "priceRange": "₹₹₹",
    "responseTime": "~14 min",
    "trustScore": 94,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 159
    },
    "phone": "+91 9881995473",
    "whatsapp": "919866811476",
    "address": "40, Main Boulevard, Panampilly Nagar, Kochi",
    "image": "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80",
    "lat": 9.9399,
    "lng": 76.2813,
    "distance": "1.7 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-219-1",
        "name": "Full Day Cinematic Drone & Candid 4K Coverage",
        "price": 25000,
        "duration": "60 mins"
      },
      {
        "id": "s-219-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 10000,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Wedding Photographers provider in Panampilly Nagar, Kochi. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-219",
    "name": "Annapurna Royal Feasts & Catering - Kochi",
    "category": "events",
    "subcategory": "Caterers",
    "city": "Kochi",
    "locality": "Kakkanad",
    "rating": 4.8,
    "reviewsCount": 521,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 450,
    "priceRange": "₹",
    "responseTime": "~6 min",
    "trustScore": 97,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 433
    },
    "phone": "+91 9875389787",
    "whatsapp": "919825903990",
    "address": "60, Main Boulevard, Kakkanad, Kochi",
    "image": "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
    "lat": 9.9377,
    "lng": 76.2504,
    "distance": "4.2 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-220-1",
        "name": "Authentic 24-Item Traditional Feast (Per Plate)",
        "price": 450,
        "duration": "60 mins"
      },
      {
        "id": "s-220-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 180,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Caterers provider in Kakkanad, Kochi. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-220",
    "name": "Nestaway Smart Executive Co-Living - Kochi",
    "category": "stays",
    "subcategory": "Co-living PGs",
    "city": "Kochi",
    "locality": "Fort Kochi",
    "rating": 4.7,
    "reviewsCount": 312,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 8500,
    "priceRange": "₹₹₹",
    "responseTime": "~9 min",
    "trustScore": 96,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 362
    },
    "phone": "+91 9864528264",
    "whatsapp": "919815518034",
    "address": "33, Main Boulevard, Fort Kochi, Kochi",
    "image": "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
    "lat": 9.904,
    "lng": 76.2498,
    "distance": "1.8 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-221-1",
        "name": "Fully Furnished Single/Twin Room with High-Speed WiFi & Meals",
        "price": 8500,
        "duration": "60 mins"
      },
      {
        "id": "s-221-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 3400,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Co-living PGs provider in Fort Kochi, Kochi. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-221",
    "name": "AutoCraft Multi-Brand Car Service Hub - Kochi",
    "category": "auto",
    "subcategory": "Multi-brand Garages",
    "city": "Kochi",
    "locality": "Marine Drive",
    "rating": 4.9,
    "reviewsCount": 200,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 1899,
    "priceRange": "₹₹",
    "responseTime": "~10 min",
    "trustScore": 94,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 419
    },
    "phone": "+91 9859304955",
    "whatsapp": "919812772314",
    "address": "93, Main Boulevard, Marine Drive, Kochi",
    "image": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80",
    "lat": 9.9195,
    "lng": 76.2843,
    "distance": "1.6 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-222-1",
        "name": "Comprehensive Periodic Engine Oil & Brake Overhaul",
        "price": 1899,
        "duration": "60 mins"
      },
      {
        "id": "s-222-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 760,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Multi-brand Garages provider in Marine Drive, Kochi. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-222",
    "name": "Envi Luxury Hair & Glow Studio - Ahmedabad",
    "category": "salon",
    "subcategory": "Unisex Salons",
    "city": "Ahmedabad",
    "locality": "Satellite",
    "rating": 4.9,
    "reviewsCount": 544,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 499,
    "priceRange": "₹",
    "responseTime": "~6 min",
    "trustScore": 98,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 281
    },
    "phone": "+91 9826741025",
    "whatsapp": "919870066781",
    "address": "72, Main Boulevard, Satellite, Ahmedabad",
    "image": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    "lat": 22.9982,
    "lng": 72.5356,
    "distance": "4.0 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-223-1",
        "name": "Signature Keratin Hair Spa & Scalp Detox",
        "price": 499,
        "duration": "60 mins"
      },
      {
        "id": "s-223-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 200,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Unisex Salons provider in Satellite, Ahmedabad. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-223",
    "name": "Glamour Queen Bridal & Glow Lounge - Ahmedabad",
    "category": "salon",
    "subcategory": "Bridal Makeup",
    "city": "Ahmedabad",
    "locality": "Bodakdev",
    "rating": 4.7,
    "reviewsCount": 541,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 1200,
    "priceRange": "₹₹",
    "responseTime": "~5 min",
    "trustScore": 96,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 285
    },
    "phone": "+91 9893238732",
    "whatsapp": "919824910707",
    "address": "79, Main Boulevard, Bodakdev, Ahmedabad",
    "image": "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
    "lat": 23.0366,
    "lng": 72.5377,
    "distance": "2.9 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-224-1",
        "name": "HD Bridal Glow & Airbrush Makeup",
        "price": 1200,
        "duration": "60 mins"
      },
      {
        "id": "s-224-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 480,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Bridal Makeup provider in Bodakdev, Ahmedabad. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-224",
    "name": "Zenith Home Tutors & Academic Mentors - Ahmedabad",
    "category": "tutor",
    "subcategory": "Home Tutors (CBSE/ICSE)",
    "city": "Ahmedabad",
    "locality": "SG Highway",
    "rating": 4.7,
    "reviewsCount": 539,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 500,
    "priceRange": "₹",
    "responseTime": "~13 min",
    "trustScore": 95,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 196
    },
    "phone": "+91 9868804266",
    "whatsapp": "919857321870",
    "address": "79, Main Boulevard, SG Highway, Ahmedabad",
    "image": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
    "lat": 22.9962,
    "lng": 72.5537,
    "distance": "2.9 km",
    "homeService": true,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-225-1",
        "name": "Class 9-12 Maths & Science 1-on-1 Tutoring",
        "price": 500,
        "duration": "60 mins"
      },
      {
        "id": "s-225-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 200,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Home Tutors (CBSE/ICSE) provider in SG Highway, Ahmedabad. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-225",
    "name": "Edge Achievers NEET & JEE Foundation - Ahmedabad",
    "category": "tutor",
    "subcategory": "IIT-JEE/NEET Coaching",
    "city": "Ahmedabad",
    "locality": "Navrangpura",
    "rating": 4.6,
    "reviewsCount": 239,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 1500,
    "priceRange": "₹₹",
    "responseTime": "~8 min",
    "trustScore": 94,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 415
    },
    "phone": "+91 9859682398",
    "whatsapp": "919886416163",
    "address": "59, Main Boulevard, Navrangpura, Ahmedabad",
    "image": "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",
    "lat": 22.9878,
    "lng": 72.5995,
    "distance": "1.3 km",
    "homeService": true,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-226-1",
        "name": "Intensive Physics & Organic Chemistry Prep",
        "price": 1500,
        "duration": "60 mins"
      },
      {
        "id": "s-226-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 600,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified IIT-JEE/NEET Coaching provider in Navrangpura, Ahmedabad. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-226",
    "name": "Cinematic Memories Candid Wedding Films - Ahmedabad",
    "category": "events",
    "subcategory": "Wedding Photographers",
    "city": "Ahmedabad",
    "locality": "Satellite",
    "rating": 4.7,
    "reviewsCount": 556,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 25000,
    "priceRange": "₹₹₹",
    "responseTime": "~13 min",
    "trustScore": 97,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 297
    },
    "phone": "+91 9826181959",
    "whatsapp": "919835799547",
    "address": "43, Main Boulevard, Satellite, Ahmedabad",
    "image": "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80",
    "lat": 23.0515,
    "lng": 72.5348,
    "distance": "1.4 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-227-1",
        "name": "Full Day Cinematic Drone & Candid 4K Coverage",
        "price": 25000,
        "duration": "60 mins"
      },
      {
        "id": "s-227-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 10000,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Wedding Photographers provider in Satellite, Ahmedabad. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-227",
    "name": "Annapurna Royal Feasts & Catering - Ahmedabad",
    "category": "events",
    "subcategory": "Caterers",
    "city": "Ahmedabad",
    "locality": "Bodakdev",
    "rating": 4.8,
    "reviewsCount": 510,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 450,
    "priceRange": "₹",
    "responseTime": "~13 min",
    "trustScore": 97,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 412
    },
    "phone": "+91 9890645982",
    "whatsapp": "919825380141",
    "address": "96, Main Boulevard, Bodakdev, Ahmedabad",
    "image": "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
    "lat": 23.0586,
    "lng": 72.5547,
    "distance": "4.6 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-228-1",
        "name": "Authentic 24-Item Traditional Feast (Per Plate)",
        "price": 450,
        "duration": "60 mins"
      },
      {
        "id": "s-228-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 180,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Caterers provider in Bodakdev, Ahmedabad. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-228",
    "name": "Nestaway Smart Executive Co-Living - Ahmedabad",
    "category": "stays",
    "subcategory": "Co-living PGs",
    "city": "Ahmedabad",
    "locality": "SG Highway",
    "rating": 4.6,
    "reviewsCount": 615,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 8500,
    "priceRange": "₹₹₹",
    "responseTime": "~12 min",
    "trustScore": 98,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 418
    },
    "phone": "+91 9841544379",
    "whatsapp": "919832315179",
    "address": "12, Main Boulevard, SG Highway, Ahmedabad",
    "image": "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
    "lat": 23.0572,
    "lng": 72.5906,
    "distance": "3.4 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-229-1",
        "name": "Fully Furnished Single/Twin Room with High-Speed WiFi & Meals",
        "price": 8500,
        "duration": "60 mins"
      },
      {
        "id": "s-229-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 3400,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Co-living PGs provider in SG Highway, Ahmedabad. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-229",
    "name": "AutoCraft Multi-Brand Car Service Hub - Ahmedabad",
    "category": "auto",
    "subcategory": "Multi-brand Garages",
    "city": "Ahmedabad",
    "locality": "Navrangpura",
    "rating": 4.7,
    "reviewsCount": 354,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 1899,
    "priceRange": "₹₹",
    "responseTime": "~5 min",
    "trustScore": 97,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 258
    },
    "phone": "+91 9893949783",
    "whatsapp": "919826496160",
    "address": "75, Main Boulevard, Navrangpura, Ahmedabad",
    "image": "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80",
    "lat": 23.0129,
    "lng": 72.5978,
    "distance": "1.5 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-230-1",
        "name": "Comprehensive Periodic Engine Oil & Brake Overhaul",
        "price": 1899,
        "duration": "60 mins"
      },
      {
        "id": "s-230-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 760,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Multi-brand Garages provider in Navrangpura, Ahmedabad. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-230",
    "name": "Envi Luxury Hair & Glow Studio - Kolkata",
    "category": "salon",
    "subcategory": "Unisex Salons",
    "city": "Kolkata",
    "locality": "Park Street",
    "rating": 4.8,
    "reviewsCount": 451,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 499,
    "priceRange": "₹",
    "responseTime": "~9 min",
    "trustScore": 92,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 355
    },
    "phone": "+91 9849676413",
    "whatsapp": "919840595877",
    "address": "16, Main Boulevard, Park Street, Kolkata",
    "image": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    "lat": 22.5885,
    "lng": 88.3282,
    "distance": "3.9 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-231-1",
        "name": "Signature Keratin Hair Spa & Scalp Detox",
        "price": 499,
        "duration": "60 mins"
      },
      {
        "id": "s-231-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 200,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Unisex Salons provider in Park Street, Kolkata. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-231",
    "name": "Glamour Queen Bridal & Glow Lounge - Kolkata",
    "category": "salon",
    "subcategory": "Bridal Makeup",
    "city": "Kolkata",
    "locality": "Salt Lake",
    "rating": 4.7,
    "reviewsCount": 240,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 1200,
    "priceRange": "₹₹",
    "responseTime": "~10 min",
    "trustScore": 94,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 422
    },
    "phone": "+91 9845218872",
    "whatsapp": "919866783299",
    "address": "37, Main Boulevard, Salt Lake, Kolkata",
    "image": "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
    "lat": 22.5476,
    "lng": 88.3937,
    "distance": "1.2 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-232-1",
        "name": "HD Bridal Glow & Airbrush Makeup",
        "price": 1200,
        "duration": "60 mins"
      },
      {
        "id": "s-232-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 480,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Bridal Makeup provider in Salt Lake, Kolkata. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-232",
    "name": "Zenith Home Tutors & Academic Mentors - Kolkata",
    "category": "tutor",
    "subcategory": "Home Tutors (CBSE/ICSE)",
    "city": "Kolkata",
    "locality": "New Town",
    "rating": 4.9,
    "reviewsCount": 381,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 500,
    "priceRange": "₹",
    "responseTime": "~14 min",
    "trustScore": 94,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 176
    },
    "phone": "+91 9815537713",
    "whatsapp": "919835356040",
    "address": "73, Main Boulevard, New Town, Kolkata",
    "image": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
    "lat": 22.5618,
    "lng": 88.3891,
    "distance": "4.3 km",
    "homeService": true,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-233-1",
        "name": "Class 9-12 Maths & Science 1-on-1 Tutoring",
        "price": 500,
        "duration": "60 mins"
      },
      {
        "id": "s-233-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 200,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Home Tutors (CBSE/ICSE) provider in New Town, Kolkata. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-233",
    "name": "Edge Achievers NEET & JEE Foundation - Kolkata",
    "category": "tutor",
    "subcategory": "IIT-JEE/NEET Coaching",
    "city": "Kolkata",
    "locality": "Ballygunge",
    "rating": 4.9,
    "reviewsCount": 545,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 1500,
    "priceRange": "₹₹",
    "responseTime": "~13 min",
    "trustScore": 94,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 398
    },
    "phone": "+91 9839415870",
    "whatsapp": "919876487746",
    "address": "66, Main Boulevard, Ballygunge, Kolkata",
    "image": "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",
    "lat": 22.5476,
    "lng": 88.3879,
    "distance": "2.7 km",
    "homeService": true,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-234-1",
        "name": "Intensive Physics & Organic Chemistry Prep",
        "price": 1500,
        "duration": "60 mins"
      },
      {
        "id": "s-234-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 600,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified IIT-JEE/NEET Coaching provider in Ballygunge, Kolkata. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-234",
    "name": "Cinematic Memories Candid Wedding Films - Kolkata",
    "category": "events",
    "subcategory": "Wedding Photographers",
    "city": "Kolkata",
    "locality": "Park Street",
    "rating": 4.7,
    "reviewsCount": 610,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 25000,
    "priceRange": "₹₹₹",
    "responseTime": "~9 min",
    "trustScore": 93,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 179
    },
    "phone": "+91 9833651638",
    "whatsapp": "919816729729",
    "address": "90, Main Boulevard, Park Street, Kolkata",
    "image": "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80",
    "lat": 22.5672,
    "lng": 88.3243,
    "distance": "4.1 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-235-1",
        "name": "Full Day Cinematic Drone & Candid 4K Coverage",
        "price": 25000,
        "duration": "60 mins"
      },
      {
        "id": "s-235-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 10000,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Wedding Photographers provider in Park Street, Kolkata. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-235",
    "name": "Annapurna Royal Feasts & Catering - Kolkata",
    "category": "events",
    "subcategory": "Caterers",
    "city": "Kolkata",
    "locality": "Salt Lake",
    "rating": 4.8,
    "reviewsCount": 602,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 450,
    "priceRange": "₹",
    "responseTime": "~7 min",
    "trustScore": 93,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 387
    },
    "phone": "+91 9849010214",
    "whatsapp": "919877108472",
    "address": "34, Main Boulevard, Salt Lake, Kolkata",
    "image": "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
    "lat": 22.5646,
    "lng": 88.3462,
    "distance": "2.6 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-236-1",
        "name": "Authentic 24-Item Traditional Feast (Per Plate)",
        "price": 450,
        "duration": "60 mins"
      },
      {
        "id": "s-236-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 180,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Caterers provider in Salt Lake, Kolkata. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-236",
    "name": "Nestaway Smart Executive Co-Living - Kolkata",
    "category": "stays",
    "subcategory": "Co-living PGs",
    "city": "Kolkata",
    "locality": "New Town",
    "rating": 4.7,
    "reviewsCount": 281,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 8500,
    "priceRange": "₹₹₹",
    "responseTime": "~7 min",
    "trustScore": 96,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 387
    },
    "phone": "+91 9867515679",
    "whatsapp": "919864915149",
    "address": "32, Main Boulevard, New Town, Kolkata",
    "image": "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
    "lat": 22.61,
    "lng": 88.3627,
    "distance": "3.3 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-237-1",
        "name": "Fully Furnished Single/Twin Room with High-Speed WiFi & Meals",
        "price": 8500,
        "duration": "60 mins"
      },
      {
        "id": "s-237-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 3400,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Co-living PGs provider in New Town, Kolkata. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-237",
    "name": "AutoCraft Multi-Brand Car Service Hub - Kolkata",
    "category": "auto",
    "subcategory": "Multi-brand Garages",
    "city": "Kolkata",
    "locality": "Ballygunge",
    "rating": 4.7,
    "reviewsCount": 590,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 1899,
    "priceRange": "₹₹",
    "responseTime": "~6 min",
    "trustScore": 95,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 189
    },
    "phone": "+91 9836781372",
    "whatsapp": "919815249484",
    "address": "81, Main Boulevard, Ballygunge, Kolkata",
    "image": "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",
    "lat": 22.5756,
    "lng": 88.39,
    "distance": "3.7 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-238-1",
        "name": "Comprehensive Periodic Engine Oil & Brake Overhaul",
        "price": 1899,
        "duration": "60 mins"
      },
      {
        "id": "s-238-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 760,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Multi-brand Garages provider in Ballygunge, Kolkata. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-238",
    "name": "Envi Luxury Hair & Glow Studio - Jaipur",
    "category": "salon",
    "subcategory": "Unisex Salons",
    "city": "Jaipur",
    "locality": "C-Scheme",
    "rating": 4.9,
    "reviewsCount": 270,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 499,
    "priceRange": "₹",
    "responseTime": "~13 min",
    "trustScore": 97,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 181
    },
    "phone": "+91 9866975080",
    "whatsapp": "919851116888",
    "address": "71, Main Boulevard, C-Scheme, Jaipur",
    "image": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    "lat": 26.9244,
    "lng": 75.7827,
    "distance": "3.1 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-239-1",
        "name": "Signature Keratin Hair Spa & Scalp Detox",
        "price": 499,
        "duration": "60 mins"
      },
      {
        "id": "s-239-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 200,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Unisex Salons provider in C-Scheme, Jaipur. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-239",
    "name": "Glamour Queen Bridal & Glow Lounge - Jaipur",
    "category": "salon",
    "subcategory": "Bridal Makeup",
    "city": "Jaipur",
    "locality": "Malviya Nagar",
    "rating": 4.9,
    "reviewsCount": 506,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 1200,
    "priceRange": "₹₹",
    "responseTime": "~9 min",
    "trustScore": 96,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 287
    },
    "phone": "+91 9829623275",
    "whatsapp": "919861717139",
    "address": "94, Main Boulevard, Malviya Nagar, Jaipur",
    "image": "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
    "lat": 26.9117,
    "lng": 75.7598,
    "distance": "3.1 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-240-1",
        "name": "HD Bridal Glow & Airbrush Makeup",
        "price": 1200,
        "duration": "60 mins"
      },
      {
        "id": "s-240-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 480,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Bridal Makeup provider in Malviya Nagar, Jaipur. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-240",
    "name": "Zenith Home Tutors & Academic Mentors - Jaipur",
    "category": "tutor",
    "subcategory": "Home Tutors (CBSE/ICSE)",
    "city": "Jaipur",
    "locality": "Vaishali Nagar",
    "rating": 4.9,
    "reviewsCount": 187,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 500,
    "priceRange": "₹",
    "responseTime": "~7 min",
    "trustScore": 98,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 191
    },
    "phone": "+91 9836630158",
    "whatsapp": "919890261730",
    "address": "71, Main Boulevard, Vaishali Nagar, Jaipur",
    "image": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
    "lat": 26.9185,
    "lng": 75.7563,
    "distance": "4.6 km",
    "homeService": true,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-241-1",
        "name": "Class 9-12 Maths & Science 1-on-1 Tutoring",
        "price": 500,
        "duration": "60 mins"
      },
      {
        "id": "s-241-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 200,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Home Tutors (CBSE/ICSE) provider in Vaishali Nagar, Jaipur. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-241",
    "name": "Edge Achievers NEET & JEE Foundation - Jaipur",
    "category": "tutor",
    "subcategory": "IIT-JEE/NEET Coaching",
    "city": "Jaipur",
    "locality": "Raja Park",
    "rating": 4.9,
    "reviewsCount": 228,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 1500,
    "priceRange": "₹₹",
    "responseTime": "~10 min",
    "trustScore": 94,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 441
    },
    "phone": "+91 9812229556",
    "whatsapp": "919817541287",
    "address": "70, Main Boulevard, Raja Park, Jaipur",
    "image": "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",
    "lat": 26.8768,
    "lng": 75.7477,
    "distance": "2.3 km",
    "homeService": true,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-242-1",
        "name": "Intensive Physics & Organic Chemistry Prep",
        "price": 1500,
        "duration": "60 mins"
      },
      {
        "id": "s-242-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 600,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified IIT-JEE/NEET Coaching provider in Raja Park, Jaipur. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-242",
    "name": "Cinematic Memories Candid Wedding Films - Jaipur",
    "category": "events",
    "subcategory": "Wedding Photographers",
    "city": "Jaipur",
    "locality": "C-Scheme",
    "rating": 4.9,
    "reviewsCount": 485,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 25000,
    "priceRange": "₹₹₹",
    "responseTime": "~9 min",
    "trustScore": 97,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 217
    },
    "phone": "+91 9818468076",
    "whatsapp": "919872657266",
    "address": "55, Main Boulevard, C-Scheme, Jaipur",
    "image": "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80",
    "lat": 26.9335,
    "lng": 75.8161,
    "distance": "4.2 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-243-1",
        "name": "Full Day Cinematic Drone & Candid 4K Coverage",
        "price": 25000,
        "duration": "60 mins"
      },
      {
        "id": "s-243-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 10000,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Wedding Photographers provider in C-Scheme, Jaipur. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-243",
    "name": "Annapurna Royal Feasts & Catering - Jaipur",
    "category": "events",
    "subcategory": "Caterers",
    "city": "Jaipur",
    "locality": "Malviya Nagar",
    "rating": 4.9,
    "reviewsCount": 479,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 450,
    "priceRange": "₹",
    "responseTime": "~5 min",
    "trustScore": 92,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 329
    },
    "phone": "+91 9816560045",
    "whatsapp": "919829272398",
    "address": "38, Main Boulevard, Malviya Nagar, Jaipur",
    "image": "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
    "lat": 26.9417,
    "lng": 75.7735,
    "distance": "3.9 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-244-1",
        "name": "Authentic 24-Item Traditional Feast (Per Plate)",
        "price": 450,
        "duration": "60 mins"
      },
      {
        "id": "s-244-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 180,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Caterers provider in Malviya Nagar, Jaipur. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-244",
    "name": "Nestaway Smart Executive Co-Living - Jaipur",
    "category": "stays",
    "subcategory": "Co-living PGs",
    "city": "Jaipur",
    "locality": "Vaishali Nagar",
    "rating": 4.6,
    "reviewsCount": 602,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 8500,
    "priceRange": "₹₹₹",
    "responseTime": "~13 min",
    "trustScore": 93,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 293
    },
    "phone": "+91 9819697851",
    "whatsapp": "919879157675",
    "address": "54, Main Boulevard, Vaishali Nagar, Jaipur",
    "image": "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
    "lat": 26.8848,
    "lng": 75.8106,
    "distance": "3.7 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-245-1",
        "name": "Fully Furnished Single/Twin Room with High-Speed WiFi & Meals",
        "price": 8500,
        "duration": "60 mins"
      },
      {
        "id": "s-245-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 3400,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Co-living PGs provider in Vaishali Nagar, Jaipur. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-245",
    "name": "AutoCraft Multi-Brand Car Service Hub - Jaipur",
    "category": "auto",
    "subcategory": "Multi-brand Garages",
    "city": "Jaipur",
    "locality": "Raja Park",
    "rating": 4.6,
    "reviewsCount": 345,
    "verified": true,
    "superSeller": false,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 9:00 PM",
    "startingPrice": 1899,
    "priceRange": "₹₹",
    "responseTime": "~11 min",
    "trustScore": 95,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 383
    },
    "phone": "+91 9811081952",
    "whatsapp": "919867726870",
    "address": "11, Main Boulevard, Raja Park, Jaipur",
    "image": "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80",
    "lat": 26.8859,
    "lng": 75.7809,
    "distance": "3.0 km",
    "homeService": false,
    "onlineBooking": true,
    "features": [
      "Verified GST Compliant",
      "Police Verified Staff",
      "LocalCare ₹10,000 Shield Guarantee",
      "Instant Digital Invoice"
    ],
    "services": [
      {
        "id": "s-246-1",
        "name": "Comprehensive Periodic Engine Oil & Brake Overhaul",
        "price": 1899,
        "duration": "60 mins"
      },
      {
        "id": "s-246-2",
        "name": "Express Consultation / Diagnostic Checkup",
        "price": 760,
        "duration": "30 mins"
      }
    ],
    "offer": "Flat 15% OFF for LocalCare Verified Members",
    "description": "Trusted and certified Multi-brand Garages provider in Raja Park, Jaipur. Background-checked personnel with strict quality assurance.",
    "reviews": [
      {
        "author": "Verified Customer",
        "rating": 5,
        "date": "Recent",
        "verifiedBooking": true,
        "comment": "Extremely professional, punctual arrival, and clean work. Highly recommended!"
      }
    ],
    "photos": [
      "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-shop-101",
    "name": "Croma Megastore Electronics",
    "category": "shopping",
    "subcategory": "Electronics",
    "city": "Bengaluru",
    "locality": "Koramangala 5th Block",
    "rating": 4.8,
    "reviewsCount": 310,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "10:00 AM - 9:30 PM",
    "startingPrice": 499,
    "priceRange": "₹₹₹",
    "responseTime": "~10 min",
    "trustScore": 97,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 310
    },
    "phone": "+91 80 4123 4567",
    "whatsapp": "918041234567",
    "address": "80 Feet Road, Koramangala 5th Block, Bengaluru",
    "image": "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80",
    "description": "Premier electronic retail superstore featuring laptops, home appliances, smartphones, smart TVs, and certified gadget repair with official brand warranties.",
    "services": [
      {
        "id": "s-sh-1",
        "name": "Electronics Inspection & Gadget Diagnostics",
        "price": 499,
        "duration": "30 mins"
      },
      {
        "id": "s-sh-2",
        "name": "Home Appliance Delivery & Setup",
        "price": 899,
        "duration": "60 mins"
      },
      {
        "id": "s-sh-3",
        "name": "Extended Warranty & Shield Coverage",
        "price": 1299,
        "duration": "Instant"
      }
    ],
    "features": [
      "Official Brand Warranty",
      "GST Invoicing",
      "Zero-Cost EMI",
      "Same Day Delivery"
    ],
    "reviews": [
      {
        "author": "Vikram Mehta",
        "rating": 5,
        "date": "2 days ago",
        "verifiedBooking": true,
        "comment": "Purchased an OLED TV with doorstep setup within 3 hours. Outstanding service."
      }
    ],
    "lat": 12.9352,
    "lng": 77.6245,
    "photos": [
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-pro-101",
    "name": "Apex Legal Chambers & Advocates",
    "category": "pro",
    "subcategory": "Lawyers & Advocates",
    "city": "Bengaluru",
    "locality": "Koramangala 4th Block",
    "rating": 4.9,
    "reviewsCount": 142,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:30 AM - 7:30 PM",
    "startingPrice": 999,
    "priceRange": "₹₹₹",
    "responseTime": "~15 min",
    "trustScore": 98,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 142
    },
    "phone": "+91 80 2552 9876",
    "whatsapp": "918025529876",
    "address": "Near Sony World Junction, Koramangala 4th Block, Bengaluru",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    "description": "Senior High Court advocates and corporate legal consultants specializing in property title verification, agreement drafting, startup advisory, and civil litigation.",
    "services": [
      {
        "id": "s-pro-1",
        "name": "Legal Consultation (In-person / Video)",
        "price": 999,
        "duration": "45 mins"
      },
      {
        "id": "s-pro-2",
        "name": "Property Document Legal Verification",
        "price": 2999,
        "duration": "24 hours"
      },
      {
        "id": "s-pro-3",
        "name": "Commercial Agreement & NDA Drafting",
        "price": 3499,
        "duration": "48 hours"
      }
    ],
    "features": [
      "Bar Council Verified",
      "Strict Confidentiality",
      "Transparent Legal Fee",
      "High Court Advocates"
    ],
    "reviews": [
      {
        "author": "Meera Nambiar",
        "rating": 5,
        "date": "1 week ago",
        "verifiedBooking": true,
        "comment": "Helped verify property documents before purchase. Prevented a major litigation dispute."
      }
    ],
    "lat": 12.934,
    "lng": 77.629,
    "photos": [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-daily-101",
    "name": "Spin & Sparkle Express Laundry",
    "category": "daily",
    "subcategory": "Laundry & Dry Cleaning",
    "city": "Bengaluru",
    "locality": "HSR Layout Sector 2",
    "rating": 4.9,
    "reviewsCount": 228,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "8:00 AM - 9:00 PM",
    "startingPrice": 199,
    "priceRange": "₹",
    "responseTime": "~12 min",
    "trustScore": 96,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 228
    },
    "phone": "+91 80 4912 3456",
    "whatsapp": "918049123456",
    "address": "17th Cross, HSR Layout Sector 2, Bengaluru",
    "image": "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=800&q=80",
    "description": "Eco-friendly doorstep laundry, Italian dry cleaning, organic stain removal, and steam pressing with free pickup and drop within 24 hours.",
    "services": [
      {
        "id": "s-dl-1",
        "name": "Wash & Steam Iron (per kg)",
        "price": 199,
        "duration": "24 hours"
      },
      {
        "id": "s-dl-2",
        "name": "Blazer & Suit Dry Cleaning",
        "price": 349,
        "duration": "24 hours"
      },
      {
        "id": "s-dl-3",
        "name": "Blanket & Quilt Sanitized Wash",
        "price": 449,
        "duration": "48 hours"
      }
    ],
    "features": [
      "Free Doorstep Pickup",
      "24-Hour Turnaround",
      "Antiseptic Wash",
      "Steam Press"
    ],
    "reviews": [
      {
        "author": "Karan Joshi",
        "rating": 5,
        "date": "3 days ago",
        "verifiedBooking": true,
        "comment": "Punctual pickup and returned suits spotless and crisp in protective garment bags."
      }
    ],
    "lat": 12.9112,
    "lng": 77.648,
    "photos": [
      "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-travel-101",
    "name": "The Grand Orchid Luxury Hotel",
    "category": "travel",
    "subcategory": "Hotels & Resorts",
    "city": "Bengaluru",
    "locality": "Indiranagar 100ft Road",
    "rating": 4.9,
    "reviewsCount": 450,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "24 Hours Open",
    "startingPrice": 2499,
    "priceRange": "₹₹₹₹",
    "responseTime": "~5 min",
    "trustScore": 99,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 450
    },
    "phone": "+91 80 4999 8888",
    "whatsapp": "918049998888",
    "address": "100 Feet Road, Indiranagar, Bengaluru",
    "image": "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80",
    "description": "Award-winning boutique hotel featuring luxury suites, high-speed Wi-Fi, rooftop swimming pool, fine-dining restaurants, and airport express transfers.",
    "services": [
      {
        "id": "s-tr-1",
        "name": "Deluxe Suite Booking (Night)",
        "price": 2499,
        "duration": "Per Night"
      },
      {
        "id": "s-tr-2",
        "name": "Executive Suite with Buffet Breakfast",
        "price": 3499,
        "duration": "Per Night"
      },
      {
        "id": "s-tr-3",
        "name": "Airport Express Chauffeur Transfer",
        "price": 1299,
        "duration": "60 mins"
      }
    ],
    "features": [
      "24/7 Concierge",
      "Complimentary Breakfast",
      "Swimming Pool & Spa",
      "Airport Cab Transfer"
    ],
    "reviews": [
      {
        "author": "Deepa Hegde",
        "rating": 5,
        "date": "Yesterday",
        "verifiedBooking": true,
        "comment": "Exceptional hospitality, quiet rooms right in the heart of Indiranagar."
      }
    ],
    "lat": 12.9784,
    "lng": 77.6408,
    "photos": [
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-shop-201",
    "name": "Reliance Digital Megastore",
    "category": "shopping",
    "subcategory": "Electronics",
    "city": "Mumbai",
    "locality": "Bandra West",
    "rating": 4.8,
    "reviewsCount": 295,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "10:00 AM - 10:00 PM",
    "startingPrice": 499,
    "priceRange": "₹₹₹",
    "responseTime": "~10 min",
    "trustScore": 97,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 295
    },
    "phone": "+91 22 2640 1234",
    "whatsapp": "912226401234",
    "address": "Hill Road, Bandra West, Mumbai",
    "image": "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80",
    "description": "Consumer electronics, Apple products, gaming consoles, home audio systems, and gadget support with genuine manufacturer warranty.",
    "services": [
      {
        "id": "s-sh-201",
        "name": "Device Health Check & Screen Guard Installation",
        "price": 499,
        "duration": "30 mins"
      },
      {
        "id": "s-sh-202",
        "name": "Home Audio & Home Theatre Calibration",
        "price": 1199,
        "duration": "60 mins"
      }
    ],
    "features": [
      "Official Warranty",
      "Bandra Express Delivery",
      "GST Invoicing",
      "Expert Demo"
    ],
    "reviews": [
      {
        "author": "Farhan Merchant",
        "rating": 5,
        "date": "4 days ago",
        "verifiedBooking": true,
        "comment": "Great range of high-end audio and quick express billing."
      }
    ],
    "lat": 19.0596,
    "lng": 72.8295,
    "photos": [
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-pro-201",
    "name": "Bombay Legal Associates & Solicitors",
    "category": "pro",
    "subcategory": "Lawyers & Advocates",
    "city": "Mumbai",
    "locality": "Colaba",
    "rating": 4.9,
    "reviewsCount": 160,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 7:00 PM",
    "startingPrice": 1500,
    "priceRange": "₹₹₹₹",
    "responseTime": "~15 min",
    "trustScore": 98,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 160
    },
    "phone": "+91 22 2285 4567",
    "whatsapp": "912222854567",
    "address": "Fort & Colaba Chambers, Mumbai",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    "description": "Prominent High Court solicitors specializing in corporate advisory, maritime law, property due diligence, and estate planning.",
    "services": [
      {
        "id": "s-pro-201",
        "name": "Senior Solicitor Legal Advisory",
        "price": 1500,
        "duration": "60 mins"
      },
      {
        "id": "s-pro-202",
        "name": "Property Search & Title Certification",
        "price": 4500,
        "duration": "48 hours"
      }
    ],
    "features": [
      "Bombay High Court Enrolled",
      "30+ Years Legacy",
      "Corporate & Civil Advisory"
    ],
    "reviews": [
      {
        "author": "Aditya Godrej",
        "rating": 5,
        "date": "1 week ago",
        "verifiedBooking": true,
        "comment": "Handled our commercial lease contract with precision and clarity."
      }
    ],
    "lat": 18.922,
    "lng": 72.8347,
    "photos": [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-daily-201",
    "name": "Mumbai Express Courier & Dabbawala Logistics",
    "category": "daily",
    "subcategory": "Courier Services",
    "city": "Mumbai",
    "locality": "Andheri East",
    "rating": 4.9,
    "reviewsCount": 380,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "7:30 AM - 9:30 PM",
    "startingPrice": 149,
    "priceRange": "₹",
    "responseTime": "~8 min",
    "trustScore": 99,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 380
    },
    "phone": "+91 22 2836 7890",
    "whatsapp": "912228367890",
    "address": "JB Nagar, Andheri East, Mumbai",
    "image": "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=800&q=80",
    "description": "Same-day intra-city parcel delivery, verified document courier, and cold-chain parcel logistics across Mumbai, Thane and Navi Mumbai.",
    "services": [
      {
        "id": "s-dl-201",
        "name": "Intra-City Express Parcel (Under 2kg)",
        "price": 149,
        "duration": "3 hours"
      },
      {
        "id": "s-dl-202",
        "name": "Urgent Document & Passport Courier",
        "price": 249,
        "duration": "2 hours"
      }
    ],
    "features": [
      "Real-time GPS Tracking",
      "Direct Signature Proof",
      "Same Day Delivery"
    ],
    "reviews": [
      {
        "author": "Pooja Bhatt",
        "rating": 5,
        "date": "2 days ago",
        "verifiedBooking": true,
        "comment": "Delivered urgent legal documents from Andheri to Nariman Point in under 2 hours!"
      }
    ],
    "lat": 19.1136,
    "lng": 72.8697,
    "photos": [
      "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-travel-201",
    "name": "ZoomWheels Self-Drive Luxury Rentals",
    "category": "travel",
    "subcategory": "Car Rentals",
    "city": "Mumbai",
    "locality": "Powai",
    "rating": 4.8,
    "reviewsCount": 210,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "24 Hours Open",
    "startingPrice": 1299,
    "priceRange": "₹₹₹",
    "responseTime": "~10 min",
    "trustScore": 97,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 210
    },
    "phone": "+91 22 4111 2233",
    "whatsapp": "912241112233",
    "address": "Hiranandani Gardens, Powai, Mumbai",
    "image": "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80",
    "description": "Self-drive car rentals with zero security deposit, unlimited kilometers, sanitized fleet of SUVs and luxury sedans with roadside assistance.",
    "services": [
      {
        "id": "s-tr-201",
        "name": "Compact SUV (Creta/Brezza) Daily Rental",
        "price": 1299,
        "duration": "24 hours"
      },
      {
        "id": "s-tr-202",
        "name": "Luxury Sedan (Camry/Octavia) Daily Rental",
        "price": 2999,
        "duration": "24 hours"
      }
    ],
    "features": [
      "Zero Deposit Option",
      "Doorstep Car Delivery",
      "Comprehensive Insurance",
      "24/7 Roadside Assistance"
    ],
    "reviews": [
      {
        "author": "Nikhil Rathi",
        "rating": 5,
        "date": "5 days ago",
        "verifiedBooking": true,
        "comment": "Rented an SUV for a Lonavala weekend trip. Clean car delivered on time."
      }
    ],
    "lat": 19.1197,
    "lng": 72.9051,
    "photos": [
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-hotel-blr-1",
    "name": "The Leela Palace Luxury Heritage Hotel",
    "category": "travel",
    "subcategory": "Hotels & Resorts",
    "city": "Bengaluru",
    "locality": "HAL Old Airport Road",
    "rating": 4.9,
    "reviewsCount": 820,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "24 Hours Open",
    "startingPrice": 8999,
    "priceRange": "₹₹₹₹",
    "responseTime": "~3 min",
    "trustScore": 99,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 820
    },
    "phone": "+91 80 2521 1234",
    "whatsapp": "918025211234",
    "address": "23, HAL Old Airport Road, Kodihalli, Bengaluru",
    "image": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    "description": "Palatial 5-star hotel inspired by the architectural grandeur of the Mysore Palace. Features landscaped gardens, world-class luxury spa, multi-cuisine restaurants (Citrus & Jamavar), outdoor heated pool, and private airport limousine transfer.",
    "services": [
      {
        "id": "s-leela-1",
        "name": "Royal Premiere Deluxe Room (Per Night)",
        "price": 8999,
        "duration": "Per Night"
      },
      {
        "id": "s-leela-2",
        "name": "Conservatory Club Suite + Airport Drop",
        "price": 14999,
        "duration": "Per Night"
      },
      {
        "id": "s-leela-3",
        "name": "Sunday Champagne Brunch at Citrus",
        "price": 3499,
        "duration": "3 hours"
      }
    ],
    "features": [
      "Palatial Gardens",
      "Heated Swimming Pool",
      "ESPA Luxury Spa",
      "Free High-Speed Wi-Fi",
      "Valet Parking"
    ],
    "reviews": [
      {
        "author": "Aditya Roy",
        "rating": 5,
        "date": "3 days ago",
        "verifiedBooking": true,
        "comment": "Breathtaking royal ambiance and impeccable hospitality. Sunday brunch at Citrus was world-class.",
        "helpful": 14
      }
    ],
    "lat": 12.9602,
    "lng": 77.6485,
    "photos": [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-hotel-blr-2",
    "name": "Taj West End Heritage Garden Hotel",
    "category": "travel",
    "subcategory": "Hotels & Resorts",
    "city": "Bengaluru",
    "locality": "Race Course Road",
    "rating": 4.8,
    "reviewsCount": 640,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "24 Hours Open",
    "startingPrice": 7499,
    "priceRange": "₹₹₹₹",
    "responseTime": "~5 min",
    "trustScore": 98,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 640
    },
    "phone": "+91 80 6660 5660",
    "whatsapp": "918066605660",
    "address": "Race Course Road, High Grounds, Bengaluru",
    "image": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    "description": "Sprawled over 20 acres of lush botanical gardens, Taj West End is Bengaluru's iconic sanctuary blending Victorian heritage with contemporary luxury. Home to the legendary Blue Ginger Vietnamese restaurant and Machan dining.",
    "services": [
      {
        "id": "s-tajwe-1",
        "name": "Heritage Garden View Room",
        "price": 7499,
        "duration": "Per Night"
      },
      {
        "id": "s-tajwe-2",
        "name": "Luxury Garden Suite with Balcony",
        "price": 12499,
        "duration": "Per Night"
      },
      {
        "id": "s-tajwe-3",
        "name": "Jiva Ayurvedic Spa Signature Therapy",
        "price": 4200,
        "duration": "90 mins"
      }
    ],
    "features": [
      "20-Acre Botanical Flora",
      "Jiva Spa",
      "Blue Ginger Vietnamese",
      "Tennis Courts",
      "Electric Car Charging"
    ],
    "reviews": [
      {
        "author": "Sunita Menon",
        "rating": 5,
        "date": "1 week ago",
        "verifiedBooking": true,
        "comment": "Staying here feels like entering a tranquil rainforest in the center of the city. Incredible hospitality.",
        "helpful": 9
      }
    ],
    "lat": 12.9856,
    "lng": 77.5847,
    "photos": [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-hotel-mum-1",
    "name": "The Taj Mahal Palace & Tower",
    "category": "travel",
    "subcategory": "Hotels & Resorts",
    "city": "Mumbai",
    "locality": "Apollo Bunder, Colaba",
    "rating": 5,
    "reviewsCount": 1420,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "24 Hours Open",
    "startingPrice": 11999,
    "priceRange": "₹₹₹₹",
    "responseTime": "~2 min",
    "trustScore": 100,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 1420
    },
    "phone": "+91 22 6665 3366",
    "whatsapp": "912266653366",
    "address": "Apollo Bunder, Colaba, Mumbai",
    "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    "description": "India's flagship heritage landmark overlooking the Gateway of India and the Arabian Sea since 1903. Renowned for world-famous dining at Wasabi by Morimoto, Golden Dragon, Shamiana, and Sea Lounge afternoon tea.",
    "services": [
      {
        "id": "s-tajpal-1",
        "name": "Tower Sea View Superior Room",
        "price": 11999,
        "duration": "Per Night"
      },
      {
        "id": "s-tajpal-2",
        "name": "Palace Wing Historic Heritage Suite",
        "price": 21999,
        "duration": "Per Night"
      },
      {
        "id": "s-tajpal-3",
        "name": "High Tea at Sea Lounge with Bay View",
        "price": 2800,
        "duration": "2 hours"
      }
    ],
    "features": [
      "Gateway of India View",
      "Wasabi by Morimoto",
      "Jiva Spa & Pool",
      "Heritage Art Walk",
      "Butler Service"
    ],
    "reviews": [
      {
        "author": "Rohan Kapoor",
        "rating": 5,
        "date": "4 days ago",
        "verifiedBooking": true,
        "comment": "Unrivaled heritage luxury. Watching ships sail past the Gateway of India from the room is timeless.",
        "helpful": 26
      }
    ],
    "lat": 18.9217,
    "lng": 72.8332,
    "photos": [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-hotel-mum-2",
    "name": "JW Marriott Juhu Beach Resort",
    "category": "travel",
    "subcategory": "Hotels & Resorts",
    "city": "Mumbai",
    "locality": "Juhu Beach",
    "rating": 4.8,
    "reviewsCount": 910,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "24 Hours Open",
    "startingPrice": 9499,
    "priceRange": "₹₹₹₹",
    "responseTime": "~4 min",
    "trustScore": 98,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 910
    },
    "phone": "+91 22 6693 3000",
    "whatsapp": "912266933000",
    "address": "Juhu Tara Road, Juhu Beach, Mumbai",
    "image": "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80",
    "description": "Premier beachfront luxury resort offering direct private access to Juhu Beach, infinity pools with Arabian Sea sunset views, award-winning Italian restaurant Mezzo Mezzo, Lotus Cafe, and Quan Spa.",
    "services": [
      {
        "id": "s-jwm-1",
        "name": "Deluxe Ocean View Room",
        "price": 9499,
        "duration": "Per Night"
      },
      {
        "id": "s-jwm-2",
        "name": "Executive Suite + Sea-facing Breakfast",
        "price": 15499,
        "duration": "Per Night"
      },
      {
        "id": "s-jwm-3",
        "name": "Lotus Cafe Famous Sunday Brunch",
        "price": 2999,
        "duration": "3 hours"
      }
    ],
    "features": [
      "Direct Beach Access",
      "Infinity Saltwater Pool",
      "Quan Spa",
      "Sea View Dining",
      "24/7 Fitness Center"
    ],
    "reviews": [
      {
        "author": "Kareena Merchant",
        "rating": 5,
        "date": "2 weeks ago",
        "verifiedBooking": true,
        "comment": "Sunset by the poolside with the Arabian Sea breeze is unmatched in Mumbai.",
        "helpful": 11
      }
    ],
    "lat": 19.0988,
    "lng": 72.8267,
    "photos": [
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-hotel-del-1",
    "name": "The Imperial Heritage Luxury Hotel",
    "category": "travel",
    "subcategory": "Hotels & Resorts",
    "city": "Delhi NCR",
    "locality": "Janpath, Connaught Place",
    "rating": 4.9,
    "reviewsCount": 750,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "24 Hours Open",
    "startingPrice": 8499,
    "priceRange": "₹₹₹₹",
    "responseTime": "~3 min",
    "trustScore": 99,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 750
    },
    "phone": "+91 11 2334 1234",
    "whatsapp": "911123341234",
    "address": "Janpath Lane, Connaught Place, New Delhi",
    "image": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    "description": "Legendary 1930s colonial Art Deco luxury hotel nestled on Janpath near Connaught Place. Boasts museum-grade colonial art collections, the renowned Spice Route Asian restaurant, The 1911 Bar, and sprawling royal suites.",
    "services": [
      {
        "id": "s-imp-1",
        "name": "Imperial Heritage Deco Room",
        "price": 8499,
        "duration": "Per Night"
      },
      {
        "id": "s-imp-2",
        "name": "Colonial Suite with Butler Service",
        "price": 13999,
        "duration": "Per Night"
      },
      {
        "id": "s-imp-3",
        "name": "Spice Route 7-Course Chef Degustation",
        "price": 3800,
        "duration": "2 hours"
      }
    ],
    "features": [
      "Art Museum Gallery",
      "The Spice Route Dining",
      "Swimming Pool",
      "Near Metro Station",
      "High Security Protocol"
    ],
    "reviews": [
      {
        "author": "Vikram Singhania",
        "rating": 5,
        "date": "1 week ago",
        "verifiedBooking": true,
        "comment": "Living inside a historical palace museum with pristine 5-star service. Spice Route restaurant is spectacular.",
        "helpful": 18
      }
    ],
    "lat": 28.6225,
    "lng": 77.2185,
    "photos": [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-hotel-mng-1",
    "name": "The Ocean Pearl Luxury Business Hotel",
    "category": "travel",
    "subcategory": "Hotels & Resorts",
    "city": "Mangaluru",
    "locality": "Kodialbail",
    "rating": 4.8,
    "reviewsCount": 520,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "24 Hours Open",
    "startingPrice": 3299,
    "priceRange": "₹₹₹",
    "responseTime": "~5 min",
    "trustScore": 97,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 520
    },
    "phone": "+91 824 249 1011",
    "whatsapp": "918242491011",
    "address": "Navabharath Circle, Kodialbail, Mangaluru",
    "image": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    "description": "Mangaluru's premier business and luxury stay located at Navabharath Circle. Features well-appointed executive rooms, Sagar Ratna Pure Veg, Coral Coastal Seafood fine-dining, banquet facilities, and express Mangalore Airport transfers.",
    "services": [
      {
        "id": "s-op-1",
        "name": "Executive Deluxe Room (Per Night)",
        "price": 3299,
        "duration": "Per Night"
      },
      {
        "id": "s-op-2",
        "name": "Club Suite with Complimentary Breakfast",
        "price": 4799,
        "duration": "Per Night"
      },
      {
        "id": "s-op-3",
        "name": "Airport Pickup / Drop Transfer",
        "price": 899,
        "duration": "45 mins"
      }
    ],
    "features": [
      "Coral Coastal Dining",
      "Sagar Ratna Veg",
      "Free High-Speed Wi-Fi",
      "Conference Halls",
      "Airport Shuttle"
    ],
    "reviews": [
      {
        "author": "Pradeep Rao",
        "rating": 5,
        "date": "5 days ago",
        "verifiedBooking": true,
        "comment": "Top hotel in Mangalore. Very clean, great coastal food at Coral, and convenient location near Hampankatta.",
        "helpful": 12
      }
    ],
    "lat": 12.8732,
    "lng": 74.8428,
    "photos": [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-hotel-mys-1",
    "name": "Lalitha Mahal Palace Heritage Hotel",
    "category": "travel",
    "subcategory": "Hotels & Resorts",
    "city": "Mysuru",
    "locality": "Siddhartha Layout",
    "rating": 4.8,
    "reviewsCount": 480,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "24 Hours Open",
    "startingPrice": 4999,
    "priceRange": "₹₹₹₹",
    "responseTime": "~6 min",
    "trustScore": 97,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 480
    },
    "phone": "+91 821 247 0470",
    "whatsapp": "918212470470",
    "address": "Lalitha Mahal Nagar, Siddhartha Layout, Mysuru",
    "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    "description": "Built in 1921 by the Maharaja of Mysore on a ridge overlooking Chamundi Hill, Lalitha Mahal is a gleaming white Italianate Renaissance palace with crystal chandeliers, grand ballroom dining, and royal heritage suites.",
    "services": [
      {
        "id": "s-lm-1",
        "name": "Royal Heritage Room",
        "price": 4999,
        "duration": "Per Night"
      },
      {
        "id": "s-lm-2",
        "name": "Maharaja Heritage Suite",
        "price": 9999,
        "duration": "Per Night"
      },
      {
        "id": "s-lm-3",
        "name": "Royal Mysore Thali Lunch in Palace Ballroom",
        "price": 1199,
        "duration": "90 mins"
      }
    ],
    "features": [
      "Original Royal Palace Architecture",
      "View of Chamundi Hill",
      "Billiards Room",
      "Free Wi-Fi",
      "Historic Ballroom"
    ],
    "reviews": [
      {
        "author": "Arjun Deshmukh",
        "rating": 5,
        "date": "3 weeks ago",
        "verifiedBooking": true,
        "comment": "Staying in a real Maharaja's palace is an unforgettable royal experience. The view of Mysore is incredible.",
        "helpful": 8
      }
    ],
    "lat": 12.2985,
    "lng": 76.6892,
    "photos": [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-hotel-hyd-1",
    "name": "Taj Falaknuma Palace & Luxury Resort",
    "category": "travel",
    "subcategory": "Hotels & Resorts",
    "city": "Hyderabad",
    "locality": "Engine Bowli, Falaknuma",
    "rating": 5,
    "reviewsCount": 680,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "24 Hours Open",
    "startingPrice": 16999,
    "priceRange": "₹₹₹₹",
    "responseTime": "~2 min",
    "trustScore": 100,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 680
    },
    "phone": "+91 40 6629 8585",
    "whatsapp": "914066298585",
    "address": "Engine Bowli, Fatima Nagar, Falaknuma, Hyderabad",
    "image": "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80",
    "description": "The 'Mirror of the Sky' perched 2,000 feet above Hyderabad, former residence of the Nizam. Arrive by horse-drawn carriage, walk on Italian marble, dine at the 101-seat dining table, and enjoy Sufi music at sunset.",
    "services": [
      {
        "id": "s-falak-1",
        "name": "Palace Room with Royal Carriage Arrival",
        "price": 16999,
        "duration": "Per Night"
      },
      {
        "id": "s-falak-2",
        "name": "Historical Suite with Nizam Garden Terrace",
        "price": 29999,
        "duration": "Per Night"
      },
      {
        "id": "s-falak-3",
        "name": "Nizami Dawaat Royal Multi-Course Dinner",
        "price": 4500,
        "duration": "2 hours"
      }
    ],
    "features": [
      "Horse-Drawn Carriage Arrival",
      "Nizam's 101-Seater Dining Hall",
      "Jiva Grand Spa",
      "Palace Historian Tour",
      "Panoramic City Vista"
    ],
    "reviews": [
      {
        "author": "Fatima Zaidi",
        "rating": 5,
        "date": "6 days ago",
        "verifiedBooking": true,
        "comment": "Royal perfection from the horse carriage welcome with rose petals to the Nizami dinner. Worth every rupee.",
        "helpful": 22
      }
    ],
    "lat": 17.3315,
    "lng": 78.4678,
    "photos": [
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-food-blr-1",
    "name": "Vidyarthi Bhavan Heritage Restaurant",
    "category": "food",
    "subcategory": "South Indian Heritage",
    "city": "Bengaluru",
    "locality": "Gandhi Bazaar, Basavanagudi",
    "rating": 4.8,
    "reviewsCount": 1650,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "6:30 AM - 11:30 AM, 2:00 PM - 8:00 PM (Fri Closed)",
    "startingPrice": 90,
    "priceRange": "₹",
    "responseTime": "~2 min",
    "trustScore": 99,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 1650
    },
    "phone": "+91 80 2667 7588",
    "whatsapp": "918026677588",
    "address": "32, Gandhi Bazaar Main Road, Basavanagudi, Bengaluru",
    "image": "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80",
    "description": "Established in 1943, Vidyarthi Bhavan is Bengaluru's quintessential breakfast institution. Famous for thick, golden, crispy Ghee Masala Dosas, Kesari Bath, Poori Saagu, and authentic steaming degree filter coffee.",
    "isVeg": true,
    "services": [
      {
        "id": "s-vb-1",
        "name": "Legendary Crispy Ghee Masala Dosa",
        "price": 90,
        "duration": "10 mins"
      },
      {
        "id": "s-vb-2",
        "name": "Rava Vada with Coconut Chutney",
        "price": 65,
        "duration": "10 mins"
      },
      {
        "id": "s-vb-3",
        "name": "Pure Chikmagalur Filter Coffee",
        "price": 35,
        "duration": "5 mins"
      }
    ],
    "features": [
      "Heritage Legacy Since 1943",
      "100% Pure Vegetarian",
      "Famous Stack Dosa Service",
      "Iconic Filter Coffee"
    ],
    "reviews": [
      {
        "author": "Chetan Narang",
        "rating": 5,
        "date": "Yesterday",
        "verifiedBooking": true,
        "comment": "The crispy brown ghee roast dosa is unmatched anywhere on the planet. A Bengaluru rite of passage.",
        "helpful": 31
      }
    ],
    "lat": 12.9439,
    "lng": 77.5714,
    "photos": [
      "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-food-blr-2",
    "name": "Mavalli Tiffin Room (MTR Since 1924)",
    "category": "food",
    "subcategory": "Pure Veg Thali & South Indian",
    "city": "Bengaluru",
    "locality": "Lalbagh Fort Road",
    "rating": 4.8,
    "reviewsCount": 1240,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "6:30 AM - 11:00 AM, 12:30 PM - 8:30 PM (Mon Closed)",
    "startingPrice": 110,
    "priceRange": "₹₹",
    "responseTime": "~3 min",
    "trustScore": 99,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 1240
    },
    "phone": "+91 80 2222 0022",
    "whatsapp": "918022220022",
    "address": "14, Lalbagh Fort Road, Doddamavalli, Bengaluru",
    "image": "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
    "description": "Centenary heritage culinary institution founded in 1924 opposite Lalbagh Botanical Gardens. Inventors of the Rava Idli during WWII. Famous for silver-plated Royal Karnataka Thalis, Bisibelebath, and Chandrahara dessert.",
    "isVeg": true,
    "services": [
      {
        "id": "s-mtr-1",
        "name": "Original Inventor Rava Idli with Ghee & Potato Saagu",
        "price": 110,
        "duration": "10 mins"
      },
      {
        "id": "s-mtr-2",
        "name": "Royal Unlimited Silver Plate Lunch Thali",
        "price": 320,
        "duration": "45 mins"
      },
      {
        "id": "s-mtr-3",
        "name": "Traditional Bisibelebath with Boondi",
        "price": 130,
        "duration": "15 mins"
      }
    ],
    "features": [
      "100 Years of Heritage (1924-2024)",
      "Pure Veg Sattvic Cooking",
      "Silver Cutlery Dining",
      "Lalbagh Landmark"
    ],
    "reviews": [
      {
        "author": "Kavitha Shastry",
        "rating": 5,
        "date": "3 days ago",
        "verifiedBooking": true,
        "comment": "The Rava Idli and Chandrahara dessert were perfection. Incredible history in every bite.",
        "helpful": 19
      }
    ],
    "lat": 12.9554,
    "lng": 77.5861,
    "photos": [
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-food-blr-3",
    "name": "Toit Brewpub & Artisanal Italian Kitchen",
    "category": "food",
    "subcategory": "Brewpub & Continental Dining",
    "city": "Bengaluru",
    "locality": "Indiranagar 100ft Road",
    "rating": 4.8,
    "reviewsCount": 1540,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "12:00 PM - 1:00 AM",
    "startingPrice": 380,
    "priceRange": "₹₹₹",
    "responseTime": "~4 min",
    "trustScore": 98,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 1540
    },
    "phone": "+91 90197 13388",
    "whatsapp": "919019713388",
    "address": "298, 100 Feet Road, Indiranagar, Bengaluru",
    "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    "description": "Bengaluru's trailblazing microbrewery and craft beer haven. World-famous for craft brews like Tint-In-Wit and Basmati Blonde, woodfired sourdough Neapolitan pizzas, baked nachos, and beef briskets.",
    "services": [
      {
        "id": "s-toit-1",
        "name": "Toit Woodfired Sourdough Margherita Pizza",
        "price": 460,
        "duration": "20 mins"
      },
      {
        "id": "s-toit-2",
        "name": "Signature Loaded Nachos with Guacamole",
        "price": 380,
        "duration": "15 mins"
      },
      {
        "id": "s-toit-3",
        "name": "Barbeque Chicken Wings (6 pcs)",
        "price": 410,
        "duration": "15 mins"
      }
    ],
    "features": [
      "Pet Friendly Dining",
      "Fresh Craft Brews",
      "Woodfired Sourdough Oven",
      "Valet Parking",
      "Rooftop Vibe"
    ],
    "reviews": [
      {
        "author": "Nikhil Verma",
        "rating": 5,
        "date": "4 days ago",
        "verifiedBooking": true,
        "comment": "The gold standard of Bengaluru microbreweries. Tintin Wit beer and sourdough pizza are exceptional.",
        "helpful": 15
      }
    ],
    "lat": 12.9792,
    "lng": 77.6406,
    "photos": [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-food-mum-1",
    "name": "Gajalee Coastal Mangalorean Seafood",
    "category": "food",
    "subcategory": "Coastal Seafood & Fish Curry",
    "city": "Mumbai",
    "locality": "Vile Parle East",
    "rating": 4.8,
    "reviewsCount": 1180,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "11:30 AM - 3:30 PM, 7:00 PM - 11:30 PM",
    "startingPrice": 420,
    "priceRange": "₹₹₹",
    "responseTime": "~3 min",
    "trustScore": 98,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 1180
    },
    "phone": "+91 22 2611 4093",
    "whatsapp": "912226114093",
    "address": "Kadamgiri Complex, Hanuman Road, Vile Parle East, Mumbai",
    "image": "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80",
    "description": "Mumbai's premier coastal seafood pilgrimage. Celebrated for Tandoori Crab, Butter Pepper Garlic Jumbo Prawns, Bombil Fry (Bombay Duck), Neer Dosa, and authentic Mangalorean Ghee Roast.",
    "services": [
      {
        "id": "s-gaj-1",
        "name": "Signature Tandoori Mud Crab (Catch of Day)",
        "price": 1450,
        "duration": "25 mins"
      },
      {
        "id": "s-gaj-2",
        "name": "Crispy Bombil Fry (Bombay Duck)",
        "price": 390,
        "duration": "15 mins"
      },
      {
        "id": "s-gaj-3",
        "name": "Surmai Fish Curry with Steamed Neer Dosa (4 pcs)",
        "price": 580,
        "duration": "20 mins"
      }
    ],
    "features": [
      "Fresh Arabian Sea Catch",
      "Authentic Mangalore Ghee Roast",
      "Air Conditioned Family Dining",
      "Valet Parking"
    ],
    "reviews": [
      {
        "author": "Sameer Joshi",
        "rating": 5,
        "date": "1 week ago",
        "verifiedBooking": true,
        "comment": "The Tandoori Crab in butter pepper garlic sauce is the finest in India. Bombil fry was crunchy and fresh.",
        "helpful": 28
      }
    ],
    "lat": 19.0998,
    "lng": 72.8532,
    "photos": [
      "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-food-mum-2",
    "name": "Cafe Madras Since 1940",
    "category": "food",
    "subcategory": "Pure Veg South Indian",
    "city": "Mumbai",
    "locality": "Matunga Circle",
    "rating": 4.9,
    "reviewsCount": 1390,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "7:00 AM - 2:30 PM, 4:00 PM - 10:30 PM (Mon Closed)",
    "startingPrice": 85,
    "priceRange": "₹",
    "responseTime": "~2 min",
    "trustScore": 99,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 1390
    },
    "phone": "+91 22 2401 4419",
    "whatsapp": "912224014419",
    "address": "38 B, Kamakshi Building, Bhaudaji Road, Kings Circle, Matunga, Mumbai",
    "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    "description": "Beloved 84-year-old culinary institution in Mumbai's South Indian heartland of Matunga. Famous for Butter Idli Podi, Ragi Masala Dosa, Upma Podi, crisp Medu Vada, and piping hot brass tumbler filter coffee.",
    "isVeg": true,
    "services": [
      {
        "id": "s-cm-1",
        "name": "Butter Idli sprinkled with Gunpowder Podi",
        "price": 95,
        "duration": "8 mins"
      },
      {
        "id": "s-cm-2",
        "name": "Special Ragi Masala Dosa with White Chutney",
        "price": 120,
        "duration": "12 mins"
      },
      {
        "id": "s-cm-3",
        "name": "Traditional Brass Tumbler Degree Filter Coffee",
        "price": 40,
        "duration": "5 mins"
      }
    ],
    "features": [
      "84 Years of Legacy",
      "Pure Veg Sattvic",
      "Iconic Matunga Landmark",
      "Quick Service"
    ],
    "reviews": [
      {
        "author": "Rashmi Iyer",
        "rating": 5,
        "date": "5 days ago",
        "verifiedBooking": true,
        "comment": "The Butter Idli Podi melting in your mouth with filter coffee is pure Sunday bliss.",
        "helpful": 24
      }
    ],
    "lat": 19.0278,
    "lng": 72.8553,
    "photos": [
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-food-del-1",
    "name": "Karim's Historic Mughlai Since 1913",
    "category": "food",
    "subcategory": "Royal Mughlai & Kebabs",
    "city": "Delhi NCR",
    "locality": "Jama Masjid, Old Delhi",
    "rating": 4.8,
    "reviewsCount": 1850,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 1:00 AM",
    "startingPrice": 280,
    "priceRange": "₹₹",
    "responseTime": "~3 min",
    "trustScore": 99,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 1850
    },
    "phone": "+91 11 2326 4984",
    "whatsapp": "911123264984",
    "address": "16, Gali Kababian, Jama Masjid, Old Delhi",
    "image": "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80",
    "description": "Royal culinary legacy founded in 1913 by Haji Karimuddin, royal cook of the Mughal emperors. World-renowned for Mutton Burra Kebabs, Mutton Korma, Chicken Jahangiri, Seekh Kebabs, and tandoori Khamiri Roti.",
    "services": [
      {
        "id": "s-kar-1",
        "name": "Charcoal Grilled Mutton Burra Kebab (4 pcs)",
        "price": 480,
        "duration": "15 mins"
      },
      {
        "id": "s-kar-2",
        "name": "Rich Mughal Mutton Korma with Rogan",
        "price": 380,
        "duration": "15 mins"
      },
      {
        "id": "s-kar-3",
        "name": "Fresh Baked Tandoori Khamiri Roti (2 pcs)",
        "price": 40,
        "duration": "5 mins"
      }
    ],
    "features": [
      "110+ Years Mughal Heritage",
      "Charcoal Clay Tandoor",
      "Near Jama Masjid Gate 1",
      "Halal Certified"
    ],
    "reviews": [
      {
        "author": "Zaid Qureshi",
        "rating": 5,
        "date": "1 week ago",
        "verifiedBooking": true,
        "comment": "Mutton Burra kebab falls right off the bone with deep smoky spices. Truly legendary.",
        "helpful": 35
      }
    ],
    "lat": 28.6507,
    "lng": 77.2334,
    "photos": [
      "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-food-mng-1",
    "name": "Giri Manja's Coastal Seafood & Ghee Roast",
    "category": "food",
    "subcategory": "Coastal Seafood & Fish Curry",
    "city": "Mangaluru",
    "locality": "Car Street, Bhavathi",
    "rating": 4.9,
    "reviewsCount": 890,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "11:30 AM - 4:00 PM, 7:00 PM - 10:00 PM",
    "startingPrice": 220,
    "priceRange": "₹₹",
    "responseTime": "~4 min",
    "trustScore": 98,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 890
    },
    "phone": "+91 99000 00123",
    "whatsapp": "919900000123",
    "address": "Near Kalikamba Temple, Car Street, Bhavathi, Mangaluru",
    "image": "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
    "description": "Old heritage Mangalorean tiled-roof house serving the town's most legendary seafood. Renowned for Anjal (King Fish) Tava Fry in coconut oil, Squid Sukka, Prawns Ghee Roast, and traditional boiled rice with fish curry.",
    "services": [
      {
        "id": "s-gm-1",
        "name": "Anjal (Seer Fish / King Fish) Masala Tava Fry",
        "price": 340,
        "duration": "15 mins"
      },
      {
        "id": "s-gm-2",
        "name": "Kundapur Prawns Ghee Roast",
        "price": 390,
        "duration": "15 mins"
      },
      {
        "id": "s-gm-3",
        "name": "Mangalorean Fish Curry Meal with Boiled Rice",
        "price": 180,
        "duration": "10 mins"
      }
    ],
    "features": [
      "Authentic Coconut Oil Tava Fry",
      "Direct Bunder Morning Catch",
      "Banana Leaf Dining",
      "Iconic Mangalore Heritage"
    ],
    "reviews": [
      {
        "author": "Naveen Shenoy",
        "rating": 5,
        "date": "3 days ago",
        "verifiedBooking": true,
        "comment": "The Kingfish Anjal fry here is holy grail level. Fresh, juicy, and perfectly spiced with curry leaves.",
        "helpful": 16
      }
    ],
    "lat": 12.8685,
    "lng": 74.8392,
    "photos": [
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-food-mys-1",
    "name": "Mylari Famous Butter Dosa Since 1938",
    "category": "food",
    "subcategory": "South Indian Breakfast",
    "city": "Mysuru",
    "locality": "Nazarbad Main Road",
    "rating": 4.8,
    "reviewsCount": 950,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "6:30 AM - 1:30 PM, 3:30 PM - 8:30 PM",
    "startingPrice": 65,
    "priceRange": "₹",
    "responseTime": "~3 min",
    "trustScore": 98,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 950
    },
    "phone": "+91 94486 08710",
    "whatsapp": "919448608710",
    "address": "79, Nazarbad Main Road, Near Police Station, Mysuru",
    "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    "description": "Mysuru's world-famous artisanal dosa stop. Iconic for soft, melt-in-your-mouth cloud-like dosas topped with a dollop of white homemade butter, stuffed with unique onion-coriander saagu and coconut chutney.",
    "isVeg": true,
    "services": [
      {
        "id": "s-myl-1",
        "name": "Special White Butter Masala Dosa",
        "price": 75,
        "duration": "8 mins"
      },
      {
        "id": "s-myl-2",
        "name": "Plain Mylari Butter Dosa",
        "price": 65,
        "duration": "8 mins"
      },
      {
        "id": "s-myl-3",
        "name": "Mysuru Heritage Filter Coffee",
        "price": 30,
        "duration": "5 mins"
      }
    ],
    "features": [
      "Homemade Fresh Butter",
      "86 Years of Heritage",
      "100% Pure Veg",
      "Near Mysore Palace"
    ],
    "reviews": [
      {
        "author": "Sanjay Urs",
        "rating": 5,
        "date": "4 days ago",
        "verifiedBooking": true,
        "comment": "Soft like a cloud with homemade white butter. Nobody makes a dosa like original Mylari.",
        "helpful": 14
      }
    ],
    "lat": 12.3112,
    "lng": 76.6624,
    "photos": [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-work-paint-1",
    "name": "Asian Paints ColorPro & Waterproofing Specialists",
    "category": "home",
    "subcategory": "Painting & Waterproofing",
    "city": "Bengaluru",
    "locality": "Koramangala 4th Block",
    "rating": 4.9,
    "reviewsCount": 380,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "8:00 AM - 8:00 PM",
    "startingPrice": 999,
    "priceRange": "₹₹",
    "responseTime": "~10 min",
    "trustScore": 99,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 380
    },
    "phone": "+91 98450 44556",
    "whatsapp": "919845044556",
    "address": "42, 80 Feet Road, Koramangala 4th Block, Bengaluru",
    "image": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
    "description": "Certified master painting and seepage waterproofing contractors. Complete interior & exterior painting with mechanized dust-free sanding, Asian Paints Royale Luxury Emulsion, Dr. Fixit wall dampness treatment, and 3-year warranty.",
    "services": [
      {
        "id": "s-pt-1",
        "name": "Wall Dampness & Terrace Waterproofing Inspection",
        "price": 499,
        "duration": "60 mins"
      },
      {
        "id": "s-pt-2",
        "name": "2BHK Full Interior Painting (Primer + 2 Coats)",
        "price": 8999,
        "duration": "2 days"
      },
      {
        "id": "s-pt-3",
        "name": "Living Room Designer Accent Texture Wall",
        "price": 2999,
        "duration": "1 day"
      }
    ],
    "features": [
      "Mechanized Dust-Free Sanding",
      "3-Year Paint Warranty",
      "Asian Paints Genuine Products",
      "Furniture Masking Included"
    ],
    "reviews": [
      {
        "author": "Vinay Gowda",
        "rating": 5,
        "date": "3 days ago",
        "verifiedBooking": true,
        "comment": "Covered all furniture with plastic sheets, did dustless sanding, and finished our 3BHK in 3 days. Clean and flawless.",
        "helpful": 11
      }
    ],
    "lat": 12.9345,
    "lng": 77.6254,
    "photos": [
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-work-carp-1",
    "name": "UrbanCraft Modular Kitchen & Wardrobe Carpenters",
    "category": "home",
    "subcategory": "Carpentry & Furniture Works",
    "city": "Bengaluru",
    "locality": "HSR Layout Sector 2",
    "rating": 4.8,
    "reviewsCount": 290,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "8:30 AM - 7:30 PM",
    "startingPrice": 399,
    "priceRange": "₹₹",
    "responseTime": "~15 min",
    "trustScore": 98,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 290
    },
    "phone": "+91 98455 77889",
    "whatsapp": "919845577889",
    "address": "14th Main, 17th Cross, HSR Layout Sector 2, Bengaluru",
    "image": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    "description": "Skilled carpenters and modular woodwork artisans. Specializing in kitchen hydraulic hinge repairs, sliding wardrobe track replacement, bed assembly, wooden door fixing, customized TV units, and teak wood furniture polish.",
    "services": [
      {
        "id": "s-cp-1",
        "name": "Door Lock & Handle Fitting / Repair",
        "price": 399,
        "duration": "45 mins"
      },
      {
        "id": "s-cp-2",
        "name": "Modular Kitchen Hydraulic Hinge Replacement (4 pcs)",
        "price": 899,
        "duration": "90 mins"
      },
      {
        "id": "s-cp-3",
        "name": "Custom Sliding Wardrobe Repair & Channel Tuning",
        "price": 1299,
        "duration": "2 hours"
      }
    ],
    "features": [
      "Hettich & Ebco Hardware Support",
      "30-Day Workmanship Warranty",
      "Laser Precision Alignment",
      "Background-Checked Pros"
    ],
    "reviews": [
      {
        "author": "Madhavan N.",
        "rating": 5,
        "date": "1 week ago",
        "verifiedBooking": true,
        "comment": "Fixed our sagging kitchen cabinet doors and replaced hydraulic hinges within an hour. Excellent workmanship.",
        "helpful": 7
      }
    ],
    "lat": 12.9121,
    "lng": 77.6445,
    "photos": [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-work-pest-1",
    "name": "HiCare Certified Eco Pest & Termite Control",
    "category": "cleaning",
    "subcategory": "Pest Control & Sanitization",
    "city": "Mumbai",
    "locality": "Andheri West, Lokhandwala",
    "rating": 4.9,
    "reviewsCount": 410,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "8:00 AM - 8:00 PM",
    "startingPrice": 699,
    "priceRange": "₹₹",
    "responseTime": "~12 min",
    "trustScore": 99,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 410
    },
    "phone": "+91 22 4000 7878",
    "whatsapp": "912240007878",
    "address": "Lokhandwala Complex, Andheri West, Mumbai",
    "image": "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
    "description": "Govt-licensed eco-friendly pest control specialists. Odorless herbal gel treatment for cockroaches, anti-termite drilling with 5-year warranty, bedbug thermal extraction, and residential rodent management.",
    "services": [
      {
        "id": "s-pc-1",
        "name": "Odorless Herbal Cockroach Gel (1-2 BHK)",
        "price": 699,
        "duration": "45 mins"
      },
      {
        "id": "s-pc-2",
        "name": "Anti-Termite Drill & Chemical Barrier (5-Yr Warranty)",
        "price": 2999,
        "duration": "3 hours"
      },
      {
        "id": "s-pc-3",
        "name": "Bed Bug Thermal Spray Treatment (2 Visits)",
        "price": 1599,
        "duration": "2 hours"
      }
    ],
    "features": [
      "100% Odorless Herbal Gel",
      "Safe for Kids & Pets",
      "Govt CIB Approved Chemicals",
      "5-Year Termite Warranty"
    ],
    "reviews": [
      {
        "author": "Anjali Saxena",
        "rating": 5,
        "date": "2 days ago",
        "verifiedBooking": true,
        "comment": "Totally odorless gel for kitchen cockroaches. Zero smell and the problem was 100% gone in 3 days.",
        "helpful": 14
      }
    ],
    "lat": 19.1363,
    "lng": 72.8277,
    "photos": [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581579186913-45ac3e6efe93?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-work-app-1",
    "name": "Apex All-Brand Home Appliance Repair Hub",
    "category": "electrical",
    "subcategory": "Appliance Repair & Electronics",
    "city": "Mumbai",
    "locality": "Powai, Hiranandani",
    "rating": 4.8,
    "reviewsCount": 520,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "8:00 AM - 9:00 PM",
    "startingPrice": 349,
    "priceRange": "₹₹",
    "responseTime": "~15 min",
    "trustScore": 98,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 520
    },
    "phone": "+91 22 4999 5566",
    "whatsapp": "912249995566",
    "address": "Central Avenue, Hiranandani Gardens, Powai, Mumbai",
    "image": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
    "description": "Doorstep diagnostic and repair center for washing machines (Front/Top Load), double-door refrigerators, microwave ovens, kitchen chimneys, and water purifiers (RO). Genuine OEM spare parts with 90-day warranty.",
    "services": [
      {
        "id": "s-ap-1",
        "name": "Washing Machine Motor & PCB Diagnostic Check",
        "price": 349,
        "duration": "45 mins"
      },
      {
        "id": "s-ap-2",
        "name": "Refrigerator Gas Charging (R134a/R600a)",
        "price": 1499,
        "duration": "90 mins"
      },
      {
        "id": "s-ap-3",
        "name": "Kitchen Chimney Deep Degreasing & Filter Wash",
        "price": 799,
        "duration": "60 mins"
      }
    ],
    "features": [
      "Genuine OEM Spare Parts",
      "90-Day Service Warranty",
      "Brand Specialists (LG, Samsung, IFB, Bosch)",
      "Instant Doorstep Visit"
    ],
    "reviews": [
      {
        "author": "Harish Pillai",
        "rating": 5,
        "date": "4 days ago",
        "verifiedBooking": true,
        "comment": "Fixed our IFB washing machine drum error in 40 minutes. Had replacement capacitor in his kit.",
        "helpful": 9
      }
    ],
    "lat": 19.1176,
    "lng": 72.906,
    "photos": [
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-work-tile-1",
    "name": "Royal Marble Polish & Tile Regrouting Works",
    "category": "home",
    "subcategory": "Flooring, Marble & Masonry",
    "city": "Delhi NCR",
    "locality": "South Extension Part 2",
    "rating": 4.8,
    "reviewsCount": 230,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "8:30 AM - 7:30 PM",
    "startingPrice": 1299,
    "priceRange": "₹₹",
    "responseTime": "~20 min",
    "trustScore": 97,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 230
    },
    "phone": "+91 11 4111 2233",
    "whatsapp": "911141112233",
    "address": "E-Block, South Extension Part 2, New Delhi",
    "image": "https://images.unsplash.com/photo-1502005229762-ee1b2b8ab98f?auto=format&fit=crop&w=800&q=80",
    "description": "Specialized Italian marble mirror polishing, granite crystallization, bathroom anti-skid epoxy tile regrouting, and minor civil masonry works. Utilizing Klindex Italian diamond abrasives for high-gloss restoration.",
    "services": [
      {
        "id": "s-tl-1",
        "name": "Bathroom Epoxy Tile Regrouting & Leak Proofing",
        "price": 1299,
        "duration": "3 hours"
      },
      {
        "id": "s-tl-2",
        "name": "Italian Marble Diamond Mirror Polishing (500 sq ft)",
        "price": 4499,
        "duration": "1 day"
      },
      {
        "id": "s-tl-3",
        "name": "Granite Kitchen Countertop Stain Removal & Sealing",
        "price": 999,
        "duration": "90 mins"
      }
    ],
    "features": [
      "Italian Diamond Pad Polishing",
      "Waterproof Epoxy Grouting",
      "High Gloss Mirror Finish",
      "Zero Dust Vacuum Machine"
    ],
    "reviews": [
      {
        "author": "Rajeev Bansal",
        "rating": 5,
        "date": "1 week ago",
        "verifiedBooking": true,
        "comment": "Our 12-year-old Italian marble floor looks brand new like glass. Highly skilled craftsmen.",
        "helpful": 8
      }
    ],
    "lat": 28.5701,
    "lng": 77.2228,
    "photos": [
      "https://images.unsplash.com/photo-1502005229762-ee1b2b8ab98f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-work-clean-1",
    "name": "UltraClean 3M Fabric Sofa & Carpet Shampooing",
    "category": "cleaning",
    "subcategory": "Deep Cleaning & Sofa Shampooing",
    "city": "Bengaluru",
    "locality": "Whitefield Inner Circle",
    "rating": 4.9,
    "reviewsCount": 460,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "8:00 AM - 8:30 PM",
    "startingPrice": 599,
    "priceRange": "₹₹",
    "responseTime": "~15 min",
    "trustScore": 99,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 460
    },
    "phone": "+91 80 4123 9988",
    "whatsapp": "918041239988",
    "address": "ITPB Main Road, Whitefield, Bengaluru",
    "image": "https://images.unsplash.com/photo-1581579186913-45ac3e6efe93?auto=format&fit=crop&w=800&q=80",
    "description": "Professional industrial steam extraction sofa, mattress, and carpet deep cleaning. Utilizes Taski & 3M eco-certified foam chemicals, anti-allergen mite sanitization, and moisture extraction drying within 2 hours.",
    "services": [
      {
        "id": "s-uc-1",
        "name": "3-Seater Fabric Sofa Deep Foam Shampoo",
        "price": 599,
        "duration": "60 mins"
      },
      {
        "id": "s-uc-2",
        "name": "King Size Mattress Anti-Mite Steam Sanitization",
        "price": 799,
        "duration": "45 mins"
      },
      {
        "id": "s-uc-3",
        "name": "Living Room Rug / Persian Carpet Deep Wash",
        "price": 699,
        "duration": "60 mins"
      }
    ],
    "features": [
      "3M & Taski Certified Foam",
      "99.9% Dust Mite Extraction",
      "Quick Dry in 2 Hours",
      "Safe on Delicate Velvet & Suede"
    ],
    "reviews": [
      {
        "author": "Pooja Hegde",
        "rating": 5,
        "date": "3 days ago",
        "verifiedBooking": true,
        "comment": "Removed heavy tea and milk stains from our beige sofa. Smells fresh and dried super fast.",
        "helpful": 12
      }
    ],
    "lat": 12.9698,
    "lng": 77.7499,
    "photos": [
      "https://images.unsplash.com/photo-1581579186913-45ac3e6efe93?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-work-solar-1",
    "name": "SunVolt Rooftop Solar & EV Charger Station Installers",
    "category": "electrical",
    "subcategory": "Solar Energy & EV Chargers",
    "city": "Mangaluru",
    "locality": "Kadri Hills",
    "rating": 4.8,
    "reviewsCount": 190,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "9:00 AM - 7:00 PM",
    "startingPrice": 1499,
    "priceRange": "₹₹₹",
    "responseTime": "~20 min",
    "trustScore": 98,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 190
    },
    "phone": "+91 824 222 3344",
    "whatsapp": "918242223344",
    "address": "Kadri Temple Road, Kadri Hills, Mangaluru",
    "image": "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=800&q=80",
    "description": "MNRE-approved solar EPC contractor and home electric vehicle charger installers. Specializing in on-grid net metering rooftop solar systems (3kW to 10kW), battery hybrid backup, and 7.4kW/11kW Level-2 home EV wallbox chargers.",
    "services": [
      {
        "id": "s-sv-1",
        "name": "Solar Rooftop Feasibility & Shadow Analysis Survey",
        "price": 499,
        "duration": "90 mins"
      },
      {
        "id": "s-sv-2",
        "name": "Home EV Charger Wallbox Installation & Dedicated MCB Line",
        "price": 1499,
        "duration": "3 hours"
      },
      {
        "id": "s-sv-3",
        "name": "Solar Inverter Annual Health Check & Panel Cleaning",
        "price": 999,
        "duration": "2 hours"
      }
    ],
    "features": [
      "MNRE Subsidy Assistance",
      "25-Year Solar Panel Warranty",
      "Certified EV Charger Electricians",
      "Mescom Net-Metering Approval"
    ],
    "reviews": [
      {
        "author": "Santhosh Bhat",
        "rating": 5,
        "date": "2 weeks ago",
        "verifiedBooking": true,
        "comment": "Installed our Tata EV 7.4kW charger at home in Kadri. Dedicated wiring, surge protection, very neat job.",
        "helpful": 10
      }
    ],
    "lat": 12.8872,
    "lng": 74.8584,
    "photos": [
      "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "b-work-plumb-1",
    "name": "MasterPlumb 24/7 Leak Detection & Tank Cleaning",
    "category": "home",
    "subcategory": "Plumbing & Sanitary Works",
    "city": "Mysuru",
    "locality": "Saraswathipuram",
    "rating": 4.9,
    "reviewsCount": 310,
    "verified": true,
    "superSeller": true,
    "openNow": true,
    "availableToday": true,
    "operatingHours": "24 Hours Open",
    "startingPrice": 349,
    "priceRange": "₹₹",
    "responseTime": "~15 min",
    "trustScore": 99,
    "trustVerification": {
      "phoneVerified": true,
      "businessRegistration": true,
      "addressInspected": true,
      "policeBackgroundChecked": true,
      "verifiedCustomerReviews": 310
    },
    "phone": "+91 821 254 9900",
    "whatsapp": "918212549900",
    "address": "5th Main, Near Swimming Pool, Saraswathipuram, Mysuru",
    "image": "https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=800&q=80",
    "description": "Emergency master plumbers equipped with acoustic underground pipe leak detectors, motorized drain unblocking snakes, and 6-stage mechanized UV overhead water tank cleaning.",
    "services": [
      {
        "id": "s-mp-1",
        "name": "Blocked Drain & Pipe Motorized Unclogging",
        "price": 499,
        "duration": "45 mins"
      },
      {
        "id": "s-mp-2",
        "name": "Mechanized 6-Stage Overhead Water Tank Cleaning (1000L)",
        "price": 799,
        "duration": "90 mins"
      },
      {
        "id": "s-mp-3",
        "name": "Tap, Flush Valve & Concealed Cistern Repair",
        "price": 349,
        "duration": "40 mins"
      }
    ],
    "features": [
      "Acoustic Leak Detection",
      "6-Stage UV Tank Disinfection",
      "24/7 Emergency Plumber",
      "30-Day Work Guarantee"
    ],
    "reviews": [
      {
        "author": "Manjunath Rao",
        "rating": 5,
        "date": "5 days ago",
        "verifiedBooking": true,
        "comment": "Had a severe kitchen drain blockage. Arrived with an electric snaking machine and cleared it in 20 minutes.",
        "helpful": 9
      }
    ],
    "lat": 12.3021,
    "lng": 76.6341,
    "photos": [
      "https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80"
    ]
  }
];

var PLATFORM_DEALS = [
  {
    id: 'deal-1',
    title: 'AC Power Jet Service & Gas Check',
    businessName: 'QuickFix Pro AC & Electricals',
    businessId: 'b-102',
    category: 'electrical',
    city: 'Bengaluru',
    discount: '35% OFF',
    originalPrice: '₹699',
    dealPrice: '₹449',
    validTill: 'Expires in 6 hours',
    badge: 'Trending 🔥',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'deal-2',
    title: 'Dermatologist Consultation & Skin Scan',
    businessName: 'Mangalore Care PolyClinic',
    businessId: 'b-201',
    category: 'health',
    city: 'Mangaluru',
    discount: '25% OFF',
    originalPrice: '₹500',
    dealPrice: '₹375',
    validTill: 'Valid Today Only',
    badge: 'Popular in Valachil 🌟',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'deal-3',
    title: 'Full Home Deep Cleaning (2 BHK)',
    businessName: 'SparkleClean Deep Solutions',
    businessId: 'b-106',
    category: 'cleaning',
    city: 'Bengaluru',
    discount: '₹400 OFF',
    originalPrice: '₹3,299',
    dealPrice: '₹2,899',
    validTill: 'Limited weekend slots',
    badge: 'High Value 💎',
    image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'deal-4',
    title: 'Emergency Plumbing & Leak Clearance',
    businessName: 'RapidFlow 24/7 Plumbers',
    businessId: 'b-103',
    category: 'home',
    city: 'Bengaluru',
    discount: 'Flat ₹150 OFF',
    originalPrice: '₹499',
    dealPrice: '₹349',
    validTill: '24/7 Live Offer',
    badge: 'Instant Dispatch ⚡',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'deal-5',
    title: 'Painless Laser Dental Scaling & Polish',
    businessName: 'Apollo Dental & Laser Clinic',
    businessId: 'b-101',
    category: 'health',
    city: 'Bengaluru',
    discount: '40% OFF',
    originalPrice: '₹2,500',
    dealPrice: '₹1,499',
    validTill: 'Ends Tomorrow',
    badge: 'NABH Accredited 🛡️',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'deal-6',
    title: 'Advanced Teeth Whitening & Cleanse',
    businessName: 'Bandra Smiles Dental Boutique',
    businessId: 'b-301',
    category: 'health',
    city: 'Mumbai',
    discount: '30% OFF',
    originalPrice: '₹3,500',
    dealPrice: '₹2,450',
    validTill: 'Valid This Week',
    badge: 'Celebrity Choice 💎',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'deal-7',
    title: 'High-Pressure Hydro Jet Pipe Unclogging',
    businessName: 'Delhi 24/7 Master Plumbers',
    businessId: 'b-401',
    category: 'home',
    city: 'Delhi NCR',
    discount: 'Flat ₹300 OFF',
    originalPrice: '₹1,299',
    dealPrice: '₹999',
    validTill: 'Today Only',
    badge: '20 Min Dispatch ⚡',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'deal-8',
    title: 'Royal Nizami Mutton Biryani Family Feast',
    businessName: 'Bawarchi Spice & Nizami Biryani Palace',
    businessId: 'b-501',
    category: 'food',
    city: 'Hyderabad',
    discount: '25% OFF',
    originalPrice: '₹1,199',
    dealPrice: '₹899',
    validTill: 'Dinner Special',
    badge: 'Chef Recommended 👑',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'deal-9',
    title: 'Full Body Physiotherapy & Posture Realignment',
    businessName: 'Koregaon Wellness Clinic',
    businessId: 'b-601',
    category: 'health',
    city: 'Pune',
    discount: '35% OFF',
    originalPrice: '₹1,500',
    dealPrice: '₹975',
    validTill: 'Limited Slots',
    badge: 'Verified Physio 🩺',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'deal-10',
    title: 'Complete Orthodontic Consultation & Digital Scan',
    businessName: 'Heritage City Dental & Orthodontics',
    businessId: 'b-801',
    category: 'health',
    city: 'Mysuru',
    discount: '50% OFF',
    originalPrice: '₹800',
    dealPrice: '₹399',
    validTill: 'Expires in 12 hours',
    badge: 'Top Rated ⭐',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=500&q=80'
  }
];

const INITIAL_USER = {
  id: 'usr-8821',
  name: 'Chethan B K',
  email: 'chethan@localcare.in',
  phone: '+91 98451 98765',
  city: 'Bengaluru',
  savedAddresses: [
    { label: 'Home', address: '42, 5th Cross, Koramangala 4th Block, Bengaluru 560034', default: true },
    { label: 'Work', address: 'Indiranagar 100 Feet Road, Near Metro Station, Bengaluru 560038', default: false }
  ],
  notifications: [
    { id: 'notif-1', title: 'Technician Assigned', message: 'Suresh Gowda is on the way for your AC Deep Service.', time: '10m ago', unread: true },
    { id: 'notif-2', title: 'Quote Received', message: '3 verified plumbers in Koramangala responded to your request.', time: '1h ago', unread: true },
    { id: 'notif-3', title: 'Exclusive Deal Nearby', message: '20% OFF at Apollo Dental Clinic this week.', time: 'Yesterday', unread: false }
  ]
};

const INITIAL_BOOKINGS = [
  {
    id: 'LC-BK-9481',
    businessId: 'b-102',
    businessName: 'QuickFix Pro AC & Electricals',
    businessImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=300&q=80',
    serviceName: 'Split AC Power Jet Servicing',
    price: 449,
    date: 'Today',
    timeSlot: '2:00 PM - 3:00 PM',
    address: '42, 5th Cross, Koramangala 4th Block, Bengaluru',
    status: 'On The Way',
    otp: '5192',
    technician: {
      name: 'Suresh Gowda',
      phone: '+91 98450 44556',
      rating: 4.9,
      vehicle: 'KA-01-EA-4921 (Hero Splendor)',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      etaMinutes: 12
    }
  }
];

const INITIAL_QUOTES = [
  {
    id: 'LC-QT-4029',
    category: 'home',
    title: 'Bathroom Concealed Pipe Seepage Repair',
    locality: 'Koramangala 4th Block, Bengaluru',
    urgency: 'Today within 2 hours',
    budget: 'Under ₹600',
    status: 'Bids Received',
    createdAt: '25 mins ago',
    bids: [
      { id: 'bid-1', proName: 'Ravi Plumbing Solutions', rating: 4.9, reviews: 182, price: 450, eta: 'Arrives in 25 min', phone: '+91 98450 11990' },
      { id: 'bid-2', proName: 'QuickFix Plumbing Care', rating: 4.7, reviews: 96, price: 399, eta: 'Arrives in 40 min', phone: '+91 98450 22881' },
      { id: 'bid-3', proName: 'City Master Plumbers', rating: 4.8, reviews: 240, price: 500, eta: 'Available at 5:00 PM', phone: '+91 98450 33772' }
    ]
  }
];

// Browser & Node environment export bindings
if (typeof window !== 'undefined') {
  window.CITIES = CITIES;
  window.CATEGORIES = CATEGORIES;
  window.INITIAL_BUSINESSES = INITIAL_BUSINESSES;
  window.PLATFORM_DEALS = PLATFORM_DEALS;
  window.INITIAL_BOOKINGS = INITIAL_BOOKINGS;
  window.INITIAL_QUOTES = INITIAL_QUOTES;
  if (typeof INITIAL_USER !== 'undefined') window.INITIAL_USER = INITIAL_USER;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CITIES,
    CATEGORIES,
    INITIAL_BUSINESSES,
    PLATFORM_DEALS,
    INITIAL_BOOKINGS,
    INITIAL_QUOTES
  };
}
