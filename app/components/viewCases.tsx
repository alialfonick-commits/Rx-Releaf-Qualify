import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarDays, MapPin, User, Mail, Phone, CreditCard, CalendarClock, Mars, Stethoscope } from "lucide-react";

export default function ViewCases() {
 return (
  <>

   <div className="max-w-4xl w-full [&_p]:text-[#6A7C73] [&_span]:text-sm [&_strong]:font-semibold sm:[&_strong]:text-[18px] [&_strong]:text-[16px] max-sm:[&_p]:text-[15px]">
    <Button className="text-[#2E3833] mb-4 cursor-pointer">
     <ArrowLeft className="size-6" />Back to Cases
    </Button>
    <div className="flex justify-between sm:items-center mb-4 bg-[#FFFFFF] shadow-[0px_1px_2px_0px_#0000000D] border border-[#D7DED3] rounded-xl sm:p-6 p-3 max-sm:pt-1.5! max-sm:flex-col max-sm:gap-3">

     <div>
      <strong className="sm:text-[22px]! font-medium text-[#2E3833]">Sarah Johnson</strong>
      <span className="block">Case #SVC-001</span>
      <p className="flex items-center gap-3 pt-3 text-sm">
       <span className="flex items-center gap-1">
        <CalendarDays size={14} />
        Created: Dec 26, 2024
       </span>
       <span className="flex items-center gap-1">
        <MapPin size={14} />
        California
       </span>
      </p>
     </div>

     <div className="flex gap-2 [&_span]:bg-[#E0F0F7] [&_span]:text-[#3399CC] [&_span]:text-xs [&_span]:px-4 [&_span]:py-1 [&_span]:rounded-full [&_span]:font-medium">
      <span>
       Coordinating Visit
      </span>
      <span>
       Execution: In Progress
      </span>
     </div>

    </div>

    <div className="bg-[#E1EAE580] border border-[#E1EAE5] rounded-xl p-4 [&_strong]:text-[16px]! text-sm text-[#2E3833]">
     <strong>Status Update:</strong> We are coordinating your visit. Pending provider acceptance. Next steps coming shortly.
    </div>

    <div className="mt-4 bg-[#FFFFFF] shadow-[0px_1px_2px_0px_#0000000D] border border-[#D7DED3] rounded-xl sm:p-6 p-4">

     <div className="flex items-center gap-2">
      <User color="#5E6E66" size={20} />
      <strong>Patient Details</strong>
     </div>

     <div className="bg-[#EFEFEF] h-px mt-3 mb-5"></div>

     <div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-6 gap-2 [&_svg]:text-[#5E6E66] [&_p]:flex [&_p]:items-center [&_p]:gap-1 [&_p]:pb-0.75">

      <div>
       <p>
        <User size={16} />
        Name</p>
       <span>Sarah Clair</span>
      </div>

      <div>
       <p>
        <CalendarClock size={16} />
        Date of birth</p>
       <span>1985-03-15</span>
      </div>

      <div>
       <p>
        <Mars size={16} />
        Birth Sex</p>
       <span>Female</span>
      </div>

      <div>
       <p>
        <MapPin size={14} />
        State</p>
       <span>Texas</span>
      </div>

      <div>
       <p>
        <Mail size={14} />
        Email
       </p>
       <span>sarah.johnson@email.com</span>
      </div>

      <div>
       <p>
        <Phone size={14} />
        Phone
       </p>
       <span>(555) 123-4567</span>
      </div>

     </div>

    </div>

    <div className="mt-4 bg-[#FFFFFF] shadow-[0px_1px_2px_0px_#0000000D] border border-[#D7DED3] rounded-xl sm:p-6 p-4">

     <div className="flex items-center gap-2">
      <Stethoscope color="#5E6E66" size={20} />
      <strong>Visit Details</strong>
     </div>

     <div className="bg-[#EFEFEF] h-px mt-3 mb-5"></div>

     <div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-6 gap-2">

      <div>
       <p>Consultation Type</p>
       <span>Phone Consultation</span>
      </div>

      <div>
       <p>Pharmacy Package</p>
       <span>Standard Package</span>
      </div>

      <div>
       <p>Intake Status</p>
       <span className="bg-[#DDF5E6] text-[#39AC63] rounded-full px-4 py-1 font-semibold mt-1 block w-fit">
        Completed
       </span>
      </div>

     </div>

    </div>

    <div className="mt-4 bg-[#FFFFFF] shadow-[0px_1px_2px_0px_#0000000D] border border-[#D7DED3] rounded-xl sm:p-6 p-4">

     <div className="flex items-center gap-2">
      <CreditCard color="#5E6E66" size={20} />
      <strong>Payment Status</strong>
     </div>

     <div className="bg-[#EFEFEF] h-px mt-3 mb-5"></div>

     <div className="flex items-center gap-3">

      <span className="bg-[#39AC6326] text-[#39AC63] rounded-full px-4 py-1 font-semibold">
       Payment Completed
      </span>

      <p className="text-sm">
       Processed on <span>Dec 26, 2024</span>
      </p>

     </div>

    </div>

   </div>

  </>
 );
}