"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TripCard } from "./components/TripCard";
// create tripModal
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
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Trips</h1>
          <p className="text-gray-500 mt-1">
            {trips.length} trip{trips.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Button onClick={() => setCreateOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" /> New Trip
        </Button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {STATUS_FILTERS.map((sf) => (
          <button
            key={sf}
            onClick={() => setFilter(sf)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${filter === sf ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:text-gray-800"}`}
          >
            {sf.charAt(0).toUpperCase() + sf.slice(1)}
          </button>
        ))}
      </div>

      {/* Trips grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-64 rounded-2xl bg-gray-100 animate-pulse"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-lg font-medium">No trips yet</p>
          <p className="text-sm mt-1">Create your first trip to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((trip) => (
            <TripCard key={trip._id} trip={trip} />
          ))}
        </div>
      )}

      {/* create trip modal */}
      <CreateTripModal open={createOpen} onClose={() => setCreateOpen(false)} />
    </div>
  );
}
