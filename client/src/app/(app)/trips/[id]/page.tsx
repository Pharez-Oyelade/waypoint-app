"use client";

import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DayColumn } from "../../dashboard/components/DayColumn";
import { useTrip } from "@/hooks/useTrips";
import { useDeleteActivity, useReorderActivities } from "@/hooks/useActivity";
import { useParams } from "next/navigation";

export default function TripDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useTrip(id);
  const reorder = useReorderActivities(id);
  const deleteActivity = useDeleteActivity(id);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id || !data) return;

    // Find the day dragged activity lives in
    const sourceDay = data.days.find((d: any) =>
      d.activities.some((a: any) => a._id === active.id),
    );
    if (!sourceDay) return;

    const oldIndex = sourceDay.activities.findIndex(
      (a: any) => a._id === active.id,
    );
    const newIndex = sourceDay.activities.findIndex(
      (a: any) => a._id === over.id,
    );
    if (oldIndex === -1 || newIndex === -1) return;

    const reorderedIds = arrayMove(
      sourceDay.activities,
      oldIndex,
      newIndex,
    ).map((a: any) => a._id);

    reorder.mutate({ dayId: sourceDay._id, activityIds: reorderedIds });
  }

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (!data) return <div className="p-6">Trip not found</div>;

  const { trip, days } = data;

  return (
    <div className="max-w-full">
      {/* Trip Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{trip.title}</h1>
        <p className="text-gray-500 mt-1">{trip.destination.name}</p>
      </div>

      <Tabs defaultValue="itinerary">
        <TabsList>
          <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="journal">Journal</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
        </TabsList>

        <TabsContent value="itinerary" className="mt-6">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <div className="flex gap-5 overflow-x-auto pb-6">
              {days.map((day: any) => (
                <DayColumn
                  key={day._id}
                  day={day}
                  tripId={id}
                  onDeleteActivity={(actId) => deleteActivity.mutate(actId)}
                />
              ))}
            </div>
          </DndContext>
        </TabsContent>

        <TabsContent value="budget">
          <p className="text-gray-500 mt-6">Budget tracking coming soon</p>
        </TabsContent>
        <TabsContent value="journal">
          <p className="text-gray-500 mt-6">Journal is coming</p>
        </TabsContent>
        <TabsContent value="members">
          <p className="text-gray-500 mt-6">
            Collaboration features coming soon
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
