export const formatCaseId = (num: number) => {
  return `SVC-${num.toString().padStart(3, "0")}`
}

export const formatStaffId = (num?: number) => {
  if (!num) return "PUBLIC"
  return `STF-${num.toString().padStart(3, "0")}`
}

export const timeAgo = (dateString: string | Date) => {
  const now = new Date()
  const past = new Date(dateString)

  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000)

  if (diffInSeconds < 60) return `${diffInSeconds}s ago`

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) return `${diffInHours} hr ago`

  const diffInDays = Math.floor(diffInHours / 24)
  return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`
}