import { z } from "zod";

const baseTripSchema = z.object({
  title: z.string().min(1),
  destination: z.object({
    name: z.string().min(1),
    placeId: z.string().optional(),
    coordinates: z.object({ lat: z.number(), lng: z.number() }).optional(),
    country: z.string().optional(),
    city: z.string().optional(),
  }),
  coverImage: z.url().optional(),
  startDate: z.iso.datetime(),
  endDate: z.iso.datetime(),
  tripType: z.enum(["solo", "couple", "group", "family"]).default("solo"),
  tags: z.array(z.string()).optional(),
});

export const createTripSchema = baseTripSchema.refine(
  (d) => new Date(d.endDate) > new Date(d.startDate),
  {
    message: "End date must be after start date",
    path: ["endDate"],
  },
);

export const updateTripSchema = baseTripSchema.partial();
