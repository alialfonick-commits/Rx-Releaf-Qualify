import { ArrowRight, FileChartColumnIncreasing } from "lucide-react"
import Link from "next/link"
import { TableWrap } from "./tableWrap"

export function RecentVisit() {
    return (

        <div className="bg-[#FFFFFF] shadow-[0px_1px_2px_0px_#0000000D] border border-[#D7DED3] rounded-xl px-4 py-5 mt-3">

            <div className="pb-5 flex items-center justify-between">
                <div className="flex items-center gap-3 [&_strong]:font-semibold [&_strong]:text-[20px] [&_strong]:text-[#2B3B33]">
                    <FileChartColumnIncreasing color="#5E6E66" className="bg-[#CCD7C6] size-10 p-2 rounded-lg" />
                    <strong>Recent Visits</strong>
                </div>
                <Link href="#" className="flex text-[#476B59] font-semibold gap-1 items-center">View All <ArrowRight size={17} /></Link>
            </div>

            <TableWrap />

        </div>
    )
}
