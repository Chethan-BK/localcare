/* ==========================================================================
   INDIA-WIDE LOCATIONS DATASET & SERVICE MODULE
   Comprehensive Geographical Coverage:
   - All 28 States & 8 Union Territories
   - Major Cities, Metros, Tier 2/3 Towns & District Headquarters
   - PIN Code Mapping & GPS Coordinates
   - Reusable across LocalCare discovery, search, filters & profiles
   ========================================================================== */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.IndiaLocations = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // 1. All 28 States and 8 Union Territories
  const STATES_AND_UTS = [
    { code: 'AP', name: 'Andhra Pradesh', type: 'State' },
    { code: 'AR', name: 'Arunachal Pradesh', type: 'State' },
    { code: 'AS', name: 'Assam', type: 'State' },
    { code: 'BR', name: 'Bihar', type: 'State' },
    { code: 'CG', name: 'Chhattisgarh', type: 'State' },
    { code: 'GA', name: 'Goa', type: 'State' },
    { code: 'GJ', name: 'Gujarat', type: 'State' },
    { code: 'HR', name: 'Haryana', type: 'State' },
    { code: 'HP', name: 'Himachal Pradesh', type: 'State' },
    { code: 'JH', name: 'Jharkhand', type: 'State' },
    { code: 'KA', name: 'Karnataka', type: 'State' },
    { code: 'KL', name: 'Kerala', type: 'State' },
    { code: 'MP', name: 'Madhya Pradesh', type: 'State' },
    { code: 'MH', name: 'Maharashtra', type: 'State' },
    { code: 'MN', name: 'Manipur', type: 'State' },
    { code: 'ML', name: 'Meghalaya', type: 'State' },
    { code: 'MZ', name: 'Mizoram', type: 'State' },
    { code: 'NL', name: 'Nagaland', type: 'State' },
    { code: 'OD', name: 'Odisha', type: 'State' },
    { code: 'PB', name: 'Punjab', type: 'State' },
    { code: 'RJ', name: 'Rajasthan', type: 'State' },
    { code: 'SK', name: 'Sikkim', type: 'State' },
    { code: 'TN', name: 'Tamil Nadu', type: 'State' },
    { code: 'TS', name: 'Telangana', type: 'State' },
    { code: 'TR', name: 'Tripura', type: 'State' },
    { code: 'UP', name: 'Uttar Pradesh', type: 'State' },
    { code: 'UK', name: 'Uttarakhand', type: 'State' },
    { code: 'WB', name: 'West Bengal', type: 'State' },
    // 8 Union Territories
    { code: 'AN', name: 'Andaman and Nicobar Islands', type: 'UT' },
    { code: 'CH', name: 'Chandigarh', type: 'UT' },
    { code: 'DH', name: 'Dadra and Nagar Haveli and Daman and Diu', type: 'UT' },
    { code: 'DL', name: 'Delhi', type: 'UT' },
    { code: 'JK', name: 'Jammu and Kashmir', type: 'UT' },
    { code: 'LA', name: 'Ladakh', type: 'UT' },
    { code: 'LD', name: 'Lakshadweep', type: 'UT' },
    { code: 'PY', name: 'Puducherry', type: 'UT' }
  ];

  // 2. Comprehensive India Cities Dataset (Major Hubs, Tourism, Capitals, Districts)
  const CITIES_DB = [
    // Karnataka
    { id: 'bengaluru', name: 'Bengaluru', state: 'Karnataka', stateCode: 'KA', lat: 12.9716, lng: 77.5946, pincodes: ['560001', '560034', '560038', '560066', '560095'], popular: true, areas: ['Koramangala', 'Indiranagar', 'HSR Layout', 'Whitefield', 'Jayanagar', 'Marathahalli', 'Electronic City', 'Bellandur', 'BTM Layout', 'Hebbal', 'JP Nagar', 'Malleshwaram'] },
    { id: 'mangaluru', name: 'Mangaluru', state: 'Karnataka', stateCode: 'KA', lat: 12.9141, lng: 74.8560, pincodes: ['575001', '575003', '575028'], popular: true, areas: ['Valachil', 'Kadri', 'Hampankatta', 'Bejai', 'Surathkal', 'Falnir', 'Kankanady', 'Derlakatte', 'Kavoor'] },
    { id: 'mysuru', name: 'Mysuru', state: 'Karnataka', stateCode: 'KA', lat: 12.2958, lng: 76.6394, pincodes: ['570001', '570002', '570020'], popular: true, areas: ['Gokulam', 'Jayalakshmipuram', 'Vijayanagar', 'Kuvempunagar', 'Nazarbad', 'Chamundipuram', 'Saraswathipuram', 'VV Mohalla'] },
    { id: 'hubballi', name: 'Hubballi-Dharwad', state: 'Karnataka', stateCode: 'KA', lat: 15.3647, lng: 75.1240, pincodes: ['580020', '580001'], popular: false, areas: ['Vidyanagar', 'Gokul Road', 'Navanagar', 'Keshwapur', 'Dharwad Market'] },
    { id: 'belagavi', name: 'Belagavi', state: 'Karnataka', stateCode: 'KA', lat: 15.8497, lng: 74.4977, pincodes: ['590001'], popular: false, areas: ['Tilakwadi', 'Camp', 'Udyambag', 'Khadaklat'] },
    { id: 'udupi', name: 'Udupi', state: 'Karnataka', stateCode: 'KA', lat: 13.3409, lng: 74.7421, pincodes: ['576101', '576104'], popular: true, areas: ['Manipal', 'Malpe', 'Car Street', 'Ambalpady', 'Kadiyali'] },
    { id: 'shivamogga', name: 'Shivamogga', state: 'Karnataka', stateCode: 'KA', lat: 13.9299, lng: 75.5681, pincodes: ['577201'], popular: false, areas: ['Durgigudi', 'Vinoba Nagara', 'Gopala'] },
    { id: 'coorg', name: 'Madikeri (Coorg)', state: 'Karnataka', stateCode: 'KA', lat: 12.4244, lng: 75.7382, pincodes: ['571201'], popular: true, areas: ['Madikeri Town', 'Kushalnagar', 'Virajpet', 'Gonikoppal'] },

    // Maharashtra
    { id: 'mumbai', name: 'Mumbai', state: 'Maharashtra', stateCode: 'MH', lat: 19.0760, lng: 72.8777, pincodes: ['400001', '400050', '400076', '400058'], popular: true, areas: ['Bandra West', 'Andheri East', 'Andheri West', 'Powai', 'Juhu', 'Colaba', 'Thane West', 'Dadar', 'Worli', 'Malad', 'Borivali'] },
    { id: 'pune', name: 'Pune', state: 'Maharashtra', stateCode: 'MH', lat: 18.5204, lng: 73.8567, pincodes: ['411001', '411004', '411014', '411057'], popular: true, areas: ['Koregaon Park', 'Kothrud', 'Viman Nagar', 'Baner', 'Hinjewadi', 'Shivajinagar', 'Aundh', 'Wakad', 'Kalyani Nagar'] },
    { id: 'nagpur', name: 'Nagpur', state: 'Maharashtra', stateCode: 'MH', lat: 21.1458, lng: 79.0882, pincodes: ['440001', '440010'], popular: false, areas: ['Dharampeth', 'Civil Lines', 'Sitabuldi', 'Ramdaspeth', 'Manish Nagar'] },
    { id: 'nashik', name: 'Nashik', state: 'Maharashtra', stateCode: 'MH', lat: 19.9975, lng: 73.7898, pincodes: ['422001', '422005'], popular: false, areas: ['College Road', 'Gangapur Road', 'Indira Nagar', 'Panchavati'] },
    { id: 'aurangabad', name: 'Chhatrapati Sambhajinagar', state: 'Maharashtra', stateCode: 'MH', lat: 19.8762, lng: 75.3433, pincodes: ['431001'], popular: false, areas: ['CIDCO', 'Cantonment', 'Waluj', 'Garkheda'] },

    // Delhi NCR & Haryana & Uttar Pradesh
    { id: 'delhi', name: 'Delhi NCR', state: 'Delhi', stateCode: 'DL', lat: 28.6139, lng: 77.2090, pincodes: ['110001', '110016', '110017', '122002', '201301'], popular: true, areas: ['Connaught Place', 'Hauz Khas', 'Saket', 'Cyber Hub Gurgaon', 'Noida Sector 18', 'Dwarka', 'Rohini', 'Vasant Kunj', 'Greater Kailash', 'Karol Bagh', 'Indirapuram'] },
    { id: 'gurugram', name: 'Gurugram', state: 'Haryana', stateCode: 'HR', lat: 28.4595, lng: 77.0266, pincodes: ['122001', '122002', '122018'], popular: true, areas: ['Cyber City', 'Golf Course Road', 'DLF Phase 1-5', 'Sohna Road', 'Sector 29'] },
    { id: 'noida', name: 'Noida', state: 'Uttar Pradesh', stateCode: 'UP', lat: 28.5355, lng: 77.3910, pincodes: ['201301', '201307'], popular: true, areas: ['Sector 18', 'Sector 62', 'Sector 137', 'Greater Noida West', 'Sector 50'] },
    { id: 'faridabad', name: 'Faridabad', state: 'Haryana', stateCode: 'HR', lat: 28.4089, lng: 77.3178, pincodes: ['121001'], popular: false, areas: ['Sector 15', 'NIT', 'Greenfield Colony', 'Surajkund'] },

    // Telangana & Andhra Pradesh
    { id: 'hyderabad', name: 'Hyderabad', state: 'Telangana', stateCode: 'TS', lat: 17.3850, lng: 78.4867, pincodes: ['500001', '500032', '500034', '500081'], popular: true, areas: ['Gachibowli', 'Hitec City', 'Banjara Hills', 'Jubilee Hills', 'Madhapur', 'Kondapur', 'Kukatpally', 'Secunderabad', 'Begumpet', 'Ameerpet'] },
    { id: 'warangal', name: 'Warangal', state: 'Telangana', stateCode: 'TS', lat: 17.9689, lng: 79.5941, pincodes: ['506001'], popular: false, areas: ['Hanamkonda', 'Kazipet', 'Subedari'] },
    { id: 'visakhapatnam', name: 'Visakhapatnam', state: 'Andhra Pradesh', stateCode: 'AP', lat: 17.6868, lng: 83.2185, pincodes: ['530001', '530002'], popular: true, areas: ['MVP Colony', 'Beach Road', 'Gajuwaka', 'Siripuram', 'Dwaraka Nagar'] },
    { id: 'vijayawada', name: 'Vijayawada', state: 'Andhra Pradesh', stateCode: 'AP', lat: 16.5062, lng: 80.6480, pincodes: ['520001', '520010'], popular: false, areas: ['Benz Circle', 'Governorpet', 'MGM Road', 'Bhavanipuram'] },
    { id: 'tirupati', name: 'Tirupati', state: 'Andhra Pradesh', stateCode: 'AP', lat: 13.6288, lng: 79.4192, pincodes: ['517501'], popular: true, areas: ['Alipiri', 'Bairagipatteda', 'Chandragiri', 'KT Road'] },

    // Tamil Nadu
    { id: 'chennai', name: 'Chennai', state: 'Tamil Nadu', stateCode: 'TN', lat: 13.0827, lng: 80.2707, pincodes: ['600001', '600017', '600020', '600042'], popular: true, areas: ['T Nagar', 'Adyar', 'Anna Nagar', 'Velachery', 'Nungambakkam', 'Mylapore', 'OMR Road', 'Guindy', 'Alwarpet', 'Besant Nagar'] },
    { id: 'coimbatore', name: 'Coimbatore', state: 'Tamil Nadu', stateCode: 'TN', lat: 11.0168, lng: 76.9558, pincodes: ['641001', '641012'], popular: true, areas: ['RS Puram', 'Gandhipuram', 'Peelamedu', 'Saibaba Colony', 'Race Course'] },
    { id: 'madurai', name: 'Madurai', state: 'Tamil Nadu', stateCode: 'TN', lat: 9.9252, lng: 78.1198, pincodes: ['625001'], popular: false, areas: ['KK Nagar', 'Anna Nagar', 'Simmakkal', 'SS Colony'] },
    { id: 'tiruchirappalli', name: 'Tiruchirappalli', state: 'Tamil Nadu', stateCode: 'TN', lat: 10.7905, lng: 78.7047, pincodes: ['620001'], popular: false, areas: ['Thillai Nagar', 'Cantonment', 'Srirangam'] },

    // Kerala
    { id: 'kochi', name: 'Kochi', state: 'Kerala', stateCode: 'KL', lat: 9.9312, lng: 76.2673, pincodes: ['682001', '682016', '682030'], popular: true, areas: ['Panampilly Nagar', 'Kakkanad (Infopark)', 'Fort Kochi', 'Marine Drive', 'Edappally', 'Kaloor', 'Vyttila'] },
    { id: 'thiruvananthapuram', name: 'Thiruvananthapuram', state: 'Kerala', stateCode: 'KL', lat: 8.5241, lng: 76.9366, pincodes: ['695001', '695011'], popular: true, areas: ['Kowdiar', 'Vellayambalam', 'Technopark Kazhakkoottam', 'Pattom', 'Palayam'] },
    { id: 'kozhikode', name: 'Kozhikode', state: 'Kerala', stateCode: 'KL', lat: 11.2588, lng: 75.7804, pincodes: ['673001'], popular: false, areas: ['Mavoor Road', 'Beach Road', 'Nadakkavu', 'Palayam'] },
    { id: 'thrissur', name: 'Thrissur', state: 'Kerala', stateCode: 'KL', lat: 10.5276, lng: 76.2144, pincodes: ['680001'], popular: false, areas: ['Swaraj Round', 'Poothole', 'Ayyanthole'] },

    // Gujarat
    { id: 'ahmedabad', name: 'Ahmedabad', state: 'Gujarat', stateCode: 'GJ', lat: 23.0225, lng: 72.5714, pincodes: ['380001', '380015', '380054'], popular: true, areas: ['Satellite', 'Bodakdev', 'SG Highway', 'Navrangpura', 'Vastrapur', 'Prahlad Nagar', 'Maninagar'] },
    { id: 'surat', name: 'Surat', state: 'Gujarat', stateCode: 'GJ', lat: 21.1702, lng: 72.8311, pincodes: ['395001', '395007'], popular: true, areas: ['Vesu', 'Adajan', 'Piplod', 'Varachha', 'Athwa Lines'] },
    { id: 'vadodara', name: 'Vadodara', state: 'Gujarat', stateCode: 'GJ', lat: 22.3072, lng: 73.1812, pincodes: ['390001', '390007'], popular: false, areas: ['Alkapuri', 'Sayajigunj', 'Fatehgunj', 'Manjalpur'] },
    { id: 'rajkot', name: 'Rajkot', state: 'Gujarat', stateCode: 'GJ', lat: 22.3039, lng: 70.8022, pincodes: ['360001'], popular: false, areas: ['Kalawad Road', 'Yagnik Road', 'University Road'] },

    // West Bengal
    { id: 'kolkata', name: 'Kolkata', state: 'West Bengal', stateCode: 'WB', lat: 22.5726, lng: 88.3639, pincodes: ['700001', '700016', '700091', '700156'], popular: true, areas: ['Park Street', 'Salt Lake City', 'New Town (Action Area 1)', 'Ballygunge', 'Alipore', 'Gariahat', 'Dum Dum', 'Howrah'] },
    { id: 'siliguri', name: 'Siliguri', state: 'West Bengal', stateCode: 'WB', lat: 26.7271, lng: 88.3953, pincodes: ['734001'], popular: true, areas: ['Sevoke Road', 'Pradhan Nagar', 'Matigara', 'Hakim Para'] },
    { id: 'darjeeling', name: 'Darjeeling', state: 'West Bengal', stateCode: 'WB', lat: 27.0410, lng: 88.2663, pincodes: ['734101'], popular: true, areas: ['Mall Road', 'Chowrasta', 'Ghoom', 'Lebong'] },

    // Rajasthan
    { id: 'jaipur', name: 'Jaipur', state: 'Rajasthan', stateCode: 'RJ', lat: 26.9124, lng: 75.7873, pincodes: ['302001', '302015', '302020'], popular: true, areas: ['C-Scheme', 'Malviya Nagar', 'Vaishali Nagar', 'Raja Park', 'Mansarovar', 'Tonk Road', 'MI Road'] },
    { id: 'jodhpur', name: 'Jodhpur', state: 'Rajasthan', stateCode: 'RJ', lat: 26.2389, lng: 73.0243, pincodes: ['342001'], popular: true, areas: ['Ratanada', 'Sardarpura', 'Shastri Nagar', 'Paota'] },
    { id: 'udaipur', name: 'Udaipur', state: 'Rajasthan', stateCode: 'RJ', lat: 24.5854, lng: 73.7125, pincodes: ['313001'], popular: true, areas: ['Fateh Sagar', 'Lake City Old Town', 'Hiran Magri', 'Panchwati', 'Sukhadia Circle'] },
    { id: 'kota', name: 'Kota', state: 'Rajasthan', stateCode: 'RJ', lat: 25.2138, lng: 75.8648, pincodes: ['324005'], popular: false, areas: ['Vigyan Nagar', 'Talwandi', 'Mahaveer Nagar', 'Dadabari'] },

    // Uttar Pradesh & Uttarakhand
    { id: 'lucknow', name: 'Lucknow', state: 'Uttar Pradesh', stateCode: 'UP', lat: 26.8467, lng: 80.9462, pincodes: ['226001', '226010'], popular: true, areas: ['Gomti Nagar', 'Hazratganj', 'Aliganj', 'Indira Nagar', 'Mahanagar'] },
    { id: 'kanpur', name: 'Kanpur', state: 'Uttar Pradesh', stateCode: 'UP', lat: 26.4499, lng: 80.3319, pincodes: ['208001'], popular: false, areas: ['Civil Lines', 'Swaroop Nagar', 'Kakadeo', 'Mall Road'] },
    { id: 'varanasi', name: 'Varanasi', state: 'Uttar Pradesh', stateCode: 'UP', lat: 25.3176, lng: 82.9739, pincodes: ['221001'], popular: true, areas: ['Ghats Area', 'Sigra', 'Lanka (BHU)', 'Bhelupur', 'Cantt'] },
    { id: 'agra', name: 'Agra', state: 'Uttar Pradesh', stateCode: 'UP', lat: 27.1767, lng: 78.0081, pincodes: ['282001'], popular: true, areas: ['Tajganj', 'Sanjay Place', 'Civil Lines', 'Fatehabad Road'] },
    { id: 'dehradun', name: 'Dehradun', state: 'Uttarakhand', stateCode: 'UK', lat: 30.3165, lng: 78.0322, pincodes: ['248001'], popular: true, areas: ['Rajpur Road', 'Jakhan', 'Dalanwala', 'Ballupur', 'Clock Tower'] },
    { id: 'haridwar', name: 'Haridwar-Rishikesh', state: 'Uttarakhand', stateCode: 'UK', lat: 29.9457, lng: 78.1642, pincodes: ['249201', '249401'], popular: true, areas: ['Tapovan Rishikesh', 'Laxman Jhula', 'Har Ki Pauri', 'Ranipur'] },

    // Punjab & Chandigarh & Himachal Pradesh & J&K
    { id: 'chandigarh', name: 'Chandigarh Tri-City', state: 'Chandigarh', stateCode: 'CH', lat: 30.7333, lng: 76.7794, pincodes: ['160017', '160022'], popular: true, areas: ['Sector 17', 'Sector 35', 'Sector 8', 'Panchkula Sector 5', 'Mohali Phase 7'] },
    { id: 'amritsar', name: 'Amritsar', state: 'Punjab', stateCode: 'PB', lat: 31.6340, lng: 74.8723, pincodes: ['143001'], popular: true, areas: ['Golden Temple Area', 'Ranjit Avenue', 'Lawrence Road', 'Mall Road'] },
    { id: 'ludhiana', name: 'Ludhiana', state: 'Punjab', stateCode: 'PB', lat: 30.9010, lng: 75.8573, pincodes: ['141001'], popular: false, areas: ['Sarabha Nagar', 'Model Town', 'Ferozepur Road', 'Civil Lines'] },
    { id: 'shimla', name: 'Shimla', state: 'Himachal Pradesh', stateCode: 'HP', lat: 31.1048, lng: 77.1734, pincodes: ['171001'], popular: true, areas: ['The Mall', 'Ridge', 'Sanjauli', 'Chotta Shimla', 'Kasumpti'] },
    { id: 'manali', name: 'Manali', state: 'Himachal Pradesh', stateCode: 'HP', lat: 32.2396, lng: 77.1887, pincodes: ['175131'], popular: true, areas: ['Old Manali', 'Mall Road', 'Vashisht', 'Aleo'] },
    { id: 'srinagar', name: 'Srinagar', state: 'Jammu and Kashmir', stateCode: 'JK', lat: 34.0837, lng: 74.7973, pincodes: ['190001'], popular: true, areas: ['Dal Lake Boulevard', 'Lal Chowk', 'Rajbagh', 'Hyderpora'] },
    { id: 'jammu', name: 'Jammu', state: 'Jammu and Kashmir', stateCode: 'JK', lat: 32.7266, lng: 74.8570, pincodes: ['180001'], popular: false, areas: ['Gandhi Nagar', 'Bahu Plaza', 'Trikuta Nagar', 'Channi Himmat'] },

    // Madhya Pradesh & Chhattisgarh & Bihar & Jharkhand & Odisha
    { id: 'indore', name: 'Indore', state: 'Madhya Pradesh', stateCode: 'MP', lat: 22.7196, lng: 75.8577, pincodes: ['452001', '452010'], popular: true, areas: ['Vijay Nagar', 'Palasia', 'Chappan Dukan', 'Bhawarkua', 'Sarafa'] },
    { id: 'bhopal', name: 'Bhopal', state: 'Madhya Pradesh', stateCode: 'MP', lat: 23.2599, lng: 77.4126, pincodes: ['462001'], popular: false, areas: ['MP Nagar', 'Arera Colony', 'Kolar Road', 'Shahpura'] },
    { id: 'raipur', name: 'Raipur', state: 'Chhattisgarh', stateCode: 'CG', lat: 21.2514, lng: 81.6296, pincodes: ['492001'], popular: false, areas: ['Shankar Nagar', 'Telibandha', 'Pandri', 'Samta Colony'] },
    { id: 'patna', name: 'Patna', state: 'Bihar', stateCode: 'BR', lat: 25.5941, lng: 85.1376, pincodes: ['800001', '800020'], popular: true, areas: ['Boring Road', 'Kankarbagh', 'Bailey Road', 'Fraser Road', 'Patliputra'] },
    { id: 'ranchi', name: 'Ranchi', state: 'Jharkhand', stateCode: 'JH', lat: 23.3441, lng: 85.3096, pincodes: ['834001'], popular: false, areas: ['Main Road', 'Lalpur', 'Doranda', 'Harmu', 'Hinoo'] },
    { id: 'jamshedpur', name: 'Jamshedpur', state: 'Jharkhand', stateCode: 'JH', lat: 22.8046, lng: 86.2029, pincodes: ['831001'], popular: false, areas: ['Bistupur', 'Sakchi', 'Kadma', 'Sonari'] },
    { id: 'bhubaneswar', name: 'Bhubaneswar', state: 'Odisha', stateCode: 'OD', lat: 20.2961, lng: 85.8245, pincodes: ['751001', '751024'], popular: true, areas: ['Saheed Nagar', 'Patia', 'Jaydev Vihar', 'Nayapalli', 'Khandagiri'] },
    { id: 'puri', name: 'Puri', state: 'Odisha', stateCode: 'OD', lat: 19.8135, lng: 85.8312, pincodes: ['752001'], popular: true, areas: ['Grand Road', 'VIP Road', 'Chakratirtha Road', 'Swargadwar'] },

    // Goa & Northeast India
    { id: 'goa', name: 'Goa (North & South)', state: 'Goa', stateCode: 'GA', lat: 15.2993, lng: 74.1240, pincodes: ['403001', '403516', '403601'], popular: true, areas: ['Panaji', 'Calangute', 'Candolim', 'Anjuna', 'Margao', 'Vasco', 'Baga', 'Assagao'] },
    { id: 'guwahati', name: 'Guwahati', state: 'Assam', stateCode: 'AS', lat: 26.1445, lng: 91.7362, pincodes: ['781001', '781005'], popular: true, areas: ['GS Road', 'Dispur', 'Pan Bazaar', 'Ulubari', 'Zoo Road', 'Beltola'] },
    { id: 'shillong', name: 'Shillong', state: 'Meghalaya', stateCode: 'ML', lat: 25.5788, lng: 91.8933, pincodes: ['793001'], popular: true, areas: ['Police Bazar', 'Laitumkhrah', 'Labar', 'Nongthymmai'] },
    { id: 'imphal', name: 'Imphal', state: 'Manipur', stateCode: 'MN', lat: 24.8170, lng: 93.9368, pincodes: ['795001'], popular: false, areas: ['Thangal Bazar', 'Paona Bazar', 'Lamphelpat'] },
    { id: 'aizawl', name: 'Aizawl', state: 'Mizoram', stateCode: 'MZ', lat: 23.7271, lng: 92.7176, pincodes: ['796001'], popular: false, areas: ['Zarkawt', 'Dawrpui', 'Chanmari'] },
    { id: 'kohima', name: 'Kohima', state: 'Nagaland', stateCode: 'NL', lat: 25.6751, lng: 94.1086, pincodes: ['797001'], popular: false, areas: ['Midland', 'High School Colony', 'PR Hill'] },
    { id: 'gangtok', name: 'Gangtok', state: 'Sikkim', stateCode: 'SK', lat: 27.3389, lng: 88.6065, pincodes: ['737101'], popular: true, areas: ['MG Marg', 'Tadong', 'Deorali', 'Kazi Road'] },
    { id: 'agartala', name: 'Agartala', state: 'Tripura', stateCode: 'TR', lat: 23.8315, lng: 91.2868, pincodes: ['799001'], popular: false, areas: ['Banamalipur', 'Kaman Chowmuhani', 'Dhaleswar'] },
    { id: 'itanagar', name: 'Itanagar', state: 'Arunachal Pradesh', stateCode: 'AR', lat: 27.0844, lng: 93.6053, pincodes: ['791111'], popular: false, areas: ['Ganga Market', 'Zero Point', 'Naharlagun'] },
    { id: 'port-blair', name: 'Port Blair', state: 'Andaman and Nicobar Islands', stateCode: 'AN', lat: 11.6234, lng: 92.7265, pincodes: ['744101'], popular: true, areas: ['Aberdeen Bazaar', 'Haddo', 'Garacharma', 'Dollygunj'] },
    { id: 'puducherry', name: 'Puducherry', state: 'Puducherry', stateCode: 'PY', lat: 11.9416, lng: 79.8083, pincodes: ['605001'], popular: true, areas: ['White Town', 'Heritage Town', 'Auroville', 'Lawspet', 'Muthialpet'] },
    { id: 'leh', name: 'Leh Ladakh', state: 'Ladakh', stateCode: 'LA', lat: 34.1526, lng: 77.5771, pincodes: ['194101'], popular: true, areas: ['Main Bazaar', 'Changspa', 'Choglamsar', 'Shey'] }
  ];

  // Helper APIs
  function getAllStates() {
    return STATES_AND_UTS;
  }

  function getAllCities() {
    return CITIES_DB;
  }

  function getPopularCities() {
    return CITIES_DB.filter(c => c.popular);
  }

  function getCitiesByState(stateNameOrCode) {
    const q = (stateNameOrCode || '').toLowerCase().trim();
    return CITIES_DB.filter(c => 
      c.state.toLowerCase() === q || 
      c.stateCode.toLowerCase() === q
    );
  }

  function findCityByName(name) {
    if (!name) return null;
    const clean = name.toLowerCase().trim();
    return CITIES_DB.find(c => 
      c.name.toLowerCase() === clean || 
      c.id.toLowerCase() === clean ||
      c.name.toLowerCase().includes(clean)
    ) || null;
  }

  function searchLocations(query) {
    if (!query || !query.trim()) return getPopularCities().slice(0, 10);
    const q = query.toLowerCase().trim();

    // 1. PIN code direct match
    if (/^\d{3,6}$/.test(q)) {
      const pinMatches = CITIES_DB.filter(c => 
        (c.pincodes || []).some(p => p.startsWith(q))
      );
      if (pinMatches.length) return pinMatches;
    }

    // 2. City name match
    const cityMatches = CITIES_DB.filter(c => 
      c.name.toLowerCase().includes(q) || 
      c.state.toLowerCase().includes(q) ||
      (c.areas || []).some(a => a.toLowerCase().includes(q))
    );

    return cityMatches;
  }

  // Calculate distance between two lat/lng coordinates (Haversine Formula in KM)
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c * 10) / 10;
  }

  function findNearestCity(userLat, userLng) {
    let nearest = CITIES_DB[0];
    let minDistance = Infinity;

    for (const city of CITIES_DB) {
      if (city.lat && city.lng) {
        const d = calculateDistance(userLat, userLng, city.lat, city.lng);
        if (d < minDistance) {
          minDistance = d;
          nearest = { ...city, distanceKm: d };
        }
      }
    }
    return nearest;
  }

  return {
    STATES_AND_UTS,
    CITIES_DB,
    getAllStates,
    getAllCities,
    getPopularCities,
    getCitiesByState,
    findCityByName,
    searchLocations,
    findNearestCity,
    calculateDistance
  };
});

