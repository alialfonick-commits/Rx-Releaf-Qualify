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
} from "@/app/components/paymentsActionMenu"
import {
  Calendar,
  Fingerprint,
  Mail,
  MoreHorizontal,
  Phone,
  ShieldAlert,
  Trash2,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatStaffId } from "@/lib/formatters"

export type StaffRow = {
  id: string
  name?: string | null
  email?: string | null
  phone?: string | null
  staffNumber?: number | null
  isActive: boolean
  lastLogin?: string | Date | null
  createdAt?: string | Date
}

function StatusBadge({ active }: { active: boolean }) {
  return active ? (
    <span className="inline-flex min-w-20 justify-center rounded-full bg-[#39AC6326] px-3 py-1 text-xs font-semibold text-[#24924D]">
      Active
    </span>
  ) : (
    <span className="inline-flex min-w-20 justify-center rounded-full bg-[#DFA62026] px-3 py-1 text-xs font-semibold text-[#322A1B]">
      Inactive
    </span>
  )
}

function formatDate(value?: string | Date | null) {
  if (!value) return "Never"

  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export default function StaffTable({ staff }: { staff: StaffRow[] }) {
  const toggleStatus = async (id: string, current: boolean) => {
    try {
      const res = await fetch(`/api/admin/staff/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !current }),
      })

      if (!res.ok) throw new Error("Update failed")

      window.location.reload()
    } catch {
      alert("Staff status could not be updated")
    }
  }

  const deleteStaff = async (id: string) => {
    if (!confirm("Are you sure you want to delete this staff member?")) return

    try {
      const res = await fetch(`/api/admin/staff/${id}`, { method: "DELETE" })

      if (!res.ok) throw new Error("Delete failed")

      window.location.reload()
    } catch {
      alert("Staff member could not be deleted")
    }
  }

  if (!staff || staff.length === 0) {
    return (
      <div className="rounded-xl border border-[#DCE5DF] bg-white p-8 text-center text-[#6A7C73]">
        No staff found
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-[#DCE5DF] bg-white shadow-sm">
      <div className="border-b border-[#DCE5DF] bg-[#F8FAF9] px-4 py-4">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-[18px] font-semibold text-[#2E3833]">Staff Directory</h2>
            <p className="text-sm text-[#6A7C73]">Manage staff accounts, login access, and contact details.</p>
          </div>
          <div className="rounded-lg border border-[#DCE5DF] bg-white px-3 py-2 text-sm font-medium text-[#476B59]">
            {staff.length} shown
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table className="min-w-[980px]">
          <TableHeader>
            <TableRow className="bg-[#FCFCFC] text-[#6A7C73]">
              <TableHead>Staff ID</TableHead>
              <TableHead>Staff Member</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="text-[#2E3835] [&_td]:text-sm [&_tr]:hover:bg-gray-50">
            {staff.map((s) => (
              <TableRow key={s.id} className="border-b border-[#F1F4F2] last:border-0">
                <TableCell>
                  <span className="inline-flex items-center gap-2 font-semibold text-[#486B57]">
                    <Fingerprint size={15} className="text-[#6A7C73]" />
                    {s.staffNumber ? formatStaffId(s.staffNumber) : "Unassigned"}
                  </span>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-[#F1F4F2] p-1.5 text-[#6A7C73]">
                      <User size={14} />
                    </span>
                    <div className="flex flex-col">
                      <span className="font-semibold text-[#2E3833]">{s.name || "N/A"}</span>
                      <span className="text-xs text-[#8A9891]">{s.id.slice(0, 8).toUpperCase()}</span>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <span className="inline-flex max-w-[260px] items-center gap-2 rounded-full bg-[#DFA62026] px-2.5 py-1 text-xs normal-case text-[#322A1B]">
                    <Mail size={13} className="shrink-0" />
                    <span className="truncate" title={s.email || undefined}>{s.email || "-"}</span>
                  </span>
                </TableCell>

                <TableCell>
                  <span className="inline-flex items-center gap-2 text-[#6A7C73]">
                    <Phone size={14} />
                    {s.phone || "-"}
                  </span>
                </TableCell>

                <TableCell>
                  <StatusBadge active={s.isActive} />
                </TableCell>

                <TableCell>
                  <span className="inline-flex items-center gap-2 text-[#6A7C73]">
                    <Calendar size={14} />
                    {formatDate(s.lastLogin)}
                  </span>
                </TableCell>

                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-[#6A7C73] hover:bg-[#F1F4F2]"
                      >
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-48 rounded-xl border-[#DCE5DF] shadow-lg">
                      <DropdownMenuItem
                        onClick={() => toggleStatus(s.id, s.isActive)}
                        className="cursor-pointer py-2.5 text-[#2E3833]"
                      >
                        <ShieldAlert className="mr-2 h-4 w-4" />
                        {s.isActive ? "Deactivate Account" : "Activate Account"}
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => deleteStaff(s.id)}
                        className="cursor-pointer py-2.5 text-[#D74242] focus:bg-red-50 focus:text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Staff
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
