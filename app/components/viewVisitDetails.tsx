import Link from "next/link"
import {
  Activity,
  ArrowLeft,
  Calendar,
  Clock4,
  CreditCard,
  Hash,
  Link as LinkIcon,
  Mail,
  MapPin,
  Phone,
  Stethoscope,
  User,
} from "lucide-react"
import { formatCaseId } from "@/lib/formatters"
import RetryQualiphyButton from "./RetryQualiphyButton"

type VisitDetails = {
  id: string
  caseNumber: number
  createdAt: Date | string
  updatedAt: Date | string
  consultationType: "URGENT_CARE" | "GOOD_FAITH" | "QUALIPHY_RX" | "CHOOSE_PHARMACY"
  patientState: string
  paymentStatus: "PENDING" | "PAID" | "FAILED"
  examId: number
  examName: string
  providerName?: string | null
  status: "PENDING" | "INVITED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED"
  paymentId?: string | null
  paymentLink?: string | null
  qualiphyPatientExamId?: string | null
  qualiphyMeetingUrl?: string | null
  qualiphyMeetingUuid?: string | null
  patient: {
    firstName: string
    lastName: string
    email: string
    phone: string
    dob: Date | string
    birthSex: "MALE" | "FEMALE"
  }
  staff?: {
    name?: string | null
  } | null
}

const consultationTypeLabels: Record<VisitDetails["consultationType"], string> = {
  GOOD_FAITH: "Good Faith Exam & Orders",
  QUALIPHY_RX: "QualiphyRx Packages",
  URGENT_CARE: "Urgent Care Visit",
  CHOOSE_PHARMACY: "Choose Pharmacy",
}

const visitStatusLabels: Record<VisitDetails["status"], string> = {
  PENDING: "Pending Provider",
  INVITED: "Scheduled",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
}

const visitStatusStyles: Record<VisitDetails["status"], string> = {
  PENDING: "bg-[#DFA62026] text-[#322A1B]",
  INVITED: "bg-[#3399CC26] text-[#287EA8]",
  IN_PROGRESS: "bg-[#DFA62026] text-[#322A1B]",
  COMPLETED: "bg-[#39AC6326] text-[#24924D]",
  CANCELLED: "bg-[#D74242] text-white",
}

const paymentStatusStyles: Record<VisitDetails["paymentStatus"], string> = {
  PAID: "bg-[#39AC6326] text-[#24924D]",
  PENDING: "bg-[#DFA62026] text-[#322A1B]",
  FAILED: "bg-[#D74242] text-white",
}

function formatDateTime(value: Date | string) {
  const date = new Date(value)

  return `${date.toLocaleDateString()} at ${date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`
}

function DetailItem({
  icon,
  label,
  children,
}: {
  icon?: React.ReactNode
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1">
      <p className="flex items-center gap-1.5 text-[15px] font-medium text-[#6A7C73]">
        {icon}
        {label}
      </p>
      <div className="text-[13px] font-medium text-[#2E3833]">{children}</div>
    </div>
  )
}

