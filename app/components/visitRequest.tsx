import { Phone } from "lucide-react";
import Link from "next/link";

export default function VisitRequest() {
    return (
     <>
      <div className="bg-[#5E6E66] rounded-xl p-6 text-white flex max-[992px]:flex-col items-center justify-between [&_strong]:font-semibold [&_strong]:text-[30px] mb-3 [&_p]:font-normal [&_p]:text-[#FFFFFFCC]">
        <div className="flex items-center gap-4">
        <Phone size={55} color="#2E291F" className="bg-[#DFA620] p-3 rounded-xl"/>
        <div>
       <strong>Create Virtual Visit Request</strong>
       <p>Creates a virtual visit request for coordination. Visit is confirmed only after provider acceptance.</p>
       </div>
       </div>
       <Link
  href="#"
  className="bg-[#DFA620] bg-[url('/images/plussign.png')] bg-no-repeat bg-position-[left_17px_center] bg-size-[20px] text-[#2E291F] pr-5.75 pl-11 py-2.25 rounded-lg"
>
  Create Request
</Link>

      </div>
     </>
    );
   }