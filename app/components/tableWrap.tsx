import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  UserRound,
  Calendar,
  Clock,
  Send,
  MapPin,
} from "lucide-react"
import Link from "next/link"

const visits = [
  {
    visitid: "VIS-001",
    patient: "Sarah Clair",
    type: "Initial Consultation",
    date: "2024-01-15",
    time: "10:00 AM",
    provider: "Dr. Michael Chen",
    payment: "Send link",
    location: "Virtual",
    status: "In Progress",
    actionUrl: "#",
  },
  {
    visitid: "VIS-002",
    patient: "Robert Williams",
    type: "Follow-up",
    date: "2024-01-15",
    time: "11:30 AM",
    provider: "Dr. Emily Davis",
    payment: "Send link",
    location: "Virtual",
    status: "In Progress",
    actionUrl: "#",
  },
  {
    visitid: "VIS-003",
    patient: "Maria Garcia",
    type: "Renewal",
    date: "2024-01-15",
    time: "2:00 PM",
    provider: "Dr. James Wilson",
    payment: "Paid",
    location: "Virtual",
    status: "Completed",
    actionUrl: "#",
  },
  {
    visitid: "VIS-004",
    patient: "David Brown",
    type: "Initial Consultation",
    date: "2024-01-16",
    time: "9:00 AM",
    provider: "Pending Assignment",
    payment: "Paid",
    location: "Virtual",
    status: "Pending Provider",
    actionUrl: "#",
  },
]

export function TableWrap() {
  return (
    <div className="border border-[#DCE5DF] rounded-xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#F4F6F44D] text-[#6A7C73] font-medium">
            <TableHead>Visit ID</TableHead>
            <TableHead>Patient</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Provider</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {visits.map((visit) => (
            <TableRow key={visit.visitid}>
              <TableCell className="font-medium text-[#486B57]">
                {visit.visitid}
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-2">
                  <UserRound className="size-4 text-[#6A7C73]" />
                  {visit.patient}
                </div>
              </TableCell>

              <TableCell>{visit.type}</TableCell>

              <TableCell>
                <div className="flex flex-col gap-0.5">
                  <span className="flex items-center gap-1 text-sm text-[#2E3833]">
                    <Calendar className="size-4" />
                    {visit.date}
                  </span>
                  <span className="flex items-center gap-1 text-[12px] text-[#6A7C73]">
                    <Clock className="size-4" />
                    {visit.time}
                  </span>
                </div>
              </TableCell>

              <TableCell>{visit.provider}</TableCell>

              <TableCell>
                {visit.payment === "Paid" ? (
                  <span className="bg-[#39AC6326] text-[#39AC63] px-9.5 py-1 rounded-full font-semibold">
                    Paid
                  </span>
                ) : (
                  <Link href="#" className="flex items-center gap-2 border w-fit bg-[#EEB32B26] border-[#F5A623] text-[#322A1B] px-2 py-1 rounded-lg font-semibold">
                    <Send className="size-4" />
                    Send link
                  </Link>
                )}
              </TableCell>

              <TableCell>
                <span className="flex items-center gap-1 text-[#2E3833]">
                  <MapPin className="size-4" color="#6A7C73" />
                  {visit.location}
                </span>
              </TableCell>

              <TableCell>
                {visit.status === "In Progress" && (
                  <span className="bg-[#DFA62026] text-[#322A1B] px-6 py-1 rounded-full font-semibold">
                    In Progress
                  </span>
                )}
                {visit.status === "Completed" && (
                  <span className="bg-[#39AC6326] text-[#39AC63] px-6 py-1 rounded-full font-semibold">
                    Completed
                  </span>
                )}
                {visit.status === "Pending Provider" && (
                  <span className="bg-[#DFA62026] text-[#322A1B] px-4 py-1 rounded-full font-semibold">
                    Pending Provider
                  </span>
                )}
              </TableCell>

              <TableCell>
                <Link
                  href={visit.actionUrl}
                  className="text-[#2B3B33] font-medium hover:underline"
                >
                  View
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
