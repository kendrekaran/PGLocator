"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, Download, MapPin, MessageSquare, Receipt, User, CheckCircle, AlertCircle } from "lucide-react"
import { useAuth } from "@/context/auth-context"

export default function BookingsPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login?redirect=/bookings")
    }
  }, [isAuthenticated, isLoading, router])

  // Mock bookings data
  const bookings = [
    {
      id: "BK12345",
      pgId: 2,
      pgName: "Luxury PG Accommodation",
      location: "Keshwapur, Hubli",
      image: "/placeholder.svg?height=100&width=150",
      roomType: "Single",
      price: 7500,
      bookingDate: "2023-04-15",
      checkInDate: "2023-05-01",
      status: "confirmed",
      paymentId: "pay_123456789",
      owner: {
        name: "Suresh Patil",
        phone: "+91 98765 43210",
      },
    },
    {
      id: "BK12346",
      pgId: 5,
      pgName: "Executive PG Rooms",
      location: "Deshpande Nagar, Hubli",
      image: "/placeholder.svg?height=100&width=150",
      roomType: "Double",
      price: 6000,
      bookingDate: "2023-03-20",
      checkInDate: "2023-04-01",
      status: "active",
      paymentId: "pay_987654321",
      owner: {
        name: "Ramesh Kumar",
        phone: "+91 98765 12345",
      },
    },
  ]

  if (isLoading) {
    return (
      <div className="container py-16 flex justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Your Bookings</h1>

      {bookings.length === 0 ? (
        <div className="text-center py-16">
          <div className="mb-4 flex justify-center">
            <Calendar className="h-16 w-16 text-muted" />
          </div>
          <h2 className="text-2xl font-bold mb-2">No bookings yet</h2>
          <p className="text-muted-foreground mb-6">
            You haven't made any bookings yet. Start exploring PGs to find your perfect accommodation.
          </p>
          <Link href="/explore">
            <Button>Explore PGs</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <Card key={booking.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="relative md:w-1/4">
                    <Link href={`/explore/${booking.pgId}`}>
                      <div className="relative h-48 md:h-full">
                        <Image
                          src={booking.image || "/placeholder.svg"}
                          alt={booking.pgName}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </Link>
                    <Badge
                      className="absolute top-2 left-2"
                      variant={
                        booking.status === "confirmed"
                          ? "default"
                          : booking.status === "active"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {booking.status === "confirmed" ? (
                        <CheckCircle className="h-3 w-3 mr-1" />
                      ) : booking.status === "active" ? (
                        <CheckCircle className="h-3 w-3 mr-1" />
                      ) : (
                        <AlertCircle className="h-3 w-3 mr-1" />
                      )}
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="p-6 md:w-3/4">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                      <div>
                        <Link href={`/explore/${booking.pgId}`}>
                          <h3 className="text-xl font-bold hover:text-primary">{booking.pgName}</h3>
                        </Link>
                        <div className="flex items-center text-muted-foreground mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="text-sm">{booking.location}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground mt-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span className="text-sm">
                            Check-in: {new Date(booking.checkInDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center text-muted-foreground mt-1">
                          <User className="h-4 w-4 mr-1" />
                          <span className="text-sm">{booking.roomType} Room</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Booking ID</div>
                        <div className="font-medium">{booking.id}</div>
                        <div className="text-sm text-muted-foreground mt-2">Monthly Rent</div>
                        <div className="font-bold text-lg">₹{booking.price}</div>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div>
                        <div className="text-sm font-medium mb-2">Owner Contact</div>
                        <div className="flex items-center text-sm">
                          <User className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>{booking.owner.name}</span>
                        </div>
                        <div className="flex items-center text-sm mt-1">
                          <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>Booked on {new Date(booking.bookingDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Receipt className="h-4 w-4" />
                          View Receipt
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1">
                          <MessageSquare className="h-4 w-4" />
                          Contact Owner
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
