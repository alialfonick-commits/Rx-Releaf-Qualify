'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/app/components/paymentsActionMenu'

import { MoreHorizontal, Pencil, Key } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatStaffId } from '@/lib/formatters'

export default function StaffTable ({ staff }: { staff: any[] }) {
  const toggleStatus = async (id: string, current: boolean) => {
    try {
      await fetch(`/api/admin/staff/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !current })
      })
      window.location.reload()
    } catch (err) {
      console.error(err)
    }
  }

  const deleteStaff = async (id: string) => {
    const confirmDelete = confirm('Are you sure you want to delete this staff?')
    if (!confirmDelete) return
    try {
      await fetch(`/api/admin/staff/${id}`, { method: 'DELETE' })
      window.location.reload()
    } catch (err) {
      console.error(err)
    }
  }

  if (!staff || staff.length === 0) {
    return <p>No staff found</p>
  }

  return (
    <div className='rounded-xl border border-[#DCE5DF] bg-white overflow-hidden'>
      <div className='overflow-x-auto'>
        <Table>
          <TableHeader className='bg-[#F8FAF9]'>
            <TableRow className='border-b border-[#DCE5DF] hover:bg-transparent'>
              <TableHead className='py-4 font-medium text-[#6A7C73]'>
                Staff ID
              </TableHead>
              <TableHead className='py-4 font-medium text-[#6A7C73]'>
                Name
              </TableHead>
              <TableHead className='py-4 font-medium text-[#6A7C73]'>
                Email
              </TableHead>
              <TableHead className='py-4 font-medium text-[#6A7C73]'>
                Phone
              </TableHead>
              <TableHead className='py-4 font-medium text-[#6A7C73]'>
                Status
              </TableHead>
              <TableHead className='py-4 font-medium text-[#6A7C73]'>
                Last Log In
              </TableHead>
              <TableHead className='py-4 font-medium text-[#6A7C73] text-right px-6'>
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {staff.map(s => (
              <TableRow
                key={s.id}
                className='border-b border-[#F1F4F2] last:border-0 hover:bg-[#F8FAF9]/50 transition-colors'
              >
                <TableCell className='py-4 font-semibold text-[#2E3833]'>
                  {formatStaffId(s.staffNumber)}
                </TableCell>

                <TableCell className='py-4 font-semibold text-[#2E3833]'>
                  {s.name || 'N/A'}
                </TableCell>

                <TableCell className='py-4 text-[#6A7C73]'>{s.email}</TableCell>

                <TableCell className='py-4 text-[#6A7C73]'>
                  {s.phone || '-'}
                </TableCell>

                <TableCell className='py-4'>
                  {s.isActive ? (
                    <span className='bg-[#E7F5ED] text-[#39AC63] px-3 py-1 rounded-full text-xs font-medium'>
                      Active
                    </span>
                  ) : (
                    <span className='bg-[#F1F4F2] text-[#6A7C73] px-3 py-1 rounded-full text-xs font-medium'>
                      Inactive
                    </span>
                  )}
                </TableCell>

                <TableCell className='py-4 text-[#6A7C73]'>
                  {s.lastLogin
                    ? new Date(s.lastLogin).toLocaleDateString()
                    : 'Never'}
                </TableCell>

                <TableCell className='py-4 text-right px-6'>
                  {/* Original Dropdown Logic */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='h-8 w-8 text-[#6A7C73] hover:text-[#476B59] hover:bg-[#476B591A]'
                      >
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => toggleStatus(s.id, s.isActive)}
                        className='cursor-pointer'
                      >
                        {s.isActive ? 'Deactivate' : 'Activate'}
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => deleteStaff(s.id)}
                        className='text-red-500 cursor-pointer'
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
    </div>
  )
}
