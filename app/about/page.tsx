import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Shield, Clock, Phone, Mail, MapPin } from "lucide-react"

export default function AboutPage() {

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About PG Locator</h1>
            <p className="text-lg text-muted-foreground mb-8">
              We're on a mission to make finding paying guest accommodations simple, transparent, and stress-free.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                PG Locator was founded in 2020 with a simple goal: to solve the challenges people face when looking for
                paying guest accommodations.
              </p>
              <p className="text-muted-foreground mb-4">
                Our founders experienced firsthand the frustration of searching for quality PG accommodations through
                scattered listings, unreliable information, and time-consuming visits.
              </p>
              <p className="text-muted-foreground mb-4">
                We built PG Locator to create a transparent marketplace where tenants can find verified PG
                accommodations that match their needs, and owners can showcase their properties to the right audience.
              </p>
              <p className="text-muted-foreground">
                Today, we're proud to have helped thousands of people find their perfect PG accommodations across
                multiple cities.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image src='\placeholder.jpg?height=400&width=600' alt="Our Story" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-muted">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Trust & Safety</h3>
                  <p className="text-muted-foreground">
                    We verify all listings to ensure safety and accuracy, giving you peace of mind in your search.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Community</h3>
                  <p className="text-muted-foreground">
                    We believe in building connections and fostering a sense of community among our users.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Efficiency</h3>
                  <p className="text-muted-foreground">
                    We save you time by providing all the information you need to make informed decisions quickly.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16">
        <div className="container">
          
          <div className="grid md:grid-cols-3 gap-8">
           
          </div>
        </div>
      </section>
 
       

      {/* Testimonials */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">What People Say About Us</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="text-yellow-500 mb-4">★★★★★</div>
                <p className="mb-4 italic">
                  "PG Locator helped me find the perfect accommodation near my college. The verified listings gave me
                  confidence, and I found a great place within my budget."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/20 mr-3"></div>
                  <div>
                    <p className="font-medium">Rahul Sharma</p>
                    <p className="text-sm text-muted-foreground">Student</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-yellow-500 mb-4">★★★★★</div>
                <p className="mb-4 italic">
                  "As a PG owner, this platform has made it so much easier to find reliable tenants. The verification
                  process ensures quality on both sides."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/20 mr-3"></div>
                  <div>
                    <p className="font-medium">Sneha Kayakad</p>
                    <p className="text-sm text-muted-foreground">PG Owner</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section className="py-16 bg-muted">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Contact Us</h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">Phone</h3>
                  <p className="text-muted-foreground">9008703230</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">Email</h3>
                  <p className="text-muted-foreground">pglocator@gmail.com</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">Address</h3>
                  <p className="text-muted-foreground">Hubli,Karnataka</p>
                </CardContent>
              </Card>
            </div>
            <div className="text-center">
               
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
