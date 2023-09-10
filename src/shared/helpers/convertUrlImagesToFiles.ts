async function convertUrlImagesToFiles(urlImages: string[]): Promise<File[]> {
  const filePromises: Promise<File>[] = []

  for (const imageUrl of urlImages) {
    const response = await fetch(imageUrl)
    const blob = await response.blob()

    const fileName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1)
    const file = new File([blob], fileName, { type: blob.type })

    filePromises.push(Promise.resolve(file))
  }

  return Promise.all(filePromises)
}

export { convertUrlImagesToFiles }
