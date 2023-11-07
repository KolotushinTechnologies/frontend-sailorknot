export async function praseUrlToFile(url: string, fileName: string) {
  let parseUrl = url
  if (process.env.NODE_ENV === "production") parseUrl.replace("http:", "https:")
  const response = await fetch(url, {
    mode: "no-cors",
  })
  const blob = await response.blob()
  const file = new File([blob], fileName)
  return file
}
