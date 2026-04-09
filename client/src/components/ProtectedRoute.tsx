"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useAuthStore((s) => s.user);
  const hydrated = useAuthStore((s) => s.hydrated);
  const router = useRouter();

  useEffect(() => {
    if (hydrated && !user) {
      router.replace("/login");
    }
  }, [hydrated, user, router]);

  if (!hydrated) return null;
  if (!user) return null;
  return <>{children}</>;
};

export default ProtectedRoute;
