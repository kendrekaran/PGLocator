import mongoose, { Schema, models, Document, Model } from 'mongoose';

export interface IPgListing extends Document {
  title: string;
  location: string;
  description: string;
  price: number;
  amenities: string[];
  images: string[];
  gender: 'Male' | 'Female' | 'Unisex';
  roomType: 'Single' | 'Double' | 'Triple';
  address: string;
  city: string;
  ownerId: mongoose.Schema.Types.ObjectId;
  ownerName: string;
  ownerContact: string;
  folder: string;
  rating: number;
  reviews: Array<{
    userId: mongoose.Schema.Types.ObjectId;
    userName: string;
    rating: number;
    comment: string;
    createdAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const pgListingSchema = new Schema<IPgListing>(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    amenities: { type: [String], default: [] },
    images: { type: [String], default: ['/placeholder-hostel.jpg'] },
    gender: { type: String, enum: ['Male', 'Female', 'Unisex'], required: true },
    roomType: { type: String, enum: ['Single', 'Double', 'Triple'], required: true },
    address: { type: String, required: true },
    city: { type: String, required: true, lowercase: true },
    ownerId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    ownerName: { type: String, required: true },
    ownerContact: { type: String, required: true },
    folder: { type: String, default: 'PGRooms' },
    rating: { type: Number, default: 0 },
    reviews: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        userName: { type: String, required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

// Create a compound index for searching
pgListingSchema.index({ title: 'text', location: 'text', description: 'text' });

// Create model if it doesn't exist already
const PgListing = models.PgListing || mongoose.model<IPgListing>('PgListing', pgListingSchema);

export default PgListing as Model<IPgListing>; 