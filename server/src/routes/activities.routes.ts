import { Router } from "express";
import { protect } from "@/middleware/auth";
import {
  addActivity,
  deleteActivity,
  moveActivity,
  reorderActivities,
  updateActivity,
} from "@/controllers/activity.controller";

const activityRouter = Router();
activityRouter.use(protect);

// creation and reorder under trips
activityRouter.post("/trips/:tripId/days/:dayId/activities", addActivity);
activityRouter.patch("/trips/:tripId/days/:dayId/reorder", reorderActivities);
activityRouter.patch("/move", moveActivity);

// direct operations by id
activityRouter.patch("/:id", updateActivity);
activityRouter.delete("/:id", deleteActivity);

export default activityRouter;
