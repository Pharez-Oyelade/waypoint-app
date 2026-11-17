import { z } from "zod";

export const createActivitySchema = z.object({
  name: z.string().min(1, "Activity name is required").trim(),
  description: z.string().optional(),
  location: z
    .object({
      name: z.string().optional(),
      address: z.string().optional(),
      placeId: z.union([z.string(), z.number()]).optional(),
      coordinates: z.object({ lat: z.number(), lng: z.number() }).optional(),
    })
    .optional(),
  startTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Start time must be in HH:mm format"),
  endTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "End time must be in HH:mm format")
    .optional(),
  duration: z.number().nonnegative().optional(),
  category: z
    .enum([
      "accommodation",
      "food",
      "transport",
      "activity",
      "sightseeing",
      "shopping",
      "others",
    ])
    .default("activity"),
  estimatedCost: z.number().nonnegative().optional(),
  actualCost: z.number().nonnegative().optional(),
  currency: z.string().default("USD"),
  status: z
    .enum(["suggested", "approved", "confirmed", "cancelled"])
    .default("approved"),
  notes: z.string().optional(),
});

export const updateActivitySchema = createActivitySchema.partial();

export const reorderActivitiesSchema = z.object({
  activityIds: z.array(z.string()).min(0),
});

export const moveActivitySchema = z.object({
  activityId: z.string().min(1),
  fromDayId: z.string().min(1),
  toDayId: z.string().min(1),
  newOrder: z.array(z.string()),
});
