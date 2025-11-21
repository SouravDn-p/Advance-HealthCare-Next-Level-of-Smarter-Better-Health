import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { RootState } from "@/redux/store/store";
import { setUser, logout } from "@/redux/api/slice/authSlice";
import { useRefreshTokenMutation } from "@/redux/api/apis/authApi";

export const useAuth = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, accessToken, refreshToken } = useAppSelector(
    (state: RootState) => state.auth
  );
  const [refreshTokenMutation] = useRefreshTokenMutation();

  // Check if user is authenticated
  const checkAuth = () => {
    return isAuthenticated && user !== null;
  };

  // Refresh token if needed
  const refreshAccessToken = async () => {
    if (!refreshToken) return null;

    try {
      const result = await refreshTokenMutation({ refreshToken }).unwrap();
      return result.accessToken;
    } catch (error) {
      dispatch(logout());
      return null;
    }
  };

  // Logout user
  const handleLogout = () => {
    dispatch(logout());
    router.push("/auth/login");
  };

  return {
    user,
    isAuthenticated,
    accessToken,
    checkAuth,
    refreshAccessToken,
    handleLogout,
  };
};