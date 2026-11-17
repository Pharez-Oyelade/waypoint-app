import { z } from "zod";

const baseTripSchema = z.object({
  title: z.string().min(1, "Title is required"),
  destination: z.object({
    name: z.string().min(1, "Destination name is required"),
    placeId: z.union([z.string(), z.number()]).optional(),
    coordinates: z.object({ lat: z.number(), lng: z.number() }).optional(),
    country: z.string().optional(),
    city: z.string().optional(),
  }),
  coverImage: z.string().url().optional(),
  startDate: z.string().datetime().or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
  endDate: z.string().datetime().or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
  tripType: z.enum(["solo", "couple", "group", "family"]).default("solo"),
  tags: z.array(z.string()).optional(),
  budget: z
    .object({
      total: z.number().optional(),
      currency: z.string().default("USD"),
    })
    .optional(),
});

export const createTripSchema = baseTripSchema.refine(
  (d) => new Date(d.endDate) > new Date(d.startDate),
  {
    message: "End date must be after start date",
    path: ["endDate"],
  },
);

export const updateTripSchema = baseTripSchema.partial().refine(
  (d) => {
    if (d.startDate && d.endDate) {
      return new Date(d.endDate) > new Date(d.startDate);
    }
    return true;
  },
  {
    message: "End date must be after start date",
    path: ["endDate"],
  },
);
