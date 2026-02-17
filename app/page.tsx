"use client";

import { useState } from "react";
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

import WelcomeBar from "./components/welcomeBar";
import VisitDetail from "./patientDashboard/visitDetail";
import Cases from "./components/cases";
import ResentCases from "./components/recentCases";
import RecentVisit from "./components/recentVisit";
import Stats from "./components/stats";
import VisitRequest from "./components/visitRequest";
import VirtualStep1 from "./components/virtualStep1";
import Checkout from "./patientDashboard/checkout";
import Thankyou from "./patientDashboard/thankyou";
import ViewVisitDetails from "./components/viewVisitDetails";
import AdminLogin from "./adminDashboard/adminLogin";
import Image from "next/image";
import ViewCases from "./components/viewCases";
import Payments from "./components/payments";
import ExecutionMonitoring from "./components/executionMonitoring";
import VirtualStep2 from "./components/virtualStep2";
import AdminOverview from "./components/adminOverview";

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

export default function Home() {
  const [staffStep, setStaffStep] = useState<"dashboard" | "virtualStep1" | "virtualStep2">("dashboard");
  const [activePage, setActivePage] = useState<PageType>("welcome");
  const [welcomeStep, setWelcomeStep] = useState<
    "visit" | "checkout" | "thankyou"
  >("visit");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (activePage) {
      case "welcome":
        return (
          <>
            {welcomeStep === "visit" && (
              <>
                <WelcomeBar />
                <VisitDetail onNext={() => setWelcomeStep("checkout")} />
              </>
            )}

            {welcomeStep === "checkout" && (
              <Checkout
                onBack={() => setWelcomeStep("visit")}
                onNext={() => setWelcomeStep("thankyou")}
              />
            )}

            {welcomeStep === "thankyou" && (
              <Thankyou
                onBack={() => setWelcomeStep("checkout")}
                onHome={() => setWelcomeStep("visit")}
              />
            )}
          </>
        );

      case "staff":
        return (
          <>
            {staffStep === "dashboard" && (
              <>
                <VisitRequest onCreate={() => setStaffStep("virtualStep1")} />
                <Stats />
                <ResentCases />
                <RecentVisit />
              </>
            )}

            {staffStep === "virtualStep1" && (
              <VirtualStep1
                onBack={() => setStaffStep("dashboard")}
                onNext={() => setStaffStep("virtualStep2")}
              />
            )}

            {staffStep === "virtualStep2" && (
              <VirtualStep2
                onBack={() => setStaffStep("virtualStep1")}
                onNext={() => console.log("Next Step")}
              />
            )}
          </>
        );

      case "cases":
        return <Cases />;

      case "viewCases":
        return <ViewCases />

      case "visitDetails":
        return <ViewVisitDetails />;

      case "admin":
        return <AdminLogin />;

      case "Payments":
        return <Payments />

      case "executionMonitoring":
        return <ExecutionMonitoring />

      case "overview":
        return <AdminOverview />

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#6B7C72] relative">

      <div className="md:hidden fixed top-0 left-0 z-50 bg-[#5E6E66] w-full">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="text-white p-2 rounded-md bg-[#5E6E66]"
        >
          <Menu size={24} />
        </button>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 w-[300px] h-full bg-[#5E6E66] text-white flex flex-col justify-between p-3 z-50 transform transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:h-auto`}
      >
        {isSidebarOpen && (
          <div className="flex justify-end mb-4 md:hidden absolute">
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-white p-2 rounded-md hover:bg-[#4E6056]/50"
            >
              <X size={24} />
            </button>
          </div>
        )}

        <div>
          <div className="mb-2 border-b border-[#506259] pb-6">
            <Image
              src="/images/logo.webp"
              alt="RX Releaf Logo"
              width={130}
              height={70}
              className="mx-auto"
            />
          </div>
          <div className="space-y-2 [&_button]:text-start">

            <SidebarButton
              icon={<ClipboardList size={18} />}
              label="Exams"
              active={activePage === "welcome"}
              onClick={() => {
                setActivePage("welcome");
                setIsSidebarOpen(false);
              }}
            />

            <SidebarButton
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
            />

          </div>
        </div>

        <div className="bg-[#506259] rounded-xl p-4 text-sm mt-4">
          <p className="text-[#FFFFFFCC] mb-2 text-[16px]">Need help?</p>
          <p className="text-[#FFFFFF99]">
            Contact support at
            <a
              href="mailto:support@rxreleaf.com"
              className="text-[#C3A260] block"
            >
              support@rxreleaf.com
            </a>
          </p>
        </div>
      </div>

      <div className="bg-[#F6F7F2] px-4 py-2 shadow-[1px_0px_10px_4px_#00000021] max-md:pt-13! max-md:p-2! overflow-y-auto w-full">
        {renderPage()}
      </div>
    </div>
  );
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
        ? "bg-[#384740]"
        : "hover:bg-[#4E6056]/70"
        }`}
    >
      {icon}
      {label}
    </button>
  );
}
