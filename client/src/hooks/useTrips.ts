import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { Trip } from "@/types";

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
    mutationFn: (data: any) =>
      api.post("/trips", data).then((r) => r.data.trip),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["trips"] }),
  });
}

export function useTrip(id: string) {
  return useQuery({
    queryKey: ["trips", id],
    queryFn: async () => {
      const res = await api.get(`/trips/${id}`);
      return { trip: res.data.trip as Trip, days: res.data.days };
    },
    enabled: !!id,
  });
}
