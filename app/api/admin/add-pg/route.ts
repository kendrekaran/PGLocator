import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { connectToDatabase } from '@/lib/mongodb';
import PgListing from '@/app/api/pg/model';
import mongoose from 'mongoose';

// Simplified function to validate PG data
function validatePgData(data: any) {
  const requiredFields = [
    'title', 'location', 'description', 'price', 
    'gender', 'roomType', 'address', 'city'
  ];
  
  const missingFields = requiredFields.filter(field => !data[field]);
  
  if (missingFields.length > 0) {
    return {
      valid: false,
      error: `Missing required fields: ${missingFields.join(', ')}`
    };
  }
  
  return { valid: true };
}

export async function POST(req: NextRequest) {
  try {
    // Get admin status from cookie
    const cookieStore = await cookies();
    const userCookie = cookieStore.get('user');
    
    if (!userCookie || !userCookie.value) {
      return NextResponse.json({ 
        success: false, 
        error: 'Not authenticated' 
      }, { status: 401 });
    }
    
    // Parse user data
    let userData;
    try {
      userData = JSON.parse(decodeURIComponent(userCookie.value));
    } catch (error) {
      console.error('Error parsing user cookie:', error);
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid authentication data' 
      }, { status: 401 });
    }
    
    // Check if user is admin
    if (userData.userType !== 'admin') {
      return NextResponse.json({ 
        success: false, 
        error: 'Only admins can add PG listings' 
      }, { status: 403 });
    }
    
    // Parse the request body
    let pgData;
    try {
      pgData = await req.json();
    } catch (error) {
      console.error('Error parsing request data:', error);
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid request data' 
      }, { status: 400 });
    }
    
    // Validate the PG data
    const validation = validatePgData(pgData);
    if (!validation.valid) {
      return NextResponse.json({ 
        success: false, 
        error: validation.error 
      }, { status: 400 });
    }
    
    // Connect to the database
    try {
      await connectToDatabase();
    } catch (error) {
      console.error('MongoDB connection failed:', error);
      return NextResponse.json({ 
        success: false, 
        error: 'Database connection failed. Please try again later.' 
      }, { status: 500 });
    }
    
    // Prepare the PG listing data for saving
    const newListing = {
      ...pgData,
      ownerId: new mongoose.Types.ObjectId(userData.id),
      ownerName: `${userData.firstName} ${userData.lastName}`,
      ownerContact: userData.phone || 'Not provided',
      // Use default image if none provided
      images: pgData.images && pgData.images.length > 0 
        ? pgData.images 
        : ['/placeholder-hostel.jpg'],
      folder: pgData.folder || 'PGRooms'
    };
    
    // Save to the database
    const pgListing = await PgListing.create(newListing);
    
    return NextResponse.json({ 
      success: true, 
      message: 'PG listing added successfully',
      data: pgListing
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error adding PG listing:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Server error while adding PG listing' 
    }, { status: 500 });
  }
} 