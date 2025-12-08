"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store/store";

interface LoginRedirectProps {
  children: React.ReactNode;
}

export default function LoginRedirect({ children }: LoginRedirectProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAppSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    // Redirect to dashboard if already authenticated
    if (!isLoading && isAuthenticated) {
      router.push("/userDashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  // Show children if not authenticated
  if (!isAuthenticated) {
    return <>{children}</>;
  }

  // Return null while redirecting
  return null;
}
