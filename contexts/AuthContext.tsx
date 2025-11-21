"use client";

import React, { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { RootState } from "@/redux/store/store";
import { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout as logoutAction,
  registerStart,
  registerSuccess,
  registerFailure
} from "@/redux/api/slice/authSlice";
import { 
  useLoginMutation, 
  useRegisterMutation, 
  useRefreshTokenMutation, 
  useLogoutMutation,
  LoginRequest,
  RegisterRequest,
  ActualAuthResponse
} from "@/redux/api/apis/authApi";
import AuthService from "@/services/authService";

interface AuthContextType {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string;
  } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginRequest) => Promise<boolean>;
  register: (userData: RegisterRequest) => Promise<boolean>;
  logout: () => void;
  refreshAccessToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading, error, accessToken, refreshToken } = useAppSelector(
    (state: RootState) => state.auth
  );
  
  const [loginMutation] = useLoginMutation();
  const [registerMutation] = useRegisterMutation();
  const [refreshTokenMutation] = useRefreshTokenMutation();
  const [logoutMutation] = useLogoutMutation();

  // Login function
  const login = async (credentials: LoginRequest): Promise<boolean> => {
    try {
      dispatch(loginStart());
      const result: ActualAuthResponse = await loginMutation(credentials).unwrap();
      
      // Handle the actual response structure from your API
      if (result.success) {
        // Extract user data from the response
        const userData = {
          id: result.user.id,
          name: result.user.name,
          email: result.user.email,
          role: result.user.role || "user", // Default to "user" if no role provided
          avatar: result.user.avatar
        };
        
        dispatch(
          loginSuccess({
            user: userData,
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
          })
        );
        return true;
      } else {
        const errorMessage = result.message || "Login failed";
        dispatch(loginFailure(errorMessage));
        return false;
      }
    } catch (err: any) {
      // Handle different types of errors
      let errorMessage = "Login failed. Please try again.";
      
      if (err?.data?.message) {
        errorMessage = err.data.message;
      } else if (err?.message) {
        errorMessage = err.message;
      } else if (err?.status === 401) {
        errorMessage = "Invalid credentials";
      }
      
      dispatch(loginFailure(errorMessage));
      return false;
    }
  };

  // Register function
  const register = async (userData: RegisterRequest): Promise<boolean> => {
    try {
      dispatch(registerStart());
      const result: ActualAuthResponse = await registerMutation(userData).unwrap();
      
      if (result.success) {
        dispatch(registerSuccess());
        return true;
      } else {
        const errorMessage = result.message || "Registration failed";
        dispatch(registerFailure(errorMessage));
        return false;
      }
    } catch (err: any) {
      const errorMessage = err?.data?.message || "Registration failed. Please try again.";
      dispatch(registerFailure(errorMessage));
      return false;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      if (refreshToken) {
        await AuthService.logout(refreshToken);
      }
    } catch (error) {
      // Ignore logout errors
    } finally {
      dispatch(logoutAction());
      router.push("/auth/login");
    }
  };

  // Refresh access token
  const refreshAccessToken = async (): Promise<string | null> => {
    if (!refreshToken) return null;

    try {
      const result = await AuthService.refreshToken(refreshToken);
      if (result) {
        // Update tokens in Redux store
        // dispatch(setTokens(result)); // You might want to add this action to your authSlice
        return result.accessToken;
      }
      return null;
    } catch (error) {
      dispatch(logoutAction());
      return null;
    }
  };

  // Check authentication status on mount
  useEffect(() => {
    // In a real app, you might want to validate the token here
    // For now, we rely on Redux persistence
  }, []);

  const value = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    refreshAccessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}