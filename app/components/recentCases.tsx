import { ArrowRight, ChevronRight, FolderOpen, UserRound } from "lucide-react";
import Link from "next/link";

const cases = [
 {
  link: "#",
  name: "Sarah Clair",
  caseId: "VV-2024-001",
  time: "2 mins ago",
  date: "Dec 26, 2024",
  location: "California",
  tags: ["Coordinating Visit", "In Progress"],
  tagStyle: "bg-[#3399CC26] text-[#3399CC]",
 },
 {
  link: "#",
  name: "Michael Chen",
  caseId: "VV-2024-002",
  time: "2 mins ago",
  date: "Dec 25, 2024",
  location: "Texas",
  tags: ["Pending Review", "Pending"],
  tagStyle: "bg-[#DFA62026] text-[#2E291F]",
 },
 {
  link: "#",
  name: "Emily Davis",
  caseId: "VV-2024-003",
  time: "2 mins ago",
  date: "Dec 24, 2024",
  location: "Florida",
  tags: ["Ready for Visit", "Completed"],
  tagStyle: "bg-[#39AC6326] text-[#39AC63]",
 },
];

export default function ResentCases() {
 return (
  <div className="bg-[#FFFFFF] shadow-[0px_1px_2px_0px_#0000000D] border border-[#D7DED3] rounded-xl px-4 py-5 mt-3">

   <div className="pb-5 flex items-center justify-between">
    <div className="flex items-center gap-3 [&_strong]:font-semibold [&_strong]:text-[20px] [&_strong]:text-[#2B3B33]">
     <FolderOpen color="#5E6E66" className="bg-[#CCD7C6] size-10 p-2 rounded-lg" />
     <strong>Recent Cases</strong>
    </div>
    <Link href="#" className="flex text-[#476B59] font-semibold gap-1 items-center">View All <ArrowRight size={17} /></Link>
   </div>
   <div className="grid sm:grid-cols-3 gap-4">
    {cases.map((item, index) => (
     <Link href={item.link} key={index} className="relative border border-[#DCE5DF] hover:border-[#5E6E66] p-4 rounded-xl">

      <div className="flex items-center justify-between [&_span]:text-sm [&_span]:text-[#6A7C73]">
       <div className="flex items-center gap-3 [&_strong]:text-[#2E3833] [&_strong]:leading-6 [&_strong]:block [&_p]:text-[15px] [&_p]:text-[#6A7C73]">
        <UserRound color="#5E6E66" className="bg-[#476B591A] size-11 p-2 rounded-[50%]" />
        <div>
         <strong>{item.name}</strong>
         <p>Case # {item.caseId}</p>
        </div>
       </div>
       <span>{item.time}</span>
      </div>


      <div className="flex justify-between">

       <div>
        <div className="flex gap-2 items-center pt-4 [&_span]:bg-no-repeat [&_span]:bg-position-[left_center] [&_span]:text-[#6A7C73] [&_span]:pl-6 [&_span]:text-[15px]">
         <span className="bg-[url('/images/calendar.png')] bg-size-[18px]">
          {item.date}
         </span>
         <span className="bg-[url('/images/location.png')] bg-size-[18px]">
          {item.location}
         </span>
        </div>

        <div
         className={`flex gap-2 pt-5 text-sm [&_span]:font-semibold [&_span]:px-3 [&_span]:py-0.5 [&_span]:rounded-[25px]`}
        >
         {item.tags.map((tag, i) => (
          <span key={i} className={item.tagStyle}>
           {tag}
          </span>
         ))}
        </div>
       </div>
       <ChevronRight color="#2E3833" size={20} className="absolute right-2.5 top-0 bottom-0 m-auto" />

      </div>
     </Link>
    ))}
   </div>
  </div>
 );
}
