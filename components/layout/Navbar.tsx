"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Home,
  Heart,
  Info,
  User,
  Sun,
  Moon,
  ChevronDown,
  UserCircle,
  LayoutDashboard,
  Wallet,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import LogoutButton from "@/components/LogoutButton";

type NavItemProps = {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
};

const NavItem: React.FC<NavItemProps> = ({ href, children, onClick }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        relative flex items-center gap-2 rounded-lg px-4 py-2
        transition-all duration-200
        hover:bg-gray-100 dark:hover:bg-gray-800
        ${isActive ? "font-medium text-blue-600 dark:text-blue-400" : ""}
        after:absolute after:bottom-0 after:left-0
        after:h-0.5 after:w-full after:origin-left
        after:scale-x-0 after:bg-blue-600 dark:after:bg-blue-400
        after:transition-transform
        hover:after:scale-x-100
        ${isActive ? "after:scale-x-100" : ""}
      `}
    >
      {children}
    </Link>
  );
};

// ---------------------------------------------------------------
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const isDarkMode = false;
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="sticky top-4 z-50 mx-2 md:mx-8">
      <div
        className={`
          rounded-xl border shadow-lg transition-all duration-300
          ${
            isDarkMode
              ? "border-gray-800 bg-gray-900/90 text-gray-100"
              : "border-gray-200 bg-white/90 text-gray-900"
          }
        `}
        style={{
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <nav className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex font-bold text-xl md:text-2xl"
              style={{
                background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              <Image
                src="/assets/logo.png"
                alt="Company logo"
                width={160}
                height={64}
                className="h-12 w-32 object-contain sm:h-16 sm:w-40"
                priority
              />
            </Link>

            {/* Desktop Links */}
            <div className="hidden items-center gap-2 md:flex">
              <NavItem href="/">
                <Home className="h-4 w-4" />
                Home
              </NavItem>
              <NavItem href="/doctors">
                <Heart className="h-4 w-4" />
                Doctors
              </NavItem>
              <NavItem href="/aboutUs">
                <Info className="h-4 w-4" />
                About Us
              </NavItem>
              <NavItem href="/contactUs">
                <User className="h-4 w-4" />
                Contact Us
              </NavItem>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                className={`rounded-lg p-2 transition-colors ${
                  isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                }`}
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>

              {/* User Dropdown - Only show if authenticated */}
              {isAuthenticated && user && (
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown((v) => !v)}
                    className="flex items-center gap-2 rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <div className="relative">
                      {user.avatar ? (
                        <Image
                          src={user.avatar}
                          alt={user.name}
                          width={32}
                          height={32}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                          <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                      )}
                      <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500 dark:border-gray-900" />
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {showDropdown && (
                    <div
                      className={`
                      absolute right-0 mt-2 w-56 overflow-hidden rounded-xl
                      shadow-2xl backdrop-blur-lg
                      ${
                        isDarkMode
                          ? "border border-indigo-700/40 bg-linear-to-b from-gray-800/90 to-gray-900/90"
                          : "border border-indigo-200/40 bg-linear-to-b from-white/90 to-indigo-100/90"
                      }
                    `}
                    >
                      <div
                        className={`border-b px-4 py-3 ${
                          isDarkMode
                            ? "border-indigo-700/50"
                            : "border-indigo-200/50"
                        }`}
                      >
                        <p
                          className={`text-sm font-semibold ${
                            isDarkMode ? "text-white" : "text-gray-800"
                          }`}
                        >
                          {user.name}
                        </p>
                        <p
                          className={`truncate text-xs ${
                            isDarkMode ? "text-indigo-200" : "text-indigo-600"
                          }`}
                        >
                          {user.email}
                        </p>
                        <span className="mt-1 inline-block rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-2 py-0.5 text-xs font-semibold capitalize text-white">
                          {user.role}
                        </span>
                      </div>

                      {[
                        {
                          href: "/dashboard/profile",
                          Icon: UserCircle,
                          label: "Your Profile",
                        },
                        {
                          href: "/dashboard/dashboard",
                          Icon: LayoutDashboard,
                          label: "Dashboard",
                        },
                        {
                          href: "/dashboard/walletHistory",
                          Icon: Wallet,
                          label: "Wallet History",
                        },
                      ].map(({ href, Icon, label }, idx) => (
                        <Link
                          key={idx}
                          href={href}
                          onClick={() => setShowDropdown(false)}
                          className={`
                          flex items-center gap-3 px-4 py-2 transition-all
                          ${
                            isDarkMode
                              ? "text-indigo-100 hover:bg-indigo-700/70 hover:text-white"
                              : "text-indigo-800 hover:bg-indigo-100 hover:text-indigo-900"
                          }
                        `}
                        >
                          <Icon
                            className={`h-5 w-5 ${
                              isDarkMode ? "text-indigo-300" : "text-indigo-700"
                            }`}
                          />
                          <span>{label}</span>
                        </Link>
                      ))}

                      <div
                        className={`mt-1 border-t ${
                          isDarkMode
                            ? "border-indigo-700/50"
                            : "border-indigo-200/50"
                        }`}
                      >
                        <LogoutButton
                          className={`
                          flex w-full items-center gap-3 px-4 py-2 transition-all
                          ${
                            isDarkMode
                              ? "text-red-300 hover:bg-red-900/50 hover:text-red-200"
                              : "text-red-600 hover:bg-red-100 hover:text-red-700"
                          }
                        `}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Auth Links - Show if not authenticated */}
              {!isAuthenticated && (
                <div className="hidden md:flex items-center gap-2">
                  <Link
                    href="/auth/login"
                    className="px-4 py-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                  >
                    Register
                  </Link>
                </div>
              )}

              {/* Mobile Toggle */}
              <button
                className="md:hidden rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsMenuOpen((v) => !v)}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden pt-4 pb-2">
              <div className="flex flex-col gap-1">
                <NavItem href="/" onClick={() => setIsMenuOpen(false)}>
                  <Home className="h-4 w-4" />
                  Home
                </NavItem>
                <NavItem href="/doctors" onClick={() => setIsMenuOpen(false)}>
                  <Heart className="h-4 w-4" />
                  Doctors
                </NavItem>
                <NavItem href="/aboutUs" onClick={() => setIsMenuOpen(false)}>
                  <Info className="h-4 w-4" />
                  About Us
                </NavItem>
                <NavItem href="/contactUs" onClick={() => setIsMenuOpen(false)}>
                  <User className="h-4 w-4" />
                  Contact Us
                </NavItem>
                
                {/* Auth Links for Mobile */}
                {!isAuthenticated && (
                  <>
                    <NavItem href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                      Login
                    </NavItem>
                    <NavItem href="/auth/register" onClick={() => setIsMenuOpen(false)}>
                      Register
                    </NavItem>
                  </>
                )}
              </div>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
}