import { CircleCheckBig, Clock4, FolderOpen, Phone } from "lucide-react";

export default function Stats({ stats }: { stats: any }) {
	return (
		<>
			<div className="grid lg:grid-cols-4 grid-cols-2 gap-3 [&_span]:text-[#6A7C73] max-sm:[&_strong]:text-[30px] [&_strong]:text-[40px] [&_strong]:font-semibold [&_strong]:text-[#2E3833] [&_svg]:bg-[#476B591A] [&_svg]:h-12.5 [&_svg]:w-12.5 [&_svg]:text-[#476B59] [&_svg]:p-3 [&_svg]:rounded-[15px]">
				<div className="flex items-center justify-between border border-[#DCE5DF] bg-white rounded-xl px-4 py-5">
					<div className="flex flex-col">
						<span>Active Cases</span>
						<strong>{stats.total}</strong>
						<span className="text-[#39AC63]! font-medium">+{stats.createdToday} today</span>
					</div>
					<FolderOpen />
				</div>
				<div className="flex items-center justify-between border border-[#DCE5DF] bg-white rounded-xl px-4 py-5">
					<div className="flex flex-col">
						<span>Pending Coordination</span>
						<strong>{stats.pending}</strong>
						<span>{stats.awaitingProvider} awaiting provider</span>
					</div>
					<Clock4 />
				</div>
				<div className="flex items-center justify-between border border-[#DCE5DF] bg-white rounded-xl px-4 py-5">
					<div className="flex flex-col">
						<span>Completed Today</span>
						<strong>{stats.completedToday}</strong>
						<span className="text-[#39AC63]! font-medium">+{stats.completedToday - stats.completedYesterday} from yesterday</span>
					</div>
					<CircleCheckBig />
				</div>
				<div className="flex items-center justify-between border border-[#DCE5DF] bg-white rounded-xl px-4 py-5">
					<div className="flex flex-col">
						<span>Phone Visits</span>
						<strong>{stats.phoneVisits || 0}</strong>
						<span>{stats.phoneVisitsWeek} This week</span>
					</div>
					<Phone />
				</div>
			</div>
		</>
	);
}