'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog'

import { X } from 'lucide-react'
import CreateStaffForm from '../create/page'

interface Props {
  open: boolean
  setOpen: (val: boolean) => void
  fetchData: () => void
}

export default function CreatePopup ({ open, setOpen, fetchData }: Props) {
  return (
    <>
      <div className='bg-white w-full max-w-md rounded-2xl shadow-xl border border-[#DCE5DF] overflow-hidden'>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className='max-w-md p-0 overflow-hidden'>
            {/* Header */}
            <DialogHeader className='flex flex-row items-center p-0 justify-between  border-b bg-[#F8FAF9]'>
              {/* <DialogTitle className="text-lg font-semibold">
            Create Staff
          </DialogTitle> */}

              <DialogClose asChild className=' '>
                <div className='flex items-center justify-between p-5 border-b border-[#F1F4F2]'>
                  <h2 className='text-xl font-medium text-[#2E3833]'>
                    Create New Staff
                  </h2>

                  {/* <button className='text-gray-500 hover:text-red-500'>
                  </button> */}
                </div>
              </DialogClose>
            </DialogHeader>

            {/* Form */}
            <div className='bg-white -mt-10'>
              <CreateStaffForm
                onSuccess={() => {
                  setOpen(false)
                  fetchData()
                }}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}
