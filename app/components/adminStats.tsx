import { Activity, CreditCardIcon, FolderOpen, TriangleAlert } from 'lucide-react'

export default function AdminStats ({ stats }: { stats: any }) {
  return (
    <>
      <div className='bg-[#708E86] rounded-xl p-6 text-white [&_strong]:font-semibold sm:[&_strong]:text-[24px] [&_strong]:text-[20px] mb-3 text-[15px] [&_p]:pt-2 [&_p]:font-normal [&_p]:text-[#FFFFFFCC]'>
        <strong>Welcome to Rx ReLeaf Admin Panel</strong>
        <p>
          Complete the form below to start your urgent care consultation. A
          licensed provider will review your information and respond within
          minutes.
        </p>
      </div>
      <div className='grid lg:grid-cols-4 grid-cols-2 gap-3 sm:[&_span]:text-[15px] [&_span]:text-[13px] [&_span]:text-[#6A7C73] [&_strong]:text-[22px] sm:[&_strong]:text-[30px] [&_strong]:font-semibold [&_strong]:text-[#2E3833] [&_svg]:bg-[#476B591A] sm:[&_svg]:h-11 [&_svg]:h-10 sm:[&_svg]:w-11 [&_svg]:w-10 [&_svg]:text-[#476B59] sm:[&_svg]:p-2.5 [&_svg]:p-2.25 sm:[&_svg]:rounded-xl [&_svg]:rounded-lg
      '>
        <div className='flex max-[485px]:flex-col min-[485px]:items-center max-[485px]:gap-2.5 justify-between border border-[#DCE5DF] bg-white rounded-xl xl:px-4 xl:py-5 sm:p-4 p-2.5'>
          <div className='flex flex-col max-[485px]:order-2'>
            <span>Active Cases</span>
            <strong>{stats.activeCases}</strong>
            <span className='text-[#39AC63]! font-medium'></span>
          </div>
          <FolderOpen color='#476B59' size={55} />
        </div>
        <div className='flex max-[485px]:flex-col min-[485px]:items-center max-[485px]:gap-2.5 justify-between border border-[#DCE5DF] bg-white rounded-xl xl:px-4 xl:py-5 sm:p-4 p-2.5'>
          <div className='flex flex-col max-[485px]:order-2'>
            <span>Blocked Executions</span>
            <strong>{stats.blocked}</strong>
            <span></span>
          </div>
          <TriangleAlert color='#476B59' size={55} />
        </div>
        <div className='flex max-[485px]:flex-col min-[485px]:items-center max-[485px]:gap-2.5 justify-between border border-[#DCE5DF] bg-white rounded-xl xl:px-4 xl:py-5 sm:p-4 p-2.5'>
          <div className='flex flex-col max-[485px]:order-2'>
            <span>Payments</span>
            <strong>{stats.payments}</strong>
            <span></span>
          </div>
          <CreditCardIcon color='#476B59' size={55} />
        </div>
        <div className='flex max-[485px]:flex-col min-[485px]:items-center max-[485px]:gap-2.5 justify-between border border-[#DCE5DF] bg-white rounded-xl xl:px-4 xl:py-5 sm:p-4 p-2.5'>
          <div className='flex flex-col max-[485px]:order-2'>
            <span>Pending Payments</span>
            <strong>{stats.pendingPayments}</strong>
            <span></span>
          </div>
            <Activity color='#476B59' size={55} />
        </div>
      </div>
    </>
  )
}
