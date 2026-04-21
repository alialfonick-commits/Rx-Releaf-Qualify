"use client"

import { Search, ListFilter, Plus } from "lucide-react"
import { useState } from "react"

interface StaffToolbarProps {
 onSearch: (value: string) => void;
  onFilterChange: (status: string) => void;
  onAddStaff: () => void;
}

export default function StaffToolbar({ 
  onSearch, 
  onFilterChange, 
  onAddStaff 
}: StaffToolbarProps) {
  const [search, setSearch] = useState("")

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setSearch(val)
    onSearch(val)
  }

  // This handles the navigation to the URL you provided
const handleAddStaff = () => {
  onAddStaff()
}

  return (
    <div className="bg-white border border-[#DCE5DF] p-3 rounded-xl flex items-center gap-3 flex-wrap">
      
      {/* Search Input */}
      <div className="relative flex-1 min-w-50">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6A7C73]" size={18} />
        <input
          type="text"
          placeholder="Search staff..."
          value={search}
          onChange={handleSearchChange}
          className="w-full bg-[#F8FAF9] border border-[#DCE5DF] rounded-lg py-2.5 pl-10 pr-4 text-[#2E3833] placeholder:text-[#6A7C73] focus:outline-none focus:ring-1 focus:ring-[#476B59] transition-all"
        />
      </div>

      {/* Status Filter */}
      <div className="relative">
        <select
          onChange={(e) => onFilterChange(e.target.value)}
          className="appearance-none bg-white border border-[#DCE5DF] rounded-lg py-2.5 pl-10 pr-10 text-[#2E3833] font-medium cursor-pointer focus:outline-none hover:bg-[#F8FAF9] transition-all"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <ListFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6A7C73]" size={18} />
      </div>

      {/* Add Staff Button - Now properly linked */}
      <button
        onClick={handleAddStaff}
        className="bg-[#D9A321] hover:bg-[#C2921D] text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors active:scale-95"
      >
        <Plus size={20} />
        Add Staff
      </button>

    </div>
  )
}
