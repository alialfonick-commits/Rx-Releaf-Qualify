'use client'
import Image from "next/image";
import {
    LayoutDashboard,
    Folder,
    Shield,
    Menu,
    X,
    FolderOpen,
    FileText,
    ClipboardList,
    CreditCard,
  } from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react"
import { sidebarConfig } from "./SidebarConfig"
import { usePathname, useRouter } from "next/navigation"

type PageType =
  | "welcome"
  | "staff"
  | "cases"
  | "viewCases"
  | "visitDetails"
  | "admin"
  | "Payments"
  | "executionMonitoring"
  | "overview";

export default function SideBar() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const router = useRouter()

  const role = session?.user?.role || "PUBLIC"
  const items = sidebarConfig[role as keyof typeof sidebarConfig]

  const [activePage, setActivePage] = useState<PageType>("welcome");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return(
    <>
      <div className="xl:hidden fixed top-0 left-0 z-50 bg-[#708E86] w-full">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="text-white p-2 rounded-md bg-[#708E86]"
        >
          <Menu size={24} />
        </button>
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 xl:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

    <div
      className={`fixed top-0 left-0 w-75 h-full bg-[#708E86] text-white flex flex-col justify-between p-3 z-50 transform transition-transform duration-300
      ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} xl:translate-x-0 xl:static xl:h-auto`}
    >
      {isSidebarOpen && (
      <div className="flex justify-end mb-4 xl:hidden absolute">
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="text-white p-2 rounded-md hover:bg-[#4E6056]/50"
        >
          <X size={24} />
        </button>
      </div>
      )}

      <div>
        <div className="mb-4 border-b border-[#506259] pb-5">
          <Image
          src="/images/logo.webp"
          alt="RX Releaf Logo"
          width={130}
          height={70}
          className="mx-auto"
          />
        </div>
        <div className="space-y-2 [&_button]:text-start">
          {items.map((item) => {
          const Icon = item.icon
            return (
              <SidebarButton
                key={item.path}
                icon={<Icon size={18} />}
                label={item.label}
                active={pathname === item.path}
                onClick={() => router.push(item.path)}
              />
            )
          })}

          {/* <SidebarButton
          icon={<LayoutDashboard size={18} />}
          label="Dashboard"
          active={activePage === "staff"}
          onClick={() => {
              setActivePage("staff");
              setIsSidebarOpen(false);
          }}
          />

          <SidebarButton
          icon={<FolderOpen size={18} />}
          label="Cases"
          active={activePage === "cases"}
          onClick={() => {
              setActivePage("cases");
              setIsSidebarOpen(false);
          }}
          />

          <SidebarButton
          icon={<Folder size={18} />}
          label="View Cases"
          active={activePage === "viewCases"}
          onClick={() => {
              setActivePage("viewCases");
              setIsSidebarOpen(false);
          }}
          />

          <SidebarButton
          icon={<FileText size={18} />}
          label="Exams / Visits"
          active={activePage === "visitDetails"}
          onClick={() => {
              setActivePage("visitDetails");
              setIsSidebarOpen(false);
          }}
          />

          <SidebarButton
          icon={<Shield size={18} />}
          label="Admin Login"
          active={activePage === "admin"}
          onClick={() => {
              setActivePage("admin");
              setIsSidebarOpen(false);
          }}
          />

          <SidebarButton
          icon={<CreditCard size={18} />}
          label="Payments"
          active={activePage === "Payments"}
          onClick={() => {
              setActivePage("Payments");
              setIsSidebarOpen(false);
          }}
          />

          <SidebarButton
          icon={<Shield size={18} />}
          label="Execution Monitoring"
          active={activePage === "executionMonitoring"}
          onClick={() => {
              setActivePage("executionMonitoring");
              setIsSidebarOpen(false);
          }}
          />

          <SidebarButton
          icon={<LayoutDashboard size={18} />}
          label="Overview"
          active={activePage === "overview"}
          onClick={() => {
              setActivePage("overview");
              setIsSidebarOpen(false);
          }}
          /> */}
        </div>
      </div>

      <div className="bg-[#57746D] rounded-xl p-4 text-sm mt-4">
        <p className="text-[#FFFFFFCC] mb-2 text-[16px]">Need help?</p>
        <p className="text-[#FFFFFF99]">
          Contact support at <a href="mailto:admin@rxreleaf.com"
          className="text-[#C3A260] block">admin@rxreleaf.com</a>
        </p>
      </div>
    </div>
    </>
  )
}
function SidebarButton({
    icon,
    label,
    active,
    onClick,
  }: {
    icon: React.ReactNode;
    label: string;
    active: boolean;
    onClick: () => void;
  }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full sm:px-4 px-3 sm:py-3 py-2 sm:rounded-xl rounded-lg max-sm:text-[15px] focus-visible:outline-none cursor-pointer transition ${active
      ? "bg-[#57746D]"
      : "hover:bg-[#4E6056]/70"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}