"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  GripVertical,
  Clock,
  MapPin,
  AlertTriangle,
  Trash2,
} from "lucide-react";
import { Activity } from "@/types";
import { Badge } from "@/components/ui/badge";

const CATEGORY_COLORS: Record<string, string> = {
  accomodation: "bg-purple-100 text-purple-700",
  food: "bg-orange-100 text-orange-700",
  transport: "bg-yellow-100 text-yellow-700",
  activity: "bg-blue-100 text-blue-700",
  sightseeing: "bg-green-100 text-green-700",
  shopping: "bg-pink-100 text-pink-700",
  other: "bg-gray-100 text-gray-700",
};

interface Props {
  activity: Activity;
  onDelete: (id: string) => void;
}

export function ActivityCard({ activity, onDelete }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: activity._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const hasConflicts = activity.conflicts?.length > 0;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white rounded-xl border shadow-sm p-3 group"
    >
      <div className="flex items-start gap-2">
        {/* Drag handle */}
        <button
          {...attributes}
          {...listeners}
          className="mt-0.5 text-gray-300 hover:text-gray-500 cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="h-4 w-4" />
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-medium text-sm text-gray-900 truncate">
              {activity.name}
            </h4>
            <div className="flex items-center gap-1 flex-shrink-0">
              {hasConflicts && (
                <span title={activity.conflicts[0].message}>
                  <AlertTriangle className="h-3.5 w-5.5 text-amber-500" />
                </span>
              )}

              {activity.aiGenerated && (
                <Badge
                  variant="outline"
                  className="text-xs px-1.5 py-0 text-blue-600 border"
                >
                  AI
                </Badge>
              )}

              <button
                onClick={() => onDelete(activity._id)}
                className="opacity-0 group-hover:opacity-100 transition text-red-400 hover:text-red-600"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-1.5">
            {activity.startTime && (
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="h-3 w-3" />
                {activity.startTime}
                {activity.endTime ? ` - ${activity.endTime}` : ""}
              </span>
            )}
            {activity.location?.name && (
              <span className="flex items-center gap-1 text-xs text-gray-500 trincate">
                <MapPin className="h-3 w-3" />
                {activity.location.name}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between mt-2">
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${CATEGORY_COLORS}`}
            >
              {activity.category}
            </span>
            {activity.estimatedCost !== undefined && (
              <span className="text-xs font-medium text-gray-700">
                {activity.currency} {activity.estimatedCost.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
