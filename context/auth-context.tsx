"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  propertyName?: string
  userType: 'user' | 'admin'
} | null

type AuthContextType = {
  user: User
  isAuthenticated: boolean
  login: (email: string, password: string, userType: 'user' | 'admin') => Promise<{ success: boolean; error?: string }>
  signup: (data: {
    firstName: string
    lastName: string
    email: string
    password: string
    phone: string
    propertyName?: string
    userType: 'user' | 'admin'
  }) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from cookies
    const storedUser = document.cookie
      .split('; ')
      .find(row => row.startsWith('user='))
      ?.split('=')[1]
    
    if (storedUser) {
      try {
        setUser(JSON.parse(decodeURIComponent(storedUser)))
      } catch (error) {
        console.error('Error parsing user data:', error)
      }
    }
    setIsLoading(false)
  }, [])

  const storeUserInCookie = (userData: User) => {
    // Store user data in cookie with 7 days expiry
    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + 7)
    document.cookie = `user=${encodeURIComponent(JSON.stringify(userData))}; expires=${expiryDate.toUTCString()}; path=/`
  }

  const login = async (email: string, password: string, userType: 'user' | 'admin') => {
    try {
      const response = await fetch(`/api/auth/${userType}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Failed to log in' };
      }

      setUser(data.user);
      storeUserInCookie(data.user);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' };
    }
  };

  const signup = async ({
    firstName,
    lastName,
    email,
    password,
    phone,
    propertyName,
    userType
  }: {
    firstName: string
    lastName: string
    email: string
    password: string
    phone: string
    propertyName?: string
    userType: 'user' | 'admin'
  }) => {
    try {
      const response = await fetch(`/api/auth/${userType}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          phone,
          ...(userType === 'admin' && { propertyName })
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Return error message instead of throwing
        return { success: false, error: data.error || 'Failed to sign up' };
      }

      // After successful signup, automatically log the user in
      await login(email, password, userType);
      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' };
    }
  };

  const logout = () => {
    setUser(null)
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
