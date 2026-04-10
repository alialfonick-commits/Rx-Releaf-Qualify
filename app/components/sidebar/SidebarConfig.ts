import {
  ClipboardList,
  LayoutDashboard,
  Folder,
  CreditCard
} from "lucide-react"

export const sidebarConfig = {
  ADMIN: [
    { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Staff", path: "/admin/staff", icon: Folder }
  ],
  STAFF: [
    { label: "Dashboard", path: "/staff/dashboard", icon: ClipboardList },
    { label: "Cases", path: "/staff/cases", icon: Folder },
    { label: "Payments", path: "/staff/payments", icon: CreditCard }
  ],
  PUBLIC: [
    { label: "Home", path: "/", icon: ClipboardList }
  ]
}