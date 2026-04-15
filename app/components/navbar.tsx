"use client"

import { Bell, Search, ChevronDown, User, Shield } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

export default function Navbar() {
    return (
        <div className="w-full border-b border-[#D7DED3] bg-white px-6 py-3 flex items-center justify-between">

            <div>
                <strong className="text-2xl block font-medium text-[#222222]">
                    Staff Dashboard
                </strong>
                <p className="text-sm text-[#677E73]">
                    Create and manage virtual visit requests
                </p>
            </div>

            <div className="flex items-center gap-4">

                <div className="relative w-65">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6A7C73]" size={17} />
                    <Input
                        placeholder="Search..."
                        className="pl-9 h-10 rounded-[10px] text-sm border-0 text-[#757575] bg-[#EFEFEF]"
                    />
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <button className="relative p-2 cursor-pointer">
                            <Bell size={18} color="#2B3B33" />
                            <span className="absolute top-1 right-1 h-2 w-2 bg-[#C3A260] rounded-full" />
                        </button>
                    </DialogTrigger>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Notifications</DialogTitle>
                        </DialogHeader>
                        <p className="text-sm text-gray-500">
                            You have no new notifications.
                        </p>
                    </DialogContent>
                </Dialog>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-2 border hover:bg-[#E1EAE5] cursor-pointer border-[#5E6E66] px-3 py-2 rounded-md text-sm text-[#6A7C73] [&_span]:text-[#2E3833] focus-visible:outline-0">
                            Viewing as: <span className="font-medium">Staff</span>
                            <ChevronDown size={16} />
                        </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="border border-[#D7DED3] bg-white w-42 [&_div]:cursor-pointer [&_div]:flex [&_div]:hover:bg-[#E1EAE5]">
                        <DropdownMenuItem><User /> Staff</DropdownMenuItem>
                        <DropdownMenuItem><Shield />Admin</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
        </div>
    )
}