import { Router } from "express";
import { protect } from "../middleware/auth";
import { requireTripAccess } from "../middleware/tripAccess";
import {
  addActivity,
  deleteActivity,
  moveActivity,
  reorderActivities,
  updateActivity,
} from "../controllers/activity.controller";

const activityRouter = Router({ mergeParams: true });

// All activity routes require authentication
activityRouter.use(protect);

// Routes that operate within a specific trip — requireTripAccess verifies membership
activityRouter.post(
  "/trips/:tripId/days/:dayId/activities",
  requireTripAccess,
  addActivity,
);
activityRouter.patch(
  "/trips/:tripId/days/:dayId/reorder",
  requireTripAccess,
  reorderActivities,
);
activityRouter.patch(
  "/trips/:tripId/activities/move",
  requireTripAccess,
  moveActivity,
);

// Direct operations by activity id — tripId is required in the URL for auth
activityRouter.patch(
  "/trips/:tripId/activities/:id",
  requireTripAccess,
  updateActivity,
);
activityRouter.delete(
  "/trips/:tripId/activities/:id",
  requireTripAccess,
  deleteActivity,
);

export default activityRouter;
