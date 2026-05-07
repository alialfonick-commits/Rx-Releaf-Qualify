'use client'
import { Phone } from "lucide-react";
import { useRouter } from "next/navigation";



const SatffNewExam = () => {
    const router = useRouter();
    const createPath = typeof window !== "undefined" && window.location.pathname.startsWith("/admin")
      ? "/admin/create-exam"
      : "/staff/create-exam"
  return (
    <>
      <div className="bg-[#708E86] rounded-xl px-4 py-5 text-white flex max-sm:flex-col max-sm:gap-4 sm:items-center items-start justify-between [&_strong]:font-medium sm:[&_strong]:text-[20px] [&_strong]:text-[18px] max-sm:[&_strong]:pb-1.25 max-sm:[&_strong]:leading-6 max-sm:[&_strong]:block mb-3 2xl:[&_p]:text-base sm:[&_p]:text-[15px] [&_p]:text-sm max-sm:[&_p]:leading-5 [&_p]:font-normal [&_p]:text-[#FFFFFFCC]">
        <div className="flex gap-4 max-sm:flex-col max-sm:items-start">
          <Phone size={50} color="#2E291F" className="bg-[#DFA620] lg:p-3 p-2 max-sm:p-2.5 rounded-xl max-[992px]:w-11 max-[992px]:h-11" />
          <div>
            <strong>Create New Exam Request</strong>
            <p>Creates a new exam request for coordination. Request is confirmed only after provider acceptance.</p>
          </div>
        </div>
        <button
         onClick={() => router.push(createPath)}
          className="bg-[#DFA620] hover:bg-white transition-all bg-[url('/images/plussign.png')] bg-no-repeat bg-position-[left_12px_center] font-semibold sm:bg-size-[18px] bg-size-[16px] text-[#2E291F] pl-9 px-4 2xl:py-3 py-2.5 rounded-lg cursor-pointer max-sm:text-sm w-fit"
        >
          New Visit
        </button>

      </div>
    </>
  );
}
export default SatffNewExam;
