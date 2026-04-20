"use client"

import { useEffect, useState } from "react"
import PaymentsTable from "@/app/components/paymentTable"

export default function PaymentsPage() {
  const [data, setData] = useState<any>(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchData()
  }, [page])

  const fetchData = async () => {
    const res = await fetch(`/api/admin/payments?page=${page}`)
    const json = await res.json()
    setData(json)
  }

  if (!data) return <p>Loading...</p>

  return (
    <div className="p-5">
      <h1 className="text-xl font-semibold mb-4">All Payments</h1>

      <PaymentsTable payment={data.payments} page={data.page}
        total={data.total}
        totalPages={data.totalPages}
        onPageChange={(p) => setPage(p)}
      />

    </div>
  )
}