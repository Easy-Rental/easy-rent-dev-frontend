export const vehicles = [
  { id: 1,  name: "Toyota Camry",      category: "Sedan",   price: 180, rating: 4.9, reviews: 124, location: "Kuala Lumpur",  status: "Available",    fuel: "Petrol",   seats: 5, plateNo: "WXY 1234" },
  { id: 2,  name: "Honda CR-V",        category: "SUV",     price: 250, rating: 4.8, reviews: 89,  location: "Petaling Jaya", status: "Available",    fuel: "Petrol",   seats: 7, plateNo: "VJJ 5678" },
  { id: 3,  name: "BMW 3 Series",      category: "Luxury",  price: 450, rating: 4.9, reviews: 56,  location: "KLCC",          status: "Rented",       fuel: "Petrol",   seats: 5, plateNo: "WA 9012"  },
  { id: 4,  name: "Toyota Hiace",      category: "Van",     price: 320, rating: 4.7, reviews: 43,  location: "Subang Jaya",   status: "Available",    fuel: "Diesel",   seats: 12, plateNo: "BJB 3456" },
  { id: 5,  name: "Mercedes C-Class",  category: "Luxury",  price: 520, rating: 5.0, reviews: 31,  location: "Bangsar",       status: "Available",    fuel: "Petrol",   seats: 5, plateNo: "W 7890"   },
  { id: 6,  name: "Perodua Myvi",      category: "Sedan",   price: 90,  rating: 4.6, reviews: 210, location: "Cheras",        status: "Available",    fuel: "Petrol",   seats: 5, plateNo: "WPL 2345" },
  { id: 7,  name: "Honda Odyssey",     category: "Van",     price: 290, rating: 4.8, reviews: 67,  location: "Ampang",        status: "Maintenance",  fuel: "Petrol",   seats: 8, plateNo: "WWW 6789" },
  { id: 8,  name: "Tesla Model 3",     category: "Luxury",  price: 480, rating: 5.0, reviews: 22,  location: "Mont Kiara",    status: "Available",    fuel: "Electric", seats: 5, plateNo: "EV 0123"  },
  { id: 9,  name: "Toyota Fortuner",   category: "SUV",     price: 380, rating: 4.7, reviews: 95,  location: "Puchong",       status: "Available",    fuel: "Diesel",   seats: 7, plateNo: "SJN 4567" },
  { id: 10, name: "Proton X70",        category: "SUV",     price: 210, rating: 4.5, reviews: 178, location: "Shah Alam",     status: "Rented",       fuel: "Petrol",   seats: 7, plateNo: "BCB 8901" },
  { id: 11, name: "Perodua Bezza",     category: "Sedan",   price: 80,  rating: 4.4, reviews: 302, location: "Kajang",        status: "Available",    fuel: "Petrol",   seats: 5, plateNo: "KDE 2345" },
  { id: 12, name: "Ford Ranger",       category: "Truck",   price: 350, rating: 4.8, reviews: 55,  location: "Cyberjaya",     status: "Available",    fuel: "Diesel",   seats: 5, plateNo: "VDR 6789" },
];

export const CATEGORIES = ["Sedan", "SUV", "Luxury", "Van", "Truck"];
export const FUEL_TYPES  = ["Petrol", "Diesel", "Electric", "Hybrid"];
export const STATUSES    = ["Available", "Rented", "Maintenance"];
export const LOCATIONS   = [
  "Kuala Lumpur", "Petaling Jaya", "KLCC", "Subang Jaya",
  "Bangsar", "Cheras", "Ampang", "Mont Kiara", "Puchong",
  "Shah Alam", "Kajang", "Cyberjaya",
];

export const STATUS_STYLE = {
  Available:   { badge: "bg-green-50 text-green-600 border border-green-200",   dot: "bg-green-500" },
  Rented:      { badge: "bg-orange-50 text-orange-600 border border-orange-200", dot: "bg-orange-500" },
  Maintenance: { badge: "bg-red-50 text-red-500 border border-red-200",         dot: "bg-red-500" },
};
