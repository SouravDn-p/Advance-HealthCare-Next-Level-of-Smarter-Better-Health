"use client";

import { useAuth } from "@/contexts/AuthContext";

export default function TestAuth() {
  const { user, isAuthenticated, isLoading, error, login, logout } = useAuth();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Auth Test</h2>
      
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user?.name}!</p>
          <p>Email: {user?.email}</p>
          <p>Role: {user?.role}</p>
          <button 
            onClick={logout}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <p>Not authenticated</p>
          {error && <p className="text-red-500">Error: {error}</p>}
          <button 
            onClick={() => login({ email: "advance@gmail.com", password: "123456" })}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Test Login
          </button>
        </div>
      )}
    </div>
  );
}