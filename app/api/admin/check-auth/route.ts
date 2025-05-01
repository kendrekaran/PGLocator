import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  try {
    // Get user cookie
    const cookieStore = cookies();
    const userCookie = cookieStore.get('user');
    
    if (!userCookie || !userCookie.value) {
      return NextResponse.json({ authenticated: false, isAdmin: false, error: 'Not authenticated' }, { status: 401 });
    }
    
    try {
      // Parse the user data from cookie
      const userData = JSON.parse(decodeURIComponent(userCookie.value));
      
      // Check if user is an admin
      if (userData.userType === 'admin') {
        return NextResponse.json({ 
          authenticated: true, 
          isAdmin: true, 
          user: {
            id: userData.id,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName
          } 
        });
      } else {
        return NextResponse.json({ 
          authenticated: true, 
          isAdmin: false, 
          error: 'User is not an admin' 
        }, { status: 403 });
      }
    } catch (error) {
      console.error('Error parsing user cookie:', error);
      return NextResponse.json({ authenticated: false, isAdmin: false, error: 'Invalid user data' }, { status: 401 });
    }
  } catch (error) {
    console.error('Authentication check error:', error);
    return NextResponse.json({ authenticated: false, isAdmin: false, error: 'Server error' }, { status: 500 });
  }
} 