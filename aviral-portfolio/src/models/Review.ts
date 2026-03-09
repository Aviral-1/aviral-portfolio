import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        role: { type: String },
        org: { type: String },
        email: { type: String },
        linkedin: { type: String },
        content: { type: String, required: true },
        image: { type: String },
        avatar: { type: String },
    },
    { timestamps: true }
);

export default mongoose.models.Review || mongoose.model("Review", ReviewSchema);
