"use client";

import { toggleLanguage } from "@/redux/api/slice/uiSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";

interface LanguageToggleProps {
  onLanguageChange?: (language: "Arabic" | "English") => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ onLanguageChange }) => {
  const dispatch = useAppDispatch();
  const { language } = useAppSelector((state) => state.ui);

  useEffect(() => {
    onLanguageChange?.(language);
  }, [language, onLanguageChange]);

  useEffect(() => {
    onLanguageChange?.(language);
  }, [language, onLanguageChange]);

  const handleToggle = () => {
    dispatch(toggleLanguage());
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer z-10">
      <input
        type="checkbox"
        className="sr-only"
        checked={language === "English"}
        onChange={handleToggle}
      />

      <div className="w-20 h-8 bg-white rounded-full shadow-inner flex items-center transition-colors duration-300 justify-between p-0.5 z-10 relative font-bold sm:w-48 sm:h-14 sm:p-1">
        {/* Desktop Label */}
        <span
          className={`w-10 hidden h-7 absolute rounded-full font-bold md:flex items-center justify-center text-xs transition-transform duration-300 sm:w-24 sm:h-14 sm:text-md ${language === "English"
              ? "text-black translate-x-0"
              : "text-black translate-x-10 sm:translate-x-20"
            }`}
        >
          {language === "English" ? "English" : "Arabic"}
        </span>

        {/* Desktop Toggle Button */}
        <span
          className={`w-10 h-7 hidden border-4 border-white rounded-full md:flex items-center justify-center z-10 text-white font-bold text-xs transition-transform duration-300 sm:w-24 sm:h-14 sm:text-md ${language === "English"
              ? "bg-green-500 translate-x-10 sm:translate-x-23"
              : "bg-green-500 -translate-x-0.5 sm:-translate-x-1"
            }`}
        >
          {language === "English" ? "Arabic" : "English"}
        </span>

        {/* Mobile Label */}
        <span
          className={`w-10 flex h-7 absolute rounded-full font-bold md:hidden items-center justify-center text-xs transition-transform duration-300 sm:w-24 sm:h-14 sm:text-md ${language === "English"
              ? "text-black translate-x-0"
              : "text-black translate-x-10 sm:translate-x-20"
            }`}
        >
          {language === "English" ? "En" : "Ar"}
        </span>

        {/* Mobile Toggle Button */}
        <span
          className={`w-10 h-7 border-2 border-white flex rounded-full md:hidden items-center justify-center z-10 text-white font-bold text-xs transition-transform duration-300 sm:w-24 sm:h-14 sm:text-md ${language === "English"
              ? "bg-green-500 translate-x-10 sm:translate-x-23"
              : "bg-green-500 -translate-x-0.5 sm:-translate-x-1"
            }`}
        >
          {language === "English" ? "Ar" : "En"}
        </span>
      </div>
    </label>
  );
};

export default LanguageToggle;
