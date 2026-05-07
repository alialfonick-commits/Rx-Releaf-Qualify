'use client'
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
 Calendar,
 Clock,
 Send,
 MapPin,
 Mail,
 Shield,
 CreditCard,
 User,
 Loader2,
} from "lucide-react"
import { Link as LinkIcon, Eye, Trash2, Check  } from "lucide-react"
import Link from "next/link"
import { formatCaseId } from "@/lib/formatters"
import { useState } from "react"
import RetryQualiphyButton from "./RetryQualiphyButton"

export type VisitRow = {
  id: string
  caseNumber: number
  createdAt: string
  consultationType: string
  patientState: string
  paymentStatus: string
  status: string
  patient: {
    firstName: string
    lastName: string
    email?: string
    phone?: string
  }
  staff?: {
    id?: string
    name?: string | null
  } | null
}

export function TableWrap({
  visits,
  loading,
  allowPaymentActions = true,
  allowDelete = true,
  allowDeletePaid = false,
  detailsBasePath = "/staff/visits",
  deleteEndpointBase = "/api/staff/visits",
  sendPaymentEndpoint = "/api/staff/send-payment",
  currentStaffId,
}: {
  visits: VisitRow[]
  loading?: boolean
  allowPaymentActions?: boolean
  allowDelete?: boolean
  allowDeletePaid?: boolean
  detailsBasePath?: string
  deleteEndpointBase?: string
  sendPaymentEndpoint?: string
  currentStaffId?: string
}) {
  const [sendEmail, setSendEmail] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleSend = async (id: string) => {
    const res = await fetch(sendPaymentEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        examId: id,
        sendSMS: false,
        sendEmail,
      }),
    })

    if (!res.ok) {
      alert("Payment link could not be sent")
      return
    }
  
    alert("Payment link sent")
  }

  if (loading) {
    return <p className="p-4">Loading...</p>
  }

  if (!visits || visits.length === 0) {
    return <p className="p-4">No visits found</p>
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this exam?")) return
  
    try {
      setDeletingId(id)
      const res = await fetch(`${deleteEndpointBase}/${id}`, {
        method: "DELETE",
      })

      if (!res.ok) {
        throw new Error("Delete failed")
      }
  
      alert("Deleted successfully")
  
      // refresh page (simple way)
      window.location.reload()
  
    } catch (err) {
      console.error(err)
      alert("Delete failed")
      setDeletingId(null)
    }
  }
 return (
  <div className="border border-[#DCE5DF] rounded-xl overflow-hidden">
   <Table>
    <TableHeader>
     <TableRow className="bg-[#F4F6F44D] text-[#6A7C73] font-medium">
      <TableHead>Visit ID</TableHead>
      <TableHead>Staff</TableHead>
      <TableHead>Patient</TableHead>
      <TableHead>Type</TableHead>
      <TableHead>Date & Time</TableHead>
      <TableHead>Payment</TableHead>
      <TableHead>Location</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Actions</TableHead>
     </TableRow>
    </TableHeader>

    <TableBody className="[&_tr]:hover:bg-gray-50">
     {visits.map((visit) => (
      <TableRow key={visit.id}>
       <TableCell className="font-medium text-[#486B57]">
        {formatCaseId(visit.caseNumber)}
       </TableCell>
       <TableCell>
        {visit.staff?.name || "Unassigned"}
       </TableCell>

       <TableCell>
        <div className="flex items-center gap-1">
         <User className="size-4 text-[#6A7C73]" />
         {visit.patient.firstName} {visit.patient.lastName}
        </div>
       </TableCell>

       <TableCell className="capitalize">
        {visit.consultationType}
       </TableCell>

       <TableCell>
        <div className="flex flex-col gap-0.5">
         <span className="flex items-center gap-1 text-[13px] text-[#2E3833]">
          <Calendar className="size-3.5" />
          {new Date(visit.createdAt).toLocaleDateString()}
         </span>
         <span className="flex items-center gap-1 text-[12px] text-[#6A7C73] mt-px">
          <Clock className="size-3.5" />
          {new Date(visit.createdAt).toLocaleTimeString()}
         </span>
        </div>
       </TableCell>

       <TableCell>
        {visit.paymentStatus === "PAID" ? (
         <span className="bg-[#39AC6326] text-[#39AC63] px-9.5 py-1 rounded-full font-semibold">
          Paid
         </span>
        ) : allowPaymentActions && (!currentStaffId || visit.staff?.id === currentStaffId) ? (
         <AlertDialog>
          <AlertDialogTrigger asChild>
           <button className="flex items-center gap-1.5 border w-fit bg-[#EEB32B26] border-[#F5A623] text-[#322A1B] px-2 py-1 rounded-lg font-medium cursor-pointer text-[13px]">
            <Send className="size-4" color="#DFA620" />
            Send link
           </button>
          </AlertDialogTrigger>

          <AlertDialogContent
           className="rounded-xl p-6 bg-white xl:h-fit h-[calc(100%-4rem)] overflow-auto scrollbar-thin scrollbar-thumb-[#D9A52080] scrollbar-track-transparent max-sm:w-[calc(100vw-1rem)]">
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
              {formatCaseId(visit.caseNumber)}
             </span>
            </div>
            <div className="flex justify-between mt-1">
             <p>Patient</p>
             <span>
              {visit.patient.firstName} {visit.patient.lastName}
             </span>
            </div>
           </div>

           <div className="text-sm [&_strong]:pb-2 [&_strong]:block [&_strong]:text-[#2B363B] [&_strong]:font-medium [&_strong]:text-[16px] [&_p]:text-[#2B363B] [&_span]:font-medium [&_span]:text-[#6A7C73]">
            <strong>Select Delivery Method</strong>
            <FieldSet>
             <FieldGroup className="gap-3">
              {/* <Field orientation="horizontal" className="bg-[#D9A5200D] border border-[#D9A5204D] rounded-xl py-4 px-3 cursor-pointer">
               <Checkbox
                id="sms"
                name="sms"
                checked={sendSMS}
                onCheckedChange={(val) => setSendSMS(!!val)}
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
                  <span>{visit.patient.phone}</span>
                 </div>
                </div>
               </FieldLabel>
              </Field> */}
              <Field orientation="horizontal" className="bg-[#D9A5200D] border border-[#D9A5204D] rounded-xl py-4 px-3 cursor-pointer">
               <Checkbox
                id="email"
                name="email"
                checked={sendEmail}
                onCheckedChange={(val) => setSendEmail(!!val)}
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
                  <span>{visit.patient.email || "Patient email"}</span>
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

            <button 
              onClick={() => handleSend(visit.id)}
              className="bg-[#D9A520] cursor-pointer text-white px-4 py-2 rounded-[10px] font-normal flex items-center gap-2">
             <LinkIcon size={16} />
             Generate & Send Link
            </button>
           </AlertDialogFooter>
          </AlertDialogContent>
         </AlertDialog>

        ) : (
         <span className="bg-[#DFA62026] text-[#322A1B] px-6 py-1 rounded-full font-semibold">
          Pending
         </span>
        )}
       </TableCell>

       <TableCell>
        <span className="flex items-center gap-1 text-[#2E3833]">
         <MapPin className="size-3.5" color="#6A7C73" />
         {visit.patientState}
        </span>
       </TableCell>
       <TableCell className="[&_span]:px-3.5 [&_span]:py-1 [&_span]:rounded-full [&_span]:font-medium [&_span]:text-[13px]">
        <div className="flex flex-col items-center gap-2">
        {visit.status === "IN_PROGRESS" && (
         <span className="bg-[#DFA62026] text-[#322A1B]">
          In Progress
         </span>
        )}
        {visit.status === "COMPLETED" && (
         <span className="bg-[#39AC6326] text-[#39AC63]">
          Completed
         </span>
        )}
        {visit.status === "PENDING" && (
         <span className="bg-[#DFA62026] text-[#322A1B]">
          Pending Provider
         </span>
        )}
        {visit.status === "CANCELLED" && (
         <span className="bg-[#D74242] text-[#ffffff]">
          Cancelled
         </span>
        )}
        {visit.status === "INVITED" && (
         <span className="bg-[#3399CC26] text-[#3399CC]">
          Scheduled
         </span>
        )}
        {visit.paymentStatus === "PAID" &&
          visit.status === "PENDING" &&
          (!currentStaffId || visit.staff?.id === currentStaffId) && (
          <RetryQualiphyButton
            examId={visit.id}
            onSuccess={() => window.location.reload()}
          />
        )}
        </div>
       </TableCell>

       <TableCell className="flex items-center justify-center gap-2">
        {detailsBasePath && (
          <Link
            href={`${detailsBasePath}/${visit.id}`}
            className="bg-[#3399CC26] text-[#3399CC] p-2 rounded-full hover:bg-[#3399CC40] transition cursor-pointer"
            title="View details"
          >
            <Eye size={15} />
          </Link>
        )}

        {visit.paymentStatus === "PAID" ? (
          <>
            {allowDelete && allowDeletePaid && (!currentStaffId || visit.staff?.id === currentStaffId) ? (
              <button
                onClick={() => handleDelete(visit.id)}
                disabled={deletingId === visit.id}
                className="bg-[#D74242] text-white p-2 rounded-full hover:bg-red-600 transition cursor-pointer disabled:cursor-wait disabled:opacity-70 disabled:hover:bg-[#D74242]"
                title={deletingId === visit.id ? "Deleting exam" : "Delete exam"}
              >
                {deletingId === visit.id ? (
                  <Loader2 size={15} className="animate-spin" />
                ) : (
                  <Trash2 size={15} />
                )}
              </button>
            ) : (
              <div
                className="bg-[#39AC6326] text-[#39AC63] p-2 rounded-full cursor-not-allowed"
                title="Paid items cannot be deleted"
              >
                <Check size={15} />
              </div>
            )}
          </>
        ) : allowDelete && (!currentStaffId || visit.staff?.id === currentStaffId) ? (
          <button
            onClick={() => handleDelete(visit.id)}
            disabled={deletingId === visit.id}
            className="bg-[#D74242] text-white p-2 rounded-full hover:bg-red-600 transition cursor-pointer disabled:cursor-wait disabled:opacity-70 disabled:hover:bg-[#D74242]"
            title={deletingId === visit.id ? "Deleting exam" : "Delete exam"}
          >
            {deletingId === visit.id ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <Trash2 size={15} />
            )}
          </button>
        ) : (
          <span className="text-xs text-[#8A9891]">-</span>
        )}
      </TableCell>
      </TableRow>
     ))}
    </TableBody>
   </Table>
  </div>
 )
}
