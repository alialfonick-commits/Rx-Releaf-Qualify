export const formatCaseId = (num: number) => {
  return `SVC-${num.toString().padStart(3, "0")}`
}