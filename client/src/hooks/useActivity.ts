import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { Activity } from "@/types";

export function useAddActivity(tripId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ dayId, data }: { dayId: string; data: Partial<Activity> }) =>
      api
        .post(`/trips/${tripId}/days/${dayId}/activities`, data)
        .then((r) => r.data.activity as Activity),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["trips", tripId] }),
  });
}

export function useUpdateActivity(tripId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Activity> }) =>
      api
        .patch(`/trips/${tripId}/activities/${id}`, data)
        .then((r) => r.data.activity as Activity),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["trips", tripId] }),
  });
}

export function useDeleteActivity(tripId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/trips/${tripId}/activities/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["trips", tripId] }),
  });
}

export function useReorderActivities(tripId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      dayId,
      activityIds,
    }: {
      dayId: string;
      activityIds: string[];
    }) => api.patch(`/trips/${tripId}/days/${dayId}/reorder`, { activityIds }),
    // optimistic update: don't wait for server response
    onMutate: async ({ dayId, activityIds }) => {
      await qc.cancelQueries({ queryKey: ["trips", tripId] });
      const previous = qc.getQueryData(["trips", tripId]);
      // Update cache immediately
      qc.setQueryData(["trips", tripId], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          days: old.days.map((d: any) =>
            d._id === dayId
              ? {
                  ...d,
                  activities: activityIds
                    .map((id) => d.activities.find((a: any) => a._id === id))
                    .filter(Boolean),
                }
              : d,
          ),
        };
      });
      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      // Rollback
      if (ctx?.previous) qc.setQueryData(["trips", tripId], ctx.previous);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["trips", tripId] });
    },
  });
}

export function useMoveActivity(tripId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      activityId: string;
      fromDayId: string;
      toDayId: string;
      newOrder: string[];
    }) => api.patch(`/trips/${tripId}/activities/move`, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["trips", tripId] }),
  });
}
