import { Button } from "@/components/ui/button";
import { ArrowLeft, CircleX, Clock4, SquarePen, User } from "lucide-react";

export default function ViewVisitDetails() {
 return (
  <>
   <div className="[&_p]:text-[#6A7C73] [&_span]:text-sm [&_span]:capitalize [&_strong]:font-semibold [&_strong]:text-[18px]">

    <div className="flex justify-between items-center pb-4 gap-3 md:flex-row flex-col max-md:items-start">

     <div className="flex items-center gap-2 [&_Button]:p-0 [&_strong]:font-medium [&_strong]:text-[20px] [&_p]:text-sm [&_Button]:cursor-pointer">
      <Button><ArrowLeft className="size-6!" /></Button>
      <div>
       <strong>Visit Details</strong>
       <p>Created on <span>Dec26, 2025, 10:30AM</span></p>
      </div>
     </div>

     <div className="grid grid-cols-2 gap-2 [&_Button]:py-5 [&_Button]:w-full [&_Button]:cursor-pointer [&_button]:uppercase [&_Button]:flex [&_Button]:gap-1 [&_Button]:items-center">
      <Button className="bg-white border border-[#EFEFEF]"><SquarePen />Edit Visit</Button>
      <Button className="bg-[#FDD2D2] border border-[#ED9B9B] text-[#D30C05]"><CircleX color="#D30C05" />Cancel Visit</Button>
     </div>

    </div>

    <div className="grid grid-cols-12 gap-2">

     <div className="bg-[#FFFFFF] max-[992px]:col-span-12 col-span-8 shadow-[0px_1px_2px_0px_#0000000D] border border-[#D7DED3] rounded-xl p-6">
      <div className="flex items-center gap-2">
       <User color="#5E6E66" size={22} />
       <strong>Patient Details</strong>
      </div>

      <div className="bg-[#EFEFEF] h-px mt-3 mb-4"></div>

      <div className="grid sm:grid-cols-3 grid-cols-2 gap-6">
       <div>
        <p>Visit ID</p>
        <span>SVC-001</span>
       </div>
       <div>
        <p>Patient Name</p>
        <span>Sarah Clair</span>
       </div>
       <div>
        <p>Contact</p>
        <span>+1 (550) 235 6668</span>
       </div>
       <div>
        <p>Type</p>
        <span>initial consultation</span>
       </div>
       <div>
        <p>Date & Time</p>
        <span>Dec26, 2025, 10:30AM</span>
       </div>
       <div>
        <p>Location</p>
        <span>texas</span>
       </div>
       <div>
        <p>Provider</p>
        <span>Dr. Michael Chen</span>
       </div>
       <div>
        <p>Status</p>
        <span className="bg-[#3399CC26] rounded-full px-4 py-1 text-[#3399CC] font-semibold mt-1 block w-fit">scheduled</span>
       </div>
       <div>
        <p>Payment</p>
        <span className="bg-[#3399CC26] rounded-full px-4 py-1 text-[#3399CC] font-semibold mt-1 block w-fit">Paid</span>
       </div>
      </div>

     </div>

     <div className="bg-[#FFFFFF] max-[992px]:col-span-12 col-span-4 shadow-[0px_1px_2px_0px_#0000000D] border border-[#D7DED3] rounded-xl p-6">

      <strong>Coordination Status</strong>
      <div className="bg-[#EFEFEF] h-px mt-3 mb-4"></div>
      <div className="text-[#3399CC] flex gap-2 items-center text-sm [&_span]:text-[16px]">
       <Clock4 size={40} className="bg-[#E0F0F7] rounded-full p-2" />
       <div>
        <span>Visit Schedule</span>
        <p>Your visit has been schedule</p>
       </div>
      </div>
      <div className="pt-9 flex justify-between items-center [&_span]:text-[#2E3833] sm:[&_span]:text-[18px] [&_span]:text-[16px]">
       <p>Provider Status</p>
       <span>Confirmed</span>
      </div>
      <div className="pt-3 flex justify-between items-center [&_span]:text-[#39AC63] sm:[&_span]:text-[18px] [&_span]:text-[16px]">
       <p>Execution Sync</p>
       <span>Healthy</span>
      </div>
     </div>

    </div>

    <div className="grid grid-cols-12 gap-2 mt-2">

     <div className="bg-[#FFFFFF] max-[992px]:col-span-12 col-span-8 shadow-[0px_1px_2px_0px_#0000000D] border border-[#D7DED3] rounded-xl p-6">
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
       <div className="flex flex-wrap gap-2 pt-2 [&_span]:bg-[#E8EDEA] [&_span]:py-2 [&_span]:px-5 [&_span]:rounded-full">
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

    </div>

   </div>
  </>
 );
}