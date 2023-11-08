const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const formattedDate = date.toLocaleString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short" as "short",
  })
  return formattedDate
}

export { formatDate }
