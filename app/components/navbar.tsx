'use client'

import { Bell, Search, ChevronDown, User, Shield } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
type NavbarProps = {
  title: string;
  subtitle?: string;
};

export default function Navbar ({ title, subtitle }: NavbarProps) {
  
  return (
    <div className='relative w-full border-b border-[#D7DED3] bg-white px-4 py-4 sm:flex-row flex-col flex md:items-center max-md:gap-2.5 justify-between rounded-xl shadow-[0px_1px_3px_0px_#0000001A] mb-3 mt-1.5'>
      <div className='sm:[&_strong]:text-[20px] [&_strong]:text-[18px] 2xl:[&_p]:text-base sm:[&_p]:text-[15px] [&_p]:text-sm'>
        <strong className='text-2xl block font-medium text-[#222222]'>
          {title}
        </strong>
        {subtitle && (
          <p className='text-sm text-[#677E73]'>
            {subtitle}
          </p>
        )}
      </div>

      <div className='flex items-center md:gap-4 gap-2 max-[600px]:flex-col max-[600px]:items-start'>
        {/* <div className='relative md:w-65 w-full'>
          <Search
            className='absolute left-3 top-1/2 -translate-y-1/2 text-[#6A7C73]'
            size={17}
          />
          <Input
            placeholder='Search...'
            className='pl-9 h-10 rounded-[10px] text-sm border-0 text-[#757575] bg-[#EFEFEF]'
          />
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <button className='relative p-2 cursor-pointer max-[600px]:absolute max-[600px]:top-1 max-[600px]:right-9 z-9'>
              <Bell size={18} color='#2B3B33' />
              <span className='absolute top-1 right-1 h-2 w-2 bg-[#C3A260] rounded-full' />
            </button>
          </DialogTrigger>

          <DialogContent className='bg-white'>
            <DialogHeader>
              <DialogTitle className='text-left'>Notifications</DialogTitle>
            </DialogHeader>
            <p className='text-sm text-gray-500'>
              You have no new notifications.
            </p>
          </DialogContent>
        </Dialog> */}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className='flex items-center gap-2 border hover:bg-[#E1EAE5] cursor-pointer border-[#5E6E66] px-3 py-2 rounded-md text-sm text-[#6A7C73] [&_span]:text-[#2E3833] focus-visible:outline-0 max-md:w-80 max-[600px]:w-full! justify-between max-[600px]:justify-center!'>
              Viewing as: <span className='font-medium'>Staff</span>
              <ChevronDown size={16} />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align='end'
            className='border border-[#D7DED3] bg-white w-42 [&_div]:cursor-pointer [&_div]:flex [&_div]:hover:bg-[#E1EAE5]'
          >
            <DropdownMenuItem>
              <User /> Staff
            </DropdownMenuItem>
            {/* <DropdownMenuItem>
              <Shield />
              Admin
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
