"use client"

import { useEffect, useState } from "react"
import PaymentsTable from "@/app/components/paymentTable"
import Navbar from "@/app/components/navbar"
import { Activity, CheckCircle2, Clock3, CreditCard } from "lucide-react"

type PaymentRow = Parameters<typeof PaymentsTable>[0]["payment"][number]

type PaymentsResponse = {
  payments: PaymentRow[]
  stats: {
    total: number
    paid: number
    pending: number
    failed: number
  }
  total: number
  page: number
  totalPages: number
}

export default function PaymentsPage() {
  const [data, setData] = useState<PaymentsResponse | null>(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    let cancelled = false

    fetch(`/api/admin/payments?page=${page}`)
      .then((res) => res.json())
      .then((json) => {
        if (!cancelled) {
          setData(json)
        }
      })

    return () => {
      cancelled = true
    }
  }, [page])

  if (!data) return <p>Loading...</p>

  return (
    <div>
      <Navbar title="Payments" subtitle="View and manage all payment transactions" />
      <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 sm:[&_span]:text-[15px] [&_span]:text-[13px] [&_span]:text-[#6A7C73] [&_strong]:text-[22px] sm:[&_strong]:text-[30px] [&_strong]:font-semibold [&_strong]:text-[#2E3833] [&_svg]:bg-[#476B591A] sm:[&_svg]:h-11 [&_svg]:h-10 sm:[&_svg]:w-11 [&_svg]:w-10 [&_svg]:text-[#476B59] sm:[&_svg]:p-2.5 [&_svg]:p-2.25 sm:[&_svg]:rounded-xl [&_svg]:rounded-lg">
        <PaymentStat title="Total Payments" value={data.stats.total} icon={<CreditCard size={55} />} />
        <PaymentStat title="Paid" value={data.stats.paid} icon={<CheckCircle2 size={55} />} />
        <PaymentStat title="Pending" value={data.stats.pending} icon={<Clock3 size={55} />} />
        <PaymentStat title="Failed" value={data.stats.failed} icon={<Activity size={55} />} />
      </div>
      <PaymentsTable payment={data.payments} page={data.page}
        total={data.total}
        totalPages={data.totalPages}
        onPageChange={(p) => setPage(p)}
      />

    </div>
  )
}

function PaymentStat({
  title,
  value,
  icon,
}: {
  title: string
  value: number
  icon: React.ReactNode
}) {
  return (
    <div className="flex justify-between border border-[#DCE5DF] bg-white rounded-xl xl:px-4 xl:py-5 sm:p-4 p-2.5 shadow-sm">
      <div className="flex flex-col">
        <span>{title}</span>
        <strong>{value}</strong>
        <span className="font-medium"></span>
      </div>
      {icon}
    </div>
  )
}
