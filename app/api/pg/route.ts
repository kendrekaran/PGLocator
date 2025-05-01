import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import PgListing from './model';
import { getSession } from 'next-auth/react';
import { cookies } from 'next/headers';

// GET /api/pg - Get all PG listings with optional filtering
export async function GET(req: NextRequest) {
  try {
    // Connect to MongoDB
    try {
      await connectToDatabase();
    } catch (error) {
      console.error('MongoDB connection failed:', error);
      // Return empty array instead of error
      return NextResponse.json([], { status: 200 });
    }
    
    const { searchParams } = new URL(req.url);
    
    // Filtering parameters
    const city = searchParams.get('city');
    const gender = searchParams.get('gender');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const roomType = searchParams.get('roomType');
    const amenities = searchParams.get('amenities');
    const searchTerm = searchParams.get('search');
    
    // Build query
    const query: any = {};
    
    if (city && city !== 'all') {
      query.city = city.toLowerCase();
    }
    
    if (gender && gender !== 'all') {
      query.gender = gender;
    }
    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseInt(minPrice);
      if (maxPrice) query.price.$lte = parseInt(maxPrice);
    }
    
    if (roomType) {
      query.roomType = roomType;
    }
    
    if (amenities) {
      const amenitiesList = amenities.split(',');
      query.amenities = { $all: amenitiesList };
    }
    
    if (searchTerm) {
      query.$text = { $search: searchTerm };
    }
    
    const pgListings = await PgListing.find(query)
      .sort({ createdAt: -1 }) // Sort by newest first
      .select('-__v')
      .lean();
    
    return NextResponse.json(pgListings);
  } catch (error) {
    console.error('Error fetching PG listings:', error);
    // Return empty array instead of error response
    return NextResponse.json([], { status: 200 });
  }
}

// POST /api/pg - Add a new PG listing (admin only)
export async function POST(req: NextRequest) {
  try {
    // Use cookies directly for authentication since we're in a server component
    const cookieStore = cookies();
    const userCookie = (await cookieStore).get('user');
    
    if (!userCookie || !userCookie.value) {
      return NextResponse.json(
        { error: 'Unauthorized - Please login' },
        { status: 401 }
      );
    }
    
    // Parse the user data
    let userData;
    try {
      userData = JSON.parse(decodeURIComponent(userCookie.value));
    } catch (error) {
      console.error('Error parsing user cookie:', error);
      return NextResponse.json(
        { error: 'Invalid authentication data' },
        { status: 401 }
      );
    }
    
    // Log session details for debugging
    console.log('User data from cookie:', { 
      id: userData.id,
      email: userData.email,
      userType: userData.userType 
    });
    
    // Check if user is admin
    if (userData.userType !== 'admin') {
      return NextResponse.json(
        { error: 'Only admins can add PG listings' },
        { status: 403 }
      );
    }
    
    // Connect to MongoDB
    try {
      await connectToDatabase();
    } catch (error) {
      console.error('MongoDB connection failed:', error);
      return NextResponse.json(
        { error: 'Database connection failed. Please try again later.' },
        { status: 500 }
      );
    }
    
    // Parse request body
    let data;
    try {
      data = await req.json();
    } catch (error) {
      console.error('Error parsing request body:', error);
      return NextResponse.json(
        { error: 'Invalid request data. Please check your input.' },
        { status: 400 }
      );
    }
    
    // Validate required fields
    const requiredFields = ['title', 'location', 'description', 'price', 'gender', 'roomType', 'address', 'city'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Add user information
    const newListing = {
      ...data,
      ownerId: userData.id,
      ownerName: `${userData.firstName || ''} ${userData.lastName || ''}`.trim() || 'Admin User',
      ownerContact: userData.phone || 'Not provided',
      // Use default image if none provided
      images: data.images && data.images.length > 0 
        ? data.images 
        : ['/placeholder-hostel.jpg'],
      // Add folder name for organization if provided
      folder: data.folder || 'PGRooms'
    };
    
    const pgListing = await PgListing.create(newListing);
    
    return NextResponse.json(pgListing, { status: 201 });
  } catch (error) {
    console.error('Error creating PG listing:', error);
    return NextResponse.json(
      { error: 'Failed to create PG listing. Please try again later.' },
      { status: 500 }
    );
  }
} 