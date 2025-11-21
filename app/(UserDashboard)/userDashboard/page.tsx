"use client";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function UserDashboardPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            User Dashboard
          </h1>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <p className="text-gray-700 dark:text-gray-300">
              Welcome to your dashboard! This is a protected page that only authenticated users can access.
            </p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}