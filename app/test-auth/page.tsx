"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import TestAuth from "@/components/TestAuth";

export default function TestAuthPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  
  // If already authenticated, redirect to dashboard
  if (isAuthenticated) {
    router.push("/userDashboard");
    return null;
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Authentication Test</h1>
        <TestAuth />
        <div className="mt-6">
          <button 
            onClick={() => router.push("/auth/login")}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go to Login Page
          </button>
        </div>
      </div>
    </div>
  );
}