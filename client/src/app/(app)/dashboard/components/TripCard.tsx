"use client";

import Link from "next/link";
import { format, differenceInDays } from "date-fns";
import { MapPin, Calendar, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Trip } from "@/types";

const STATUS_COLORS: Record<string, string> = {
  planning: "bg-gray-100 text-gray-700",
  upcoming: "bg-blue-100 tex-blue-700",
  ongoing: "bg-green-100 text-green-700",
  completed: "bg-purple-100 text-prrple-700",
  archived: "bg-red-100 text-red-100",
};

export function TripCard({ trip }: { trip: Trip }) {
  const nights = differenceInDays(
    new Date(trip.endDate),
    new Date(trip.startDate),
  );

  return (
    <Link
      href={`/trips/${trip._id}`}
      className="group block rounded-2xl border bg-white shadow-sm hover:shadow-md transition-all overflow-hidden"
    >
      {/* Cover Image */}
      <div className="relative h-40 bg-linear-to-br from-blue-500 to-indigo-600">
        {trip.coverImage && (
          <img
            src={trip.coverImage}
            alt={trip.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute top-3 right-3">
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_COLORS}`}
          >
            {trip.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition">
          {trip.title}
        </h3>

        <div className="flex items-center gap-1.5 text-sm text-gray-500">
          <MapPin className="h-3.5 w-3.5" />
          <span>{trip.destination.name}</span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            <span>
              {format(new Date(trip.startDate), "MMM d")} -{" "}
              {format(new Date(trip.endDate), "MM d")}
            </span>
          </div>
          <span className="font-medium text-gray-700">{nights}n</span>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-gray-500">
          <Users className="h-3.5 w-3.5" />
          <span>
            {trip.members.length}{" "}
            {trip.members.length === 1 ? "traveler" : "travelers"}
          </span>
        </div>
      </div>
    </Link>
  );
}
