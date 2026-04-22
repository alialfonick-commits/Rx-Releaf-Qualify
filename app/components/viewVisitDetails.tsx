import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  Activity,
  ArrowLeft,
  Calendar,
  CircleX,
  Clock4,
  CreditCard,
  Hash,
  MapPin,
  Phone,
  SquarePen,
  Stethoscope,
  User
} from 'lucide-react'
import AdminDashboard from '../(with-sidebar)/(dashboard)/admin/dashboard/page'
import { formatCaseId } from '@/lib/formatters'

export default function ViewVisitDetails ({ visit }: { visit: any }) {
  return (
    <>
      <div className='[&_p]:text-[#6A7C73] [&_span]:text-sm [&_span]:capitalize [&_strong]:font-semibold [&_strong]:text-[18px]'>
        <div className='flex justify-between items-center pb-4 gap-3 md:flex-row flex-col max-md:items-start'>
          <div className='flex items-center gap-2 [&_Button]:p-0 [&_strong]:font-medium [&_strong]:text-[20px] [&_p]:text-sm [&_Button]:cursor-pointer'>
            <Link href="/staff/dashboard">
              <ArrowLeft className='size-6!' />
            </Link>
            <div>
              <strong>Visit Details</strong>
              <p>
                Created on{' '}
                <span>{new Date(visit.createdAt).toLocaleString()}</span>
              </p>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-2 [&_Button]:py-5 [&_Button]:w-full [&_Button]:cursor-pointer [&_button]:uppercase [&_Button]:flex [&_Button]:gap-1 [&_Button]:items-center'>
            {/* <Button className='bg-white border border-[#EFEFEF]'>
              <SquarePen />
              Edit Visit
            </Button>
            <Button className='bg-[#FDD2D2] border border-[#ED9B9B] text-[#D30C05]'>
              <CircleX color='#D30C05' />
              Cancel Visit
            </Button> */}
          </div>
        </div>

        <div className='grid grid-cols-12 gap-4'>
          {/* Left Column: Patient Details */}
          <div className='bg-[#FFFFFF] max-[992px]:col-span-12 col-span-8 shadow-[0px_1px_2px_0px_#0000000D] border border-[#D7DED3] rounded-xl p-6'>
            <div className='flex items-center gap-2 mb-1'>
              <User className='text-[#476B59]' size={20} />
              <strong className='text-lg text-[#2E3833] font-bold'>
                Patient Details
              </strong>
            </div>

            <div className='bg-[#F1F4F2] h-px mt-3 mb-6'></div>

            <div className='grid sm:grid-cols-3 grid-cols-2 gap-y-6 gap-x-4'>
              <div className='space-y-1'>
                <p className='text-[13px] font-medium text-[#6A7C73] flex items-center gap-1.5'>
                  <Hash size={14} /> Visit ID
                </p>
                <span className='text-[15px] font-bold text-[#2E3833]'>
                  {formatCaseId(visit.caseNumber)}
                </span>
              </div>

              <div className='space-y-1'>
                <p className='text-[13px] font-medium text-[#6A7C73] flex items-center gap-1.5'>
                  <User size={14} /> Patient Name
                </p>
                <span className='text-[15px] font-bold text-[#2E3833]'>
                  {visit.patient.firstName} {visit.patient.lastName}
                </span>
              </div>

              <div className='space-y-1'>
                <p className='text-[13px] font-medium text-[#6A7C73] flex items-center gap-1.5'>
                  <Phone size={14} /> Contact
                </p>
                <span className='text-[15px] font-semibold text-[#2E3833]'>
                  {visit.patient.phone}
                </span>
              </div>

              <div className='space-y-1'>
                <p className='text-[13px] font-medium text-[#6A7C73] flex items-center gap-1.5'>
                  <Activity size={14} /> Type
                </p>
                <span className='text-[14px] text-[#2E3833] font-medium'>
                  {visit.consultationType}
                </span>
              </div>

              <div className='space-y-1'>
                <p className='text-[13px] font-medium text-[#6A7C73] flex items-center gap-1.5'>
                  <Calendar size={14} /> Date & Time
                </p>
                <span className='text-[14px] text-[#2E3833] font-medium'>
                  {new Date(visit.createdAt).toLocaleDateString()} at{' '}
                  {new Date(visit.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>

              <div className='space-y-1'>
                <p className='text-[13px] font-medium text-[#6A7C73] flex items-center gap-1.5'>
                  <MapPin size={14} /> Location
                </p>
                <span className='text-[14px] text-[#2E3833] font-medium'>
                  {visit.patientState}
                </span>
              </div>

              <div className='space-y-1'>
                <p className='text-[13px] font-medium text-[#6A7C73] flex items-center gap-1.5'>
                  <Stethoscope size={14} /> Provider
                </p>
                <span className='text-[14px] text-[#2E3833] font-medium'>
                  {visit.providerName || 'Pending'}
                </span>
              </div>

              <div className='space-y-1'>
                <p className='text-[13px] font-medium text-[#6A7C73]'>Status</p>
                <span className='bg-[#E7F5ED] rounded-full px-4 py-1 text-[#39AC63] text-xs font-medium capitalize tracking-wider block w-fit mt-1'>
                  {visit.status}
                </span>
              </div>

              <div className='space-y-1'>
                <p className='text-[13px] font-medium text-[#6A7C73] flex items-center gap-1.5'>
                  <CreditCard size={14} /> Payment
                </p>
                <span className='bg-[#FFF9E6] rounded-full px-4 py-1 text-[#D9A321] text-xs font-medium capitalize tracking-wider block w-fit mt-1'>
                  {visit.paymentStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Coordination Status */}
          <div className='bg-[#FFFFFF] max-[992px]:col-span-12 col-span-4 shadow-[0px_1px_2px_0px_#0000000D] border border-[#D7DED3] rounded-xl sm:p-6 p-4'>
            <strong className='text-lg text-[#2E3833] font-bold'>
              Coordination Status
            </strong>
            <div className='bg-[#F1F4F2] h-px mt-3 mb-5'></div>

            <div className='text-[#3399CC] flex gap-3 items-center'>
              <div className='bg-[#E0F0F7] rounded-full p-2.5 text-[#3399CC]'>
                <Clock4 size={22} />
              </div>
              <div>
                <span className='text-[16px] font-bold text-[#2E3833]'>
                  Visit Schedule
                </span>
                <p className='text-[13px] text-[#6A7C73] leading-tight'>
                  Your visit has been scheduled
                </p>
              </div>
            </div>

            <div className='mt-8 space-y-4'>
              <div className='flex justify-between items-center'>
                <p className='text-[14px] text-[#6A7C73] font-medium'>
                  Provider Status
                </p>
                <span className='text-[16px] font-bold text-[#2E3833]'>
                  Confirmed
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <p className='text-[14px] text-[#6A7C73] font-medium'>
                  Execution Sync
                </p>
                <span className='text-[16px] font-bold text-[#39AC63]'>
                  Healthy
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* 
    <div className="grid grid-cols-12 gap-2 mt-2">

     <div className="bg-[#FFFFFF] max-[992px]:col-span-12 col-span-8 shadow-[0px_1px_2px_0px_#0000000D] border border-[#D7DED3] rounded-xl sm:p-6 p-4">
      <div className="flex items-center gap-2">
       <User color="#5E6E66" size={22} />
       <strong>Visit Information</strong>
      </div>

      <div className="bg-[#EFEFEF] h-px mt-3 mb-4"></div>

      <div className="grid sm:grid-cols-3 grid-cols-2 gap-6">
       <div>
        <p>Consultations Type</p>
        <span>Async Consult</span>
       </div>
       <div>
        <p>Pharmacy Package</p>
        <span>Sarah Johnson</span>
       </div>
      </div>

      <div className="pt-4 [&_span]:bg-[#E8EDEA] [&_span]:border [&_span]:border-[#D7DED3] [&_span]:mt-2 [&_span]:rounded-lg [&_span]:p-4 [&_span]:block">
       <p>Reason for visit</p>
       <span>Patient reports moderate sinus pressure and congestion for the last 4 days. No fever, but experiencing mild fatigue and occasional dry cough.</span>
      </div>

      <div className="pt-5">
       <p>Symtops</p>
       <div className="flex flex-wrap gap-2 pt-2 [&_span]:bg-[#E8EDEA] [&_span]:py-2 [&_span]:px-4 sm:[&_span]:px-5 [&_span]:rounded-full">
        <span>Headache</span>
        <span>Dizziness</span>
        <span>Fatigue</span>
       </div>
      </div>

      <div className="pt-4 [&_span]:border [&_span]:border-[#D7DED3] [&_span]:mt-2 [&_span]:rounded-lg [&_span]:px-4 [&_span]:py-3 [&_span]:block [&_span]:h-29.25">
       <p>Internal Notes</p>
       <span>Patients has a history of hypertension. Last checkup was on 6 months ago</span>
      </div>

     </div>

     <div className="bg-[#FFFFFF] max-[992px]:col-span-12 col-span-4 shadow-[0px_1px_2px_0px_#0000000D] border border-[#D7DED3] rounded-xl p-6">

      <strong>Status History</strong>
      <div className="bg-[#EFEFEF] h-px mt-3 mb-4"></div>

     </div>

    </div> */}
      </div>
    </>
  )
}
