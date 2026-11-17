import { Router } from "express";
import { protect } from "../middleware/auth";
import { requireTripAccess } from "../middleware/tripAccess";
import { validate } from "../middleware/validate";
import {
  createActivitySchema,
  updateActivitySchema,
  reorderActivitiesSchema,
  moveActivitySchema,
} from "../schemas/activity.schema";
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
  validate(createActivitySchema),
  addActivity,
);
activityRouter.patch(
  "/trips/:tripId/days/:dayId/reorder",
  requireTripAccess,
  validate(reorderActivitiesSchema),
  reorderActivities,
);
activityRouter.patch(
  "/trips/:tripId/activities/move",
  requireTripAccess,
  validate(moveActivitySchema),
  moveActivity,
);

// Direct operations by activity id — tripId is required in the URL for auth
activityRouter.patch(
  "/trips/:tripId/activities/:id",
  requireTripAccess,
  validate(updateActivitySchema),
  updateActivity,
);
activityRouter.delete(
  "/trips/:tripId/activities/:id",
  requireTripAccess,
  deleteActivity,
);

export default activityRouter;
