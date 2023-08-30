import clsx from "clsx"
import React, { ChangeEvent, useRef, useState } from "react"

const SelectImages = () => {
  const [images, setImages] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedImages = Array.from(e.target.files || [])

    // Check for image format and size
    const validImages = selectedImages.filter((image) => image.type === "image/jpeg" || image.type === "image/png" || image.type === "image/jpg")

    // Check for image count and size
    if (validImages.length + images.length > 5) {
      console.log("Max image count reached")
      return
    }

    const updatedImages = [...images, ...validImages]
    setImages(updatedImages)
  }

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index)
    setImages(updatedImages)
  }

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div className="mb-6 rounded-lg border-[1px] border-dashed border-gray-200 bg-gray-50 p-4">
      <button
        type="button"
        className="dark:blue-500 w-full rounded-lg border border-blue-500 bg-blue-500 px-4 py-2 text-lg font-semibold text-white transition-all duration-300 hover:bg-transparent hover:text-blue-500 dark:border-lightpurple-200 dark:bg-lightpurple-200 dark:hover:bg-transparent dark:hover:text-white"
        onClick={openFileInput}>
        Загрузить изображения
      </button>
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        multiple
        onChange={handleImageChange}
        ref={fileInputRef}
        className="hidden"
      />

      <div className={clsx("transition-all grid grid-cols-2 gap-4", {
        "mt-4": images.length > 0
      })}>
        {images.map((image, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-md border-[1px] border-gray-200 pb-[100%]">
            <img
              src={URL.createObjectURL(image)}
              alt={`Image ${index}`}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <button
              type="button"
              className="absolute bottom-0 left-0 right-0 bg-red-200 text-red-700"
              onClick={() => removeImage(index)}>
              Удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SelectImages
