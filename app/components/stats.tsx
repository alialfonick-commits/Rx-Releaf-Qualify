import { CircleCheckBig, Clock4, FolderOpen, Phone } from "lucide-react";

export default function Stats({ stats }: { stats: any }) {
	return (
		<>
			<div className="grid lg:grid-cols-4 grid-cols-2 gap-3 sm:[&_span]:text-[15px] [&_span]:text-[13px] [&_span]:text-[#6A7C73] [&_strong]:text-[22px] sm:[&_strong]:text-[30px] [&_strong]:font-semibold [&_strong]:text-[#2E3833] [&_svg]:bg-[#476B591A] sm:[&_svg]:h-11 [&_svg]:h-10 sm:[&_svg]:w-11 [&_svg]:w-10 [&_svg]:text-[#476B59] sm:[&_svg]:p-2.5 [&_svg]:p-2.25 sm:[&_svg]:rounded-xl [&_svg]:rounded-lg">
				<div className="flex max-[485px]:flex-col min-[485px]:items-center max-[485px]:gap-2.5 justify-between border border-[#DCE5DF] bg-white rounded-xl xl:px-4 xl:py-5 sm:p-4 p-2.5">
					<div className="flex flex-col max-[485px]:order-2">
						<span>Active Cases</span>
						<strong>{stats.total}</strong>
						<span className="text-[#39AC63]! font-medium">+{stats.createdToday} today</span>
					</div>
					<FolderOpen />
				</div>
				<div className="flex max-[485px]:flex-col min-[485px]:items-center max-[485px]:gap-2.5 justify-between border border-[#DCE5DF] bg-white rounded-xl xl:px-4 xl:py-5 sm:p-4 p-2.5">
					<div className="flex flex-col max-[485px]:order-2">
						<span>Pending Coordination</span>
						<strong>{stats.pending}</strong>
						<span>{stats.awaitingProvider} awaiting provider</span>
					</div>
					<Clock4 />
				</div>
				<div className="flex max-[485px]:flex-col min-[485px]:items-center max-[485px]:gap-2.5 justify-between border border-[#DCE5DF] bg-white rounded-xl xl:px-4 xl:py-5 sm:p-4 p-2.5">
					<div className="flex flex-col max-[485px]:order-2">
						<span>Completed Today</span>
						<strong>{stats.completedToday}</strong>
						<span className="text-[#39AC63]! font-medium">+{stats.completedToday - stats.completedYesterday} from yesterday</span>
					</div>
					<CircleCheckBig />
				</div>
				<div className="flex max-[485px]:flex-col min-[485px]:items-center max-[485px]:gap-2.5 justify-between border border-[#DCE5DF] bg-white rounded-xl xl:px-4 xl:py-5 sm:p-4 p-2.5">
					<div className="flex flex-col max-[485px]:order-2">
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