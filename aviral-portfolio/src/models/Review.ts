import mongoose, { Document, Schema } from "mongoose";

export interface IReview extends Document {
  name: string;
  profileImage?: string;
  linkedinProfile?: string;
  email?: string;
  jobTitle?: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    profileImage: {
      type: String,
      default: null,
      maxlength: [2_000_000, "Image data too large"], // ~1.5MB base64 limit
    },
    linkedinProfile: {
      type: String,
      trim: true,
      maxlength: [300, "LinkedIn URL too long"],
      match: [
        /^(https?:\/\/)?(www\.)?linkedin\.com\/.+/,
        "Must be a valid LinkedIn URL",
      ],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: [200, "Email too long"],
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Must be a valid email"],
    },
    jobTitle: {
      type: String,
      trim: true,
      maxlength: [150, "Job title cannot exceed 150 characters"],
    },
    message: {
      type: String,
      required: [true, "Review message is required"],
      trim: true,
      minlength: [20, "Message must be at least 20 characters"],
      maxlength: [1000, "Message cannot exceed 1000 characters"],
    },
  },
  {
    timestamps: true, // Adds createdAt + updatedAt automatically
    toJSON: { virtuals: false },
    toObject: { virtuals: false },
  }
);

// Index for fast chronological fetches
ReviewSchema.index({ createdAt: -1 });

// Sparse index for deduplication checks (optional emails)
ReviewSchema.index({ email: 1 }, { sparse: true });

// Prevent OverwriteModelError in Next.js hot-reload / serverless environments
export default mongoose.models.Review ||
  mongoose.model<IReview>("Review", ReviewSchema);
