import { CircleCheckBig, Clock4, FolderOpen, Phone } from "lucide-react";
import ExecutionTable from "./executionTable";

export default function ExecutionMonitoring() {
 return (
  <>
   <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3 [&_span]:text-[#6A7C73] [&_strong]:text-[40px] [&_strong]:text-[#2E3833] [&_svg]:p-3 [&_svg]:rounded-[15px]">
    <div className="flex items-center gap-4 border border-[#EEB32BCC] bg-[#F9F3E4] rounded-xl px-4 py-5">
     <FolderOpen color="#222222" size={55} className="bg-[#EEB32B26]"/>
     <div className="flex flex-col">
      <strong>2</strong>
      <span>Blocked</span>
     </div>
    </div>
    <div className="flex items-center gap-4 border border-[#3399CCCC] bg-[#E6F0F4] rounded-xl px-4 py-5">
     <Clock4 color="#3399CC" size={55} className="bg-[#3399CC26]"/>
     <div className="flex flex-col">
      <strong>1</strong>
      <span>In Progress</span>
     </div>
    </div>
    <div className="flex items-center gap-4 border border-[#EEB32BCC] bg-[#F9F3E4] rounded-xl px-4 py-5">
     <CircleCheckBig color="#222222" size={55} className="bg-[#EEB32B26]"/>
     <div className="flex flex-col">
      <strong>1</strong>
      <span>Pending</span>
     </div>
    </div>
    <div className="flex items-center gap-4 border border-[#2EB860CC] bg-[#E7F2EA] rounded-xl px-4 py-5">
     <Phone color="#476B59" size={55} className="bg-[#39AC6326]"/>
     <div className="flex flex-col">
      <strong>1</strong>
      <span>Confirmed</span>
     </div>
    </div>
   </div>
   <ExecutionTable />
  </>
 );
}