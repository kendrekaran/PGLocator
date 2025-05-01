"use client"

import { useState, use } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  MapPin,
  MessageSquare,
  Phone,
  Share2,
  Star,
  User,
  Wifi,
  Utensils,
  ShowerHead,
  Wind,
  Tv,
  ParkingMeterIcon as Parking,
  Clock,
} from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/components/toast-provider"
import AuthRequiredModal from "@/components/auth-required-modal"
import RazorpayPaymentButton from "@/components/razorpay-payment-button"
import GoogleMapComponent from "@/components/google-map-component"
import { Snowburst_One } from "next/font/google"

// Function to get PG details based on ID
const getPgDetailsById = (id: number) => {
  // Array of PG details - matching the first 6 PGs from your explore page
  const pgDetailsArray = [
    {
      id: 1,
      title: "EXCLUSIVE LADIES PG",
      location: "Vidyanagar, Hubli",
      price: 7500,
      description:
        "This luxurious PG accommodation offers comfortable living with all modern amenities. Located in a prime area of Hubli with easy access to public transportation, shopping centers, and restaurants. The rooms are spacious, well-ventilated, and furnished with quality furniture.",
      amenities: [
        { name: "WiFi", icon: Wifi },
        { name: "Food", icon: Utensils },
        { name: "AC", icon: Wind },
        { name: "Common Bathroom", icon: ShowerHead },
      ],
      rules: [
        "No smoking inside the premises",
        "Guests allowed only in common areas",
        "Quiet hours from 10 PM to 6 AM",
        "No pets allowed",
        "ID proof required for check-in",
      ],
      images: [
        "/placeholder-id1.1.jpg",
        "/placeholder-id1.2.jpg",
        "/placeholder-id1.3.jpg",
      ],
      rating: 4.9,
      reviews: [
        {
          id: 1,
          user: "Anjali Sharma",
          rating: 5,
          date: "2 months ago",
          comment:
            "Excellent PG accommodation with great facilities. The rooms are clean and well-maintained. The food is delicious and staff is friendly and helpful. Highly recommended for female students!",
        },
        {
          id: 2,
          user: "Priya Mehta",
          rating: 4,
          date: "3 months ago",
          comment:
            "Good place to stay. Clean rooms, decent food, and nice location. The only issue was occasional water shortage.",
        },
      ],
      owner: {
        name: "Sneha Kayakad",
        phone: "+91 9876543210",
        responseTime: "Usually responds within 1 hour",
        memberSince: "January 2020",
      },
      roomTypes: [
        {
          type: "Single",
          price: 7500,
          availability: 2,
        },
      ],
      gender: "Female",
      address: "123 Vidyanagar Main Road, Hubli, Karnataka 580031",
      coordinates: {
        lat: 15.3647,
        lng: 75.124,
      },
      nearbyPlaces: [
        "KLE College (1.5 km)",
        "Hubli Bus Station (2 km)",
        "Vidyanagar Shopping Mall (0.8 km)",
        "City Hospital (1.2 km)",
        "Railway Station (3 km)",
      ],
    },
    {
      id: 2,
      title: "VISHWANATH PG",
      location: "Vidyanagar, Hubli",
      price: 6500,
      description:
        "Vishwanath PG offers an exceptional living experience for female students and working professionals. With spacious rooms, modern amenities, and a secure environment, it's the perfect place to call home. The PG is located in a quiet residential area with excellent connectivity to educational institutions and commercial centers.",
      amenities: [
        { name: "WiFi", icon: Wifi },
        { name: "Food", icon: Utensils },
        { name: "Attached Bathroom", icon: ShowerHead },
        { name: "AC", icon: Wind },
      ],
      rules: [
        "No smoking inside the premises",
        "Entry closed after 9:30 PM",
        "No male visitors allowed inside rooms",
        "No loud music or parties",
        "Monthly rent to be paid by 5th of every month",
      ],
      images: [
        "/placeholder-id2.1.png",
        "/placeholder-id2.2.png",
         
      ],
      rating: 4.3,
      reviews: [
        {
          id: 1,
          user: "Neha Patil",
          rating: 5,
          date: "1 month ago",
          comment:
            "This is the best PG I've stayed at in Hubli. The rooms are spacious and clean, food is amazing, and the owner is very responsive to any issues. Highly recommend!",
        },
        {
          id: 2,
          user: "Divya Singh",
          rating: 5,
          date: "2 months ago",
          comment:
            "Great accommodation for female students. The security is excellent and the location is perfect - close to colleges and shopping areas.",
        },
        {
          id: 3,
          user: "Meera Agarwal",
          rating: 4,
          date: "3 months ago",
          comment:
            "Very comfortable stay with good facilities. The attached bathroom is a huge plus. Food could be a bit more varied though.",
        },
      ],
      owner: {
        name: "Vishwanath Desai",
        phone: "+91 9877654321",
        responseTime: "Usually responds within 30 minutes",
        memberSince: "March 2019",
      },
      roomTypes: [
        {
          type: "Double",
          price: 6500,
          availability: 3,
        },
      ],
      gender: "Female",
      address: "45 Vidyanagar Cross, Hubli, Karnataka 580031",
      coordinates: {
        lat: 15.3645,
        lng: 75.125,
      },
      nearbyPlaces: [
        "SDM College (0.8 km)",
        "Central Bus Stand (2.5 km)",
        "Vidyanagar Market (0.5 km)",
        "Apollo Hospital (1.8 km)",
        "Hubli Junction Railway Station (3.2 km)",
      ],
    },
    {
      id: 3,
      title: "VIDTARTHI NILAYA BOYS PG",
      location: "Vidya nagar, Hubli",
      price: 3500,
      description:
        "Vidyarthi Nilaya is a budget-friendly accommodation for male students with all essential facilities. Located in the heart of Vidyanagar, this PG is ideal for students looking for a comfortable stay without breaking the bank. The PG offers clean rooms, basic amenities, and a friendly atmosphere.",
      amenities: [
        { name: "WiFi", icon: Wifi },
        { name: "Food", icon: Utensils },
        { name: "Common Bathroom", icon: ShowerHead },
      ],
      rules: [
        "No alcohol consumption on premises",
        "No smoking in rooms",
        "Guests allowed till 8 PM only",
        "Keep noise levels down after 10 PM",
        "Monthly rent due by 7th of each month",
      ],
      images: [
        "/placeholder-id3.1.jpg",
        "/placeholder-id3.2.jpg",
        "/placeholder-id3.3.jpg",
      ],
      rating: 4.9,
      reviews: [
        {
          id: 1,
          user: "Siddharth Kulkarni",
          rating: 5,
          date: "2 months ago",
          comment:
            "Affordable and decent accommodation for students. The food is really good and rooms are maintained well.",
        },
        {
          id: 2,
          user: "Rahul Patil",
          rating: 4,
          date: "4 months ago",
          comment:
            "Good value for money. Decent facilities considering the price. WiFi is quite reliable which is important for students.",
        },
      ],
      owner: {
        name: "Mahadev Kulkarni",
        phone: "+91 8765432109",
        responseTime: "Usually responds within 2 hours",
        memberSince: "August 2021",
      },
      roomTypes: [
        {
          type: "Double",
          price: 3500,
          availability: 5,
        },
      ],
      gender: "Male",
      address: "78 College Road, Vidyanagar, Hubli, Karnataka 580031",
      coordinates: {
        lat: 15.365,
        lng: 75.126,
      },
      nearbyPlaces: [
        "KLE Engineering College (1.2 km)",
        "Vidyanagar Bus Stop (0.3 km)",
        "College Canteen (0.1 km)",
        "Public Library (0.5 km)",
        "Sports Complex (0.8 km)",
      ],
    },
    {
      id: 4,
      title: "SLN PG",
      location: "Vidya Nagar, Hubli",
      price: 3500,
      description:
        "SLN PG offers premium accommodation for male students and professionals in Vidya Nagar. With air-conditioned rooms and attached bathrooms, it provides a comfortable living experience. The property is well-maintained with 24-hour security and power backup.",
      amenities: [
        { name: "Attached Bathroom", icon: ShowerHead },
        { name: "AC", icon: Wind },
      ],
      rules: [
        "No loud music or parties",
        "Visitors allowed only in common areas",
        "No cooking in rooms",
        "Keep rooms and common areas clean",
        "Lights out by 11 PM in common areas",
      ],
      images: [
        "/placeholder-id4.1.png",
        "/placeholder-id4.2.png",
        
      ],
      rating: 4.7,
      reviews: [
        {
          id: 1,
          user: "Ravi Kumar",
          rating: 5,
          date: "1 month ago",
          comment:
            "Great place to stay! The AC rooms are a blessing during summer. The attached bathroom makes it very convenient.",
        },
        {
          id: 2,
          user: "Aditya Sharma",
          rating: 4,
          date: "3 months ago",
          comment:
            "Nice accommodation with good facilities. The location is perfect for students as it's close to many colleges.",
        },
        {
          id: 3,
          user: "Varun Singh",
          rating: 5,
          date: "5 months ago",
          comment:
            "One of the better PGs in Hubli. Clean rooms, good amenities, and responsive management.",
        },
      ],
      owner: {
        name: "Lakshman Naidu",
        phone: "+91 7654321098",
        responseTime: "Usually responds within 1 hour",
        memberSince: "May 2020",
      },
      roomTypes: [
        {
          type: "Single",
          price: 3500,
          availability: 2,
        },
      ],
      gender: "Male",
      address: "34 College Main Road, Vidya Nagar, Hubli, Karnataka 580031",
      coordinates: {
        lat: 15.366,
        lng: 75.123,
      },
      nearbyPlaces: [
        "SDM Medical College (1.5 km)",
        "Vidya Nagar Cricket Ground (0.7 km)",
        "City Center Mall (2.3 km)",
        "District Hospital (1.9 km)",
        "Central Library (0.8 km)",
      ],
    },
    {
      id: 5,
      title: "SHREE LAXMI NARAYANA KRUPA KALBURGI",
      location: "New hubli, Hubli",
      price: 8000,
      description:
        "Shree Laxmi Narayana Krupa offers luxurious PG accommodation in New Hubli. With top-notch amenities including AC rooms, attached bathrooms, TV, and delicious home-cooked meals, it provides a comfortable and premium living experience. Suitable for students and working professionals of all genders.",
      amenities: [
        { name: "Food", icon: Utensils },
        { name: "Attached Bathroom", icon: ShowerHead },
        { name: "AC", icon: Wind },
        { name: "TV", icon: Tv },
      ],
      rules: [
        "No smoking or alcohol consumption on premises",
        "Maintain cleanliness in rooms and common areas",
        "Visitors allowed only in designated areas",
        "Quiet hours from 10 PM to 6 AM",
        "Advance notice required for overnight guests",
      ],
      images: [
        "/placeholder-id5.1.jpg",
        "/placeholder-id5.2.jpg",
        "/placeholder-id5.3.jpg",
        "/placeholder-id5.4.jpg",
      ],
      rating: 4.5,
      reviews: [
        {
          id: 1,
          user: "Rohit Sharma",
          rating: 5,
          date: "2 weeks ago",
          comment:
            "Excellent accommodation with premium facilities. The food is amazing and rooms are spacious and clean.",
        },
        {
          id: 2,
          user: "Priya Agarwal",
          rating: 5,
          date: "1 month ago",
          comment:
            "Best PG in Hubli! The amenities are top-notch and the staff is very helpful. Definitely worth the price.",
        },
        {
          id: 3,
          user: "Karan Patel",
          rating: 4,
          date: "2 months ago",
          comment:
            "Great place to stay with excellent facilities. The AC and TV in rooms make it very comfortable.",
        },
      ],
      owner: {
        name: "Narayana Kalburgi",
        phone: "+91 9876512340",
        responseTime: "Usually responds immediately",
        memberSince: "January 2018",
      },
      roomTypes: [
        {
          type: "Double",
          price: 8000,
          availability: 4,
        },
      ],
      gender: "Unisex",
      address: "56 New Hubli Main Road, Hubli, Karnataka 580030",
      coordinates: {
        lat: 15.358,
        lng: 75.119,
      },
      nearbyPlaces: [
        "IT Park (1.2 km)",
        "New Hubli Bus Terminal (0.8 km)",
        "City Mall (1.5 km)",
        "Multi-Specialty Hospital (0.9 km)",
        "Recreation Club (0.6 km)",
      ],
    },
    {
      id: 6,
      title: "SAPNAJIT PAYING GUEST",
      location: "Akshay Colony, Hubli",
      price: 7000,
      description:
        "Sapnajit Paying Guest offers a comfortable and modern living space in Akshay Colony. With well-furnished rooms, attached bathrooms, and delicious home-cooked meals, it provides a homely atmosphere for all residents. The PG is known for its cleanliness and well-maintained facilities.",
      amenities: [
        { name: "Food", icon: Utensils },
        { name: "Attached Bathroom", icon: ShowerHead },
      ],
      rules: [
        "Entry closed by 10 PM",
        "No loud music or disturbances",
        "Keep common areas clean",
        "No outside food allowed in rooms",
        "Visitors allowed only in common areas",
      ],
      images: [
        "/placeholder-id6 .1.jpg",
        "/placeholder-id6.2.jpg",
        "/placeholder-id6.3.jpg",
        
        
      ],
      rating: 4.6,
      reviews: [
        {
          id: 1,
          user: "Sneha Joshi",
          rating: 5,
          date: "1 month ago",
          comment:
            "Great PG with homely atmosphere. The food is delicious and the rooms are clean and well-maintained.",
        },
        {
          id: 2,
          user: "Akash Verma",
          rating: 4,
          date: "2 months ago",
          comment:
            "Good accommodation in a nice locality. The attached bathrooms are clean and the food quality is consistent.",
        },
        {
          id: 3,
          user: "Riya Desai",
          rating: 5,
          date: "3 months ago",
          comment:
            "One of the better PGs in Hubli. The owner is very understanding and helpful with any issues.",
        },
      ],
      owner: {
        name: "Sapna Jitendra",
        phone: "+91 8765123490",
        responseTime: "Usually responds within 2 hours",
        memberSince: "April 2019",
      },
      roomTypes: [
        {
          type: "Double",
          price: 7000,
          availability: 3,
        },
      ],
      gender: "Unisex",
      address: "23 Akshay Colony, Near Central Park, Hubli, Karnataka 580030",
      coordinates: {
        lat: 15.362,
        lng: 75.127,
      },
      nearbyPlaces: [
        "Central Park (0.3 km)",
        "Akshay Colony Market (0.5 km)",
        "City Bus Stop (0.8 km)",
        "Private Hospital (1.2 km)",
        "Shopping Complex (1.0 km)",
      ],
    },
    {
      id: 7,
      title: "HOGWARTS PAYING GUEST",
      location: "Narayanpura, Dharwad",
      price: 3000,
      description:
        "Hogwarts Paying Guest is a budget-friendly PG for females in Narayanpura, Dharwad. It provides essential amenities like WiFi and food, along with clean common bathrooms. It's ideal for students or working women seeking safety and simplicity.",
      amenities: [
        { name: "Wifi", icon: Wifi },
        { name: "Food", icon: Utensils },
        { name: "Common Bathroom", icon: ShowerHead },
      ],
      rules: [
        "Entry closed by 9:30 PM",
        "Maintain silence after 10 PM",
        "No male visitors inside rooms",
        "Use shared kitchen responsibly",
        "No smoking or alcohol"
      ],
      images: [
        "/placeholder-id7.1.jpg",
        "/placeholder-id7.2.jpg",
        "/placeholder-id7.3.jpg"
      ],
      rating: 4.5,
      reviews: [
        {
          id: 1,
          user: "Meghana Rao",
          rating: 5,
          date: "2 weeks ago",
          comment: "Affordable and secure place. The WiFi is reliable and the food is decent for the price."
        },
        {
          id: 2,
          user: "Anjali Patil",
          rating: 4,
          date: "1 month ago",
          comment: "Simple yet comfortable PG. Would recommend to other students in the area."
        }
      ],
      owner: {
        name: "Lakshmi Deshpande",
        phone: "+91 9876543210",
        responseTime: "Usually responds within a day",
        memberSince: "June 2020"
      },
      roomTypes: [
        {
          type: "Double",
          price: 3000,
          availability: 5
        }
      ],
      gender: "Female",
      address: "15 Narayanpura Main Road, Dharwad, Karnataka 580008",
      coordinates: {
        lat: 15.458,
        lng: 75.007
      },
      nearbyPlaces: [
        "Narayanpura Bus Stop (0.2 km)",
        "Local Market (0.4 km)",
        "College Campus (0.9 km)",
        "Medical Store (0.3 km)",
        "ATM (0.5 km)"
      ]
    },
    {
      id: 8,
      title: "SHRI SHARADA PG",
      location: "Yalakki Shettar Colony, Dharwad",
      price: 5000,
      description:
        "Shri Sharada PG is a clean and comfortable living space for women in Yalakki Shettar Colony. It offers WiFi, home-cooked food, and attached bathrooms for a hassle-free stay.",
      amenities: [
        { name: "Wifi", icon: Wifi },
        { name: "Food", icon: Utensils },
        { name: "Attached Bathroom", icon: ShowerHead },
      ],
      rules: [
        "Visitors restricted to common areas",
        "Maintain personal hygiene",
        "No loud music",
        "No pets allowed",
        "Keep kitchen clean after use"
      ],
      images: [
        "/placeholder-id8.1.jpg",
        "/placeholder-id8.2.jpg",
        "/placeholder-id8.3.jpg"
      ],
      rating: 4.6,
      reviews: [
        {
          id: 1,
          user: "Shruti Kulkarni",
          rating: 5,
          date: "1 month ago",
          comment: "One of the best PGs in Dharwad for girls. Safe and neatly maintained."
        },
        {
          id: 2,
          user: "Divya Shetty",
          rating: 4,
          date: "2 months ago",
          comment: "Food is good and rooms are cozy. Slightly higher on budget, but worth it."
        }
      ],
      owner: {
        name: "Sharada Patil",
        phone: "+91 9988776655",
        responseTime: "Usually responds within a few hours",
        memberSince: "March 2021"
      },
      roomTypes: [
        {
          type: "Double",
          price: 5000,
          availability: 2
        }
      ],
      gender: "Female",
      address: "78 Yalakki Shettar Colony, Dharwad, Karnataka 580006",
      coordinates: {
        lat: 15.455,
        lng: 75.013
      },
      nearbyPlaces: [
        "Shettar Market (0.3 km)",
        "Bus Stop (0.6 km)",
        "Grocery Store (0.4 km)",
        "Clinic (1.0 km)",
        "Cafe (0.5 km)"
      ]
    },
    {
      id: 9,
      title: "AGRI PG",
      location: "PB Road, Dharwad",
      price: 2500,
      description:
        "AGRI PG is a value-for-money PG for male students and working professionals located on PB Road, Dharwad. It offers air-conditioned rooms with access to common bathrooms, ideal for those looking for affordability and functionality.",
      amenities: [
        { name: "AC", icon: Wind },
        { name: "Common Bathroom", icon: ShowerHead },
      ],
      rules: [
        "Quiet hours after 10 PM",
        "Keep shared spaces clean",
        "No alcohol or smoking allowed",
        "Entry restricted after 10 PM",
        "Guests only in visitor area"
      ],
      images: [
        "/placeholder-id9.1.jpg",
        "/placeholder-id9.2.jpg",
        "/placeholder-id9.3.jpg"
      ],
      rating: 4.2,
      reviews: [
        {
          id: 1,
          user: "Kiran Nayak",
          rating: 5,
          date: "3 weeks ago",
          comment: "Great value for the price. The AC is a bonus in this budget range."
        },
        {
          id: 2,
          user: "Vishal M",
          rating: 4,
          date: "2 months ago",
          comment: "Decent PG with all essentials. Clean bathrooms and well-maintained."
        }
      ],
      owner: {
        name: "Mahesh Hugar",
        phone: "+91 9765432109",
        responseTime: "Responds within a few hours",
        memberSince: "January 2020"
      },
      roomTypes: [
        {
          type: "Double",
          price: 2500,
          availability: 4
        }
      ],
      gender: "Male",
      address: "34 PB Road, Near Agricultural College, Dharwad, Karnataka 580001",
      coordinates: {
        lat: 15.443,
        lng: 75.005
      },
      nearbyPlaces: [
        "Agricultural College (0.2 km)",
        "Bus Stop (0.5 km)",
        "General Store (0.3 km)",
        "Public Library (1.1 km)",
        "Medical Center (0.9 km)"
      ]
    },
    {
      id: 10,
      title: "TRIVENI PAYING GUEST",
      location: "Saptapur, Dharwad",
      price: 3000,
      description:
        "Triveni Paying Guest is a simple and clean PG located in the peaceful locality of Saptapur, Dharwad. It provides air-conditioned rooms with common bathroom access, suitable for male tenants looking for a calm and secure environment.",
      amenities: [
        { name: "AC", icon: Wind },
        { name: "Common Bathroom", icon: ShowerHead },
      ],
      rules: [
        "No loud gatherings",
        "Maintain hygiene in shared areas",
        "Lights off by 11 PM",
        "Smoking not permitted",
        "ID proof mandatory for visitors"
      ],
      images: [
        "/placeholder-id10.1.jpg",
        "/placeholder-id10.2.jpg",
        "/placeholder-id10.3.jpg"
      ],
      rating: 3.9,
      reviews: [
        {
          id: 1,
          user: "Rohit G",
          rating: 5,
          date: "1 month ago",
          comment: "Good stay in a nice location. Management is cooperative and responsive."
        },
        {
          id: 2,
          user: "Sandeep N",
          rating: 4,
          date: "3 months ago",
          comment: "Room is spacious, and the AC works well. Bathroom could be better maintained."
        }
      ],
      owner: {
        name: "Kiran Naik",
        phone: "+91 7896541230",
        responseTime: "Usually responds same day",
        memberSince: "February 2021"
      },
      roomTypes: [
        {
          type: "Double",
          price: 3000,
          availability: 3
        }
      ],
      gender: "Male",
      address: "52 Saptapur Circle, Dharwad, Karnataka 580001",
      coordinates: {
        lat: 15.445,
        lng: 74.987
      },
      nearbyPlaces: [
        "Saptapur Park (0.4 km)",
        "Food Plaza (0.6 km)",
        "College Campus (0.7 km)",
        "Medical Shop (0.5 km)",
        "ATM (0.8 km)"
      ]
    },
    {
      id: 11,
      title: "BED IN A 2 BHK APARTMENT",
      location: "Kalyan Nagar, Dharwad",
      price: 2000,
      description:
        "A shared bed in a well-maintained 2 BHK apartment located in Kalyan Nagar, Dharwad. This unisex accommodation is ideal for students or working individuals who prefer a community-based living space on a low budget.",
      amenities: [
        { name: "Common Bathroom", icon: ShowerHead },
      ],
      rules: [
        "No overcrowding of rooms",
        "Shared kitchen usage rules apply",
        "Respect roommates' privacy",
        "Keep noise to a minimum",
        "No overnight guests allowed"
      ],
      images: [
        "/placeholder-id11.1.jpg",
        
      ],
      rating: 3.6,
      reviews: [
        {
          id: 1,
          user: "Aditya Meher",
          rating: 4,
          date: "2 months ago",
          comment: "Very affordable stay. You get what you pay for, and the environment is friendly."
        },
        {
          id: 2,
          user: "Neha S",
          rating: 5,
          date: "1 month ago",
          comment: "Great for students. The apartment is shared but well-managed."
        }
      ],
      owner: {
        name: "Rajeev Hegde",
        phone: "+91 9638527410",
        responseTime: "Responds within 6 hours",
        memberSince: "August 2022"
      },
      roomTypes: [
        {
          type: "Double",
          price: 2000,
          availability: 6
        }
      ],
      gender: "Unisex",
      address: "Block 5, Kalyan Nagar, Dharwad, Karnataka 580002",
      coordinates: {
        lat: 15.458,
        lng: 75.025
      },
      nearbyPlaces: [
        "Kalyan Nagar Park (0.5 km)",
        "Local Eatery (0.4 km)",
        "Bus Station (0.7 km)",
        "Medical Clinic (0.8 km)",
        "Cafe (0.6 km)"
      ]
    },
    {
      id: 12,
      title: "BED IN A 1 BHK APARTMENT",
      location: "Shivagiri, Dharwad",
      price: 5000,
      description:
        "Spacious bed in a 1 BHK apartment in Shivagiri, suitable for individuals seeking privacy and modern comforts. This unisex option includes WiFi and an attached bathroom, offering a homely experience.",
      amenities: [
        { name: "Wifi", icon: Wifi },
        { name: "Attached Bathroom", icon: ShowerHead },
      ],
      rules: [
        "No outside guests allowed overnight",
        "Maintain cleanliness",
        "WiFi usage for study/work only",
        "Respect quiet hours",
        "Keep kitchen appliances clean"
      ],
      images: [
        "/placeholder-id12.1.jpg",
        "/placeholder-id12.2.jpg",
        
      ],
      rating: 4.0,
      reviews: [
        {
          id: 1,
          user: "Ritika Singh",
          rating: 5,
          date: "3 weeks ago",
          comment: "Feels like home! The private bathroom and stable WiFi make it worth the price."
        },
        {
          id: 2,
          user: "Arjun Nair",
          rating: 4,
          date: "2 months ago",
          comment: "Peaceful locality and clean rooms. Owner is very cooperative."
        }
      ],
      owner: {
        name: "Meera Hegde",
        phone: "+91 9811122233",
        responseTime: "Usually responds within 4 hours",
        memberSince: "May 2022"
      },
      roomTypes: [
        {
          type: "Double",
          price: 5000,
          availability: 2
        }
      ],
      gender: "Unisex",
      address: "Flat 12, Shivagiri Residency, Dharwad, Karnataka 580004",
      coordinates: {
        lat: 15.472,
        lng: 75.030
      },
      nearbyPlaces: [
        "Shivagiri Bus Stop (0.3 km)",
        "Local Grocery (0.2 km)",
        "ATM (0.6 km)",
        "Shivagiri Temple (0.4 km)",
        "Medical Store (0.7 km)"
      ]
    },
];

  // Find the PG with the matching ID
  return pgDetailsArray.find(pg => pg.id === id) || pgDetailsArray[0];
};

