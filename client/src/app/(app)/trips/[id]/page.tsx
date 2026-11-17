"use client";

import { use, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useTrip } from "@/hooks/useTrips";
import {
  useDeleteActivity,
  useMoveActivity,
  useReorderActivities,
} from "@/hooks/useActivity";
import { TripHeader } from "./components/TripHeader";
import { DayColumn } from "../../dashboard/components/DayColumn";
import { ActivityCard } from "../../dashboard/components/ActivityCard";
import { Button } from "@/components/ui/button";
import { Activity, Day } from "@/types";
import {
  Calendar,
  Compass,
  DollarSign,
  ListOrdered,
  Plus,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";

export default function TripDetailPage({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) {
  // Support both Promise params (Next.js 15+) and direct params
  const unwrappedParams = typeof (params as any).then === "function" ? use(params as Promise<{ id: string }>) : (params as { id: string });
  const tripId = unwrappedParams.id;

  const { data, isLoading, error } = useTrip(tripId);
  const deleteActivity = useDeleteActivity(tripId);
  const reorderActivities = useReorderActivities(tripId);
  const moveActivity = useMoveActivity(tripId);

  const [activeActivity, setActiveActivity] = useState<Activity | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );

  const trip = data?.trip;
  const days = useMemo(() => data?.days || [], [data?.days]);

  // Summary statistics
  const totalActivities = useMemo(
    () => days.reduce((sum, d) => sum + (d.activities?.length || 0), 0),
    [days],
  );

  const totalEstimatedCost = useMemo(
    () =>
      days.reduce(
        (sum, d) =>
          sum +
          (d.activities || []).reduce(
            (daySum, a) => daySum + (a.estimatedCost || 0),
            0,
          ),
        0,
      ),
    [days],
  );

  const handleDeleteActivity = async (activityId: string) => {
    try {
      await deleteActivity.mutateAsync(activityId);
      toast.success("Activity removed");
    } catch {
      toast.error("Failed to delete activity");
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const allActivities = days.flatMap((d) => d.activities || []);
    const found = allActivities.find((a) => a._id === active.id);
    if (found) setActiveActivity(found);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveActivity(null);

    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    // Find the source day
    const sourceDay = days.find((d) =>
      d.activities?.some((a) => a._id === activeId),
    );
    if (!sourceDay) return;

    // Find the destination day: could be dropped over another activity or over the day column itself
    let targetDay = days.find((d) => d._id === overId);
    if (!targetDay) {
      targetDay = days.find((d) =>
        d.activities?.some((a) => a._id === overId),
      );
    }
    if (!targetDay) return;

    // Case 1: Reordering within the same day
    if (sourceDay._id === targetDay._id) {
      const currentIds = (sourceDay.activities || []).map((a) => a._id);
      const oldIndex = currentIds.indexOf(activeId);
      const newIndex = currentIds.indexOf(overId);

      if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
        const reordered = arrayMove(currentIds, oldIndex, newIndex);
        try {
          await reorderActivities.mutateAsync({
            dayId: sourceDay._id,
            activityIds: reordered,
          });
        } catch {
          toast.error("Failed to reorder activities");
        }
      }
      return;
    }

    // Case 2: Moving across days
    const targetActivityIds = (targetDay.activities || []).map((a) => a._id);
    const overIndex = targetActivityIds.indexOf(overId);
    const newOrder =
      overIndex >= 0
        ? [
            ...targetActivityIds.slice(0, overIndex),
            activeId,
            ...targetActivityIds.slice(overIndex),
          ]
        : [...targetActivityIds, activeId];

    try {
      await moveActivity.mutateAsync({
        activityId: activeId,
        fromDayId: sourceDay._id,
        toDayId: targetDay._id,
        newOrder,
      });
      toast.success("Activity moved");
    } catch {
      toast.error("Failed to move activity");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="border-b bg-white dark:bg-slate-900 p-6 space-y-4">
          <div className="max-w-7xl mx-auto space-y-3">
            <div className="h-4 w-28 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
            <div className="h-8 w-64 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
            <div className="h-4 w-96 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
          </div>
        </div>
        <div className="max-w-7xl mx-auto p-6 flex gap-6 overflow-x-auto">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-72 h-96 bg-slate-200/60 dark:bg-slate-800/60 rounded-2xl animate-pulse shrink-0"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-slate-50 dark:bg-slate-950">
        <Compass className="h-16 w-16 text-muted-foreground mb-4 animate-bounce" />
        <h2 className="text-2xl font-bold font-heading mb-2">Trip not found</h2>
        <p className="text-muted-foreground mb-6 max-w-sm">
          We couldn't load this trip. It may have been deleted or you might not have access to it.
        </p>
        <Button asChild>
          <Link href="/dashboard">Return to Dashboard</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      {/* Trip Header */}
      <TripHeader trip={trip} />

      {/* Stats Bar */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs border-b border-border py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 text-xs sm:text-sm text-muted-foreground flex-wrap">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 font-medium text-foreground">
              <Calendar className="h-4 w-4 text-primary" />
              <span>{days.length} Days</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium text-foreground">
              <ListOrdered className="h-4 w-4 text-primary" />
              <span>{totalActivities} Activities</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium text-foreground">
              <DollarSign className="h-4 w-4 text-primary" />
              <span>
                Est. Cost: {trip.budget?.currency || "USD"}{" "}
                {totalEstimatedCost.toLocaleString()}
                {trip.budget?.total ? ` / ${trip.budget.total.toLocaleString()}` : ""}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-medium">
              <Sparkles className="h-3 w-3" /> Drag cards to reorder or move across days
            </span>
          </div>
        </div>
      </div>

      {/* Main Board View: Horizontally Scrollable Days */}
      <main className="flex-1 overflow-x-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto min-w-max pb-8">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="flex items-start gap-6">
              {days.map((day) => (
                <DayColumn
                  key={day._id}
                  day={day}
                  tripId={tripId}
                  onDeleteActivity={handleDeleteActivity}
                />
              ))}
            </div>

            {/* Drag Overlay for smooth dragging preview */}
            <DragOverlay>
              {activeActivity ? (
                <div className="w-72 shadow-2xl opacity-90 rotate-1">
                  <ActivityCard
                    activity={activeActivity}
                    onDelete={() => {}}
                  />
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      </main>
    </div>
  );
}
