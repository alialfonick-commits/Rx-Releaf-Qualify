import {
  ClipboardList,
  LayoutDashboard,
  Folder,
  CreditCard,
  Settings,
  Shield
} from "lucide-react"

export const sidebarConfig = {
  ADMIN: [
    { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Execution Monitoring", path: "/admin/visits", icon: Shield },
    { label: "Staff", path: "/admin/staff", icon: Folder },
    { label: "Payment", path: "/admin/payments", icon: CreditCard },
    { label: "Consultations", path: "/admin/consultations", icon: Settings },
  ],
  STAFF: [
    { label: "Dashboard", path: "/staff/dashboard", icon: ClipboardList },
    { label: "Exams / Visits", path: "/staff/visits", icon: Folder },
  ],
  PUBLIC: [
    { label: "Home", path: "/", icon: ClipboardList }
  ]
}
