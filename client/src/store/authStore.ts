import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  defaultCurrency: string;
}

interface AuthStore {
  user: User | null;
  hydrated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      hydrated: false,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "waypoint-auth",
      partialize: (state) => ({ user: state.user }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hydrated = true;
        }
      },
    },
  ),
);
