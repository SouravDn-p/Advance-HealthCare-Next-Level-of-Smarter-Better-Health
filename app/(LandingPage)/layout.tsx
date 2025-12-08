"use client";

import { Footer } from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { useAppSelector } from "@/redux/hooks";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const theme = useAppSelector((state) => state.ui.theme);
  const isDarkMode = theme == "dark" ? true : false;
  return (
    <div className={`${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default RootLayout;
