"use client";

import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";

export default function Banner() {
  const theme = useAppSelector((state) => state.ui.theme);
  const darkMode = theme == "dark" ? true : false;
  return (
    <section
      className={` rounded-lg mx-12  transition-all duration-300 
      ${darkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800"}`}
    >
      <div className="flex  flex-col md:flex-row items-center gap-8 md:gap-12 ">
        <div className="w-full md:w-1/2 max-w-[600px]  mx-auto">
          <Image
            width={800}
            height={800}
            src="/assets/handshake.png"
            alt="Digital healthcare illustration showing doctor and patient interaction"
            className="w-full h-auto"
          />
        </div>

        <div className="w-full md:w-1/2 space-y-4 p-4 mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif">
            <span
              className={`${darkMode ? "text-yellow-400" : "text-[#8B4513]"}`}
            >
              Welcome to{" "}
            </span>
            <span
              className={`${
                darkMode ? "text-blue-400" : "text-[#483D8B]"
              } font-semibold`}
            >
              Advance Health Service
            </span>
          </h1>

          <p
            className={`text-lg md:text-xl italic ${
              darkMode ? "text-gray-400" : "text-gray-700"
            }`}
          >
            - Your trusted digital healthcare platform for secure, fast, and
            smart medical solutions. Book appointments, access prescriptions,
            and monitor your health anytime, anywhere! 🚀
          </p>

          <div className="space-y-2">
            <p className="text-xl md:text-2xl">
              <span
                className={`${darkMode ? "text-green-400" : "text-green-600"}`}
              >
                Health at your fingertips,{" "}
              </span>
              <span
                className={`${darkMode ? "text-gray-300" : "text-gray-800"}`}
              >
                quick and{" "}
              </span>
              <span
                className={`${
                  darkMode ? "text-purple-400" : "text-purple-800"
                }`}
              >
                bright,
              </span>
            </p>
            <p className="text-xl md:text-2xl">
              <span
                className={`${darkMode ? "text-green-400" : "text-green-600"}`}
              >
                Advance Health Service,{" "}
              </span>
              <span
                className={`${
                  darkMode ? "text-purple-400" : "text-purple-800"
                }`}
              >
                day and night!
              </span>
            </p>
          </div>

          <button
            className={`mt-6 px-8 py-3 rounded-full font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl 
            ${
              darkMode
                ? "bg-red-500 hover:bg-red-400 text-gray-900"
                : "bg-[#ff4d4d] hover:bg-[#ff3333] text-white"
            }`}
          >
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
}
