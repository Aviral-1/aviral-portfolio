import mongoose, { Schema, Document, Model } from "mongoose";

export interface IReview extends Document {
  name: string;
  role?: string;
  email?: string;
  linkedin?: string;
  content: string;
  image?: string;
  createdAt: Date;
}

const ReviewSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    linkedin: { type: String, trim: true },
    content: { type: String, required: true },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

// Optimize for chronological fetches
ReviewSchema.index({ createdAt: -1 });

const Review: Model<IReview> =
  mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);

export default Review;
