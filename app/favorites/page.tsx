"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin, Wifi, Utensils, ShowerHead, Wind } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/components/toast-provider"

export default function FavoritesPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const { showToast } = useToast()

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login?redirect=/favorites")
    }
  }, [isAuthenticated, isLoading, router])

  // Mock saved PGs data
  const savedPGs = [
    {
      id: 2,
      title: "Luxury PG Accommodation",
      location: "Keshwapur, Hubli",
      price: 7500,
      image: "/placeholder.svg?height=200&width=300",
      amenities: ["WiFi", "Food", "Attached Bathroom", "AC"],
      rating: 4.9,
      reviews: 36,
      gender: "Female",
    },
    {
      id: 5,
      title: "Executive PG Rooms",
      location: "Deshpande Nagar, Hubli",
      price: 8000,
      image: "/placeholder.svg?height=200&width=300",
      amenities: ["WiFi", "Food", "Attached Bathroom", "AC", "TV"],
      rating: 4.9,
      reviews: 31,
      gender: "Male",
    },
  ]

  const handleRemoveFavorite = (id: number) => {
    showToast("Removed from favorites", "success")
  }

  if (isLoading) {
    return (
      <div className="container py-16 flex justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Your Favorite PGs</h1>

      {savedPGs.length === 0 ? (
        <div className="text-center py-16">
          <div className="mb-4 flex justify-center">
            <Heart className="h-16 w-16 text-muted" />
          </div>
          <h2 className="text-2xl font-bold mb-2">No favorites yet</h2>
          <p className="text-muted-foreground mb-6">You haven't saved any PG accommodations to your favorites list.</p>
          <Link href="/explore">
            <Button>Explore PGs</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {savedPGs.map((pg) => (
            <Card key={pg.id} className="overflow-hidden">
              <div className="relative">
                <Link href={`/explore/${pg.id}`}>
                  <div className="relative h-48">
                    <Image src={pg.image || "/placeholder.svg"} alt={pg.title} fill className="object-cover" />
                  </div>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 rounded-full bg-background/80 text-red-500"
                  onClick={() => handleRemoveFavorite(pg.id)}
                >
                  <Heart className="h-5 w-5" fill="currentColor" />
                </Button>
                <Badge className="absolute top-2 left-2">{pg.gender}</Badge>
              </div>
              <CardContent className="p-6">
                <Link href={`/explore/${pg.id}`}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{pg.title}</h3>
                    <Badge variant="outline" className="text-primary">
                      ₹{pg.price}/mo
                    </Badge>
                  </div>
                  <div className="flex items-center text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{pg.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {pg.amenities.includes("WiFi") && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Wifi className="h-3 w-3" />
                        WiFi
                      </Badge>
                    )}
                    {pg.amenities.includes("Food") && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Utensils className="h-3 w-3" />
                        Food
                      </Badge>
                    )}
                    {pg.amenities.includes("Attached Bathroom") && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <ShowerHead className="h-3 w-3" />
                        Bathroom
                      </Badge>
                    )}
                    {pg.amenities.includes("AC") && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Wind className="h-3 w-3" />
                        AC
                      </Badge>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="text-yellow-500 mr-1">★</div>
                      <span className="font-medium">{pg.rating}</span>
                      <span className="text-muted-foreground text-sm ml-1">({pg.reviews} reviews)</span>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
