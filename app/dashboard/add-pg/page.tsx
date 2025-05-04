"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/toast-provider"

export default function AddPgPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { showToast } = useToast()
  
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    price: "",
    gender: "",
    roomType: "",
    address: "",
    city: "",
    folder: "PGRooms",
    amenities: {
      wifi: false,
      food: false,
      ac: false,
      attachedBathroom: false,
      tv: false,
      parking: false,
      laundry: false
    }
  })
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleAmenityChange = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [amenity]: !prev.amenities[amenity as keyof typeof prev.amenities]
      }
    }))
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Convert amenities to array
      const amenitiesArray = Object.entries(formData.amenities)
        .filter(([_, isSelected]) => isSelected)
        .map(([amenity]) => {
          // Convert camelCase to readable format
          switch(amenity) {
            case 'wifi': return 'WiFi';
            case 'attachedBathroom': return 'Attached Bathroom';
            default: return amenity.charAt(0).toUpperCase() + amenity.slice(1);
          }
        });
      
      // Prepare the data
      const pgData = {
        ...formData,
        price: parseInt(formData.price),
        amenities: amenitiesArray
      };
      
      console.log('Submitting PG data:', pgData);
      
      const response = await fetch('/api/admin/add-pg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pgData)
      });
      
      // Get response data as text first for debugging
      const responseText = await response.text();
      console.log('API response:', response.status, responseText);
      
      let data;
      try {
        // Try to parse response as JSON
        data = JSON.parse(responseText);
      } catch (error) {
        console.error('Error parsing response:', error);
        throw new Error('Server returned invalid JSON response');
      }
      
      if (!response.ok) {
        throw new Error(data.error || data.message || `Error ${response.status}: Failed to add PG listing`);
      }
      
      showToast('PG listing added successfully!', 'success');
      router.push('/explore');
    } catch (error) {
      console.error('Error adding PG listing:', error);
      showToast(error instanceof Error ? error.message : 'Failed to add PG listing', 'error');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container max-w-3xl py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Add Your PG Listing</CardTitle>
          <CardDescription>
            Fill in the details below to list your PG on our platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">PG Name*</Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g. Krishnam PG"
                required
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location*</Label>
              <Input
                id="location"
                name="location"
                placeholder="e.g. Vidyanagar, Hubli"
                required
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description*</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your PG, including facilities, rules, and other important information"
                rows={5}
                required
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price per month (₹)*</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="e.g. 5000"
                  min="1000"
                  required
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gender">Gender*</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => handleSelectChange('gender', value)}
                  required
                >
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Unisex">Unisex</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="roomType">Room Type*</Label>
                <Select
                  value={formData.roomType}
                  onValueChange={(value) => handleSelectChange('roomType', value)}
                  required
                >
                  <SelectTrigger id="roomType">
                    <SelectValue placeholder="Select Room Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Single">Single</SelectItem>
                    <SelectItem value="Double">Double</SelectItem>
                    <SelectItem value="Triple">Triple</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="city">City*</Label>
                <Select
                  value={formData.city}
                  onValueChange={(value) => handleSelectChange('city', value)}
                  required
                >
                  <SelectTrigger id="city">
                    <SelectValue placeholder="Select City" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hubli">Hubli</SelectItem>
                    <SelectItem value="dharwad">Dharwad</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Complete Address*</Label>
              <Textarea
                id="address"
                name="address"
                placeholder="Full address including landmarks"
                required
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="folder">Folder Name</Label>
              <Input
                id="folder"
                name="folder"
                placeholder="Folder name to organize PG data (default: PGRooms)"
                value={formData.folder}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-3">
              <Label>Amenities</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="wifi" 
                    checked={formData.amenities.wifi}
                    onCheckedChange={() => handleAmenityChange('wifi')}
                  />
                  <Label htmlFor="wifi" className="font-normal">WiFi</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="food" 
                    checked={formData.amenities.food}
                    onCheckedChange={() => handleAmenityChange('food')}
                  />
                  <Label htmlFor="food" className="font-normal">Food</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="ac" 
                    checked={formData.amenities.ac}
                    onCheckedChange={() => handleAmenityChange('ac')}
                  />
                  <Label htmlFor="ac" className="font-normal">AC</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="attachedBathroom" 
                    checked={formData.amenities.attachedBathroom}
                    onCheckedChange={() => handleAmenityChange('attachedBathroom')}
                  />
                  <Label htmlFor="attachedBathroom" className="font-normal">Attached Bathroom</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="tv" 
                    checked={formData.amenities.tv}
                    onCheckedChange={() => handleAmenityChange('tv')}
                  />
                  <Label htmlFor="tv" className="font-normal">TV</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="parking" 
                    checked={formData.amenities.parking}
                    onCheckedChange={() => handleAmenityChange('parking')}
                  />
                  <Label htmlFor="parking" className="font-normal">Parking</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="laundry" 
                    checked={formData.amenities.laundry}
                    onCheckedChange={() => handleAmenityChange('laundry')}
                  />
                  <Label htmlFor="laundry" className="font-normal">Laundry</Label>
                </div>
              </div>
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Adding PG..." : "Add PG Listing"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}