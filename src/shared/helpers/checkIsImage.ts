export function checkIsImage(file: File): boolean {
  // Define an array of MIME types that are considered image types
  const imageMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/bmp", "image/webp"]

  // Check if the file's MIME type is in the array of image types
  if (imageMimeTypes.includes(file.type)) {
    return true
  } else {
    return false
  }
}
