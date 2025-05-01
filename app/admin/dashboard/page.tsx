"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminDashboard() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.userType !== 'admin')) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user || user.userType !== 'admin') {
    return null
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
            <CardDescription>Manage your property information</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">{user.propertyName}</p>
            <p className="text-sm text-gray-500">Property Manager: {user.firstName} {user.lastName}</p>
            <p className="text-sm text-gray-500">Contact: {user.email}</p>
          </CardContent>
        </Card>

        {/* Add more dashboard cards here for:
            - Booking Management
            - Property Analytics
            - User Inquiries
            - etc. */}
      </div>
    </div>
  )
}