"use client";

import Link from "next/link";
import { format, differenceInDays } from "date-fns";
import { MapPin, Calendar, Users } from "lucide-react";
import { Trip } from "@/types";

const STATUS_COLORS: Record<string, string> = {
  planning: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  upcoming: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  ongoing: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  completed: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  archived: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
};

export function TripCard({ trip }: { trip: Trip }) {
  const nights = differenceInDays(
    new Date(trip.endDate),
    new Date(trip.startDate),
  );

  return (
    <Link
      href={`/trips/${trip._id}`}
      className="group block rounded-2xl border border-border bg-card text-card-foreground shadow-xs hover:shadow-md transition-all overflow-hidden"
    >
      {/* Cover Image */}
      <div className="relative h-44 bg-linear-to-br from-blue-600 to-indigo-700">
        {trip.coverImage ? (
          <img
            src={trip.coverImage}
            alt={trip.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/40 font-heading text-3xl font-bold tracking-wider">
            {trip.destination?.city || trip.destination?.name?.split(",")[0] || "WAYPOINT"}
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span
            className={`text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize ${STATUS_COLORS[trip.status] ?? STATUS_COLORS.planning}`}
          >
            {trip.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <h3 className="font-semibold text-base sm:text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {trip.title}
        </h3>

        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
          <span className="truncate">{trip.destination.name}</span>
        </div>

        <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground pt-1 border-t border-border/50">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-primary shrink-0" />
            <span>
              {format(new Date(trip.startDate), "MMM d")} –{" "}
              {format(new Date(trip.endDate), "MMM d")}
            </span>
          </div>
          <span className="font-semibold text-foreground">{nights}n</span>
        </div>

        <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-primary shrink-0" />
            <span>
              {trip.members?.length || 1}{" "}
              {(trip.members?.length || 1) === 1 ? "traveler" : "travelers"}
            </span>
          </div>
          {trip.budget?.total ? (
            <span className="text-xs font-semibold text-foreground">
              {trip.budget.currency} {trip.budget.total.toLocaleString()}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
