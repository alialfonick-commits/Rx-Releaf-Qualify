"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "./paymentPagination"
import {
  Calendar,
  Clock,
  CreditCard,
  ReceiptText,
  Stethoscope,
  User,
} from "lucide-react"
import { formatCaseId } from "@/lib/formatters"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type PaymentRow = {
  id: string
  caseNumber: number
  createdAt: string
  updatedAt: string
  paymentStatus: "PENDING" | "PAID" | "FAILED"
  paymentId?: string | null
  consultationType: "URGENT_CARE" | "GOOD_FAITH" | "QUALIPHY_RX" | "CHOOSE_PHARMACY"
  status: "PENDING" | "INVITED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED"
  examName: string
  patient: {
    firstName: string
    lastName: string
    email?: string | null
  }
}

const consultationTypeLabels: Record<PaymentRow["consultationType"], string> = {
  GOOD_FAITH: "Good Faith Exam & Orders",
  QUALIPHY_RX: "QualiphyRx Packages",
  URGENT_CARE: "Urgent Care Visit",
  CHOOSE_PHARMACY: "Choose Pharmacy",
}

function CopyPaymentId({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)
  const shortValue = value.length > 5 ? `${value.slice(0, 5)}...` : value

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1200)
    } catch {
      alert("Could not copy payment ID")
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex w-fit items-center gap-2 font-medium text-[#476B59] underline-offset-4 hover:underline"
        >
          <CreditCard size={15} />
          {copied ? "Copied" : shortValue}
        </button>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        className="max-w-[420px] bg-[#2E3833] text-white"
      >
        Click to copy: {value}
      </TooltipContent>
    </Tooltip>
  )
}

function PaymentBadge({ status }: { status: PaymentRow["paymentStatus"] }) {
  const styles = {
    PAID: "bg-[#39AC6326] text-[#24924D]",
    PENDING: "bg-[#DFA62026] text-[#322A1B]",
    FAILED: "bg-[#D74242] text-white",
  }

  const label = status === "PAID" ? "Paid" : status === "PENDING" ? "Pending" : "Failed"

  return (
    <span className={`inline-flex min-w-24 justify-center rounded-full px-3 py-1 text-sm font-semibold ${styles[status]}`}>
      {label}
    </span>
  )
}

export default function PaymentsTable({
  payment,
  page,
  total,
  totalPages,
  onPageChange,
}: {
  payment: PaymentRow[]
  page?: number
  total?: number
  totalPages?: number
  onPageChange?: (page: number) => void
}) {
  return (
    <>
      <div className="rounded-xl border border-[#DCE5DF] bg-white shadow-sm">
        <div className="border-b border-[#DCE5DF] bg-[#F8FAF9] px-4 py-4">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-[18px] font-semibold text-[#2E3833]">Payment Transactions</h2>
              <p className="text-sm text-[#6A7C73]">Review payment status and patient case details.</p>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-[#DCE5DF] bg-white px-3 py-2 text-sm text-[#476B59]">
              <ReceiptText size={16} />
              {total ?? payment.length} records
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#FCFCFC] text-[#6A7C73] font-medium">
                <TableHead>Payment</TableHead>
                <TableHead>Case</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Date & Time</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="text-[#2E3835] [&_td]:text-sm [&_tr]:hover:bg-gray-50">
              {payment.map((p) => (
                <TableRow key={p.id} className="border-b border-[#F1F4F2] last:border-0">
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <CopyPaymentId value={p.paymentId || p.id} />
                      <span className="text-xs text-[#8A9891]">Card payment</span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <span className="font-medium text-[#486B57]">{formatCaseId(p.caseNumber)}</span>
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="flex items-center gap-2 font-medium text-[#2E3833]">
                        <User className="size-4 text-[#6A7C73]" />
                        {p.patient.firstName} {p.patient.lastName}
                      </span>
                      {p.patient.email && (
                        <span className="ml-6 w-fit rounded-full bg-[#DFA62026] px-2.5 py-0.5 text-xs normal-case text-[#322A1B]">
                          {p.patient.email}
                        </span>
                      )}
                    </div>
                  </TableCell>

                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          className="flex items-center gap-2 text-left font-medium text-[#2E3833] underline-offset-4 hover:text-[#476B59] hover:underline"
                        >
                          <Stethoscope size={15} className="shrink-0 text-[#6A7C73]" />
                          {consultationTypeLabels[p.consultationType]}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        className="max-w-[420px] bg-[#2E3833] text-white"
                      >
                        {p.examName}
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>

                  <TableCell>
                    <PaymentBadge status={p.paymentStatus} />
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-col gap-1 text-[12px]">
                      <span className="flex items-center gap-1 text-[#2E3833] font-medium">
                        <Calendar size={14} className="text-[#6A7C73]" />
                        {new Date(p.updatedAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1 text-[#6A7C73]">
                        <Clock size={14} />
                        {new Date(p.updatedAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {page && total && (
        <div className="flex items-center justify-between pt-3">
          <p className="text-sm text-[#6A7C73]">
            Showing {(page - 1) * 10 + 1}-
            {Math.min(page * 10, total)} of {total} payments
          </p>

          <Pagination>
            <PaginationContent>
              {page > 1 && (
                <PaginationItem>
                  <PaginationPrevious onClick={() => onPageChange?.(page - 1)} />
                </PaginationItem>
              )}

              {totalPages && page < totalPages && (
                <PaginationItem>
                  <PaginationNext onClick={() => onPageChange?.(page + 1)} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  )
}
