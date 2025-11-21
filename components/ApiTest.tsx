"use client";

import { useState } from "react";
import { useLoginMutation } from "@/redux/api/apis/authApi";

export default function ApiTest() {
  const [login, { isLoading, isError, error, data }] = useLoginMutation();
  const [email, setEmail] = useState("advance@gmail.com");
  const [password, setPassword] = useState("123456");
  
  const handleTestLogin = async () => {
    try {
      const result = await login({ email, password }).unwrap();
      console.log("Login result:", result);
    } catch (err) {
      console.error("Login error:", err);
    }
  };
  
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">API Test</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        
        <button
          onClick={handleTestLogin}
          disabled={isLoading}
          className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
        >
          {isLoading ? "Testing..." : "Test Login"}
        </button>
        
        {isError && (
          <div className="p-2 bg-red-100 text-red-700 rounded">
            <strong>Error:</strong> {JSON.stringify(error)}
          </div>
        )}
        
        {data && (
          <div className="p-2 bg-green-100 text-green-700 rounded">
            <strong>Success:</strong> {JSON.stringify(data, null, 2)}
          </div>
        )}
      </div>
    </div>
  );
}