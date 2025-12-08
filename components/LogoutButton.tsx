"use client";

import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/api/slice/authSlice";
import { LogOut } from "lucide-react";

interface LogoutButtonProps {
  className?: string;
  onClick?: () => void;
}

export default function LogoutButton({
  className = "",
  onClick,
}: LogoutButtonProps) {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    if (onClick) onClick();
  };

  return (
    <button
      onClick={handleLogout}
      className={`flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 ${className}`}
    >
      <LogOut className="w-4 h-4" />
      <span>Logout</span>
    </button>
  );
}
