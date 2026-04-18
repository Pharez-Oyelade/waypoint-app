"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAddActivity } from "@/hooks/useActivity";

const schema = z
  .object({
    name: z.string().min(1, "Activity name is required"),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "end time is required"),
    category: z.enum([
      "accommodation",
      "food",
      "transport",
      "activity",
      "sightseeing",
      "shopping",
      "others",
    ]),
    estimatedCost: z.number().optional(),
    notes: z.string().optional(),
  })
  .refine(
    (data) => {
      const toMinutes = (time: string) => {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
      };

      return toMinutes(data.endTime) > toMinutes(data.startTime);
    },
    {
      message: "End time must be after start time",
      path: ["endTime"], // attaches error to endTime field
    },
  );

interface Props {
  open: boolean;
  onClose: () => void;
  dayId: string;
  tripId: string;
}

export function AddActivityDrawer({ open, onClose, dayId, tripId }: Props) {
  const [location, setLocation] = useState<any>(null);
  const addActivity = useAddActivity(tripId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { category: "activity" },
  });

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const debounceRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleSearch = (value: string) => {
    setQuery(value);
    clearTimeout(debounceRef.current);

    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(value)}&format=json&addressdetails=1&limit=5&featuretype=city`,
      );
      const data = await res.json();
      setSuggestions(data);
    }, 400);
  };

  const handleSelect = (item: any) => {
    setLocation({
      name: item.display_name,
      placeId: item.place_id,
      coordinates: {
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lon),
      },
      address: item.address,
    });
    setQuery(item.display_name);
    setSuggestions([]);
  };

  const onSubmit = async (data: any) => {
    if (!location) {
      toast.error("Please select a location");
      return;
    }

    try {
      const activity = await addActivity.mutateAsync({
        dayId,
        ...data,
        location,
      });
      toast.success("Activity Added!");
      reset();
      onClose();
    } catch {
      toast.error("Failed to create trip");
    }
  };

  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="sm:max-w-md">
        <DrawerHeader>
          <DrawerTitle>Create a new activity</DrawerTitle>
        </DrawerHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
          <div className="space-y-1">
            <Label>Activity name</Label>
            <Input {...register("name")} placeholder="e.g Shooping Spree" />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1 relative">
            <Label>Location</Label>
            <Input
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search location..."
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-50 w-full bg-white border rounded-md shadow mt-1 max-h-48 overflow-y-auto">
                {suggestions.map((item) => (
                  <li
                    key={item.place_id}
                    onClick={() => handleSelect(item)}
                    className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
                  >
                    {item.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Time */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label>Start Time</Label>
              <Input type="time" {...register("startTime")} />
              {errors.startTime && (
                <p className="text-sm text-red-500">
                  {errors.startTime.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label>End Time</Label>
              <Input type="time" {...register("endTime")} />
              {errors.endTime && (
                <p className="text-sm text-red-500">{errors.endTime.message}</p>
              )}
            </div>
          </div>

          {/* Category */}
          <div className="space-y-1">
            <Label>Category</Label>
            <select
              {...register("category")}
              className="w-full rounded-md border px-3 py-2 text-sm"
            >
              <option value="accommodation">Accommodation</option>
              <option value="food">Food</option>
              <option value="transport">Transport</option>
              <option value="activity">Activity</option>
              <option value="sightseeing">Sightseeing</option>
              <option value="shopping">Shopping</option>
              <option value="others">Others</option>
            </select>
          </div>

          <div className="space-y-1">
            <Label>Estimated Cost</Label>
            <Input
              {...register("estimatedCost", { valueAsNumber: true })}
              placeholder="Estimated cost"
            />
            {errors.estimatedCost && (
              <p className="text-sm text-red-500">
                {errors.estimatedCost.message}
              </p>
            )}
          </div>

          {/* notes */}
          <div className="space-y-1">
            <Label>Notes(optional)</Label>
            <Textarea {...register("notes")} />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={addActivity.isPending}
          >
            {addActivity.isPending ? "Creating..." : "Create activity"}
          </Button>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
