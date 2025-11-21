"use client";

import ApiTest from "@/components/ApiTest";

export default function ApiTestPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">API Test Page</h1>
        <ApiTest />
      </div>
    </div>
  );
}