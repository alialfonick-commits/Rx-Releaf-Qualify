"use client";

import SideBar from "./components/sideBar";
import VisitDetail from "./patientDashboard/visitDetail";

export default function Home() {
  return (
    <>
      <SideBar />
      <div className="bg-[#F6F7F2] px-4 py-2 shadow-[1px_0px_10px_4px_#00000021] max-md:pt-13! max-md:p-2! overflow-y-auto w-full">
        <div className="bg-[#5E6E66] rounded-xl p-6 text-white [&_strong]:font-semibold sm:[&_strong]:text-[24px] [&_strong]:text-[20px] mb-3 text-[15px] [&_p]:pt-2 [&_p]:font-normal [&_p]:text-[#FFFFFFCC]">
          <strong>Welcome to Rx ReLeaf</strong>
          <p>Complete the form below to start your urgent care consultation. A licensed provider will review your information and respond within minutes.</p>
        </div>
        <VisitDetail />
      </div>
    </>
  );
}