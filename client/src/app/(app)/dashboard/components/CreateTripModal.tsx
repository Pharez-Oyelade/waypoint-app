"use client";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// import { Loader } from "@googlemaps/js-api-loader";
// import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
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
import { useCreateTrip } from "@/hooks/useTrips";
import { useRouter } from "next/navigation";
// import { Library } from "lucide-react";

// const google = (window as any).google;

const schema = z
  .object({
    title: z.string().min(1, "Trip name is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    tripType: z.enum(["solo", "couple", "group", "family"]),
  })
  .refine((d) => new Date(d.endDate) > new Date(d.startDate), {
    message: "End date must ne after start date",
    path: ["endDate"],
  });

export function CreateTripModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const autocompleteRef = useRef<HTMLInputElement>(null);
  const [destination, setDestination] = useState<any>(null);
  const createTrip = useCreateTrip();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { tripType: "solo" },
  });

  // Load google places autocomplete
  // useEffect(() => {
  //   if (!open) return;

  //   const timer = setTimeout(() => {
  //     if (!autocompleteRef.current) return;

  //     setOptions({
  //       key: process.env.NEXT_PUBLIC_GOOGLE_PLACES_KEY!,
  //     });

  //     importLibrary("places").then((places) => {
  //       const { Autocomplete } = places as any;

  //       if (!autocompleteRef.current) return;

  //       const autocomplete = new Autocomplete(autocompleteRef.current, {
  //         types: ["(cities)"],
  //       });

  //       autocomplete.addListener("place_changed", () => {
  //         const place = autocomplete.getPlace();
  //         setDestination({
  //           name: place.formatted_address || place.name,
  //           placeId: place.place_id,
  //           coordinates: {
  //             lat: place.geometry?.location?.lat?.() ?? null,
  //             lng: place.geometry?.location?.lng?.() ?? null,
  //           },
  //           country: place.address_components?.find((c) =>
  //             c.types.includes("country"),
  //           )?.long_name,
  //           city: place.address_components?.find((c) =>
  //             c.types.includes("locality"),
  //           )?.long_name,
  //         });
  //       });
  //     });
  //   }, 100);

  //   return () => clearTimeout(timer);
  // }, [open]);

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
    setDestination({
      name: item.display_name,
      placeId: item.place_id,
      coordinates: {
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lon),
      },
      country: item.address?.country,
      city: item.address?.city || item.address?.town || item.address?.village,
    });
    setQuery(item.display_name);
    setSuggestions([]);
  };

  const onSubmit = async (data: any) => {
    if (!destination) {
      toast.error("Please select a destination");
      return;
    }

    try {
      const trip = await createTrip.mutateAsync({ ...data, destination });
      toast.success("Trip created!");
      reset();
      onClose();
      router.push(`/trips/${trip._id}`);
    } catch {
      toast.error("Failed to create trip");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create a new trip</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
          <div className="space-y-1">
            <Label>Trip name</Label>
            <Input {...register("title")} placeholder="e.g Tokyo Adventure" />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* <div className="space-y-1">
            <Label>Destination</Label>
            <Input
              ref={autocompleteRef}
              placeholder="Search citites..."
            ></Input>
          </div> */}

          <div className="space-y-1 relative">
            <Label>Destination</Label>
            <Input
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search cities..."
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

          {/* Dates */}
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

          {/* Trip type */}
          <div className="space-y-1">
            <Label>Trip type</Label>
            <select
              {...register("tripType")}
              className="w-full rounded-md border px-3 py-2 text-sm"
            >
              <option value="solo">Solo</option>
              <option value="couple">Couple</option>
              <option value="group">Group</option>
              <option value="family">Family</option>
            </select>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={createTrip.isPending}
          >
            {createTrip.isPending ? "Creating..." : "Create trip"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
