import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

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
    const cookieStore = cookies();
    const userCookieValue = cookieStore.get('user')?.value;
    
    if (!userCookieValue) {
      return NextResponse.json({ 
        success: false, 
        error: 'Not authenticated' 
      }, { status: 401 });
    }
    
    // Parse user data
    let userData;
    try {
      userData = JSON.parse(decodeURIComponent(userCookieValue));
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
    
    // In a real application, we would save to database here
    // For now, we'll just return success with the data
    
    return NextResponse.json({ 
      success: true, 
      message: 'PG listing added successfully',
      data: {
        ...pgData,
        id: `pg_${Date.now()}`, // Generate a mock ID
        ownerId: userData.id,
        ownerName: `${userData.firstName} ${userData.lastName}`,
        createdAt: new Date().toISOString()
      }
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error adding PG listing:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Server error while adding PG listing' 
    }, { status: 500 });
  }
} 