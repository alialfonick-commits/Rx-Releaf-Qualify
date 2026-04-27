const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^[+()\-\s0-9]{7,20}$/

export function isNonEmptyString(value: unknown) {
  return typeof value === "string" && value.trim().length > 0
}

export function isValidEmail(value: unknown) {
  return typeof value === "string" && emailPattern.test(value)
}

export function isValidPhone(value: unknown) {
  return typeof value === "string" && phonePattern.test(value)
}

export function parseDOB(value: unknown) {
  if (typeof value !== "string") {
    return null
  }

  const parsed = new Date(value)

  if (isNaN(parsed.getTime()) || parsed > new Date()) {
    return null
  }

  return parsed
}

export function isValidBirthSex(value: unknown) {
  return value === "MALE" || value === "FEMALE"
}

export function parsePositiveNumber(value: unknown) {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null
}
