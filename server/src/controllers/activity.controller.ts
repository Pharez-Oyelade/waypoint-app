import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { AppError } from "../utils/AppError";
import Activity from "../models/activityModel";
import Day from "../models/dayModel";
import { pick } from "../utils/pick";

// Allowed fields for create/update — prevents mass assignment attacks
const ALLOWED_ACTIVITY_FIELDS = [
  "name",
  "description",
  "location",
  "startTime",
  "endTime",
  "duration",
  "category",
  "estimatedCost",
  "actualCost",
  "currency",
  "status",
  "notes",
] as const;

// ADD ACTIVITY — requires requireTripAccess middleware on route
export const addActivity = asyncHandler(
  async (req: Request, res: Response) => {
    const tripId = req.params.tripId as string;
    const dayId = req.params.dayId as string;

    const day = await Day.findById(dayId);
    if (!day) throw new AppError("Day not found", 404);

    // Verify the day belongs to this trip
    if (!day.tripId.equals(tripId)) {
      throw new AppError("Day does not belong to this trip", 403);
    }

    const order = day.activities.length;
    const safeBody = pick(req.body, ALLOWED_ACTIVITY_FIELDS);

    const activity = await Activity.create({
      ...safeBody,
      tripId,
      dayId,
      suggestedBy: req.user!._id,
      order,
    });

    // Add to day's ordered activity list
    day.activities.push(activity._id as (typeof day.activities)[number]);
    await day.save();

    res.status(201).json({ success: true, activity });
  },
);

// UPDATE ACTIVITY — requires requireTripAccess middleware on route
export const updateActivity = asyncHandler(
  async (req: Request, res: Response) => {
    const safeBody = pick(req.body, ALLOWED_ACTIVITY_FIELDS);
    const activity = await Activity.findOneAndUpdate(
      { _id: req.params.id, tripId: req.params.tripId },
      { $set: safeBody },
      { new: true, runValidators: true },
    );
    if (!activity) throw new AppError("Activity not found", 404);
    res.json({ success: true, activity });
  },
);

// DELETE ACTIVITY — requires requireTripAccess middleware on route
export const deleteActivity = asyncHandler(
  async (req: Request, res: Response) => {
    const activity = await Activity.findOneAndDelete({
      _id: req.params.id,
      tripId: req.params.tripId,
    });
    if (!activity) throw new AppError("Activity not found", 404);

    // Remove from day's ordered list
    await Day.findByIdAndUpdate(activity.dayId, {
      $pull: { activities: activity._id },
    });

    res.json({ success: true });
  },
);

// REORDER ACTIVITIES — requires requireTripAccess middleware on route
export const reorderActivities = asyncHandler(
  async (req: Request, res: Response) => {
    const tripId = req.params.tripId as string;
    const dayId = req.params.dayId as string;
    const { activityIds } = req.body;

    if (!Array.isArray(activityIds)) {
      throw new AppError("activityIds must be an array", 400);
    }

    // Verify all activities belong to this trip before reordering
    const count = await Activity.countDocuments({
      _id: { $in: activityIds as string[] },
      tripId,
    });
    if (count !== activityIds.length) {
      throw new AppError(
        "One or more activities do not belong to this trip",
        403,
      );
    }

    await Day.findByIdAndUpdate(dayId, { activities: activityIds });
    
    // Bulk write to update order field efficiently
    if (activityIds.length > 0) {
      const bulkOps = (activityIds as string[]).map((id, index) => ({
        updateOne: {
          filter: { _id: id, tripId },
          update: { $set: { order: index } },
        },
      }));
      await Activity.bulkWrite(bulkOps);
    }

    res.json({ success: true });
  },
);

// MOVE ACTIVITY — requires requireTripAccess middleware on route
export const moveActivity = asyncHandler(
  async (req: Request, res: Response) => {
    const tripId = req.params.tripId as string;
    const { activityId, fromDayId, toDayId, newOrder } = req.body;

    if (!activityId || !fromDayId || !toDayId || newOrder == null || !Array.isArray(newOrder)) {
      throw new AppError(
        "activityId, fromDayId, toDayId, and newOrder array are required",
        400,
      );
    }

    // Verify the activity belongs to this trip
    const activity = await Activity.findOne({ _id: activityId, tripId });
    if (!activity) {
      throw new AppError("Activity not found or access denied", 404);
    }

    // Verify both days belong to this trip
    const [fromDay, toDay] = await Promise.all([
      Day.findOne({ _id: fromDayId, tripId }),
      Day.findOne({ _id: toDayId, tripId }),
    ]);
    if (!fromDay || !toDay) {
      throw new AppError("One or more days do not belong to this trip", 403);
    }

    // Remove from source day
    await Day.findByIdAndUpdate(fromDayId, {
      $pull: { activities: activityId },
    });

    // Update dayId on activity
    await Activity.findByIdAndUpdate(activityId, { dayId: toDayId });

    // Set new ordered array on destination day
    await Day.findByIdAndUpdate(toDayId, { activities: newOrder });

    // Update orders in destination day
    if (newOrder.length > 0) {
      const bulkOps = (newOrder as string[]).map((id, index) => ({
        updateOne: {
          filter: { _id: id, tripId },
          update: { $set: { order: index } },
        },
      }));
      await Activity.bulkWrite(bulkOps);
    }

    res.json({ success: true });
  },
);
