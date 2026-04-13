import { Router } from "express";
import { protect } from "@/middleware/auth";
import { validate } from "@/middleware/validate";
import { createTripSchema, updateTripSchema } from "@/schemas/trip.schema";
import {
  createTrip,
  deleteTrip,
  duplicateTrip,
  getTripById,
  getTrips,
  updateTrip,
} from "@/controllers/trip.controller";

const tripRouter = Router();

tripRouter.use(protect); //all trip routes require auth

tripRouter
  .route("/")
  .get(getTrips)
  .post(validate(createTripSchema), createTrip);

tripRouter
  .route("/:id")
  .get(getTripById)
  .patch(validate(updateTripSchema), updateTrip)
  .delete(deleteTrip);

tripRouter.post(":/id/duplicate", duplicateTrip);
