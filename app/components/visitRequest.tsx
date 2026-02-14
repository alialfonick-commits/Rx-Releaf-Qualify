import { Phone } from "lucide-react";
import Link from "next/link";

export default function VisitRequest({ onCreate }: { onCreate: () => void }) {
  return (
    <>
      <div className="bg-[#5E6E66] rounded-xl p-6 text-white flex max-[992px]:flex-col items-center max-[992px]:items-start justify-between [&_strong]:font-semibold sm:[&_strong]:text-[24px] [&_strong]:text-[20px] mb-3 max-sm:[&_p]:text-[16px] max-sm:[&_p]:leading-5 [&_p]:font-normal [&_p]:text-[#FFFFFFCC]">
        <div className="flex sm:items-center gap-4 max-[992px]:pb-2">
          <Phone size={55} color="#2E291F" className="bg-[#DFA620] p-3 rounded-xl max-sm:w-24.5! max-sm:h-12!" />
          <div>
            <strong>Create Virtual Visit Request</strong>
            <p>Creates a virtual visit request for coordination. Visit is confirmed only after provider acceptance.</p>
          </div>
        </div>
        <button
  onClick={onCreate}
  className="bg-[#DFA620] bg-[url('/images/plussign.png')] bg-no-repeat bg-position-[left_17px_center]   bg-size-[20px] text-[#2E291F] pr-5.75 pl-11 py-2.25 rounded-lg cursor-pointer"
>
  Create Request
</button>


      </div>
    </>
  );
}