import { CreditCardIcon, FolderOpen, Phone, TriangleAlert } from "lucide-react";
import PaymentsTable from "./paymentTable";

export default function AdminOverview() {
 return (
  <>
  <div className="bg-[#5E6E66] rounded-xl p-6 text-white [&_strong]:font-semibold sm:[&_strong]:text-[24px] [&_strong]:text-[20px] mb-3 text-[15px] [&_p]:pt-2 [&_p]:font-normal [&_p]:text-[#FFFFFFCC]">
    <strong>Welcome to Rx ReLeaf Admin Panel</strong>
    <p>Complete the form below to start your urgent care consultation. A licensed provider will review your information and respond within minutes.</p>
   </div>
   <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3 [&_span]:text-[#6A7C73] [&_strong]:text-[36px] [&_strong]:font-semibold [&_strong]:text-[#2E3833] [&_svg]:bg-[#476B591A] [&_svg]:p-3 [&_svg]:rounded-[15px]">
    <div className="flex items-center justify-between border border-[#DCE5DF] bg-white rounded-xl px-4 py-5">
     <div className="flex flex-col">
      <span>Active Cases</span>
      <strong>156</strong>
      <span className="text-[#39AC63]! font-medium">+12% this week</span>
     </div>
     <FolderOpen color="#476B59" size={55} />
    </div>
    <div className="flex items-center justify-between border border-[#DCE5DF] bg-white rounded-xl px-4 py-5">
     <div className="flex flex-col">
      <span>Blocked Executions</span>
      <strong>4</strong>
      <span>Requires attention</span>
     </div>
     <TriangleAlert color="#476B59" size={55} />
    </div>
    <div className="flex items-center justify-between border border-[#DCE5DF] bg-white rounded-xl px-4 py-5">
     <div className="flex flex-col">
      <span>Pending Payments</span>
      <strong>$12,450</strong>
      <span>23 transactions</span>
     </div>
     <CreditCardIcon color="#476B59" size={55} />
    </div>
    <div className="flex items-center justify-between border border-[#DCE5DF] bg-white rounded-xl px-4 py-5">
     <div className="flex flex-col">
      <span>System Health</span>
      <strong>98.5%</strong>
      <span>All systems operational</span>
     </div>
     <Phone color="#476B59" size={55} />
    </div>
   </div>
   <div className="pt-3">
   <PaymentsTable />
   </div>
  </>
 );
}