"use client";

import { TableWrap } from "@/app/components/tableWrap";
import Navbar from "@/app/components/navbar";
import SatffNewExam from "@/app/components/StaffExamVisit";
import { useEffect, useState } from "react";

type Visit = {
  id: string;
  caseNumber: number;
  createdAt: string;
  updatedAt: string;
  status: string;
  paymentStatus: string;
  consultationType: string;
  patientState: string;
  examId: number;
  examName: string;
  isPhoneVisit: boolean;
  providerName?: string | null;
  patient: {
    id: string;
    firstName: string;
    lastName: string;
    dob: string;
  };
  staff?: {
    id: string;
    name: string;
  };
};

export default function AdminVisitsPage() {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const res = await fetch("/api/admin/visits", {
          method: "GET",
          cache: "no-store", // prevent caching PHI
        });

        if (!res.ok) {
          throw new Error("Failed to fetch visits");
        }

        const data = await res.json();
        setVisits(data.visits);
      } catch {
        setError("Unable to load visits");
      } finally {
        setLoading(false);
      }
    };

    fetchVisits();
  }, []);

  if (loading) return <p className="p-4">Loading visits...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div>
      <Navbar title="Execution Monitoring" subtitle="Monitor and manage case execution status" />
      <SatffNewExam />
      <div className="bg-[#FFFFFF] border border-[#D7DED3] rounded-xl px-3.5 py-3.5 mt-3">
        <TableWrap
          visits={visits}
          allowPaymentActions
          allowDelete
          allowDeletePaid
          detailsBasePath="/admin/visits"
          deleteEndpointBase="/api/admin/visits"
          sendPaymentEndpoint="/api/admin/send-payment"
        />
      </div>
    </div>
  );
}
