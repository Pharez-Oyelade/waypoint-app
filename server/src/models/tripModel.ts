import mongoose, { Schema, Document, Query } from "mongoose";

const MemberSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    role: {
      type: String,
      enum: ["owner", "editor", "viewer"],
      default: "viewer",
    },
    joinedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ["pending", "active"], default: "active" },
  },
  { _id: false },
);

const DestinationSchema = new Schema(
  {
    name: { type: String, required: true },
    placeId: { type: String },
    coordinates: { lat: Number, lng: Number },
    country: { type: String },
    city: { type: String },
  },
  { _id: false },
);

const TripSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    destination: { type: DestinationSchema, required: true },
    coverImage: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    tripType: {
      type: String,
      enum: ["solo", "couple", "group", "family"],
      default: "solo",
    },
    status: {
      type: String,
      enum: ["planning", "upcoming", "ongoing", "completed", "archived"],
      default: "planning",
    },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    members: [MemberSchema],
    budget: {
      total: { type: Number, default: 0 },
      currency: { type: String, default: "USD" },
      categories: { type: Map, of: Number },
    },
    tags: [{ type: String }],
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  { timestamps: true },
);

// Exclude deleted trips from queries
// TripSchema.pre(/^find/, function (this: any, next) {
//   this.where({ isDeleted: { $ne: true } });
//   next();
// });

TripSchema.pre(/^find/, function (this: any) {
  this.where({ isDeleted: { $ne: true } });
});

export default mongoose.model("Trip", TripSchema);
