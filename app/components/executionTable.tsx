"use client"

import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from "@/components/ui/table"

import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuTrigger,
} from "./paymentsActionMenu"

import { MoreHorizontal, Pencil, Power } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatCaseId } from "@/lib/formatters"
import RetryQualiphyButton from "./RetryQualiphyButton"
import {
  Hash,
  User,
  UserRound,
  Stethoscope,
  BadgeCheck,
  CalendarDays,
} from "lucide-react";


function StatusBadge({ status }: { status: string }) {
  if (status === "PENDING") {
    return (
      <span className="bg-[#DFA62026] text-[#322A1B] text-sm mx-auto w-fit flex justify-center py-0.5 px-5 rounded-full font-medium">
      Pending
      </span>
    )
  }

  if (status === "INVITED") {
    return (
      <span className="bg-[#3399CC26] text-[#3399CC] text-sm mx-auto w-fit flex justify-center py-0.5 px-5 rounded-full font-medium">
      Invited
      </span>
    )
  }

  if (status === "COMPLETED") {
    return (
      <span className="bg-[#39AC6326] text-[#39AC63] text-sm mx-auto w-fit flex justify-center py-0.5 px-5 rounded-full font-medium">
      Completed
      </span>
    )
  }

  if (status === "CANCELLED") {
    return (
      <span className="bg-[#D74242] text-white mx-auto sm:w-28 w-24 flex justify-center py-1 rounded-full font-medium">
      Cancelled
      </span>
    )
  }

  return (
    <span className="text-gray-400">Unknown</span>
  )
}

type Visit = {
  id: string
  caseNumber: number
  createdAt: string
  status: string
  paymentStatus: string
  consultationType: string
  patient: {
    firstName: string
    lastName: string
    dob: string
  }
  staff?: {
    id: string
    name: string
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}
export default function ExecutionTable({ visits }: { visits: Visit[] }) {

 return (

<div className="border border-[#DCE5DF] rounded-xl overflow-hidden">
  <Table>
    <TableHeader>
      <TableRow className="bg-[#FCFCFC] text-[#6A7C73] font-medium [&_th]:text-center">
        <TableHead>
          <span className="flex items-center justify-center gap-2">
            <Hash size={16} /> Case ID
          </span>
        </TableHead>

        <TableHead>
          <span className="flex items-center justify-center gap-2">
            <User size={16} /> Staff Name
          </span>
        </TableHead>

        <TableHead>
          <span className="flex items-center justify-center gap-2">
            <UserRound size={16} /> Patient
          </span>
        </TableHead>

        <TableHead>
          <span className="flex items-center justify-center gap-2">
            <Stethoscope size={16} /> Consultation Type
          </span>
        </TableHead>

        <TableHead>
          <span className="flex items-center justify-center gap-2">
            <BadgeCheck size={16} /> Status
          </span>
        </TableHead>

        <TableHead>
          <span className="flex items-center justify-center gap-2">
            <CalendarDays size={16} /> Created At
          </span>
        </TableHead>

        <TableHead>
          Actions
        </TableHead>
      </TableRow>
    </TableHeader>

    <TableBody className="text-[#2E3835] [&_td]:text-center [&_td]:text-sm [&_tr]:bg-white [&_tr]:hover:bg-gray-50">
      {visits.map((item, index) => (
        <TableRow key={index}>
          <TableCell>
            <span className="flex items-center justify-center gap-2">
              <Hash size={14} />
              {formatCaseId(item.caseNumber)}
            </span>
          </TableCell>

          <TableCell>
            <span className="flex items-center justify-center gap-2">
              <User size={14} />
              {item.staff?.name?.trim() ? item.staff.name : "PUBLIC"}
            </span>
          </TableCell>

          <TableCell>
            <span className="flex items-center justify-center gap-2">
              <UserRound size={14} />
              {item.patient.firstName} {item.patient.lastName}
            </span>
          </TableCell>

          <TableCell>
            <span className="flex items-center justify-center gap-2">
              <Stethoscope size={14} />
              {item.consultationType}
            </span>
          </TableCell>

          <TableCell>
            <StatusBadge status={item.status} />
          </TableCell>

          <TableCell>
            <span className="flex items-center justify-center gap-2">
              <CalendarDays size={14} />
              {formatDate(item.createdAt)}
            </span>
          </TableCell>

          <TableCell>
            {item.paymentStatus === "PAID" && item.status === "PENDING" ? (
              <RetryQualiphyButton
                examId={item.id}
                onSuccess={() => window.location.reload()}
              />
            ) : (
              <span className="text-xs text-[#8A9891]">-</span>
            )}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</div>
 )
}
