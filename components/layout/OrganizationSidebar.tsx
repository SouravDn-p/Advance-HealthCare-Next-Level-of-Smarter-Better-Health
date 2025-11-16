"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Menu,
  QrCode,
  Shield,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const staticNavigation = [
  { name: "Dashboard", href: "/organizationDashboard", icon: LayoutDashboard },
  // { name: "Surveys", href: "/organizationDashboard/surveys", icon: FileText },
];

export default function OrganizationSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Get organizationId from URL parameters
  const organizationId = searchParams.get("organizationId");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <aside
      className={cn(
        "bg-sidebar border-sidebar-border flex flex-col border-r transition-all duration-300",
        sidebarOpen ? "w-64" : "w-20"
      )}
    >

      <div className="border-sidebar-border flex h-16 items-center justify-between border-b px-4">
        {sidebarOpen ? (
          <div className="flex items-center gap-2">
            <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
              <Shield className="text-primary-foreground h-5 w-5" />
            </div>
            <span className="text-sidebar-foreground text-lg font-bold">
              Remedy
            </span>
          </div>
        ) : (
          <div className="bg-primary mx-auto flex h-8 w-8 items-center justify-center rounded-lg">
            <Shield className="text-primary-foreground h-5 w-5" />
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto p-4">
        {staticNavigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {sidebarOpen && <span>{item.name}</span>}
            </Link>
          );
        })}
        
        {/* Scanner link with error handling */}
        {!organizationId ? (
          <div 
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors cursor-not-allowed",
              "text-sidebar-foreground opacity-50"
            )}
            title="Organization ID required"
          >
            <QrCode className="h-5 w-5 flex-shrink-0" />
            {sidebarOpen && <span>Scanner (ID required)</span>}
          </div>
        ) : (
          <Link
            href={`/organizationDashboard/scanner?organizationId=${organizationId}`}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors",
              pathname === "/organizationDashboard/scanner"
                ? "bg-primary text-primary-foreground font-medium"
                : "text-sidebar-foreground hover:bg-sidebar-accent"
            )}
          >
            <QrCode className="h-5 w-5 flex-shrink-0" />
            {sidebarOpen && <span>Scanner</span>}
          </Link>
        )}
      </nav>

      <div className="border-sidebar-border border-t p-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-full justify-center hidden md:flex"
        >
          {sidebarOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
        </Button>
      </div>
    </aside>
  );
}