// Type for params to be used with React.use()
type PageParams = { id: string };

export default function PGDetailPage({ params }: { params: Promise<PageParams> | PageParams }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [saved, setSaved] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [reviewText, setReviewText] = useState('')
  const { isAuthenticated } = useAuth()
  const { showToast } = useToast()
  const router = useRouter()
  
  // Fix: Unwrap params using React.use() if it's a promise
  const unwrappedParams = params instanceof Promise ? use(params) : params;
  
  // Get the ID from params and convert to number
  const id = parseInt(unwrappedParams.id);

  // Get the PG details based on the ID
  const pgDetails = getPgDetailsById(id)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === pgDetails.images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? pgDetails.images.length - 1 : prev - 1))
  }

  const toggleSave = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true)
      return
    }

    setSaved(!saved)
    showToast(saved ? "Removed from favorites" : "Added to favorites", "success")
  }

  const handleBookNow = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true)
      return
    }

    // In a real app, this would navigate to a booking page or open a booking modal
    // For now, we'll just show a toast
    showToast("Proceeding to payment...", "info")
  }

  const handleContactOwner = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true)
      return
    }

    // In a real app, this would open a chat interface or contact form
    showToast("Message sent to owner", "success")
  }

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Link href="/explore" className="flex items-center text-muted-foreground hover:text-foreground">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Explore
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* Image Gallery */}
          <div className="relative rounded-lg overflow-hidden mb-6">
            <div className="relative h-[300px] md:h-[400px]">
              <Image
                src={pgDetails.images[currentImageIndex]}
                alt={pgDetails.title}
                fill
                className="object-cover"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-background/80"
              onClick={prevImage}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-background/80"
              onClick={nextImage}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {pgDetails.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-primary" : "bg-background/80"}`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-2 mb-6 overflow-x-auto">
            {pgDetails.images.map((image, index) => (
              <div
                key={index}
                className={`relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden cursor-pointer ${
                  index === currentImageIndex ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <Image src={image} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>

          {/* PG Details */}
          <div className="mb-8">
            <div className="flex justify-between items-start mb-2">
              <h1 className="text-3xl font-bold">{pgDetails.title}</h1>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className={saved ? "text-red-500" : ""} onClick={toggleSave}>
                  <Heart className="h-5 w-5" fill={saved ? "currentColor" : "none"} />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="flex items-center text-muted-foreground mb-4">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{pgDetails.location}</span>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                <div className="text-yellow-500 mr-1">★</div>
                <span className="font-medium">{pgDetails.rating}</span>
                <span className="text-muted-foreground ml-1">({pgDetails.reviews.length} reviews)</span>
              </div>
              <Badge>{pgDetails.gender}</Badge>
            </div>
            <p className="text-muted-foreground mb-6">{pgDetails.description}</p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="amenities" className="mb-8">
            <TabsList className="mb-4">
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
              <TabsTrigger value="rules">Rules</TabsTrigger>
              <TabsTrigger value="rooms">Room Types</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
            </TabsList>

            <TabsContent value="amenities">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {pgDetails.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <amenity.icon className="h-5 w-5 text-primary" />
                        <span>{amenity.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rules">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">House Rules</h3>
                  <ul className="space-y-2">
                    {pgDetails.rules.map((rule, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                          <ChevronRight className="h-3 w-3 text-primary" />
                        </div>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rooms">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Room Types & Pricing</h3>
                  <div className="space-y-4">
                    {pgDetails.roomTypes.map((room, index) => (
                      <div key={index} className="flex justify-between items-center pb-4 border-b last:border-0">
                        <div>
                          <h4 className="font-medium">{room.type} Room</h4>
                          <p className="text-sm text-muted-foreground">
                            {room.availability} {room.availability === 1 ? "room" : "rooms"} available
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg">₹{room.price}/mo</div>
                          {isAuthenticated ? (
                            <RazorpayPaymentButton amount={room.price} roomType={room.type} pgName={pgDetails.title} />
                          ) : (
                            <Button
                              size="sm"
                              className="mt-2"
                              onClick={() => {
                                setShowBookingForm(true)
                              }}
                            >
                              Book Now
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="location">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Location</h3>
                  <p className="mb-4">{pgDetails.address}</p>
                  <div className="relative h-[300px] rounded-lg overflow-hidden mb-4">
                    <GoogleMapComponent
                      lat={pgDetails.coordinates.lat}
                      lng={pgDetails.coordinates.lng}
                      title={pgDetails.title}
                    />
                  </div>
                  <h4 className="font-medium mb-2">Nearby Places</h4>
                  <ul className="space-y-2">
                    {pgDetails.nearbyPlaces.map((place, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                          <MapPin className="h-3 w-3 text-primary" />
                        </div>
                        <span>{place}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Reviews */}
          <div>
            <h3 className="text-xl font-bold mb-4">Reviews</h3>
            <div className="space-y-6 mb-6">
              {pgDetails.reviews.map((review) => (
                <div key={review.id} className="p-4 rounded-lg border">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 mr-3 flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{review.user}</h4>
                        <p className="text-xs text-muted-foreground">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="text-yellow-500 mr-1">★</div>
                      <span>{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>

            {/* Write a Review */}
            {isAuthenticated ? (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Write a Review</h3>
                  <div className="flex items-center mb-4">
                    <span className="mr-2">Rating:</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 text-muted cursor-pointer hover:text-yellow-500" />
                      ))}
                    </div>
                  </div>
                  <Textarea placeholder="Share your experience..." className="mb-4" rows={4} />
                  <Button>Submit Review</Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-medium mb-2">Want to write a review?</h3>
                  <p className="text-muted-foreground mb-4">Please log in or sign up to share your experience</p>
                  <div className="flex justify-center gap-4">
                    <Button variant="outline" onClick={() => router.push("/login")}>
                      Log In
                    </Button>
                    <Button onClick={() => router.push("/signup")}>Sign Up</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <div className="sticky top-20">
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="text-2xl font-bold mb-2">₹{pgDetails.price}/mo</div>
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <div className="text-yellow-500 mr-1">★</div>
                  <span>{pgDetails.rating}</span>
                  <span className="mx-1">•</span>
                  <span>{pgDetails.reviews.length} reviews</span>
                </div>
                <Separator className="mb-4" />
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span>Security Deposit</span>
                    <span className="font-medium">₹{pgDetails.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Rent</span>
                    <span className="font-medium">₹{pgDetails.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Maintenance</span>
                    <span className="font-medium">₹1000</span>
                  </div>
                </div>
                {isAuthenticated ? (
                  <>
                    <RazorpayPaymentButton
                      amount={pgDetails.price}
                      roomType="Single"
                      pgName={pgDetails.title}
                      className="w-full mb-2"
                    />
                    <Button variant="outline" className="w-full" onClick={handleContactOwner}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Contact Owner
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="w-full mb-2" onClick={handleBookNow}>
                      Book Now
                    </Button>
                    <Button variant="outline" className="w-full" onClick={handleContactOwner}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Contact Owner
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Owner Information</h3>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 mr-3 flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{pgDetails.owner.name}</h4>
                    <p className="text-xs text-muted-foreground">Member since {pgDetails.owner.memberSince}</p>
                  </div>
                </div>
                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <span className="text-sm">{pgDetails.owner.responseTime}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <span className="text-sm">{pgDetails.owner.phone}</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full" onClick={handleContactOwner}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Authentication Required Modal */}
      <AuthRequiredModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        redirectUrl={`/explore/${id}`}
      />
    </div>
  )
}