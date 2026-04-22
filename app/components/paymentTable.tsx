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

import { MoreHorizontal, Pencil, Power, Archive, Clock, Calendar, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatCaseId } from "@/lib/formatters"

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
  <div className="rounded-xl border border-[#DCE5DF] bg-white overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-[#F8FAF9]">
            <TableRow className="border-b border-[#DCE5DF] hover:bg-transparent [&_th]:text-center">
              <TableHead className="py-4 font-medium text-[#6A7C73]">Payment ID</TableHead>
              <TableHead className="py-4 font-medium text-[#6A7C73]">Case ID</TableHead>
              <TableHead className="py-4 font-medium text-[#6A7C73]">Patient</TableHead>
              <TableHead className="py-4 font-medium text-[#6A7C73]">Consultation Type</TableHead>
              <TableHead className="py-4 font-medium text-[#6A7C73]">Status</TableHead>
              <TableHead className="py-4 font-medium text-[#6A7C73]">Amount</TableHead>
              <TableHead className="py-4 font-medium text-[#6A7C73]">Method</TableHead>
              <TableHead className="py-4 font-medium text-[#6A7C73]">Date & Time</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="text-[#2E3835] [&_td]:text-center [&_td]:text-sm">
            {payment.map((p: any) => (
              <TableRow 
                key={p.id} 
                className="border-b capitalize border-[#F1F4F2] last:border-0 hover:bg-[#F8FAF9]/50 transition-colors"
              >
                {/* ID Columns with medium weighting */}
                <TableCell className="py-4 font-medium text-[#476B59]">
                  {p.paymentId || p.id.slice(0, 6)}
                </TableCell>

                <TableCell className="py-4 text-[#6A7C73]">
                  {formatCaseId(p.caseNumber)}
                </TableCell>

                {/* Patient Name with Icon */}
                <TableCell className="py-4 font-semimedium text-[#2E3833]">
                  <div className="flex items-center justify-center gap-2">
                    <span className="p-1.5 bg-[#F1F4F2] rounded-full text-[#6A7C73]">
                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </span>
                    {p.patient.firstName} {p.patient.lastName}
                  </div>
                </TableCell>
                <TableCell className="py-4 font-medium text-[#2E3833]">
                  {p.examName}
                </TableCell>
                <TableCell className="py-4">
                  <StatusBadge
                    status={
                      p.paymentStatus === "PAID" ? "Completed" : 
                      p.paymentStatus === "PENDING" ? "Pending" : "Cancelled"
                     } 
                  />
                </TableCell>
                <TableCell className="py-4 font-medium text-[#2E3833]">
                  $89.00
                </TableCell>

                <TableCell className="py-4">
                   <span className="text-[#6A7C73] bg-[#F8FAF9] px-2 py-1 rounded border border-[#DCE5DF]">Card</span>
                </TableCell>

                {/* Multi-line Date/Time Style */}
                <TableCell className="py-4">
                  <div className="flex flex-col items-center gap-1 text-[12px]">
                    <span className="flex items-center gap-1 text-[#2E3833] font-medium">
                      <Calendar size={14} className="text-[#6A7C73]" />
                      {new Date(p.updatedAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1 text-[#6A7C73]">
                      <Clock size={14} />
                      {new Date(p.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </TableCell>

                {/* Multi-icon Action Cell */}
                {/* <TableCell className="py-4 text-right px-6">
                  <div className="flex items-center justify-end gap-1">
 
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-[#6A7C73] hover:bg-[#F1F4F2]">
                          <MoreHorizontal size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40 rounded-xl border border-[#DCE5DF]">
                        <DropdownMenuItem className="cursor-pointer">
                          <Power className="mr-2 h-4 w-4" /> Deactivate
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-[#D74242]">
                          <Archive className="mr-2 h-4 w-4" /> Archive
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
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
            className={page === 1 ? "pointer-events-none opacity-60 text-[#2D4B3C]" : ""}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange && onPageChange(page + 1)}
            className={page === totalPages ? "pointer-events-none opacity-0 text-[#2D4B3C]" : ""}
          />
        </PaginationItem>

      </PaginationContent>
    </Pagination>
  </div>
)}
  </>
 )
}