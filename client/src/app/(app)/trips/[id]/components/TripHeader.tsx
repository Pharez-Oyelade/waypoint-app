"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { format, differenceInDays } from "date-fns";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Users,
  Wallet,
  Edit2,
  Trash2,
  Copy,
  MoreVertical,
} from "lucide-react";
import { Trip } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteTrip, useDuplicateTrip } from "@/hooks/useTrips";
import { EditTripModal } from "./EditTripModal";
import toast from "react-hot-toast";

const STATUS_BADGE: Record<string, string> = {
  planning: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  upcoming: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  ongoing: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  completed: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  archived: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
};

interface Props {
  trip: Trip;
}

export function TripHeader({ trip }: Props) {
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const deleteTrip = useDeleteTrip();
  const duplicateTrip = useDuplicateTrip();

  const nights = differenceInDays(
    new Date(trip.endDate),
    new Date(trip.startDate),
  );

  const handleDelete = async () => {
    try {
      await deleteTrip.mutateAsync(trip._id);
      toast.success("Trip deleted");
      router.push("/dashboard");
    } catch {
      toast.error("Failed to delete trip");
    }
  };

  const handleDuplicate = async () => {
    try {
      const duplicated = await duplicateTrip.mutateAsync({
        id: trip._id,
        startDate: trip.startDate,
        endDate: trip.endDate,
      });
      toast.success("Trip duplicated!");
      router.push(`/trips/${duplicated._id}`);
    } catch {
      toast.error("Failed to duplicate trip");
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border-b border-border shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {/* Navigation & Actions */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to trips
          </Link>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditOpen(true)}
              className="gap-1.5"
            >
              <Edit2 className="h-3.5 w-3.5" /> Edit Trip
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={handleDuplicate}
                  disabled={duplicateTrip.isPending}
                >
                  <Copy className="h-4 w-4 mr-2" /> Duplicate trip
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setDeleteConfirmOpen(true)}
                  className="text-red-600 dark:text-red-400"
                >
                  <Trash2 className="h-4 w-4 mr-2" /> Delete trip
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Title & Metadata */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-bold font-heading text-foreground">
                {trip.title}
              </h1>
              <span
                className={`text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize ${STATUS_BADGE[trip.status] || STATUS_BADGE.planning}`}
              >
                {trip.status}
              </span>
              <Badge variant="outline" className="capitalize text-xs">
                {trip.tripType}
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-1">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{trip.destination.name}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-primary" />
                <span>
                  {format(new Date(trip.startDate), "MMM d")} –{" "}
                  {format(new Date(trip.endDate), "MMM d, yyyy")} ({nights}{" "}
                  {nights === 1 ? "night" : "nights"})
                </span>
              </div>

              {trip.budget?.total ? (
                <div className="flex items-center gap-1.5">
                  <Wallet className="h-4 w-4 text-primary" />
                  <span>
                    {trip.budget.currency} {trip.budget.total.toLocaleString()}
                  </span>
                </div>
              ) : null}

              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-primary" />
                <span>
                  {trip.members?.length || 1}{" "}
                  {(trip.members?.length || 1) === 1 ? "traveler" : "travelers"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <EditTripModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        trip={trip}
      />

      {/* Delete Confirmation */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Trip</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{trip.title}"? This will also remove
              all planned days and activities. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setDeleteConfirmOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteTrip.isPending}
            >
              {deleteTrip.isPending ? "Deleting..." : "Delete trip"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
