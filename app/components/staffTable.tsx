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

import { MoreHorizontal, Pencil, Key, Fingerprint, Mail, Phone, ShieldAlert, Trash2, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatStaffId } from "@/lib/formatters"

export default function StaffTable({ staff }: { staff: any[] }) {

  const toggleStatus = async (id: string, current: boolean) => {
    try {
      await fetch(`/api/admin/staff/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !current })
      })
      window.location.reload()
    } catch (err) {
      console.error(err)
    }
  }

  const deleteStaff = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this staff?")
    if (!confirmDelete) return
    try {
      await fetch(`/api/admin/staff/${id}`, { method: "DELETE" })
      window.location.reload()
    } catch (err) {
      console.error(err)
    }
  }

  if (!staff || staff.length === 0) {
    return <p>No staff found</p>
  }

  return (
    <div className='rounded-xl border border-[#DCE5DF] bg-white overflow-hidden shadow-sm'>
      <div className='overflow-x-auto'>
        <Table className="min-w-[1000px]">
          <TableHeader className='bg-[#F8FAF9]'>
            <TableRow className='border-b border-[#DCE5DF] hover:bg-transparent'>
              <TableHead className='py-5 text-[15px] font-bold text-[#6A7C73] pl-6'>
                Staff ID
              </TableHead>
              <TableHead className='py-5 text-[15px] font-bold text-[#6A7C73]'>
                Name
              </TableHead>
              <TableHead className='py-5 text-[15px] font-bold text-[#6A7C73]'>
                Email
              </TableHead>
              <TableHead className='py-5 text-[15px] font-bold text-[#6A7C73]'>
                Phone
              </TableHead>
              <TableHead className='py-5 text-[15px] font-bold text-[#6A7C73] text-center'>
                Status
              </TableHead>
              <TableHead className='py-5 text-[15px] font-bold text-[#6A7C73]'>
                Last Log In
              </TableHead>
              <TableHead className='py-5 text-[15px] font-bold text-[#6A7C73] text-right pr-8'>
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {staff.map((s: any) => (
              <TableRow
                key={s.id}
                className='border-b border-[#F1F4F2] last:border-0 hover:bg-[#F8FAF9]/50 transition-colors'
              >
                <TableCell className='py-4 font-semibold text-[#2E3833]'>
                  <div className="flex items-center gap-2 font-bold text-[#476B59]">
                    <Fingerprint size={16} className="text-[#6A7C73] opacity-70" />
                    {formatStaffId(s.staffNumber)}
                  </div>
                </TableCell>
                {/* Staff ID with Fingerprint Icon */}
                <TableCell className='py-4 pl-6'>
                  <div className="flex items-center gap-2 font-bold text-[#476B59]">
                    <Fingerprint size={16} className="text-[#6A7C73] opacity-70" />
                    {s.id.slice(0, 8).toUpperCase()}
                  </div>
                </TableCell>

                {/* Name with User Icon */}
                <TableCell className='py-4'>
                  <div className="flex items-center gap-2 font-bold text-[#2E3833] text-[15px]">
                    <div className="bg-[#F1F4F2] p-1.5 rounded-full text-[#6A7C73]">
                      <User size={14} />
                    </div>
                    {s.name || 'N/A'}
                  </div>
                </TableCell>

                {/* Email with Wrap Fix */}
                <TableCell className='py-4 max-w-[200px]'>
                   <div className="flex items-center gap-2 text-[#6A7C73] break-all">
                     <Mail size={14} className="opacity-60 flex-shrink-0" />
                     <span className="truncate hover:whitespace-normal hover:overflow-visible" title={s.email}>
                        {s.email}
                     </span>
                   </div>
                </TableCell>

                <TableCell className='py-4 text-[#6A7C73]'>
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="opacity-60 flex-shrink-0" />
                    {s.phone || '-'}
                  </div>
                </TableCell>

                <TableCell className='py-4 text-center'>
                  {s.isActive ? (
                    <span className='bg-[#E7F5ED] text-[#39AC63] px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider'>
                      Active
                    </span>
                  ) : (
                    <span className='bg-[#F1F4F2] text-[#6A7C73] px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider'>
                      Inactive
                    </span>
                  )}
                </TableCell>

                <TableCell className='py-4 text-[#6A7C73] font-medium'>
                  {s.lastLogin
                    ? new Date(s.lastLogin).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })
                    : 'Never'}
                </TableCell>

                <TableCell className='py-4 text-right pr-6'>
                  <div className="flex items-center justify-end gap-1">

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant='ghost' size='icon' className='h-8 w-8 text-[#6A7C73] hover:bg-[#F1F4F2]'>
                          <MoreHorizontal size={16} />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end" className="w-48 rounded-xl border-[#DCE5DF] shadow-lg">
                        <DropdownMenuItem
                          onClick={() => toggleStatus(s.id, s.isActive)}
                          className='cursor-pointer py-2.5 text-[#2E3833]'
                        >
                          <ShieldAlert className="mr-2 h-4 w-4" />
                          {s.isActive ? 'Deactivate Account' : 'Activate Account'}
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => deleteStaff(s.id)}
                          className='text-red-500 cursor-pointer py-2.5 focus:bg-red-50 focus:text-red-600'
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Staff
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}