import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db/connection';
import User from '@/lib/db/models/User';
import Admin from '@/lib/db/models/Admin';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const { 
      firstName, 
      lastName, 
      email, 
      password, 
      phone,
      propertyName,
      userType 
    } = body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user/admin based on userType
    if (userType === 'user') {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json(
          { error: 'User already exists' },
          { status: 400 }
        );
      }

      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phone
      });

      return NextResponse.json({
        message: 'User registered successfully',
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone
        }
      });

    } else if (userType === 'admin') {
      // Check if admin already exists
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        return NextResponse.json(
          { error: 'Admin already exists' },
          { status: 400 }
        );
      }

      const admin = await Admin.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phone,
        propertyName
      });

      return NextResponse.json({
        message: 'Admin registered successfully',
        admin: {
          id: admin._id,
          firstName: admin.firstName,
          lastName: admin.lastName,
          email: admin.email,
          phone: admin.phone,
          propertyName: admin.propertyName
        }
      });
    }

    return NextResponse.json(
      { error: 'Invalid user type' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}