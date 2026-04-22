'use client'

import { useEffect, useState } from 'react'
import StaffTable from '@/app/components/staffTable'
import { Users, UserCheck, UserX } from 'lucide-react' // Ensure lucide-react is installed
import Navbar from '@/app/components/navbar'
import StaffToolbar from "@/app/components/AdminStaffToolbar"
import CreatePopup from "./popup/page"

export default function StaffPage () {
const [isModalOpen, setIsModalOpen] = useState(false)
  const [data, setData] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    fetchData()
  }, [])

   const fetchData = async () => {
    const res = await fetch("/api/admin/staff")
    const json = await res.json()
    setData(json)
  }
  useEffect(() => {
    fetchData()
  }, [])

  const handleSearch = () => {}
  const handleFilter = () => {}

  if (!data) return <p>Loading...</p>

  const filteredStaff = data.staff.filter((staff: any) => {
  const matchesSearch =
    staff.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.phone?.toLowerCase().includes(searchQuery.toLowerCase())

  const matchesStatus =
    statusFilter === "all" ||
    (statusFilter === "active" && staff.isActive) ||
    (statusFilter === "inactive" && !staff.isActive)

  return matchesSearch && matchesStatus
})

  return (
    <>
    <Navbar title={'Staff Management'} subtitle='Manage staff members, permissions and access control.' />
      
      {/* Toolbar */}
      <StaffToolbar
        onSearch={setSearchQuery}
        onFilterChange={setStatusFilter}
        onAddStaff={() => setIsModalOpen(true)}
      />

      {/* Popup */}
      <CreatePopup
        open={isModalOpen}
        setOpen={setIsModalOpen}
        fetchData={fetchData}
      />
      
      
      <div className='space-y-3 mt-3'>
        {/* Stats Container */}
        <div className='grid sm:grid-cols-3 grid-cols-1 gap-3 sm:[&_span]:text-[15px] [&_span]:text-[13px] [&_span]:text-[#6A7C73] [&_strong]:text-[22px] sm:[&_strong]:text-[30px] [&_strong]:font-semibold [&_strong]:text-[#2E3833] [&_svg]:bg-[#476B591A] sm:[&_svg]:h-11 [&_svg]:h-10 sm:[&_svg]:w-11 [&_svg]:w-10 [&_svg]:text-[#476B59] sm:[&_svg]:p-2.5 [&_svg]:p-2.25 sm:[&_svg]:rounded-xl [&_svg]:rounded-lg'>
          <Stat
            title='Total Staff'
            value={data.stats.total}
            icon={<Users size={55} />}
          />

          <Stat
            title='Active Staff'
            value={data.stats.active}
            icon={<UserCheck size={55} />}
          />

          <Stat
            title='Inactive Staff'
            value={data.stats.inactive}
            icon={<UserX size={55} />}
          />
        </div>

        {/* Table */}
        {/* <StaffTable staff={data.staff} /> */}
        <StaffTable staff={filteredStaff} />
      </div>

    </>
  )
}

function Stat ({
  title,
  value,
  icon
}: {
  title: string
  value: number
  icon: React.ReactNode
}) {
  return (
    <div className='flex justify-between border border-[#DCE5DF] bg-white rounded-xl xl:px-4 xl:py-5 sm:p-4 p-2.5'>
      <div className='flex flex-col'>
        <span>{title}</span>
        <strong>{value}</strong>
        {/* Empty span to maintain spacing/structure from reference */}
        <span className='font-medium'></span>
      </div>
      {icon}
    </div>
  )
}
