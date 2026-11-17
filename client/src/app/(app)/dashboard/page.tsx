"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TripCard } from "./components/TripCard";
import { useTrips } from "@/hooks/useTrips";
import { CreateTripModal } from "./components/CreateTripModal";

const STATUS_FILTERS = [
  "all",
  "upcoming",
  "ongoing",
  "planning",
  "completed",
] as const;

export default function DashboardPage() {
  const { data: trips = [], isLoading } = useTrips();
  const [filter, setFilter] = useState<string>("all");
  const [createOpen, setCreateOpen] = useState(false);

  const filtered =
    filter === "all" ? trips : trips.filter((t) => t.status === filter);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-foreground">
            My Trips
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {trips.length} trip{trips.length !== 1 ? "s" : ""} planned so far
          </p>
        </div>
        <Button onClick={() => setCreateOpen(true)} className="gap-2 shrink-0">
          <Plus className="h-4 w-4" /> New Trip
        </Button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {STATUS_FILTERS.map((sf) => (
          <button
            key={sf}
            onClick={() => setFilter(sf)}
            className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition cursor-pointer ${
              filter === sf
                ? "bg-primary text-primary-foreground shadow-xs"
                : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
            }`}
          >
            {sf.charAt(0).toUpperCase() + sf.slice(1)}
          </button>
        ))}
      </div>

      {/* Trips grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-64 rounded-2xl bg-muted/60 animate-pulse border border-border"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground rounded-2xl border border-dashed border-border p-8">
          <p className="text-lg font-medium text-foreground">No trips yet</p>
          <p className="text-sm mt-1">Create your first trip to get started</p>
          <Button
            onClick={() => setCreateOpen(true)}
            variant="outline"
            className="mt-4 gap-2"
          >
            <Plus className="h-4 w-4" /> Create a trip
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((trip) => (
            <TripCard key={trip._id} trip={trip} />
          ))}
        </div>
      )}

      {/* Create trip modal */}
      <CreateTripModal open={createOpen} onClose={() => setCreateOpen(false)} />
    </div>
  );
}
