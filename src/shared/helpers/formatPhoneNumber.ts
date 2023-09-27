export function formatPhoneNumber(input: string): string {
  // Remove all non-digit characters
  const phoneNumber = input.replace(/\D/g, "")

  // Check for the length of the phone number
  if (phoneNumber.length <= 3) {
    return phoneNumber
  } else if (phoneNumber.length <= 7) {
    return `+7 (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4)}`
  } else if (phoneNumber.length <= 10) {
    return `+7 (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7)}`
  } else {
    return `+7 (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7, 9)}-${phoneNumber.slice(9, 11)}`
  }
}
