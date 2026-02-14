import { CircleCheckBig, Clock4, CreditCard, CreditCardIcon, DollarSign, Phone } from "lucide-react";
import PaymentsTable from "./paymentTable";

export default function Payments() {
    return (
        <>
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3 [&_span]:text-[#6A7C73] [&_strong]:font-semibold [&_strong]:text-[32px] [&_strong]:text-[#2E3833] [&_svg]:bg-[#476B591A] [&_svg]:p-3 [&_svg]:rounded-[15px]">
            <div className="flex items-center justify-between border border-[#DCE5DF] bg-white rounded-xl px-4 py-5">
                <div className="flex flex-col">
                <span>Total Revenue</span>
                <strong>$12,450</strong>
                <span className="font-medium">This month</span>
                </div>
                <DollarSign color="#476B59" size={55} />
            </div>
            <div className="flex items-center justify-between border border-[#DCE5DF] bg-white rounded-xl px-4 py-5">
                <div className="flex flex-col">
                <span>Avg. Transaction</span>
                <strong>$175</strong>
                <span className="text-[#39AC63]! font-medium">+12% from last month</span>
                </div>
                <Clock4 color="#476B59" size={55} />
            </div>
            <div className="flex items-center justify-between border border-[#DCE5DF] bg-white rounded-xl px-4 py-5">
                <div className="flex flex-col">
                <span>Pending Payments</span>
                <strong>8</strong>
                <span>Awaiting processing</span>
                </div>
                <CreditCardIcon color="#476B59" size={55} />
            </div>
            <div className="flex items-center justify-between border border-[#DCE5DF] bg-white rounded-xl px-4 py-5">
                <div className="flex flex-col">
                <span>Failed Payments</span>
                <strong>3</strong>
                <span className="text-[#D30C05]! font-medium">Require attention</span>
                </div>
                <Phone color="#476B59" size={55} />
            </div>
        </div>

<PaymentsTable />

        </>
    );
}