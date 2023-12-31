export async function praseUrlToFile(url: string, fileName: string) {
  let parseUrl = url
  if (process.env.NODE_ENV === "production") parseUrl = parseUrl.replace("http:", "https:")
  const response = await fetch(parseUrl, {
    mode: "no-cors",
  })
  const blob = await response.blob()
  const file = new File([blob], fileName)
  return file
}
