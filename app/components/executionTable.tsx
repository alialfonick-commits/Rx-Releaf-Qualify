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

import { MoreHorizontal, Pencil, Power, Archive } from "lucide-react"
import { Button } from "@/components/ui/button"

const cases = [
 {
  caseId: "SVC-001",
  patient: "Sarah Clair",
  status: "Blocked",
  retryCount: 3,
  nextTry: "12-26-2024, 2:30:00 PM",
  lastError: "Provider not available",
 },
 {
  caseId: "SVC-001",
  patient: "Sarah Clair",
  status: "Blocked",
  retryCount: 1,
  nextTry: "12-26-2024, 2:30:00 PM",
  lastError: "Provider not available",
 },
 {
  caseId: "SVC-001",
  patient: "Sarah Clair",
  status: "In Progress",
  retryCount: 0,
  nextTry: "-",
  lastError: "-",
 },
 {
  caseId: "SVC-001",
  patient: "Sarah Clair",
  status: "Completed",
  retryCount: 0,
  nextTry: "-",
  lastError: "-",
 },
 {
  caseId: "SVC-001",
  patient: "Sarah Clair",
  status: "Pending",
  retryCount: 0,
  nextTry: "-",
  lastError: "-",
 },
]

function StatusBadge({ status }: { status: string }) {
 if (status === "Blocked") {
  return (
   <span className="bg-[#D74242] text-white mx-auto w-28 flex justify-center py-1 rounded-full font-medium">
    Blocked
   </span>
  )
 }

 if (status === "In Progress") {
  return (
   <span className="bg-[#3399CC26] text-[#3399CC] mx-auto w-28 flex justify-center py-1 rounded-full font-medium">
    In Progress
   </span>
  )
 }

 if (status === "Completed") {
  return (
   <span className="bg-[#39AC6326] text-[#39AC63] mx-auto w-28 flex justify-center py-1 rounded-full font-medium">
    Completed
   </span>
  )
 }

 if (status === "Pending") {
  return (
   <span className="bg-[#DFA62026] text-[#322A1B] mx-auto w-28 flex justify-center py-1 rounded-full font-medium">
    Pending
   </span>
  )
 }

 return null
}

export default function ExecutionTable() {
 return (
  <div className="border border-[#DCE5DF] rounded-xl overflow-hidden">
   <Table>
    <TableHeader>
     <TableRow className="bg-[#FCFCFC] text-[#6A7C73] font-medium [&_th]:text-center">
      <TableHead>Case ID</TableHead>
      <TableHead>Patient</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Retry Count</TableHead>
      <TableHead>Next Try</TableHead>
      <TableHead>Last Error</TableHead>
      <TableHead>Actions</TableHead>
     </TableRow>
    </TableHeader>

    <TableBody className="text-[#2E3835] [&_td]:text-center [&_td]:text-sm [&_tr]:bg-white [&_tr]:hover:bg-gray-50">
     {cases.map((item, index) => (
      <TableRow key={index}>
       <TableCell>{item.caseId}</TableCell>

       <TableCell>{item.patient}</TableCell>

       <TableCell>
        <StatusBadge status={item.status} />
       </TableCell>

       <TableCell>{item.retryCount}</TableCell>

       <TableCell>{item.nextTry}</TableCell>

       <TableCell
        className={
         item.lastError !== "-" ? "text-[#D30C05]" : ""
        }
       >
        {item.lastError}
       </TableCell>

       <TableCell>
        <DropdownMenu>
         <DropdownMenuTrigger asChild>
          <Button
           variant="ghost"
           size="icon"
           className="h-8 w-8 p-0 cursor-pointer"
          >
           <MoreHorizontal className="h-4 w-4 text-[#2E3833]" />
          </Button>
         </DropdownMenuTrigger>

         <DropdownMenuContent
          align="end"
          className="w-40 rounded-xl border border-[#DCE5DF]"
         >
          <DropdownMenuItem className="cursor-pointer text-[#2E3833]">
           <Pencil className="mr-2 h-4 w-4" />
           Edit
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer text-[#2E3833]">
           <Power className="mr-2 h-4 w-4" />
           Deactivate
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer text-[#D74242]">
           <Archive className="mr-2 h-4 w-4" />
           Archive
          </DropdownMenuItem>
         </DropdownMenuContent>
        </DropdownMenu>
       </TableCell>
      </TableRow>
     ))}
    </TableBody>
   </Table>
  </div>
 )
}
