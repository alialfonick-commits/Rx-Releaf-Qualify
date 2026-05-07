"use client"

import { useEffect, useState } from "react"
import { RefreshCw, Search, Settings2, SlidersHorizontal } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"

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
  const [query, setQuery] = useState("")

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

  const totalOptions = consultationTypes.reduce((total, type) => total + type.options.length, 0)
  const visibleOptions = consultationTypes.reduce(
    (total, type) => total + type.options.filter((option) => option.isEnabled).length,
    0
  )
  const visibleTypes = consultationTypes.filter((type) => type.isEnabled).length
  const normalizedQuery = query.trim().toLowerCase()

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 rounded-lg border border-[#D7DED3] bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
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

      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-[#D7DED3] bg-white px-4 py-3">
          <p className="text-xs font-medium uppercase text-[#677E73]">Visible Types</p>
          <p className="mt-1 text-2xl font-semibold text-[#2B3B33]">{visibleTypes}/{consultationTypes.length}</p>
        </div>
        <div className="rounded-lg border border-[#D7DED3] bg-white px-4 py-3">
          <p className="text-xs font-medium uppercase text-[#677E73]">Visible Options</p>
          <p className="mt-1 text-2xl font-semibold text-[#2B3B33]">{visibleOptions}/{totalOptions}</p>
        </div>
        <div className="rounded-lg border border-[#D7DED3] bg-white px-4 py-3">
          <p className="text-xs font-medium uppercase text-[#677E73]">Source</p>
          <p className="mt-1 text-2xl font-semibold text-[#2B3B33]">Qualiphy</p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          <Skeleton className="h-28 bg-white" />
          <Skeleton className="h-28 bg-white" />
          <Skeleton className="h-28 bg-white" />
        </div>
      ) : (
        <div className="rounded-lg border border-[#D7DED3] bg-white">
          <div className="flex flex-col gap-3 border-b border-[#E7ECE5] px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-2 text-[#2B3B33]">
              <SlidersHorizontal size={18} />
              <span className="font-semibold">Consultation Display Rules</span>
            </div>
            <div className="relative w-full lg:max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#677E73]" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search options"
                className="h-10 border-[#D7DED3] bg-[#F7F9F5] pl-9"
              />
            </div>
          </div>

          <Accordion
            type="multiple"
            className="divide-y divide-[#E7ECE5]"
          >
          {consultationTypes.map((type) => {
            const enabledCount = type.options.filter((option) => option.isEnabled).length
            const filteredOptions = normalizedQuery
              ? type.options.filter((option) => option.title.toLowerCase().includes(normalizedQuery))
              : type.options

            return (
              <AccordionItem key={type.id} value={type.id} className="border-0">
                <div className="grid grid-cols-[1fr_auto] items-center gap-4 px-5">
                  <AccordionTrigger className="min-w-0 py-5 hover:no-underline">
                    <span className="min-w-0">
                      <span className="block truncate text-base font-semibold text-[#2B3B33]">{type.label}</span>
                      <span className="mt-1 block text-sm font-normal text-[#677E73]">{enabledCount} of {type.options.length} options visible</span>
                    </span>
                  </AccordionTrigger>
                  <div className="flex items-center gap-3">
                    <Badge className={type.isEnabled ? "bg-[#708E86]" : "bg-[#9AA7A0]"}>
                      {type.isEnabled ? "Visible" : "Hidden"}
                    </Badge>
                    <Switch
                      aria-label={`Toggle ${type.label}`}
                      checked={type.isEnabled}
                      disabled={savingId === type.id}
                      onCheckedChange={(checked) => updateVisibility("type", type.id, checked)}
                    />
                  </div>
                </div>

                <AccordionContent className="px-5">
                  {filteredOptions.length === 0 ? (
                    <p className="rounded-md bg-[#F7F9F5] px-4 py-4 text-sm text-[#677E73]">
                      {type.options.length === 0 ? "No options synced yet for this consultation type." : "No options match your search."}
                    </p>
                  ) : (
                    <div className="grid gap-2">
                      {filteredOptions.map((option) => (
                      <div
                        key={option.id}
                        className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-md border border-[#E7ECE5] bg-[#FBFCFA] px-4 py-3"
                      >
                        <span className="min-w-0">
                          <span className="block text-sm font-medium text-[#2B3B33]">{option.title}</span>
                          <span className="text-xs text-[#677E73]">Qualiphy exam ID: {option.qualiphyExamId}</span>
                        </span>
                        <Switch
                          aria-label={`Toggle ${option.title}`}
                          checked={option.isEnabled}
                          disabled={savingId === option.id || !type.isEnabled}
                          onCheckedChange={(checked) => updateVisibility("option", option.id, checked)}
                        />
                      </div>
                      ))}
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            )
          })}
          </Accordion>
        </div>
      )}
    </div>
  )
}
