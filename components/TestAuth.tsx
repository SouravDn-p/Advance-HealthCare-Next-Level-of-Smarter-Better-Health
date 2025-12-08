"use client";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useLoginMutation } from "@/redux/api/apis/authApi";
import { loginStart, loginSuccess, loginFailure } from "@/redux/api/slice/authSlice";
import { toast } from "sonner";

export default function TestAuth() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading, error } = useAppSelector((state) => state.auth);
  const [loginMutation] = useLoginMutation();
  
  const handleTestLogin = async () => {
    dispatch(loginStart());
    try {
      const result = await loginMutation({ email: "advance@gmail.com", password: "123456" }).unwrap();
      
      if (result.success) {
        // Fix the type issue by ensuring role is not undefined
        const userWithRole = {
          ...result.user,
          role: result.user.role || "user" // Default to "user" if role is undefined
        };
        
        dispatch(loginSuccess({
          user: userWithRole,
          accessToken: result.accessToken,
          refreshToken: result.refreshToken
        }));
        toast.success("Test login successful");
      } else {
        const errorMessage = result.message || "Test login failed";
        dispatch(loginFailure(errorMessage));
        toast.error("Test login failed", {
          description: errorMessage,
        });
      }
    } catch (err: any) {
      const errorMessage = err?.data?.message || "Test login failed. Please try again.";
      dispatch(loginFailure(errorMessage));
      toast.error("Test login failed", {
        description: errorMessage,
      });
    }
  };
  
  const handleLogout = () => {
    dispatch({ type: "auth/logout" });
    toast.success("Logged out successfully");
  };
  
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
            onClick={handleLogout}
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
            onClick={handleTestLogin}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Test Login
          </button>
        </div>
      )}
    </div>
  );
}