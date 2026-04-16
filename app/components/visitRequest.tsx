import { Phone } from "lucide-react";

export default function VisitRequest({ onCreate }: { onCreate: () => void }) {
  return (
    <>
      <div className="bg-[#708E86] rounded-xl px-4 py-6 text-white flex max-sm:flex-col max-sm:gap-4 items-start justify-between [&_strong]:font-medium sm:[&_strong]:text-[20px] [&_strong]:text-[18px] max-sm:[&_strong]:pb-1.25 max-sm:[&_strong]:leading-6 max-sm:[&_strong]:block mb-3 2xl:[&_p]:text-base sm:[&_p]:text-[15px] max-sm:[&_p]:leading-5 [&_p]:font-normal [&_p]:text-[#FFFFFFCC]">
        <div className="flex gap-4 max-lg:flex-col max-lg:items-start">
          <Phone size={50} color="#2E291F" className="bg-[#DFA620] p-3 rounded-xl max-sm:w-24.5! max-sm:h-12!" />
          <div>
            <strong>Create Virtual Visit Request</strong>
            <p>Creates a virtual visit request for coordination. Visit is confirmed only after provider acceptance.</p>
          </div>
        </div>
        <button
          onClick={onCreate}
          className="bg-[#DFA620] hover:bg-white transition-all bg-[url('/images/plussign.png')] bg-no-repeat bg-position-[left_12px_center] font-semibold sm:bg-size-[18px] bg-size-[16px] text-[#2E291F] pl-9 px-4 2xl:py-3 py-2.5 rounded-lg cursor-pointer max-sm:text-sm w-fit"
        >
          Create Request
        </button>


      </div>
    </>
  );
}