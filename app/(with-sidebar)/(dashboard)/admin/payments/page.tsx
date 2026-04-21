"use client"

import { useEffect, useState } from "react"
import PaymentsTable from "@/app/components/paymentTable"
import Navbar from "@/app/components/navbar"

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

  console.log(data)

  return (
    <div>
      <Navbar title="Payments" subtitle="View and manage all payment transactions" />
      <PaymentsTable payment={data.payments} page={data.page}
        total={data.total}
        totalPages={data.totalPages}
        onPageChange={(p) => setPage(p)}
      />

    </div>
  )
}