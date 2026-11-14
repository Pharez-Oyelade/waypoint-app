import { Response, Request } from "express";
import { differenceInCalendarDays, addDays, startOfDay } from "date-fns";
import Trip from "../models/tripModel";
import Day from "../models/dayModel";
import { asyncHandler } from "../utils/asyncHandler";
import { AppError } from "../utils/AppError";

// Allowed fields for create/update — prevents mass assignment attacks
const ALLOWED_CREATE_FIELDS = [
  "title",
  "destination",
  "coverImage",
  "startDate",
  "endDate",
  "tripType",
  "tags",
  "budget",
] as const;

const ALLOWED_UPDATE_FIELDS = [
  "title",
  "destination",
  "coverImage",
  "startDate",
  "endDate",
  "tripType",
  "tags",
  "budget",
  "status",
] as const;

function pick<T extends object>(obj: T, keys: readonly string[]): Partial<T> {
  return keys.reduce((acc, key) => {
    if (key in obj) acc[key as keyof T] = obj[key as keyof T];
    return acc;
  }, {} as Partial<T>);
}

// create day documents for every day in the trip
async function createTripDays(tripId: string, startDate: Date, endDate: Date) {
  if (endDate <= startDate) {
    throw new AppError("End date must be after start date", 400);
  }
  const dayCount = differenceInCalendarDays(endDate, startDate) + 1;
  const days = Array.from({ length: dayCount }, (_, i) => ({
    tripId,
    date: startOfDay(addDays(startDate, i)),
    dayNumber: i + 1,
  }));
  await Day.insertMany(days);
}

// fetch all trips
export const getTrips = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!._id;
  const trips = await Trip.find({
    $or: [{ owner: userId }, { "members.userId": userId }],
  })
    .sort({ startDate: 1 })
    .populate("owner", "name avatar");

  res.json({ success: true, trips });
});

// create trip
export const createTrip = asyncHandler(async (req: Request, res: Response) => {
  const safeBody = pick(req.body, ALLOWED_CREATE_FIELDS);
  const trip = await Trip.create({
    ...safeBody,
    owner: req.user!._id,
    members: [{ userId: req.user!._id, role: "owner", status: "active" }],
  });

  await createTripDays(
    trip.id,
    new Date(req.body.startDate),
    new Date(req.body.endDate),
  );

  res.status(201).json({ success: true, trip });
});

// get trip by ID
export const getTripById = asyncHandler(async (req: Request, res: Response) => {
  const trip = await Trip.findById(req.params.id)
    .populate("owner", "name avatar email")
    .populate("members.userId", "name avatar email");

  if (!trip) throw new AppError("Trip not found", 404);

  // check if user has access
  const isMember =
    trip.owner.equals(req.user!._id) ||
    trip.members.some(
      (m: any) =>
        m.userId._id.equals(req.user!._id) && m.status === "active",
    );

  if (!isMember) throw new AppError("Access denied", 403);

  // Fetch days with populated activities
  const days = await Day.find({ tripId: trip._id })
    .sort({ dayNumber: 1 })
    .populate({
      path: "activities",
      model: "Activity",
      options: { sort: { order: 1 } },
    });

  res.json({ success: true, trip, days });
});

// updateTrip
export const updateTrip = asyncHandler(async (req: Request, res: Response) => {
  const trip = await Trip.findById(req.params.id);
  if (!trip) throw new AppError("Trip not found", 404);
  if (!trip.owner.equals(req.user!._id))
    throw new AppError("Only the owner can edit trip", 403);

  const safeBody = pick(req.body, ALLOWED_UPDATE_FIELDS);
  Object.assign(trip, safeBody);
  await trip.save();
  res.json({ success: true, trip });
});

// delete Trip
export const deleteTrip = asyncHandler(async (req: Request, res: Response) => {
  const trip = await Trip.findById(req.params.id);
  if (!trip) throw new AppError("Trip not found", 404);
  if (!trip.owner.equals(req.user!._id))
    throw new AppError("Only the owner can delete trip", 403);

  trip.isDeleted = true;
  trip.deletedAt = new Date();
  await trip.save();

  res.json({ success: true, message: "Trip deleted" });
});

// Duplicate trip
export const duplicateTrip = asyncHandler(
  async (req: Request, res: Response) => {
    const source = await Trip.findById(req.params.id);
    if (!source) throw new AppError("Trip not found", 404);

    // Verify the requesting user has access to the source trip
    const hasAccess =
      source.owner.equals(req.user!._id) ||
      source.members.some(
        (m: any) =>
          m.userId.equals(req.user!._id) && m.status === "active",
      );
    if (!hasAccess) throw new AppError("Access denied", 403);

    const { startDate, endDate } = req.body;
    if (!startDate || !endDate) {
      throw new AppError("startDate and endDate are required", 400);
    }

    const newTrip = await Trip.create({
      title: `${source.title} (copy)`,
      destination: source.destination,
      tripType: source.tripType,
      budget: source.budget,
      tags: source.tags,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      owner: req.user!._id,
      members: [{ userId: req.user!._id, role: "owner", status: "active" }],
    });

    await createTripDays(newTrip.id, new Date(startDate), new Date(endDate));
    res.status(201).json({ success: true, trip: newTrip });
  },
);
