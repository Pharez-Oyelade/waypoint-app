import mongoose, { Schema } from "mongoose";

const DaySchema = new Schema(
  {
    tripId: { type: Schema.Types.ObjectId, ref: "Trip", required: true },
    date: { type: Date, required: true },
    dayNumber: { type: Number, required: true },
    title: String,
    notes: String,
    weather: {
      icon: String,
      tempMin: Number,
      tempMax: Number,
      description: String,
      precipitation: Number,
      fetchedAt: Date,
    },
    activities: [{ type: Schema.Types.ObjectId, ref: "Activity" }],
  },
  { timestamps: true },
);

export default mongoose.model("Day", DaySchema);
