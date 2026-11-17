import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { Trip, Day } from "@/types";

export function useTrips() {
  return useQuery<Trip[]>({
    queryKey: ["trips"],
    queryFn: async () => {
      const res = await api.get("/trips");
      return res.data.trips;
    },
  });
}

export function useCreateTrip() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      api.post("/trips", data).then((r) => r.data.trip as Trip),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["trips"] }),
  });
}

export function useTrip(id: string) {
  return useQuery<{ trip: Trip; days: Day[] }>({
    queryKey: ["trips", id],
    queryFn: async () => {
      const res = await api.get(`/trips/${id}`);
      return { trip: res.data.trip, days: res.data.days };
    },
    enabled: !!id,
  });
}

export function useUpdateTrip(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Trip>) =>
      api.patch(`/trips/${id}`, data).then((r) => r.data.trip as Trip),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["trips"] });
      qc.invalidateQueries({ queryKey: ["trips", id] });
    },
  });
}

export function useDeleteTrip() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/trips/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["trips"] }),
  });
}

export function useDuplicateTrip() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      startDate,
      endDate,
    }: {
      id: string;
      startDate: string;
      endDate: string;
    }) =>
      api
        .post(`/trips/${id}/duplicate`, { startDate, endDate })
        .then((r) => r.data.trip as Trip),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["trips"] }),
  });
}
