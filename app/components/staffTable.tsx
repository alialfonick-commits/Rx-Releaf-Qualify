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

import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function StaffTable({ staff }: { staff: any[] }) {

    const toggleStatus = async (id: string, current: boolean) => {
        try {
            await fetch(`/api/admin/staff/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                isActive: !current
            })
            })
        
            // refresh page
            window.location.reload()
        
        } catch (err) {
            console.error(err)
        }
    }

  function StatusBadge({ active }: { active: boolean }) {
    return active ? (
      <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full">
        Active
      </span>
    ) : (
      <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full">
        Inactive
      </span>
    )
  }

  if (!staff || staff.length === 0) {
    return <p>No staff found</p>
  }

  const deleteStaff = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this staff?")
  
    if (!confirmDelete) return
  
    try {
      await fetch(`/api/admin/staff/${id}`, {
        method: "DELETE"
      })
  
      // refresh
      window.location.reload()
  
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="border rounded-xl overflow-hidden bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Staff ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Login</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {staff.map((s) => (
            <TableRow key={s.id}>
              <TableCell>{s.id.slice(0, 6)}</TableCell>

              <TableCell>{s.name || "N/A"}</TableCell>

              <TableCell>{s.email}</TableCell>

              <TableCell>{s.phone || "-"}</TableCell>

              <TableCell>
                <StatusBadge active={s.isActive} />
              </TableCell>

              <TableCell>
                {s.lastLogin
                  ? new Date(s.lastLogin).toLocaleDateString()
                  : "Never"}
              </TableCell>

              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => toggleStatus(s.id, s.isActive)}
                    className="cursor-pointer"
                    >
                    {s.isActive ? "Deactivate" : "Activate"}
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => deleteStaff(s.id)}
                      className="text-red-500 cursor-pointer"
                    >
                      Delete
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