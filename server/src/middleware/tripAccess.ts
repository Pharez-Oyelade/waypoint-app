import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import Trip from "../models/tripModel";

/**
 * Middleware that checks the requesting user is a member of the trip
 * identified by `req.params.tripId`. Attaches the trip to `req.trip`
 * so downstream controllers don't need to re-fetch it.
 */
export const requireTripAccess = async (
  req: Request & { trip?: InstanceType<typeof Trip> },
  res: Response,
  next: NextFunction,
) => {
  try {
    const { tripId } = req.params;
    if (!tripId) return next(new AppError("tripId param is required", 400));

    const trip = await Trip.findById(tripId);
    if (!trip) return next(new AppError("Trip not found", 404));

    const userId = req.user!._id;
    const isMember =
      trip.owner.equals(userId) ||
      trip.members.some(
        (m: any) =>
          m.userId.equals(userId) && m.status === "active",
      );

    if (!isMember) return next(new AppError("Access denied", 403));

    // Attach trip for optional downstream use
    (req as Request & { trip: InstanceType<typeof Trip> }).trip = trip;
    next();
  } catch (err) {
    next(err);
  }
};
