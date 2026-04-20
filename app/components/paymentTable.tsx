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

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    } from "./paymentPagination"

import { MoreHorizontal, Pencil, Power, Archive } from "lucide-react"
import { Button } from "@/components/ui/button"

// const payments = [
//  {
//   id: "Pay-001",
//   caseId: "SVC-001",
//   patient: "Sarah Clair",
//   amount: "$150.00",
//   method: "Credit Card",
//   date: "2024-01-15",
//   status: "Completed",
//  },
//  {
//   id: "Pay-002",
//   caseId: "SVC-002",
//   patient: "Sarah Clair",
//   amount: "$150.00",
//   method: "Credit Card",
//   date: "2024-01-15",
//   status: "Pending",
//  },
//  {
//   id: "Pay-003",
//   caseId: "SVC-003",
//   patient: "Sarah Clair",
//   amount: "$150.00",
//   method: "Credit Card",
//   date: "2024-01-15",
//   status: "Completed",
//  },
//  {
//   id: "Pay-004",
//   caseId: "SVC-004",
//   patient: "Sarah Clair",
//   amount: "$150.00",
//   method: "Credit Card",
//   date: "2024-01-15",
//   status: "Completed",
//  },
//  {
//   id: "Pay-005",
//   caseId: "SVC-005",
//   patient: "Sarah Clair",
//   amount: "$150.00",
//   method: "Credit Card",
//   date: "2024-01-15",
//   status: "Pending",
//  },
//  {
//   id: "Pay-006",
//   caseId: "SVC-006",
//   patient: "Sarah Clair",
//   amount: "$150.00",
//   method: "Credit Card",
//   date: "2024-01-15",
//   status: "Cancelled",
//  },
//  {
//   id: "Pay-007",
//   caseId: "SVC-007",
//   patient: "Sarah Clair",
//   amount: "$150.00",
//   method: "Credit Card",
//   date: "2024-01-15",
//   status: "Completed",
//  },
//  {
//   id: "Pay-008",
//   caseId: "SVC-008",
//   patient: "Sarah Clair",
//   amount: "$150.00",
//   method: "Credit Card",
//   date: "2024-01-15",
//   status: "Pending",
//  },
// ];

export default function PaymentsTable({
    payment,
    page,
    total,
    totalPages,
    onPageChange
  }: {
    payment: any[]
    page?: number
    total?: number
    totalPages?: number
    onPageChange?: (page: number) => void
  }) {

    function StatusBadge({ status }: { status: string }) {
        if (status === "Completed") {
         return (
          <span className="bg-[#39AC6326] text-[#39AC63] mx-auto w-30 flex justify-center py-1 rounded-full font-medium">
           Completed
          </span>
         )
        }
       
        if (status === "Pending") {
         return (
          <span className="bg-[#DFA62026] text-[#322A1B] mx-auto w-30 flex justify-center py-1 rounded-full font-medium">
           Pending
          </span>
         )
        }
       
        if (status === "Cancelled") {
         return (
          <span className="bg-[#D74242] text-[#ffffff] mx-auto w-30 flex justify-center py-1 rounded-full font-medium">
           Cancelled
          </span>
         )
        }
       
        return null
    }

return (
  <>
   <div className="border border-[#DCE5DF] rounded-xl overflow-hidden">
    <Table>
     <TableHeader>
      <TableRow className="bg-[#FCFCFC] text-[#6A7C73] font-medium [&_th]:text-center">
       <TableHead>Payment ID</TableHead>
       <TableHead>Case ID</TableHead>
       <TableHead>Patient</TableHead>
       <TableHead>Amount</TableHead>
       <TableHead>Method</TableHead>
       <TableHead>Date</TableHead>
       <TableHead>Status</TableHead>
       <TableHead>Actions</TableHead>
      </TableRow>
     </TableHeader>

     <TableBody className="text-[#2E3835] [&_td]:text-center [&_td]:text-sm [&_tr]:bg-white [&_tr]:hover:bg-gray-50">
      {payment.map((p: any) => (
       <TableRow key={p.id}>
        <TableCell>
            {p.paymentId || p.id.slice(0, 6)}
        </TableCell>

        <TableCell>
            {p.id.slice(0, 6)}
        </TableCell>

        <TableCell>
            {p.patient.firstName} {p.patient.lastName}
        </TableCell>

        <TableCell>
        $89
        </TableCell>

        <TableCell>
         Card
        </TableCell>

        <TableCell>
            {new Date(p.updatedAt).toLocaleDateString()}
        </TableCell>

        <TableCell>
        <StatusBadge
          status={
                p.paymentStatus === "PAID"
                ? "Completed"
                : p.paymentStatus === "PENDING"
                ? "Pending"
                : "Cancelled"
            }
            />
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
   {page && total && (
  <div className="flex items-center justify-between pt-2">
    <p className="text-sm text-[#6A7C73]">
      Showing {(page - 1) * 10 + 1}–
      {Math.min(page * 10, total)} of {total} Payments
    </p>

    <Pagination>
      <PaginationContent>

        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange && onPageChange(page - 1)}
            className={page === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange && onPageChange(page + 1)}
            className={page === totalPages ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

      </PaginationContent>
    </Pagination>
  </div>
)}
  </>
 )
}