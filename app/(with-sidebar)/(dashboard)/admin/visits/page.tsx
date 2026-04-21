"use client";

import ExecutionTable from "@/app/components/executionTable";
import { useEffect, useState } from "react";

type Visit = {
  id: string;
  caseNumber: number;
  createdAt: string;
  status: string;
  consultationType: string;
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
      } catch (err) {
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
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Visits</h1>
			<ExecutionTable visits={visits} />
    </div>
  );
}