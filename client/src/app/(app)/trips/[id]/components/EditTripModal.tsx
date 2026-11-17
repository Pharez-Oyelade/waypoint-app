"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateTrip } from "@/hooks/useTrips";
import { Trip } from "@/types";

const schema = z
  .object({
    title: z.string().min(1, "Trip name is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    tripType: z.enum(["solo", "couple", "group", "family"]),
    status: z.enum(["planning", "upcoming", "ongoing", "completed", "archived"]),
    budgetTotal: z.number().optional(),
  })
  .refine((d) => new Date(d.endDate) > new Date(d.startDate), {
    message: "End date must be after start date",
    path: ["endDate"],
  });

type FormData = z.infer<typeof schema>;

interface Props {
  open: boolean;
  onClose: () => void;
  trip: Trip;
}

export function EditTripModal({ open, onClose, trip }: Props) {
  const updateTrip = useUpdateTrip(trip._id);
  const [destination, setDestination] = useState(trip.destination);
  const [query, setQuery] = useState(trip.destination?.name || "");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const debounceRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: trip.title,
      startDate: trip.startDate ? trip.startDate.split("T")[0] : "",
      endDate: trip.endDate ? trip.endDate.split("T")[0] : "",
      tripType: trip.tripType || "solo",
      status: trip.status || "planning",
      budgetTotal: trip.budget?.total,
    },
  });

  useEffect(() => {
    reset({
      title: trip.title,
      startDate: trip.startDate ? trip.startDate.split("T")[0] : "",
      endDate: trip.endDate ? trip.endDate.split("T")[0] : "",
      tripType: trip.tripType || "solo",
      status: trip.status || "planning",
      budgetTotal: trip.budget?.total,
    });
    setDestination(trip.destination);
    setQuery(trip.destination?.name || "");
  }, [trip, reset]);

  const handleSearch = (value: string) => {
    setQuery(value);
    clearTimeout(debounceRef.current);

    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(value)}&format=json&addressdetails=1&limit=5&featuretype=city`,
        );
        const data = await res.json();
        setSuggestions(data);
      } catch {
        setSuggestions([]);
      }
    }, 400);
  };

  const handleSelect = (item: any) => {
    setDestination({
      name: item.display_name,
      country: item.address?.country,
      city: item.address?.city || item.address?.town || item.address?.village,
      coordinates: {
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lon),
      },
    });
    setQuery(item.display_name);
    setSuggestions([]);
  };

  const onSubmit = async (data: FormData) => {
    try {
      await updateTrip.mutateAsync({
        title: data.title,
        startDate: data.startDate,
        endDate: data.endDate,
        tripType: data.tripType,
        status: data.status,
        destination,
        budget: {
          total: data.budgetTotal || 0,
          currency: trip.budget?.currency || "USD",
        },
      });
      toast.success("Trip updated!");
      onClose();
    } catch {
      toast.error("Failed to update trip");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit trip details</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
          <div className="space-y-1">
            <Label>Trip name</Label>
            <Input {...register("title")} placeholder="e.g. Tokyo Adventure" />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-1 relative">
            <Label>Destination</Label>
            <Input
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search cities..."
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-50 w-full bg-white dark:bg-slate-900 border rounded-md shadow-lg mt-1 max-h-48 overflow-y-auto">
                {suggestions.map((item) => (
                  <li
                    key={item.place_id}
                    onClick={() => handleSelect(item)}
                    className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800"
                  >
                    {item.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label>Start Date</Label>
              <Input type="date" {...register("startDate")} />
              {errors.startDate && (
                <p className="text-sm text-red-500">
                  {errors.startDate.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label>End Date</Label>
              <Input type="date" {...register("endDate")} />
              {errors.endDate && (
                <p className="text-sm text-red-500">{errors.endDate.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label>Trip type</Label>
              <select
                {...register("tripType")}
                className="w-full rounded-md border px-3 py-2 text-sm bg-background"
              >
                <option value="solo">Solo</option>
                <option value="couple">Couple</option>
                <option value="group">Group</option>
                <option value="family">Family</option>
              </select>
            </div>

            <div className="space-y-1">
              <Label>Status</Label>
              <select
                {...register("status")}
                className="w-full rounded-md border px-3 py-2 text-sm bg-background"
              >
                <option value="planning">Planning</option>
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <Label>Total Budget ({trip.budget?.currency || "USD"})</Label>
            <Input
              type="number"
              {...register("budgetTotal", { valueAsNumber: true })}
              placeholder="e.g. 2000"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={updateTrip.isPending}
          >
            {updateTrip.isPending ? "Saving..." : "Save changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