export default function ViewVisitDetails({
  visit,
  backHref = "/staff/visits",
}: {
  visit: VisitDetails
  backHref?: string
}) {
  const patientName = `${visit.patient.firstName} ${visit.patient.lastName}`

  return (
    <div className="[&_p]:text-[#6A7C73] [&_strong]:font-semibold [&_strong]:text-[18px]">
      <div className="mb-3 rounded-xl border border-[#DCE5DF] bg-white px-4 py-5 shadow-sm">
        <div className="flex items-center gap-3">
          <Link
            href={backHref}
            className="rounded-lg bg-[#F1F4F2] p-2 text-[#476B59] transition hover:bg-[#E4EBE6]"
          >
            <ArrowLeft className="size-5" />
          </Link>
          <div>
            <strong className="block text-[18px] font-semibold text-[#2E3833] sm:text-[20px]">Visit Details</strong>
            <p className="pt-1 text-sm font-normal text-[#6A7C73]">
              Created on <span>{formatDateTime(visit.createdAt)}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="bg-white max-[992px]:col-span-12 col-span-8 shadow-[0px_1px_2px_0px_#0000000D] border border-[#D7DED3] rounded-xl p-6">
          <div className="flex items-center gap-2 mb-1">
            <User className="text-[#476B59]" size={20} />
            <strong className="text-lg text-[#2E3833] font-bold">Patient & Visit Details</strong>
          </div>

          <div className="bg-[#F1F4F2] h-px mt-3 mb-6" />

          <div className="grid sm:grid-cols-3 grid-cols-2 gap-y-6 gap-x-4">
            <DetailItem icon={<Hash size={16} />} label="Visit ID">
              <span className="font-bold text-[#486B57]">{formatCaseId(visit.caseNumber)}</span>
            </DetailItem>

            <DetailItem icon={<User size={16} />} label="Patient Name">
              {patientName}
            </DetailItem>

            <DetailItem icon={<Mail size={16} />} label="Email">
              <span className="normal-case">{visit.patient.email}</span>
            </DetailItem>

            <DetailItem icon={<Phone size={16} />} label="Phone">
              {visit.patient.phone}
            </DetailItem>

            <DetailItem icon={<Calendar size={16} />} label="Date of Birth">
              {new Date(visit.patient.dob).toLocaleDateString()}
            </DetailItem>

            <DetailItem icon={<Activity size={16} />} label="Birth Sex">
              {visit.patient.birthSex === "MALE" ? "Male" : "Female"}
            </DetailItem>

            <DetailItem icon={<Activity size={16} />} label="Consultation Type">
              {consultationTypeLabels[visit.consultationType]}
            </DetailItem>

            <DetailItem icon={<Stethoscope size={16} />} label="Selected Service">
              <span className="normal-case">{visit.examName}</span>
            </DetailItem>

            <DetailItem icon={<MapPin size={16} />} label="Patient State">
              {visit.patientState}
            </DetailItem>

            <DetailItem icon={<User size={16} />} label="Assigned Staff">
              {visit.staff?.name || "Unassigned"}
            </DetailItem>

            <DetailItem icon={<Stethoscope size={16} />} label="Provider">
              {visit.providerName || "Pending"}
            </DetailItem>

            <DetailItem icon={<CreditCard size={16} />} label="Payment ID">
              <span className="normal-case">{visit.paymentId || "-"}</span>
            </DetailItem>
          </div>
        </div>

        <div className="bg-white max-[992px]:col-span-12 col-span-4 shadow-[0px_1px_2px_0px_#0000000D] border border-[#D7DED3] rounded-xl sm:p-6 p-4">
          <strong className="text-lg text-[#2E3833] font-bold">Status</strong>
          <div className="bg-[#F1F4F2] h-px mt-3 mb-5" />

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[14px] text-[#6A7C73] font-medium">Visit Status</p>
              <span className={`rounded-full px-3.5 py-1 text-[13px] font-medium ${visitStatusStyles[visit.status]}`}>
                {visitStatusLabels[visit.status]}
              </span>
            </div>

            {visit.paymentStatus === "PAID" && visit.status === "PENDING" && (
              <div className="flex justify-end">
                <RetryQualiphyButton examId={visit.id} />
              </div>
            )}

            <div className="flex items-center justify-between gap-3">
              <p className="text-[14px] text-[#6A7C73] font-medium">Payment</p>
              <span className={`rounded-full px-3.5 py-1 text-[13px] font-medium ${paymentStatusStyles[visit.paymentStatus]}`}>
                {visit.paymentStatus === "PAID" ? "Paid" : visit.paymentStatus === "PENDING" ? "Pending" : "Failed"}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <p className="text-[14px] text-[#6A7C73] font-medium">Qualiphy Patient Exam ID</p>
              <span className="text-[14px] font-semibold text-[#2E3833]">
                {visit.qualiphyPatientExamId || "-"}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <p className="text-[14px] text-[#6A7C73] font-medium">Meeting UUID</p>
              <span className="text-[14px] font-semibold text-[#2E3833]">
                {visit.qualiphyMeetingUuid || "-"}
              </span>
            </div>

            {visit.qualiphyMeetingUrl && (
              <Link
                href={visit.qualiphyMeetingUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[#DCE5DF] bg-[#F8FAF9] px-3 py-2 text-sm font-medium text-[#476B59] hover:bg-[#EEF2EE]"
              >
                <LinkIcon size={15} />
                Open Qualiphy Meeting
              </Link>
            )}

            {visit.paymentLink && (
              <Link
                href={visit.paymentLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[#DCE5DF] bg-[#F8FAF9] px-3 py-2 text-sm font-medium text-[#476B59] hover:bg-[#EEF2EE]"
              >
                <CreditCard size={15} />
                Open Payment Link
              </Link>
            )}
          </div>

          <div className="mt-8 rounded-xl border border-[#DCE5DF] bg-[#F8FAF9] p-4">
            <div className="flex items-start gap-3">
              <div className="bg-[#E0F0F7] rounded-full p-2.5 text-[#3399CC]">
                <Clock4 size={20} />
              </div>
              <div>
                <span className="text-[15px] font-bold text-[#2E3833]">Last Updated</span>
                <p className="text-sm text-[#6A7C73] leading-tight">{formatDateTime(visit.updatedAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
