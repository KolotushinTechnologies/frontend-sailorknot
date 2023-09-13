const formatDate = (value: string) => {
  // Input date in yyyy-mm-dd format
  const inputDate: string = value

  // Split the input date into its components
  const dateComponents: string[] = inputDate.split("-")

  // Extract year, month, and day
  const year: number = parseInt(dateComponents[0])
  const month: number = parseInt(dateComponents[1])
  const day: number = parseInt(dateComponents[2])

  // Format the components into dd.mm.yyyy
  const formattedDate: string = `${day.toString().padStart(2, "0")}.${month.toString().padStart(2, "0")}.${year.toString().padStart(4, "0")}`
  return formattedDate
}

export { formatDate }
