"use client"

import { useEffect, useState } from "react"
import { RefreshCw, Settings2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Skeleton } from "@/components/ui/skeleton"

type ConsultationOption = {
  id: string
  qualiphyExamId: number
  title: string
  rxType: number | null
  isEnabled: boolean
}

type ConsultationType = {
  id: string
  typeKey: string
  label: string
  isEnabled: boolean
  options: ConsultationOption[]
}

export default function AdminConsultationsPage() {
  const [consultationTypes, setConsultationTypes] = useState<ConsultationType[]>([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [savingId, setSavingId] = useState("")

  async function fetchSettings() {
    const res = await fetch("/api/admin/consultations")
    const data = await res.json()
    setConsultationTypes(data.consultationTypes || [])
    setLoading(false)
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchSettings()
  }, [])

  async function syncFromQualiphy() {
    setSyncing(true)
    const res = await fetch("/api/admin/consultations", {
      method: "POST",
    })
    const data = await res.json()
    setConsultationTypes(data.consultationTypes || [])
    setSyncing(false)
  }

  async function updateVisibility(entity: "type" | "option", id: string, isEnabled: boolean) {
    setSavingId(id)
    const res = await fetch("/api/admin/consultations", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ entity, id, isEnabled }),
    })
    const data = await res.json()
    setConsultationTypes(data.consultationTypes || [])
    setSavingId("")
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 rounded-lg border border-[#D7DED3] bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-lg bg-[#CCD7C6] text-[#5E6E66]">
            <Settings2 size={20} />
          </span>
          <div>
            <h1 className="text-xl font-semibold text-[#2B3B33]">Consultation Visibility</h1>
            <p className="text-sm text-[#677E73]">Sync Qualiphy exams, then choose which consultation types and options appear on the patient form.</p>
          </div>
        </div>

        <Button
          onClick={syncFromQualiphy}
          disabled={syncing}
          className="bg-[#708E86] text-white hover:bg-[#D39A05]"
        >
          <RefreshCw className={syncing ? "animate-spin" : ""} size={16} />
          {syncing ? "Syncing" : "Sync From Qualiphy"}
        </Button>
      </div>

      {loading ? (
        <div className="space-y-3">
          <Skeleton className="h-28 bg-white" />
          <Skeleton className="h-28 bg-white" />
          <Skeleton className="h-28 bg-white" />
        </div>
      ) : (
        <div className="space-y-4">
          {consultationTypes.map((type) => {
            const enabledCount = type.options.filter((option) => option.isEnabled).length

            return (
              <section key={type.id} className="rounded-lg border border-[#D7DED3] bg-white">
                <div className="flex flex-col gap-3 border-b border-[#E7ECE5] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <label className="flex items-start gap-3">
                    <Checkbox
                      checked={type.isEnabled}
                      disabled={savingId === type.id}
                      onCheckedChange={(checked) => updateVisibility("type", type.id, checked === true)}
                      className="mt-1 border-[#708E86] data-[state=checked]:bg-[#708E86]"
                    />
                    <span>
                      <span className="block font-semibold text-[#2B3B33]">{type.label}</span>
                      <span className="text-sm text-[#677E73]">{enabledCount} of {type.options.length} options visible</span>
                    </span>
                  </label>
                  <Badge className={type.isEnabled ? "bg-[#708E86]" : "bg-[#9AA7A0]"}>
                    {type.isEnabled ? "Visible" : "Hidden"}
                  </Badge>
                </div>

                <div className="divide-y divide-[#EEF2EC]">
                  {type.options.length === 0 ? (
                    <p className="px-5 py-4 text-sm text-[#677E73]">No options synced yet for this consultation type.</p>
                  ) : (
                    type.options.map((option) => (
                      <label key={option.id} className="flex gap-3 px-5 py-3">
                        <Checkbox
                          checked={option.isEnabled}
                          disabled={savingId === option.id}
                          onCheckedChange={(checked) => updateVisibility("option", option.id, checked === true)}
                          className="mt-1 border-[#708E86] data-[state=checked]:bg-[#708E86]"
                        />
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-medium text-[#2B3B33]">{option.title}</span>
                          <span className="text-xs text-[#677E73]">Qualiphy exam ID: {option.qualiphyExamId}</span>
                        </span>
                      </label>
                    ))
                  )}
                </div>
              </section>
            )
          })}
        </div>
      )}
    </div>
  )
}
