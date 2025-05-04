const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

// MongoDB connection URI
const uri = 'mongodb+srv://karan902:I2zUU1l6WKEiB3ai@cluster0.byki5.mongodb.net/pglocator';

// Sample PG listings with Pinterest images
const pgListings = [
  {
    title: "LUXURIOUS LADIES PG",
    location: "Vidyanagar, Hubli",
    description: "Modern PG accommodation with excellent facilities for female students and working professionals. This PG offers a comfortable and secure environment with all essential amenities.",
    price: 8500,
    images: ['/pg-kharghar.jpg'],
    amenities: ["WiFi", "Food", "AC", "Attached Bathroom"],
    gender: "Female",
    roomType: "Single",
    address: "123 Vidyanagar Main Road, Near KCD Circle, Hubli",
    city: "hubli",
    ownerId: new mongoose.Types.ObjectId(),
    ownerName: "Admin User",
    ownerContact: "9876543210",
    folder: "PGRooms",
    rating: 4.9,
    reviews: []
  },
  {
    title: "PURPLE COMFORT PG",
    location: "Akshay Colony, Hubli",
    description: "Single room PG with beautiful interiors and comfortable beds. Perfect for students looking for a peaceful study environment.",
    price: 7000,
    images: ['/pg-single-room.jpg'],
    amenities: ["WiFi", "Food", "AC", "Attached Bathroom", "TV"],
    gender: "Male",
    roomType: "Single",
    address: "45 Akshay Colony, Hubli",
    city: "hubli",
    ownerId: new mongoose.Types.ObjectId(),
    ownerName: "Admin User",
    ownerContact: "9876543211",
    folder: "PGRooms",
    rating: 4.7,
    reviews: []
  },
  {
    title: "MUSIC LOVERS PG",
    location: "Narayanpura, Dharwad",
    description: "A vibrant PG for girls who love music and arts. Guitar classes available on weekends. Located in a quiet neighborhood with good connectivity.",
    price: 6500,
    images: ['/pg-girls-kolkata.jpg'],
    amenities: ["WiFi", "Food", "Common Bathroom", "TV", "Parking"],
    gender: "Female",
    roomType: "Double",
    address: "78 Narayanpura Main Street, Dharwad",
    city: "dharwad",
    ownerId: new mongoose.Types.ObjectId(),
    ownerName: "Admin User",
    ownerContact: "9876543212",
    folder: "PGRooms",
    rating: 4.8,
    reviews: []
  }
];

async function seedDatabase() {
  let client;
  
  try {
    // Connect to MongoDB
    client = await MongoClient.connect(uri);
    console.log('Connected to MongoDB');
    
    // Get the database
    const db = client.db('pglocator');
    
    // Get the collection
    const collection = db.collection('pglistings');
    
    // Check if collection already has data
    const count = await collection.countDocuments();
    console.log(`Existing PG listings: ${count}`);
    
    // Insert the sample PG listings
    const result = await collection.insertMany(pgListings);
    console.log(`${result.insertedCount} PG listings added successfully`);
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the connection
    if (client) {
      await client.close();
      console.log('MongoDB connection closed');
    }
  }
}

// Run the seed function
seedDatabase(); 