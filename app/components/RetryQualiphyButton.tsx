"use client"

import { useState } from "react"
import { RefreshCw } from "lucide-react"

export default function RetryQualiphyButton({
  examId,
  onSuccess,
}: {
  examId: string
  onSuccess?: () => void
}) {
  const [loading, setLoading] = useState(false)

  const handleRetry = async () => {
    if (loading) return

    setLoading(true)

    try {
      const res = await fetch(`/api/admin/visits/${examId}/qualiphy/retry`, {
        method: "POST",
      })
      const data = await res.json()

      if (!res.ok || !data.success) {
        alert(`Qualiphy retry failed${data.qualiphyStatus ? ` (${data.qualiphyStatus})` : ""}`)
        return
      }

      alert("Qualiphy invite sent")
      onSuccess?.()
    } catch {
      alert("Qualiphy retry failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleRetry}
      disabled={loading}
      className="inline-flex items-center justify-center gap-1 text-xs font-medium text-[#D74242] transition hover:text-[#B83232] hover:underline disabled:cursor-not-allowed disabled:opacity-60"
      title="Retry Qualiphy invite"
    >
      <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
      {loading ? "Retrying Qualiphy invite" : "Retry Qualiphy invite"}
    </button>
  )
}
