import { Response } from "express";
import { AuthRequest } from "@/middleware/auth";
import { asyncHandler } from "@/utils/asyncHandler";
import { AppError } from "@/utils/AppError";
import Activity from "@/models/activityModel";
import Day from "@/models/dayModel";

// ADD ACTIVITY /:tripId/days/:dayId/activities
export const addActivity = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { dayId, tripId } = req.params;

    const day = await Day.findById(dayId);
    if (!day) throw new AppError("Day not found", 404);

    // order(append to end)
    const order = day.activities.length;

    const activity = await Activity.create({
      ...req.body,
      tripId,
      dayId,
      order,
    });

    // Add to days ordered activity list
    day.activities.push(activity._id as any);
    await day.save();

    res.status(201).json({ success: true, activity });
  },
);

//update Activity
export const updateActivity = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const activity = await Activity.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true },
    );
    if (!activity) throw new AppError("Activity not found", 404);
    res.json({ success: true, activity });
  },
);

// delete Activity
export const deleteActivity = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) throw new AppError("Activity not found", 404);

    // Remove from days ordered list
    await Day.findByIdAndUpdate(activity.dayId, {
      $pull: { activities: activity._id },
    });

    res.json({ success: true });
  },
);

// reorder activities
export const reorderActivities = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { dayId } = req.params;
    const { activityIds } = req.body;
    await Day.findByIdAndUpdate(dayId, { activities: activityIds });
    // Also update order field on each activity for fallback sorting
    await Promise.all(
      activityIds.map((id: string, index: number) =>
        Activity.findByIdAndUpdate(id, { order: index }),
      ),
    );
    res.json({ success: true });
  },
);

// move activity
export const moveActivity = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { activityId, fromDayId, toDayId, newOrder } = req.body;

    // Remove from source day
    await Day.findByIdAndUpdate(fromDayId, {
      $pull: { activities: activityId },
    });

    // update dayId to activity
    await Activity.findByIdAndUpdate(activityId, { dayId: toDayId });

    // set new ordered array on destination day
    await Day.findByIdAndUpdate(toDayId, { activities: newOrder });

    res.json({ success: true });
  },
);
