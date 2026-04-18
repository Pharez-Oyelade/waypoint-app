"use client";
import { useState } from "react";
import { format } from "date-fns";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { Plus } from "lucide-react";
import { ActivityCard } from "./ActivityCard";
// Add activity drawer
import { Day } from "@/types";
import { AddActivityDrawer } from "./AddActivityDrawer";

interface Props {
  day: Day;
  tripId: string;
  onDeleteActivity: (id: string) => void;
}

export function DayColumn({ day, tripId, onDeleteActivity }: Props) {
  const [addOpen, setAddOpen] = useState(false);
  const { setNodeRef } = useDroppable({ id: day._id });

  return (
    <div className="flex-shrink-0 w-72">
      {/* Day header */}
      <div className="mb-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
              Day {day.dayNumber}
            </p>
            <p className="font-semibold text-gray-900">
              {format(new Date(day.date), "EEEE MMM d")}
            </p>
          </div>
          {day.weather && (
            <div className="text-right">
              <p className="text-xs text-gray-500">{day.weather.description}</p>
              <p className="text-sm font-medium">
                {Math.round(day.weather.tempMin)}° -{" "}
                {Math.round(day.weather.tempMax)}°
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Activity drop zone */}
      <div ref={setNodeRef} className="space-y-2 min-h-[4rem]">
        <SortableContext
          items={day.activities.map((a) => a._id)}
          strategy={verticalListSortingStrategy}
        >
          {day.activities.map((activity) => (
            <ActivityCard
              key={activity._id}
              activity={activity}
              onDelete={onDeleteActivity}
            />
          ))}
        </SortableContext>
      </div>

      {/* Add activity button */}
      <button
        onClick={() => setAddOpen(true)}
        className="mt-2 w-full flex items-center gap-2 px-3 py-2 rounded-xl border-2 border-dashed border-gray-200 text-sm text-gray-400 hover:border-blue-300 hover:text-blue-500 transition"
      >
        <Plus className="h-4 w-4" /> Add activity
      </button>

      {/* Add activity drawer */}
      <AddActivityDrawer
        open={addOpen}
        onClose={() => setAddOpen(false)}
        dayId={day._id}
        tripId={tripId}
      />
    </div>
  );
}
