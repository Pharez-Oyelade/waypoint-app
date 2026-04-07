import mongoose, { Schema } from "mongoose";

const ConflictSchema = new Schema(
  {
    type: String,
    message: String,
    severity: { type: String, enum: ["info", "warning", "error"] },
  },
  { _id: false },
);

const ActivitySchema = new Schema(
  {
    tripId: { type: Schema.Types.ObjectId, ref: "Trip", requiredf: true },
    dayId: { type: Schema.Types.ObjectId, ref: "Day", required: true },
    name: { type: String, required: true, trim: true },
    description: String,
    location: {
      name: String,
      address: String,
      placeId: String,
      coordinated: { lat: Number, lng: Number },
    },
    startTime: String, //"HH:mm"
    endTime: String,
    duration: Number, //minutes
    category: {
      type: String,
      enum: [
        "accommodation",
        "food",
        "transport",
        "activity",
        "sightseeing",
        "shopping",
        "others",
      ],
      default: "activity",
    },
    estimatedCost: Number,
    actualCost: Number,
    currency: { type: String, default: "USD" },
    status: {
      type: String,
      enum: ["suggested", "approved", "confirmed", "cancelled"],
      default: "approved",
    },
    suggestedBy: { type: Schema.Types.ObjectId, ref: "User" },
    votes: [
      { userId: { type: Schema.Types.ObjectId, ref: "User" }, vote: String },
    ],
    comments: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        text: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    notes: String,
    aiGenerated: { type: Boolean, default: false },
    conflicts: [ConflictSchema],
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.model("Activity", ActivitySchema);
