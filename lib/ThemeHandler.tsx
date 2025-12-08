"use client";

import { useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";

export default function ThemeHandler() {
  const theme = useAppSelector((state) => state.ui.theme);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return null;
}
