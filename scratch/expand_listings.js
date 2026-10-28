const fs = require('fs');
const path = require('path');

const NEW_BUSINESSES = [
  // --- HOTELS & RESORTS ---
  {
    id: "b-hotel-blr-1",
    name: "The Leela Palace Luxury Heritage Hotel",
    category: "travel",
    subcategory: "Hotels & Resorts",
    city: "Bengaluru",
    locality: "HAL Old Airport Road",
    rating: 4.9,
    reviewsCount: 820,
    verified: true,
    superSeller: true,
    openNow: true,
    availableToday: true,
    operatingHours: "24 Hours Open",
    startingPrice: 8999,
    priceRange: "₹₹₹₹",
    responseTime: "~3 min",
    trustScore: 99,
    trustVerification: {
      phoneVerified: true,
      businessRegistration: true,
      addressInspected: true,
      policeBackgroundChecked: true,
      verifiedCustomerReviews: 820
    },
    phone: "+91 80 2521 1234",
    whatsapp: "918025211234",
    address: "23, HAL Old Airport Road, Kodihalli, Bengaluru",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
    description: "Palatial 5-star hotel inspired by the architectural grandeur of the Mysore Palace. Features landscaped gardens, world-class luxury spa, multi-cuisine restaurants (Citrus & Jamavar), outdoor heated pool, and private airport limousine transfer.",
    services: [
      { id: "s-leela-1", name: "Royal Premiere Deluxe Room (Per Night)", price: 8999, duration: "Per Night" },
      { id: "s-leela-2", name: "Conservatory Club Suite + Airport Drop", price: 14999, duration: "Per Night" },
      { id: "s-leela-3", name: "Sunday Champagne Brunch at Citrus", price: 3499, duration: "3 hours" }
    ],
    features: ["Palatial Gardens", "Heated Swimming Pool", "ESPA Luxury Spa", "Free High-Speed Wi-Fi", "Valet Parking"],
    reviews: [
      { author: "Aditya Roy", rating: 5, date: "3 days ago", verifiedBooking: true, comment: "Breathtaking royal ambiance and impeccable hospitality. Sunday brunch at Citrus was world-class.", helpful: 14 }
    ],
    lat: 12.9602,
    lng: 77.6485
  },
  {
    id: "b-hotel-blr-2",
    name: "Taj West End Heritage Garden Hotel",
    category: "travel",
    subcategory: "Hotels & Resorts",
    city: "Bengaluru",
    locality: "Race Course Road",
    rating: 4.8,
    reviewsCount: 640,
    verified: true,
    superSeller: true,
    openNow: true,
    availableToday: true,
    operatingHours: "24 Hours Open",
    startingPrice: 7499,
    priceRange: "₹₹₹₹",
    responseTime: "~5 min",
    trustScore: 98,
    trustVerification: {
      phoneVerified: true,
      businessRegistration: true,
      addressInspected: true,
      policeBackgroundChecked: true,
      verifiedCustomerReviews: 640
    },
    phone: "+91 80 6660 5660",
    whatsapp: "918066605660",
    address: "Race Course Road, High Grounds, Bengaluru",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    description: "Sprawled over 20 acres of lush botanical gardens, Taj West End is Bengaluru's iconic sanctuary blending Victorian heritage with contemporary luxury. Home to the legendary Blue Ginger Vietnamese restaurant and Machan dining.",
    services: [
      { id: "s-tajwe-1", name: "Heritage Garden View Room", price: 7499, duration: "Per Night" },
      { id: "s-tajwe-2", name: "Luxury Garden Suite with Balcony", price: 12499, duration: "Per Night" },
      { id: "s-tajwe-3", name: "Jiva Ayurvedic Spa Signature Therapy", price: 4200, duration: "90 mins" }
    ],
    features: ["20-Acre Botanical Flora", "Jiva Spa", "Blue Ginger Vietnamese", "Tennis Courts", "Electric Car Charging"],
    reviews: [
      { author: "Sunita Menon", rating: 5, date: "1 week ago", verifiedBooking: true, comment: "Staying here feels like entering a tranquil rainforest in the center of the city. Incredible hospitality.", helpful: 9 }
    ],
    lat: 12.9856,
    lng: 77.5847
  },
  {
    id: "b-hotel-mum-1",
    name: "The Taj Mahal Palace & Tower",
    category: "travel",
    subcategory: "Hotels & Resorts",
    city: "Mumbai",
    locality: "Apollo Bunder, Colaba",
    rating: 5.0,
    reviewsCount: 1420,
    verified: true,
    superSeller: true,
    openNow: true,
    availableToday: true,
    operatingHours: "24 Hours Open",
    startingPrice: 11999,
    priceRange: "₹₹₹₹",
    responseTime: "~2 min",
    trustScore: 100,
    trustVerification: {
      phoneVerified: true,
      businessRegistration: true,
      addressInspected: true,
      policeBackgroundChecked: true,
      verifiedCustomerReviews: 1420
    },
    phone: "+91 22 6665 3366",
    whatsapp: "912266653366",
    address: "Apollo Bunder, Colaba, Mumbai",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    description: "India's flagship heritage landmark overlooking the Gateway of India and the Arabian Sea since 1903. Renowned for world-famous dining at Wasabi by Morimoto, Golden Dragon, Shamiana, and Sea Lounge afternoon tea.",
    services: [
      { id: "s-tajpal-1", name: "Tower Sea View Superior Room", price: 11999, duration: "Per Night" },
      { id: "s-tajpal-2", name: "Palace Wing Historic Heritage Suite", price: 21999, duration: "Per Night" },
      { id: "s-tajpal-3", name: "High Tea at Sea Lounge with Bay View", price: 2800, duration: "2 hours" }
    ],
    features: ["Gateway of India View", "Wasabi by Morimoto", "Jiva Spa & Pool", "Heritage Art Walk", "Butler Service"],
    reviews: [
      { author: "Rohan Kapoor", rating: 5, date: "4 days ago", verifiedBooking: true, comment: "Unrivaled heritage luxury. Watching ships sail past the Gateway of India from the room is timeless.", helpful: 26 }
    ],
    lat: 18.9217,
    lng: 72.8332
  },
  {
    id: "b-hotel-mum-2",
    name: "JW Marriott Juhu Beach Resort",
    category: "travel",
    subcategory: "Hotels & Resorts",
    city: "Mumbai",
    locality: "Juhu Beach",
    rating: 4.8,
    reviewsCount: 910,
    verified: true,
    superSeller: true,
    openNow: true,
    availableToday: true,
    operatingHours: "24 Hours Open",
    startingPrice: 9499,
    priceRange: "₹₹₹₹",
    responseTime: "~4 min",
    trustScore: 98,
    trustVerification: {
      phoneVerified: true,
      businessRegistration: true,
      addressInspected: true,
      policeBackgroundChecked: true,
      verifiedCustomerReviews: 910
    },
    phone: "+91 22 6693 3000",
    whatsapp: "912266933000",
    address: "Juhu Tara Road, Juhu Beach, Mumbai",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
    description: "Premier beachfront luxury resort offering direct private access to Juhu Beach, infinity pools with Arabian Sea sunset views, award-winning Italian restaurant Mezzo Mezzo, Lotus Cafe, and Quan Spa.",
    services: [
      { id: "s-jwm-1", name: "Deluxe Ocean View Room", price: 9499, duration: "Per Night" },
      { id: "s-jwm-2", name: "Executive Suite + Sea-facing Breakfast", price: 15499, duration: "Per Night" },
      { id: "s-jwm-3", name: "Lotus Cafe Famous Sunday Brunch", price: 2999, duration: "3 hours" }
    ],
    features: ["Direct Beach Access", "Infinity Saltwater Pool", "Quan Spa", "Sea View Dining", "24/7 Fitness Center"],
    reviews: [
      { author: "Kareena Merchant", rating: 5, date: "2 weeks ago", verifiedBooking: true, comment: "Sunset by the poolside with the Arabian Sea breeze is unmatched in Mumbai.", helpful: 11 }
    ],
    lat: 19.0988,
    lng: 72.8267
  },
  {
    id: "b-hotel-del-1",
    name: "The Imperial Heritage Luxury Hotel",
    category: "travel",
    subcategory: "Hotels & Resorts",
    city: "Delhi NCR",
    locality: "Janpath, Connaught Place",
    rating: 4.9,
    reviewsCount: 750,
    verified: true,
    superSeller: true,
    openNow: true,
    availableToday: true,
    operatingHours: "24 Hours Open",
    startingPrice: 8499,
    priceRange: "₹₹₹₹",
    responseTime: "~3 min",
    trustScore: 99,
    trustVerification: {
      phoneVerified: true,
      businessRegistration: true,
      addressInspected: true,
      policeBackgroundChecked: true,
      verifiedCustomerReviews: 750
    },
    phone: "+91 11 2334 1234",
    whatsapp: "911123341234",
    address: "Janpath Lane, Connaught Place, New Delhi",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80",
    description: "Legendary 1930s colonial Art Deco luxury hotel nestled on Janpath near Connaught Place. Boasts museum-grade colonial art collections, the renowned Spice Route Asian restaurant, The 1911 Bar, and sprawling royal suites.",
    services: [
      { id: "s-imp-1", name: "Imperial Heritage Deco Room", price: 8499, duration: "Per Night" },
      { id: "s-imp-2", name: "Colonial Suite with Butler Service", price: 13999, duration: "Per Night" },
      { id: "s-imp-3", name: "Spice Route 7-Course Chef Degustation", price: 3800, duration: "2 hours" }
    ],
    features: ["Art Museum Gallery", "The Spice Route Dining", "Swimming Pool", "Near Metro Station", "High Security Protocol"],
    reviews: [
      { author: "Vikram Singhania", rating: 5, date: "1 week ago", verifiedBooking: true, comment: "Living inside a historical palace museum with pristine 5-star service. Spice Route restaurant is spectacular.", helpful: 18 }
    ],
    lat: 28.6225,
    lng: 77.2185
  },
  {
    id: "b-hotel-mng-1",
    name: "The Ocean Pearl Luxury Business Hotel",
    category: "travel",
    subcategory: "Hotels & Resorts",
    city: "Mangaluru",
    locality: "Kodialbail",
    rating: 4.8,
    reviewsCount: 520,
    verified: true,
    superSeller: true,
    openNow: true,
    availableToday: true,
    operatingHours: "24 Hours Open",
    startingPrice: 3299,
    priceRange: "₹₹₹",
    responseTime: "~5 min",
    trustScore: 97,
    trustVerification: {
      phoneVerified: true,
      businessRegistration: true,
      addressInspected: true,
      policeBackgroundChecked: true,
      verifiedCustomerReviews: 520
    },
    phone: "+91 824 249 1011",
    whatsapp: "918242491011",
    address: "Navabharath Circle, Kodialbail, Mangaluru",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
    description: "Mangaluru's premier business and luxury stay located at Navabharath Circle. Features well-appointed executive rooms, Sagar Ratna Pure Veg, Coral Coastal Seafood fine-dining, banquet facilities, and express Mangalore Airport transfers.",
    services: [
      { id: "s-op-1", name: "Executive Deluxe Room (Per Night)", price: 3299, duration: "Per Night" },
      { id: "s-op-2", name: "Club Suite with Complimentary Breakfast", price: 4799, duration: "Per Night" },
      { id: "s-op-3", name: "Airport Pickup / Drop Transfer", price: 899, duration: "45 mins" }
    ],
    features: ["Coral Coastal Dining", "Sagar Ratna Veg", "Free High-Speed Wi-Fi", "Conference Halls", "Airport Shuttle"],
    reviews: [
      { author: "Pradeep Rao", rating: 5, date: "5 days ago", verifiedBooking: true, comment: "Top hotel in Mangalore. Very clean, great coastal food at Coral, and convenient location near Hampankatta.", helpful: 12 }
    ],
    lat: 12.8732,
    lng: 74.8428
  },
  {
    id: "b-hotel-mys-1",
    name: "Lalitha Mahal Palace Heritage Hotel",
    category: "travel",
    subcategory: "Hotels & Resorts",
    city: "Mysuru",
    locality: "Siddhartha Layout",
    rating: 4.8,
    reviewsCount: 480,
    verified: true,
    superSeller: true,
    openNow: true,
    availableToday: true,
    operatingHours: "24 Hours Open",
    startingPrice: 4999,
    priceRange: "₹₹₹₹",
    responseTime: "~6 min",
    trustScore: 97,
    trustVerification: {
      phoneVerified: true,
      businessRegistration: true,
      addressInspected: true,
      policeBackgroundChecked: true,
      verifiedCustomerReviews: 480
    },
    phone: "+91 821 247 0470",
    whatsapp: "918212470470",
    address: "Lalitha Mahal Nagar, Siddhartha Layout, Mysuru",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    description: "Built in 1921 by the Maharaja of Mysore on a ridge overlooking Chamundi Hill, Lalitha Mahal is a gleaming white Italianate Renaissance palace with crystal chandeliers, grand ballroom dining, and royal heritage suites.",
    services: [
      { id: "s-lm-1", name: "Royal Heritage Room", price: 4999, duration: "Per Night" },
      { id: "s-lm-2", name: "Maharaja Heritage Suite", price: 9999, duration: "Per Night" },
      { id: "s-lm-3", name: "Royal Mysore Thali Lunch in Palace Ballroom", price: 1199, duration: "90 mins" }
    ],
    features: ["Original Royal Palace Architecture", "View of Chamundi Hill", "Billiards Room", "Free Wi-Fi", "Historic Ballroom"],
    reviews: [
      { author: "Arjun Deshmukh", rating: 5, date: "3 weeks ago", verifiedBooking: true, comment: "Staying in a real Maharaja's palace is an unforgettable royal experience. The view of Mysore is incredible.", helpful: 8 }
    ],
    lat: 12.2985,
    lng: 76.6892
  },
  {
    id: "b-hotel-hyd-1",
    name: "Taj Falaknuma Palace & Luxury Resort",
    category: "travel",
    subcategory: "Hotels & Resorts",
    city: "Hyderabad",
    locality: "Engine Bowli, Falaknuma",
    rating: 5.0,
    reviewsCount: 680,
    verified: true,
    superSeller: true,
    openNow: true,
    availableToday: true,
    operatingHours: "24 Hours Open",
    startingPrice: 16999,
    priceRange: "₹₹₹₹",
    responseTime: "~2 min",
    trustScore: 100,
    trustVerification: {
      phoneVerified: true,
      businessRegistration: true,
      addressInspected: true,
      policeBackgroundChecked: true,
      verifiedCustomerReviews: 680
    },
    phone: "+91 40 6629 8585",
    whatsapp: "914066298585",
    address: "Engine Bowli, Fatima Nagar, Falaknuma, Hyderabad",
    image: "https://images.unsplash.com/photo-1549294413-26f195200c16?auto=format&fit=crop&w=800&q=80",
    description: "The 'Mirror of the Sky' perched 2,000 feet above Hyderabad, former residence of the Nizam. Arrive by horse-drawn carriage, walk on Italian marble, dine at the 101-seat dining table, and enjoy Sufi music at sunset.",
    services: [
      { id: "s-falak-1", name: "Palace Room with Royal Carriage Arrival", price: 16999, duration: "Per Night" },
      { id: "s-falak-2", name: "Historical Suite with Nizam Garden Terrace", price: 29999, duration: "Per Night" },
      { id: "s-falak-3", name: "Nizami Dawaat Royal Multi-Course Dinner", price: 4500, duration: "2 hours" }
    ],
    features: ["Horse-Drawn Carriage Arrival", "Nizam's 101-Seater Dining Hall", "Jiva Grand Spa", "Palace Historian Tour", "Panoramic City Vista"],
    reviews: [
      { author: "Fatima Zaidi", rating: 5, date: "6 days ago", verifiedBooking: true, comment: "Royal perfection from the horse carriage welcome with rose petals to the Nizami dinner. Worth every rupee.", helpful: 22 }
    ],
    lat: 17.3315,
    lng: 78.4678
  },

  // --- ICONIC RESTAURANTS & FOOD ---
  {
    id: "b-food-blr-1",
    name: "Vidyarthi Bhavan Heritage Restaurant",
    category: "food",
    subcategory: "South Indian Heritage",
    city: "Bengaluru",
    locality: "Gandhi Bazaar, Basavanagudi",
    rating: 4.8,
    reviewsCount: 1650,
    verified: true,
    superSeller: true,
    openNow: true,
    availableToday: true,
    operatingHours: "6:30 AM - 11:30 AM, 2:00 PM - 8:00 PM (Fri Closed)",
    startingPrice: 90,
    priceRange: "₹",
    responseTime: "~2 min",
    trustScore: 99,
    trustVerification: {
      phoneVerified: true,
      businessRegistration: true,
      addressInspected: true,
      policeBackgroundChecked: true,
      verifiedCustomerReviews: 1650
    },
    phone: "+91 80 2667 7588",
    whatsapp: "918026677588",
    address: "32, Gandhi Bazaar Main Road, Basavanagudi, Bengaluru",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    description: "Established in 1943, Vidyarthi Bhavan is Bengaluru's quintessential breakfast institution. Famous for thick, golden, crispy Ghee Masala Dosas, Kesari Bath, Poori Saagu, and authentic steaming degree filter coffee.",
    isVeg: true,
    services: [
      { id: "s-vb-1", name: "Legendary Crispy Ghee Masala Dosa", price: 90, duration: "10 mins" },
      { id: "s-vb-2", name: "Rava Vada with Coconut Chutney", price: 65, duration: "10 mins" },
      { id: "s-vb-3", name: "Pure Chikmagalur Filter Coffee", price: 35, duration: "5 mins" }
    ],
    features: ["Heritage Legacy Since 1943", "100% Pure Vegetarian", "Famous Stack Dosa Service", "Iconic Filter Coffee"],
    reviews: [
      { author: "Chetan Narang", rating: 5, date: "Yesterday", verifiedBooking: true, comment: "The crispy brown ghee roast dosa is unmatched anywhere on the planet. A Bengaluru rite of passage.", helpful: 31 }
    ],
    lat: 12.9439,
    lng: 77.5714
  },
  {
    id: "b-food-blr-2",
    name: "Mavalli Tiffin Room (MTR Since 1924)",
    category: "food",
    subcategory: "Pure Veg Thali & South Indian",
    city: "Bengaluru",
    locality: "Lalbagh Fort Road",
    rating: 4.8,
    reviewsCount: 1240,
    verified: true,
    superSeller: true,
    openNow: true,
    availableToday: true,
    operatingHours: "6:30 AM - 11:00 AM, 12:30 PM - 8:30 PM (Mon Closed)",
    startingPrice: 110,
    priceRange: "₹₹",
    responseTime: "~3 min",
    trustScore: 99,
    trustVerification: {
      phoneVerified: true,
      businessRegistration: true,
      addressInspected: true,
      policeBackgroundChecked: true,
      verifiedCustomerReviews: 1240
    },
    phone: "+91 80 2222 0022",
    whatsapp: "918022220022",
    address: "14, Lalbagh Fort Road, Doddamavalli, Bengaluru",
    image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=800&q=80",
    description: "Centenary heritage culinary institution founded in 1924 opposite Lalbagh Botanical Gardens. Inventors of the Rava Idli during WWII. Famous for silver-plated Royal Karnataka Thalis, Bisibelebath, and Chandrahara dessert.",
    isVeg: true,
    services: [
      { id: "s-mtr-1", name: "Original Inventor Rava Idli with Ghee & Potato Saagu", price: 110, duration: "10 mins" },
      { id: "s-mtr-2", name: "Royal Unlimited Silver Plate Lunch Thali", price: 320, duration: "45 mins" },
      { id: "s-mtr-3", name: "Traditional Bisibelebath with Boondi", price: 130, duration: "15 mins" }
    ],
    features: ["100 Years of Heritage (1924-2024)", "Pure Veg Sattvic Cooking", "Silver Cutlery Dining", "Lalbagh Landmark"],
    reviews: [
      { author: "Kavitha Shastry", rating: 5, date: "3 days ago", verifiedBooking: true, comment: "The Rava Idli and Chandrahara dessert were perfection. Incredible history in every bite.", helpful: 19 }
    ],
    lat: 12.9554,
    lng: 77.5861
  },
  {
    id: "b-food-blr-3",
    name: "Toit Brewpub & Artisanal Italian Kitchen",
    category: "food",
    subcategory: "Brewpub & Continental Dining",
    city: "Bengaluru",
    locality: "Indiranagar 100ft Road",
    rating: 4.8,
    reviewsCount: 1540,
    verified: true,
    superSeller: true,
    openNow: true,
    availableToday: true,
    operatingHours: "12:00 PM - 1:00 AM",
    startingPrice: 380,
    priceRange: "₹₹₹",
    responseTime: "~4 min",
    trustScore: 98,
    trustVerification: {
      phoneVerified: true,
      businessRegistration: true,
      addressInspected: true,
      policeBackgroundChecked: true,
      verifiedCustomerReviews: 1540
    },
    phone: "+91 90197 13388",
    whatsapp: "919019713388",
    address: "298, 100 Feet Road, Indiranagar, Bengaluru",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    description: "Bengaluru's trailblazing microbrewery and craft beer haven. World-famous for craft brews like Tint-In-Wit and Basmati Blonde, woodfired sourdough Neapolitan pizzas, baked nachos, and beef briskets.",
    services: [
      { id: "s-toit-1", name: "Toit Woodfired Sourdough Margherita Pizza", price: 460, duration: "20 mins" },
      { id: "s-toit-2", name: "Signature Loaded Nachos with Guacamole", price: 380, duration: "15 mins" },
      { id: "s-toit-3", name: "Barbeque Chicken Wings (6 pcs)", price: 410, duration: "15 mins" }
    ],
    features: ["Pet Friendly Dining", "Fresh Craft Brews", "Woodfired Sourdough Oven", "Valet Parking", "Rooftop Vibe"],
    reviews: [
      { author: "Nikhil Verma", rating: 5, date: "4 days ago", verifiedBooking: true, comment: "The gold standard of Bengaluru microbreweries. Tintin Wit beer and sourdough pizza are exceptional.", helpful: 15 }
    ],
    lat: 12.9792,
    lng: 77.6406
  },
  {
    id: "b-food-mum-1",
    name: "Gajalee Coastal Mangalorean Seafood",
    category: "food",
    subcategory: "Coastal Seafood & Fish Curry",
    city: "Mumbai",
    locality: "Vile Parle East",
    rating: 4.8,
    reviewsCount: 1180,
    verified: true,
    superSeller: true,
    openNow: true,
    availableToday: true,
    operatingHours: "11:30 AM - 3:30 PM, 7:00 PM - 11:30 PM",
    startingPrice: 420,
    priceRange: "₹₹₹",
    responseTime: "~3 min",
    trustScore: 98,
    trustVerification: {
      phoneVerified: true,
      businessRegistration: true,
      addressInspected: true,
      policeBackgroundChecked: true,
      verifiedCustomerReviews: 1180
    },
    phone: "+91 22 2611 4093",
    whatsapp: "912226114093",
    address: "Kadamgiri Complex, Hanuman Road, Vile Parle East, Mumbai",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
    description: "Mumbai's premier coastal seafood pilgrimage. Celebrated for Tandoori Crab, Butter Pepper Garlic Jumbo Prawns, Bombil Fry (Bombay Duck), Neer Dosa, and authentic Mangalorean Ghee Roast.",
    services: [
      { id: "s-gaj-1", name: "Signature Tandoori Mud Crab (Catch of Day)", price: 1450, duration: "25 mins" },
      { id: "s-gaj-2", name: "Crispy Bombil Fry (Bombay Duck)", price: 390, duration: "15 mins" },
      { id: "s-gaj-3", name: "Surmai Fish Curry with Steamed Neer Dosa (4 pcs)", price: 580, duration: "20 mins" }
    ],
    features: ["Fresh Arabian Sea Catch", "Authentic Mangalore Ghee Roast", "Air Conditioned Family Dining", "Valet Parking"],
    reviews: [
      { author: "Sameer Joshi", rating: 5, date: "1 week ago", verifiedBooking: true, comment: "The Tandoori Crab in butter pepper garlic sauce is the finest in India. Bombil fry was crunchy and fresh.", helpful: 28 }
    ],
    lat: 19.0998,
    lng: 72.8532
  },
  {
    id: "b-food-mum-2",
    name: "Cafe Madras Since 1940",
    category: "food",
    subcategory: "Pure Veg South Indian",
    city: "Mumbai",
    locality: "Matunga Circle",
    rating: 4.9,
    reviewsCount: 1390,
    verified: true,
    superSeller: true,
    openNow: true,
    availableToday: true,
    operatingHours: "7:00 AM - 2:30 PM, 4:00 PM - 10:30 PM (Mon Closed)",
    startingPrice: 85,
    priceRange: "₹",
    responseTime: "~2 min",
    trustScore: 99,
    trustVerification: {
      phoneVerified: true,
      businessRegistration: true,
      addressInspected: true,
      policeBackgroundChecked: true,
      verifiedCustomerReviews: 1390
    },
    phone: "+91 22 2401 4419",
    whatsapp: "912224014419",
    address: "38 B, Kamakshi Building, Bhaudaji Road, Kings Circle, Matunga, Mumbai",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    description: "Beloved 84-year-old culinary institution in Mumbai's South Indian heartland of Matunga. Famous for Butter Idli Podi, Ragi Masala Dosa, Upma Podi, crisp Medu Vada, and piping hot brass tumbler filter coffee.",
    isVeg: true,
    services: [
      { id: "s-cm-1", name: "Butter Idli sprinkled with Gunpowder Podi", price: 95, duration: "8 mins" },
      { id: "s-cm-2", name: "Special Ragi Masala Dosa with White Chutney", price: 120, duration: "12 mins" },
      { id: "s-cm-3", name: "Traditional Brass Tumbler Degree Filter Coffee", price: 40, duration: "5 mins" }
    ],
    features: ["84 Years of Legacy", "Pure Veg Sattvic", "Iconic Matunga Landmark", "Quick Service"],
    reviews: [
      { author: "Rashmi Iyer", rating: 5, date: "5 days ago", verifiedBooking: true, comment: "The Butter Idli Podi melting in your mouth with filter coffee is pure Sunday bliss.", helpful: 24 }
    ],
    lat: 19.0278,
    lng: 72.8553
  },
  {
    id: "b-food-del-1",
    name: "Karim's Historic Mughlai Since 1913",
    category: "food",
    subcategory: "Royal Mughlai & Kebabs",
    city: "Delhi NCR",
    locality: "Jama Masjid, Old Delhi",
    rating: 4.8,
    reviewsCount: 1850,
    verified: true,
    superSeller: true,
    openNow: true,
    availableToday: true,
    operatingHours: "9:00 AM - 1:00 AM",
    startingPrice: 280,
    priceRange: "₹₹",
    responseTime: "~3 min",
    trustScore: 99,
    trustVerification: {
      phoneVerified: true,
      businessRegistration: true,
      addressInspected: true,
      policeBackgroundChecked: true,
      verifiedCustomerReviews: 1850
    },
    phone: "+91 11 2326 4984",
    whatsapp: "911123264984",
    address: "16, Gali Kababian, Jama Masjid, Old Delhi",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    description: "Royal culinary legacy founded in 1913 by Haji Karimuddin, royal cook of the Mughal emperors. World-renowned for Mutton Burra Kebabs, Mutton Korma, Chicken Jahangiri, Seekh Kebabs, and tandoori Khamiri Roti.",
    services: [
      { id: "s-kar-1", name: "Charcoal Grilled Mutton Burra Kebab (4 pcs)", price: 480, duration: "15 mins" },
      { id: "s-kar-2", name: "Rich Mughal Mutton Korma with Rogan", price: 380, duration: "15 mins" },
      { id: "s-kar-3", name: "Fresh Baked Tandoori Khamiri Roti (2 pcs)", price: 40, duration: "5 mins" }
    ],
    features: ["110+ Years Mughal Heritage", "Charcoal Clay Tandoor", "Near Jama Masjid Gate 1", "Halal Certified"],
    reviews: [
      { author: "Zaid Qureshi", rating: 5, date: "1 week ago", verifiedBooking: true, comment: "Mutton Burra kebab falls right off the bone with deep smoky spices. Truly legendary.", helpful: 35 }
    ],
    lat: 28.6507,
    lng: 77.2334
  },
  {
    id: "b-food-mng-1",
    name: "Giri Manja's Coastal Seafood & Ghee Roast",
    category: "food",
    subcategory: "Coastal Seafood & Fish Curry",
    city: "Mangaluru",
    locality: "Car Street, Bhavathi",
    rating: 4.9,
    reviewsCount: 890,
    verified: true,
    superSeller: true,
    openNow: true,
    availableToday: true,
    operatingHours: "11:30 AM - 4:00 PM, 7:00 PM - 10:00 PM",
    startingPrice: 220,
    priceRange: "₹₹",
    responseTime: "~4 min",
    trustScore: 98,
    trustVerification: {
      phoneVerified: true,
      businessRegistration: true,
      addressInspected: true,
      policeBackgroundChecked: true,
      verifiedCustomerReviews: 890
    },
    phone: "+91 99000 00123",
    whatsapp: "919900000123",
    address: "Near Kalikamba Temple, Car Street, Bhavathi, Mangaluru",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    description: "Old heritage Mangalorean tiled-roof house serving the town's most legendary seafood. Renowned for Anjal (King Fish) Tava Fry in coconut oil, Squid Sukka, Prawns Ghee Roast, and traditional boiled rice with fish curry.",
    services: [
      { id: "s-gm-1", name: "Anjal (Seer Fish / King Fish) Masala Tava Fry", price: 340, duration: "15 mins" },
      { id: "s-gm-2", name: "Kundapur Prawns Ghee Roast", price: 390, duration: "15 mins" },
      { id: "s-gm-3", name: "Mangalorean Fish Curry Meal with Boiled Rice", price: 180, duration: "10 mins" }
    ],
    features: ["Authentic Coconut Oil Tava Fry", "Direct Bunder Morning Catch", "Banana Leaf Dining", "Iconic Mangalore Heritage"],
    reviews: [
      { author: "Naveen Shenoy", rating: 5, date: "3 days ago", verifiedBooking: true, comment: "The Kingfish Anjal fry here is holy grail level. Fresh, juicy, and perfectly spiced with curry leaves.", helpful: 16 }
    ],
    lat: 12.8685,
    lng: 74.8392
  },
  {
    id: "b-food-mys-1",
    name: "Mylari Famous Butter Dosa Since 1938",
    category: "food",
    subcategory: "South Indian Breakfast",
    city: "Mysuru",
    locality: "Nazarbad Main Road",
    rating: 4.8,
    reviewsCount: 950,
    verified: true,
    superSeller: true,
    openNow: true,
    availableToday: true,
    operatingHours: "6:30 AM - 1:30 PM, 3:30 PM - 8:30 PM",
    startingPrice: 65,
    priceRange: "₹",
    responseTime: "~3 min",
    trustScore: 98,
    trustVerification: {
      phoneVerified: true,
      businessRegistration: true,
      addressInspected: true,
      policeBackgroundChecked: true,
      verifiedCustomerReviews: 950
    },
    phone: "+91 94486 08710",
    whatsapp: "919448608710",
    address: "79, Nazarbad Main Road, Near Police Station, Mysuru",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    description: "Mysuru's world-famous artisanal dosa stop. Iconic for soft, melt-in-your-mouth cloud-like dosas topped with a dollop of white homemade butter, stuffed with unique onion-coriander saagu and coconut chutney.",
    isVeg: true,
    services: [
      { id: "s-myl-1", name: "Special White Butter Masala Dosa", price: 75, duration: "8 mins" },
      { id: "s-myl-2", name: "Plain Mylari Butter Dosa", price: 65, duration: "8 mins" },
      { id: "s-myl-3", name: "Mysuru Heritage Filter Coffee", price: 30, duration: "5 mins" }
    ],
    features: ["Homemade Fresh Butter", "86 Years of Heritage", "100% Pure Veg", "Near Mysore Palace"],
    reviews: [
      { author: "Sanjay Urs", rating: 5, date: "4 days ago", verifiedBooking: true, comment: "Soft like a cloud with homemade white butter. Nobody makes a dosa like original Mylari.", helpful: 14 }
    ],
    lat: 12.3112,
    lng: 76.6624
  },

  // --- HOME WORKS, SKILLED TRADES & CONSTRUCTION ---
  {
    id: "b-work-paint-1",
    name: "Asian Paints ColorPro & Waterproofing Specialists",
    category: "home",
    subcategory: "Painting & Waterproofing",
    city: "Bengaluru",
    locality: "Koramangala 4th Block",
    rating: 4.9,
    reviewsCount: 380,
    verified: true,
    superSeller: true,
    openNow: true,
    availableToday: true,
    operatingHours: "8:00 AM - 8:00 PM",
    startingPrice: 999,
    priceRange: "₹₹",
    responseTime: "~10 min",
    trustScore: 99,
    trustVerification: {
      phoneVerified: true,
      businessRegistration: true,
      addressInspected: true,
      policeBackgroundChecked: true,
      verifiedCustomerReviews: 380
    },
    phone: "+91 98450 44556",
    whatsapp: "919845044556",
    address: "42, 80 Feet Road, Koramangala 4th Block, Bengaluru",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
    description: "Certified master painting and seepage waterproofing contractors. Complete interior & exterior painting with mechanized dust-free sanding, Asian Paints Royale Luxury Emulsion, Dr. Fixit wall dampness treatment, and 3-year warranty.",
    services: [
      { id: "s-pt-1", name: "Wall Dampness & Terrace Waterproofing Inspection", price: 499, duration: "60 mins" },
      { id: "s-pt-2", name: "2BHK Full Interior Painting (Primer + 2 Coats)", price: 8999, duration: "2 days" },
      { id: "s-pt-3", name: "Living Room Designer Accent Texture Wall", price: 2999, duration: "1 day" }
    ],
    features: ["Mechanized Dust-Free Sanding", "3-Year Paint Warranty", "Asian Paints Genuine Products", "Furniture Masking Included"],
    reviews: [
      { author: "Vinay Gowda", rating: 5, date: "3 days ago", verifiedBooking: true, comment: "Covered all furniture with plastic sheets, did dustless sanding, and finished our 3BHK in 3 days. Clean and flawless.", helpful: 11 }
    ],
    lat: 12.9345,
    lng: 77.6254
  },
  {
    id: "b-work-carp-1",
    name: "UrbanCraft Modular Kitchen & Wardrobe Carpenters",
    category: "home",
    subcategory: "Carpentry & Furniture Works",
    city: "Bengaluru",
    locality: "HSR Layout Sector 2",
    rating: 4.8,
    reviewsCount: 290,
    verified: true,
    superSeller: true,
    openNow: true,
    availableToday: true,
    operatingHours: "8:30 AM - 7:30 PM",
    startingPrice: 399,
    priceRange: "₹₹",
    responseTime: "~15 min",
    trustScore: 98,
    trustVerification: {
      phoneVerified: true,
      businessRegistration: true,
      addressInspected: true,
      policeBackgroundChecked: true,
      verifiedCustomerReviews: 290
    },
    phone: "+91 98455 77889",
    whatsapp: "919845577889",
    address: "14th Main, 17th Cross, HSR Layout Sector 2, Bengaluru",
    image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    description: "Skilled carpenters and modular woodwork artisans. Specializing in kitchen hydraulic hinge repairs, sliding wardrobe track replacement, bed assembly, wooden door fixing, customized TV units, and teak wood furniture polish.",
    services: [
      { id: "s-cp-1", name: "Door Lock & Handle Fitting / Repair", price: 399, duration: "45 mins" },
      { id: "s-cp-2", name: "Modular Kitchen Hydraulic Hinge Replacement (4 pcs)", price: 899, duration: "90 mins" },
      { id: "s-cp-3", name: "Custom Sliding Wardrobe Repair & Channel Tuning", price: 1299, duration: "2 hours" }
    ],
    features: ["Hettich & Ebco Hardware Support", "30-Day Workmanship Warranty", "Laser Precision Alignment", "Background-Checked Pros"],
    reviews: [
      { author: "Madhavan N.", rating: 5, date: "1 week ago", verifiedBooking: true, comment: "Fixed our sagging kitchen cabinet doors and replaced hydraulic hinges within an hour. Excellent workmanship.", helpful: 7 }
    ],
    lat: 12.9121,
    lng: 77.6445
  },
  {
    id: "b-work-pest-1",
    name: "HiCare Certified Eco Pest & Termite Control",
    category: "cleaning",
    subcategory: "Pest Control & Sanitization",
    city: "Mumbai",
    locality: "Andheri West, Lokhandwala",
    rating: 4.9,
    reviewsCount: 410,
    verified: true,
    superSeller: true,
    openNow: true,
    availableToday: true,
    operatingHours: "8:00 AM - 8:00 PM",
    startingPrice: 699,
    priceRange: "₹₹",
    responseTime: "~12 min",
    trustScore: 99,
    trustVerification: {
      phoneVerified: true,
      businessRegistration: true,
      addressInspected: true,
      policeBackgroundChecked: true,
      verifiedCustomerReviews: 410
    },
    phone: "+91 22 4000 7878",
    whatsapp: "912240007878",
    address: "Lokhandwala Complex, Andheri West, Mumbai",
    image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80",
    description: "Govt-licensed eco-friendly pest control specialists. Odorless herbal gel treatment for cockroaches, anti-termite drilling with 5-year warranty, bedbug thermal extraction, and residential rodent management.",
    services: [
      { id: "s-pc-1", name: "Odorless Herbal Cockroach Gel (1-2 BHK)", price: 699, duration: "45 mins" },
      { id: "s-pc-2", name: "Anti-Termite Drill & Chemical Barrier (5-Yr Warranty)", price: 2999, duration: "3 hours" },
      { id: "s-pc-3", name: "Bed Bug Thermal Spray Treatment (2 Visits)", price: 1599, duration: "2 hours" }
    ],
    features: ["100% Odorless Herbal Gel", "Safe for Kids & Pets", "Govt CIB Approved Chemicals", "5-Year Termite Warranty"],
    reviews: [
      { author: "Anjali Saxena", rating: 5, date: "2 days ago", verifiedBooking: true, comment: "Totally odorless gel for kitchen cockroaches. Zero smell and the problem was 100% gone in 3 days.", helpful: 14 }
    ],
    lat: 19.1363,
    lng: 72.8277
  },
  {
    id: "b-work-app-1",
    name: "Apex All-Brand Home Appliance Repair Hub",
    category: "electrical",
    subcategory: "Appliance Repair & Electronics",
    city: "Mumbai",
    locality: "Powai, Hiranandani",
    rating: 4.8,
    reviewsCount: 520,
    verified: true,
    superSeller: true,
    openNow: true,
    availableToday: true,
    operatingHours: "8:00 AM - 9:00 PM",
    startingPrice: 349,
    priceRange: "₹₹",
    responseTime: "~15 min",
    trustScore: 98,
    trustVerification: {
      phoneVerified: true,
      businessRegistration: true,
      addressInspected: true,
      policeBackgroundChecked: true,
      verifiedCustomerReviews: 520
    },
    phone: "+91 22 4999 5566",
    whatsapp: "912249995566",
    address: "Central Avenue, Hiranandani Gardens, Powai, Mumbai",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
    description: "Doorstep diagnostic and repair center for washing machines (Front/Top Load), double-door refrigerators, microwave ovens, kitchen chimneys, and water purifiers (RO). Genuine OEM spare parts with 90-day warranty.",
    services: [
      { id: "s-ap-1", name: "Washing Machine Motor & PCB Diagnostic Check", price: 349, duration: "45 mins" },
      { id: "s-ap-2", name: "Refrigerator Gas Charging (R134a/R600a)", price: 1499, duration: "90 mins" },
      { id: "s-ap-3", name: "Kitchen Chimney Deep Degreasing & Filter Wash", price: 799, duration: "60 mins" }
    ],
    features: ["Genuine OEM Spare Parts", "90-Day Service Warranty", "Brand Specialists (LG, Samsung, IFB, Bosch)", "Instant Doorstep Visit"],
    reviews: [
      { author: "Harish Pillai", rating: 5, date: "4 days ago", verifiedBooking: true, comment: "Fixed our IFB washing machine drum error in 40 minutes. Had replacement capacitor in his kit.", helpful: 9 }
    ],
    lat: 19.1176,
    lng: 72.9060
  },
  {
    id: "b-work-tile-1",
    name: "Royal Marble Polish & Tile Regrouting Works",
    category: "home",
    subcategory: "Flooring, Marble & Masonry",
    city: "Delhi NCR",
    locality: "South Extension Part 2",
    rating: 4.8,
    reviewsCount: 230,
    verified: true,
    superSeller: true,
    openNow: true,
    availableToday: true,
    operatingHours: "8:30 AM - 7:30 PM",
    startingPrice: 1299,
    priceRange: "₹₹",
    responseTime: "~20 min",
    trustScore: 97,
    trustVerification: {
      phoneVerified: true,
      businessRegistration: true,
      addressInspected: true,
      policeBackgroundChecked: true,
      verifiedCustomerReviews: 230
    },
    phone: "+91 11 4111 2233",
    whatsapp: "911141112233",
    address: "E-Block, South Extension Part 2, New Delhi",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    description: "Specialized Italian marble mirror polishing, granite crystallization, bathroom anti-skid epoxy tile regrouting, and minor civil masonry works. Utilizing Klindex Italian diamond abrasives for high-gloss restoration.",
    services: [
      { id: "s-tl-1", name: "Bathroom Epoxy Tile Regrouting & Leak Proofing", price: 1299, duration: "3 hours" },
      { id: "s-tl-2", name: "Italian Marble Diamond Mirror Polishing (500 sq ft)", price: 4499, duration: "1 day" },
      { id: "s-tl-3", name: "Granite Kitchen Countertop Stain Removal & Sealing", price: 999, duration: "90 mins" }
    ],
    features: ["Italian Diamond Pad Polishing", "Waterproof Epoxy Grouting", "High Gloss Mirror Finish", "Zero Dust Vacuum Machine"],
    reviews: [
      { author: "Rajeev Bansal", rating: 5, date: "1 week ago", verifiedBooking: true, comment: "Our 12-year-old Italian marble floor looks brand new like glass. Highly skilled craftsmen.", helpful: 8 }
    ],
    lat: 28.5701,
    lng: 77.2228
  },
  {
    id: "b-work-clean-1",
    name: "UltraClean 3M Fabric Sofa & Carpet Shampooing",
    category: "cleaning",
    subcategory: "Deep Cleaning & Sofa Shampooing",
    city: "Bengaluru",
    locality: "Whitefield Inner Circle",
    rating: 4.9,
    reviewsCount: 460,
    verified: true,
    superSeller: true,
    openNow: true,
    availableToday: true,
    operatingHours: "8:00 AM - 8:30 PM",
    startingPrice: 599,
    priceRange: "₹₹",
    responseTime: "~15 min",
    trustScore: 99,
    trustVerification: {
      phoneVerified: true,
      businessRegistration: true,
      addressInspected: true,
      policeBackgroundChecked: true,
      verifiedCustomerReviews: 460
    },
    phone: "+91 80 4123 9988",
    whatsapp: "918041239988",
    address: "ITPB Main Road, Whitefield, Bengaluru",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
    description: "Professional industrial steam extraction sofa, mattress, and carpet deep cleaning. Utilizes Taski & 3M eco-certified foam chemicals, anti-allergen mite sanitization, and moisture extraction drying within 2 hours.",
    services: [
      { id: "s-uc-1", name: "3-Seater Fabric Sofa Deep Foam Shampoo", price: 599, duration: "60 mins" },
      { id: "s-uc-2", name: "King Size Mattress Anti-Mite Steam Sanitization", price: 799, duration: "45 mins" },
      { id: "s-uc-3", name: "Living Room Rug / Persian Carpet Deep Wash", price: 699, duration: "60 mins" }
    ],
    features: ["3M & Taski Certified Foam", "99.9% Dust Mite Extraction", "Quick Dry in 2 Hours", "Safe on Delicate Velvet & Suede"],
    reviews: [
      { author: "Pooja Hegde", rating: 5, date: "3 days ago", verifiedBooking: true, comment: "Removed heavy tea and milk stains from our beige sofa. Smells fresh and dried super fast.", helpful: 12 }
    ],
    lat: 12.9698,
    lng: 77.7499
  },
  {
    id: "b-work-solar-1",
    name: "SunVolt Rooftop Solar & EV Charger Station Installers",
    category: "electrical",
    subcategory: "Solar Energy & EV Chargers",
    city: "Mangaluru",
    locality: "Kadri Hills",
    rating: 4.8,
    reviewsCount: 190,
    verified: true,
    superSeller: true,
    openNow: true,
    availableToday: true,
    operatingHours: "9:00 AM - 7:00 PM",
    startingPrice: 1499,
    priceRange: "₹₹₹",
    responseTime: "~20 min",
    trustScore: 98,
    trustVerification: {
      phoneVerified: true,
      businessRegistration: true,
      addressInspected: true,
      policeBackgroundChecked: true,
      verifiedCustomerReviews: 190
    },
    phone: "+91 824 222 3344",
    whatsapp: "918242223344",
    address: "Kadri Temple Road, Kadri Hills, Mangaluru",
    image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80",
    description: "MNRE-approved solar EPC contractor and home electric vehicle charger installers. Specializing in on-grid net metering rooftop solar systems (3kW to 10kW), battery hybrid backup, and 7.4kW/11kW Level-2 home EV wallbox chargers.",
    services: [
      { id: "s-sv-1", name: "Solar Rooftop Feasibility & Shadow Analysis Survey", price: 499, duration: "90 mins" },
      { id: "s-sv-2", name: "Home EV Charger Wallbox Installation & Dedicated MCB Line", price: 1499, duration: "3 hours" },
      { id: "s-sv-3", name: "Solar Inverter Annual Health Check & Panel Cleaning", price: 999, duration: "2 hours" }
    ],
    features: ["MNRE Subsidy Assistance", "25-Year Solar Panel Warranty", "Certified EV Charger Electricians", "Mescom Net-Metering Approval"],
    reviews: [
      { author: "Santhosh Bhat", rating: 5, date: "2 weeks ago", verifiedBooking: true, comment: "Installed our Tata EV 7.4kW charger at home in Kadri. Dedicated wiring, surge protection, very neat job.", helpful: 10 }
    ],
    lat: 12.8872,
    lng: 74.8584
  },
  {
    id: "b-work-plumb-1",
    name: "MasterPlumb 24/7 Leak Detection & Tank Cleaning",
    category: "home",
    subcategory: "Plumbing & Sanitary Works",
    city: "Mysuru",
    locality: "Saraswathipuram",
    rating: 4.9,
    reviewsCount: 310,
    verified: true,
    superSeller: true,
    openNow: true,
    availableToday: true,
    operatingHours: "24 Hours Open",
    startingPrice: 349,
    priceRange: "₹₹",
    responseTime: "~15 min",
    trustScore: 99,
    trustVerification: {
      phoneVerified: true,
      businessRegistration: true,
      addressInspected: true,
      policeBackgroundChecked: true,
      verifiedCustomerReviews: 310
    },
    phone: "+91 821 254 9900",
    whatsapp: "918212549900",
    address: "5th Main, Near Swimming Pool, Saraswathipuram, Mysuru",
    image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80",
    description: "Emergency master plumbers equipped with acoustic underground pipe leak detectors, motorized drain unblocking snakes, and 6-stage mechanized UV overhead water tank cleaning.",
    services: [
      { id: "s-mp-1", name: "Blocked Drain & Pipe Motorized Unclogging", price: 499, duration: "45 mins" },
      { id: "s-mp-2", name: "Mechanized 6-Stage Overhead Water Tank Cleaning (1000L)", price: 799, duration: "90 mins" },
      { id: "s-mp-3", name: "Tap, Flush Valve & Concealed Cistern Repair", price: 349, duration: "40 mins" }
    ],
    features: ["Acoustic Leak Detection", "6-Stage UV Tank Disinfection", "24/7 Emergency Plumber", "30-Day Work Guarantee"],
    reviews: [
      { author: "Manjunath Rao", rating: 5, date: "5 days ago", verifiedBooking: true, comment: "Had a severe kitchen drain blockage. Arrived with an electric snaking machine and cleared it in 20 minutes.", helpful: 9 }
    ],
    lat: 12.3021,
    lng: 76.6341
  }
];

// 1. Update data/db.json
const dbPath = path.join(__dirname, '..', 'data', 'db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Filter out any duplicates
const existingIds = new Set(db.businesses.map(b => b.id).filter(Boolean));
let added = 0;

for (const nb of NEW_BUSINESSES) {
  if (!existingIds.has(nb.id)) {
    db.businesses.push(nb);
    existingIds.add(nb.id);
    added++;
  }
}

// Fix any undefined ids if found
db.businesses.forEach((b, idx) => {
  if (!b.id || b.id === 'undefined') {
    b.id = `b-gen-${idx + 1}`;
  }
});

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log(`Successfully added ${added} new listings to data/db.json. Total listings: ${db.businesses.length}`);
