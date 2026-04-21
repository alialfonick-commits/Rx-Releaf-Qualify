'use client'

import { useEffect, useState } from 'react'
import { TableWrap } from '@/app/components/tableWrap'
import Navbar from '@/app/components/navbar'

export default function VisitsPage () {
  const [data, setData] = useState<any>(null)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchData()
  }, [page])

  const fetchData = async () => {
    setLoading(true)

    try {
      const res = await fetch(`/api/staff/visits?page=${page}`)
      const json = await res.json()
      setData(json)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
    <Navbar title='Exams / Visits' subtitle='View and manage all scheduled exams and virtual visits' />
      <div>

        {/* Reusable Table */}
        <div className='bg-[#FFFFFF] border border-[#D7DED3] rounded-xl px-4 py-5 mt-3'>
          <TableWrap visits={data?.visits || []} loading={loading} />
        </div>

        {/* Pagination */}
        {data && (
          <div className='flex items-center justify-between mt-4'>
            <button
              className='px-3 py-1 border rounded disabled:opacity-50'
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
            >
              Prev
            </button>

            <span className='text-sm'>
              Page {data.page} of {data.totalPages}
            </span>

            <button
              className='px-3 py-1 border rounded disabled:opacity-50'
              disabled={page === data.totalPages}
              onClick={() => setPage(p => p + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  )
}
