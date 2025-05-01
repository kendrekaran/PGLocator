"use client"

import { useEffect, useRef } from "react"

interface GoogleMapComponentProps {
  lat: number
  lng: number
  title: string
}

export default function GoogleMapComponent({ lat, lng, title }: GoogleMapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load Google Maps API script dynamically
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDRWEVKhv0F-ayLMgkv8_ycjvgSDliR95w&callback=initMap`
      script.async = true
      script.defer = true
      document.head.appendChild(script)

      // Define the global initMap function that Google Maps will call
      window.initMap = initMap
    }

    // Initialize the map
    const initMap = () => {
      if (!mapRef.current) return

      const mapOptions = {
        center: { lat, lng },
        zoom: 15,
        mapTypeControl: false,
      }

      const map = new window.google.maps.Map(mapRef.current, mapOptions)

      // Add a marker for the PG location
      const marker = new window.google.maps.Marker({
        position: { lat, lng },
        map,
        title,
        animation: window.google.maps.Animation.DROP,
      })

      // Add an info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `<div><strong>${title}</strong><br>${lat.toFixed(6)}, ${lng.toFixed(6)}</div>`,
      })

      marker.addListener("click", () => {
        infoWindow.open(map, marker)
      })
    }

    // Check if Google Maps API is already loaded
    if (window.google && window.google.maps) {
      initMap()
    } else {
      // If not loaded, add the script
      window.initMap = initMap
      loadGoogleMapsScript()
    }

    // Cleanup
    return () => {
      // Remove the global initMap function
     

      // Remove the script if it was added by this component
      const script = document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]')
      if (script && script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [lat, lng, title])

  return (
    <div ref={mapRef} className="w-full h-full rounded-lg" style={{ minHeight: "300px" }}>
      <div className="flex items-center justify-center h-full bg-muted">
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    </div>
  )
}

// Add this to make TypeScript happy with the global initMap function
declare global {
  interface Window {
    initMap: () => void
    google?: any
  }
}
