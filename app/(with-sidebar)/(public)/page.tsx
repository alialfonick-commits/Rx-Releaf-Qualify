"use client";

import VisitDetail from "./patientDashboard/visitDetail";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useSession } from "next-auth/react";

export default function Home() {
  const { status } = useSession();
  const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || "https://rxreleaf.net";

  return (
    <>
      <div className="text-right mb-2">
        {status === "unauthenticated" && (
          <Link
            href={websiteUrl}
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-[#708E86] bg-white/10 px-3 py-2 text-sm font-medium text-[#708E86] transition hover:bg-[#708E86] hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Website
          </Link>
        )}
      </div>
      <div className="bg-[#708E86] rounded-xl p-6 text-white mb-3 text-[15px]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <strong className="font-semibold text-[20px] sm:text-[24px]">Welcome to Rx ReLeaf</strong>
        </div>
        <p className="pt-2 font-normal text-[#FFFFFFCC]">
          Complete the form below to start your urgent care consultation. A licensed provider will review your information and respond within minutes.
        </p>
      </div>
      <VisitDetail mode="public" />
    </>
  );
}
