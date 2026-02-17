import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from "@/components/ui/table"
import {
 AlertDialog,
 AlertDialogTrigger,
 AlertDialogContent,
 AlertDialogHeader,
 AlertDialogTitle,
 AlertDialogDescription,
 AlertDialogFooter,
 AlertDialogCancel,
} from "./paymentlinkDialogComp"
import { Checkbox } from "./paymentlinkCheckboxComp"
import {
 Field,
 FieldGroup,
 FieldLabel,
 FieldSet,
} from "@/components/ui/field"
import {
 UserRound,
 Calendar,
 Clock,
 Send,
 MapPin,
 MessageSquare,
 Mail,
 Shield,
 CreditCard,
} from "lucide-react"
import { Link as LinkIcon } from "lucide-react"
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

    <TableBody className="[&_tr]:hover:bg-gray-50">
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
         <AlertDialog>
          <AlertDialogTrigger asChild>
           <button className="flex items-center gap-2 border w-fit bg-[#EEB32B26] border-[#F5A623] text-[#322A1B] px-2 py-1 rounded-lg font-semibold cursor-pointer">
            <Send className="size-4" />
            Send link
           </button>
          </AlertDialogTrigger>

          <AlertDialogContent
           className="rounded-xl p-6 bg-white">
           <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-[18px] font-semibold">
             <CreditCard color="#D9A520" />Send Payment Link
            </AlertDialogTitle>

            <AlertDialogDescription className="text-[#6A7C73] text-sm">
             Generate a secure payment link for John Smith
            </AlertDialogDescription>
           </AlertDialogHeader>

           <div className="border border-[#DDE3DF] bg-[#F1F4F280] rounded-lg p-3 text-sm [&_p]:text-[#6A7C73] [&_span]:font-medium [&_span]:text-[#2B363B]">
            <div className="flex justify-between">
             <p>Case ID</p>
             <span>
              SVC-001
             </span>
            </div>
            <div className="flex justify-between mt-1">
             <p>Patient</p>
             <span>
              John Smith
             </span>
            </div>
           </div>

           <div className="text-sm [&_strong]:pb-2 [&_strong]:block [&_strong]:text-[#2B363B] [&_strong]:font-medium [&_strong]:text-[16px] [&_p]:text-[#2B363B] [&_span]:font-medium [&_span]:text-[#6A7C73]">
            <strong>Select Delivery Method</strong>
            <FieldSet>
             <FieldGroup className="gap-3">
              <Field orientation="horizontal" className="bg-[#D9A5200D] border border-[#D9A5204D] rounded-xl py-4 px-3 cursor-pointer">
               <Checkbox
                id="sms"
                name="sms"
                defaultChecked
                className="cursor-pointer"
               />
               <FieldLabel
                htmlFor="sms"
                className="font-normal cursor-pointer"
               >
                <div className="flex items-center gap-2 [&_span]:block [&_span]:text-[#6A7C73]">
                 <MessageSquare className="bg-[#F1F4F2] p-2.5 rounded-xl" color="#6A7C73" size={40} />
                 <div>
                  SMS
                  <span>(555) 123-4567</span>
                 </div>
                </div>
               </FieldLabel>
              </Field>
              <Field orientation="horizontal" className="bg-[#D9A5200D] border border-[#D9A5204D] rounded-xl py-4 px-3 cursor-pointer">
               <Checkbox
                id="email"
                name="email"
                defaultChecked
                className="cursor-pointer"
               />
               <FieldLabel
                htmlFor="email"
                className="font-normal cursor-pointer"
               >
                <div className="flex items-center gap-2 [&_span]:block [&_span]:text-[#6A7C73]">
                 <Mail className="bg-[#F1F4F2] p-2.5 rounded-xl" color="#6A7C73" size={40} />
                 <div>
                  Email
                  <span>john.smith@email.com</span>
                 </div>
                </div>
               </FieldLabel>
              </Field>
             </FieldGroup>
            </FieldSet>
           </div>

           <div className="border border-[#0DA2E733] bg-[#0DA2E70D] rounded-lg p-3 text-sm [&_strong]:text-[#2B363B] [&_strong]:font-medium [&_strong]:text-[16px] [&_p]:text-[#6A7C73] [&_span]:font-medium [&_span]:text-[#2B363B] [&_svg]:text-[#0DA2E7] [&_div]:flex [&_div]:items-center [&_div]:gap-2 [&_div]:pt-1">
            <strong>Secure Payment Link Features</strong>
            <div>
             <LinkIcon size={15} /> <p>Case-bound: linked to this specific visit request</p>
            </div>
            <div>
             <Shield size={15} /> <p>Single-use: can only be used once</p>
            </div>
            <div>
             <Clock size={15} /> <p>Time-limited: expires in 24 hours</p>
            </div>
           </div>
           <p className="text-[13px] text-[#6A7C73] leading-4.5">This payment link supports the coordination of your visit request. Payment completion does not confirm any appointment or provider assignment.</p>

           <AlertDialogFooter className="mt-2 flex items-center gap-2 text-sm">
            <AlertDialogCancel className="rounded-[10px] border-[#DDE3DF] text-[#2B363B] font-medium cursor-pointer bg-[#FBFAF9]">
             Cancel
            </AlertDialogCancel>

            <button className="bg-[#D9A520] cursor-pointer text-white px-4 py-2 rounded-[10px] font-normal flex items-center gap-2">
             <LinkIcon size={16} />
             Generate & Send Link
            </button>
           </AlertDialogFooter>
          </AlertDialogContent>
         </AlertDialog>

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
        {visit.status === "Cancelled" && (
         <span className="bg-[#D74242] text-[#ffffff] px-6.5 py-1 rounded-full font-semibold">
          Cancelled
         </span>
        )}
        {visit.status === "Scheduled" && (
         <span className="bg-[#3399CC26] text-[#3399CC] px-6.5 py-1 rounded-full font-semibold">
          Scheduled
         </span>
        )}
       </TableCell>

       <TableCell>
        <Link
         href={visit.actionUrl}
         className="font-medium"
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