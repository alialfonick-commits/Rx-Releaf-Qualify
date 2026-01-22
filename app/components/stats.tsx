import { CircleCheckBig, Clock4, FolderOpen, Phone } from "lucide-react";

export default function Stats() {
    return (
        <>
        <div className="grid grid-cols-4 gap-3 [&_span]:text-[#6A7C73] [&_strong]:text-[40px] [&_strong]:text-[#2E3833]">
            <div className="flex items-center justify-between border border-[#DCE5DF] bg-white rounded-xl px-4 py-5">
                <div className="flex flex-col">
                <span>Active Cases</span>
                <strong>12</strong>
                <span className="text-[#39AC63]!">+3 today</span>
                </div>
                <FolderOpen color="#476B59" size={60} className="bg-[#476B591A] p-3 rounded-[15px]" />
            </div>
            <div className="flex items-center justify-between border border-[#DCE5DF] bg-white rounded-xl px-4 py-5">
                <div className="flex flex-col">
                <span>Pending Coordination</span>
                <strong>5</strong>
                <span>2 awaiting provider</span>
                </div>
                <Clock4 color="#476B59" size={60} className="bg-[#476B591A] p-3 rounded-[15px]" />
            </div>
            <div className="flex items-center justify-between border border-[#DCE5DF] bg-white rounded-xl px-4 py-5">
                <div className="flex flex-col">
                <span>Completed Today</span>
                <strong>8</strong>
                <span  className="text-[#39AC63]!">+2 from yesterday</span>
                </div>
                <CircleCheckBig color="#476B59" size={60} className="bg-[#476B591A] p-3 rounded-[15px]" />
            </div>
            <div className="flex items-center justify-between border border-[#DCE5DF] bg-white rounded-xl px-4 py-5">
                <div className="flex flex-col">
                <span>Phone Visits</span>
                <strong>24</strong>
                <span>This week</span>
                </div>
                <Phone color="#476B59" size={60} className="bg-[#476B591A] p-3 rounded-[15px]" />
            </div>
        </div>
        </>
    );
}