import AdminSidebar from "@/components/layout/admin/AdminSidebar";
import { ReactNode } from "react";


interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  

  return (
    <div className="bg-white flex h-screen w-full">
      <AdminSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="border-border bg-card flex h-16 items-center justify-between border-b px-6">
          <h1 className="text-foreground text-xl font-semibold">Admin Dashboard</h1>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-[oklch(0.9717_0.0107_158.85)]">{children}</main>
      </div>
    </div>
  );
}
