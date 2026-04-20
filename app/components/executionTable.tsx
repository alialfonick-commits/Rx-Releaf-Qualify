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

function StatusBadge({ status }: { status: string }) {
  if (status === "PENDING") {
    return (
      <span className="bg-[#DFA62026] text-[#322A1B] mx-auto sm:w-28 w-24 flex justify-center py-1 rounded-full font-medium">
      Pending
      </span>
    )
  }

  if (status === "INVITED") {
    return (
      <span className="bg-[#3399CC26] text-[#3399CC] mx-auto sm:w-28 w-24 flex justify-center py-1 rounded-full font-medium">
      Invited
      </span>
    )
  }

  if (status === "COMPLETED") {
    return (
      <span className="bg-[#39AC6326] text-[#39AC63] mx-auto sm:w-28 w-24 flex justify-center py-1 rounded-full font-medium">
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
      <TableHead>Case ID</TableHead>
      <TableHead>Staff Name</TableHead>
      <TableHead>Patient</TableHead>
      <TableHead>Consultation Type</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Created At</TableHead>
     </TableRow>
    </TableHeader>

    <TableBody className="text-[#2E3835] [&_td]:text-center [&_td]:text-sm [&_tr]:bg-white [&_tr]:hover:bg-gray-50">
     {visits.map((item, index) => (
      <TableRow key={index}>
       <TableCell>{formatCaseId(item.caseNumber)}</TableCell>
       <TableCell>{item.staff?.name}</TableCell>

       <TableCell>{item.patient.firstName} {item.patient.lastName}</TableCell>

       <TableCell>{item.consultationType}</TableCell>

       <TableCell>
        <StatusBadge status={item.status} />
       </TableCell>

       <TableCell>
       {formatDate(item.createdAt)}
       </TableCell>
      </TableRow>
     ))}
    </TableBody>
   </Table>
  </div>
 )
}
