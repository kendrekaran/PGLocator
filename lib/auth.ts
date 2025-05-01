import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { connectToDatabase } from '@/lib/mongodb'
import bcrypt from 'bcrypt'
import type { JWT } from 'next-auth/jwt'
import type { Session } from 'next-auth'

// Add type declaration for bcrypt if it doesn't exist
declare module 'bcrypt' {
  function compare(data: string, encrypted: string): Promise<boolean>;
}

// Setup user types
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  userType: 'user' | 'admin';
  propertyName?: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        userType: { label: 'User Type', type: 'text' }
      },
      async authorize(credentials) {
        try {
          await connectToDatabase()
          
          if (!credentials?.email || !credentials?.password || !credentials?.userType) {
            return null
          }
          
          const { email, password, userType } = credentials
          
          // Get User model based on userType
          const User = (await import(`@/app/api/auth/${userType}/model`)).default
          
          // Find user in database
          const user = await User.findOne({ email }).select('+password')
          
          if (!user) {
            return null
          }
          
          // Compare passwords
          const passwordMatch = await bcrypt.compare(password, user.password)
          
          if (!passwordMatch) {
            return null
          }
          
          // Return user without password
          return {
            id: user._id.toString(),
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            userType: userType as 'user' | 'admin',
            ...(userType === 'admin' && { propertyName: user.propertyName })
          }
        } catch (error) {
          console.error('Auth Error:', error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  callbacks: {
    jwt: async ({ token, user }: { token: JWT, user?: User }) => {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.firstName = user.firstName
        token.lastName = user.lastName
        token.phone = user.phone
        token.userType = user.userType
        if (user.userType === 'admin' && user.propertyName) {
          token.propertyName = user.propertyName
        }
      }
      return token
    },
    session: async ({ session, token }: { session: Session, token: JWT }) => {
      if (token) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.firstName = token.firstName as string
        session.user.lastName = token.lastName as string
        session.user.phone = token.phone as string
        session.user.userType = token.userType as 'user' | 'admin'
        if (token.userType === 'admin' && token.propertyName) {
          session.user.propertyName = token.propertyName as string
        }
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
    newUser: '/signup'
  },
  secret: process.env.NEXTAUTH_SECRET
} 