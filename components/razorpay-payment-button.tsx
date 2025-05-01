"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/toast-provider"

interface RazorpayPaymentButtonProps {
  amount: number
  roomType: string
  pgName: string
  className?: string
}

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function RazorpayPaymentButton({ amount, roomType, pgName, className }: RazorpayPaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { showToast } = useToast()

  const handlePayment = () => {
    setIsLoading(true)

    // In a real implementation, you would make an API call to your backend
    // to create an order and get the order_id from Razorpay
    const createOrder = async () => {
      try {
        // Simulating API call for demo purposes
        // In production, this would be a fetch call to your backend
        return {
          id: "order_" + Math.random().toString(36).substring(2, 15),
          amount: amount * 100, // Razorpay expects amount in paise
        }
      } catch (error) {
        console.error("Error creating order:", error)
        showToast("Failed to create payment order", "error")
        setIsLoading(false)
        return null
      }
    }

    // Load Razorpay script dynamically
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        const script = document.createElement("script")
        script.src = "https://checkout.razorpay.com/v1/checkout.js"
        script.onload = () => {
          resolve(true)
        }
        script.onerror = () => {
          resolve(false)
        }
        document.body.appendChild(script)
      })
    }

    const displayRazorpay = async () => {
      const res = await loadRazorpayScript()

      if (!res) {
        showToast("Razorpay SDK failed to load", "error")
        setIsLoading(false)
        return
      }

      const orderData = await createOrder()
      if (!orderData) return

      const options = {
        key: "rzp_test_YOUR_KEY_ID", // Replace with your actual Razorpay key
        amount: orderData.amount,
        currency: "INR",
        name: "PG Locator",
        description: `Booking for ${roomType} room at ${pgName}`,
        order_id: orderData.id,
        handler: (response: any) => {
          // Handle successful payment
          showToast("Payment successful! Booking confirmed.", "success")
          // In a real app, you would verify the payment on your server
          // and then create the booking record
        },
        prefill: {
          name: "User Name", // Would come from auth context in real app
          email: "user@example.com",
          contact: "9876543210",
        },
        notes: {
          pgName: pgName,
          roomType: roomType,
        },
        theme: {
          color: "#3B82F6",
        },
      }

      const paymentObject = new window.Razorpay(options)
      paymentObject.open()
      setIsLoading(false)
    }

    displayRazorpay()
  }

  return (
    <Button onClick={handlePayment} disabled={isLoading} className={className}>
      {isLoading ? "Processing..." : "Book Now"}
    </Button>
  )
}
