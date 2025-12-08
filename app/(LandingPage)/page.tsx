"use client";

import Banner from "@/components/landing/home/Banner";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store/store";

export default function Home() {
  const theme = useAppSelector((state: RootState) => state.ui.theme);
  const darkMode = theme == "dark" ? true : false;
  return (
    <section
      className={`relative min-h-screen flex items-center justify-center ${
        darkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      <Banner />
    </section>
  );
}
