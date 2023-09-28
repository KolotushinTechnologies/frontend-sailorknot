import clsx from "clsx"
import React, { useRef, useState } from "react"
import { Viewer, Worker } from "@react-pdf-viewer/core"
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"

import "@react-pdf-viewer/core/lib/styles/index.css"
import "@react-pdf-viewer/default-layout/lib/styles/index.css"
import dynamic from "next/dynamic"

const DemoPage = () => {
  const [selectedFile, selectedFileSet] = useState<File | null>(null)
  const inpRef = useRef<HTMLInputElement>(null)

  const handleFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (files) {
      let file = files[0] as File
      console.log(file)
      selectedFileSet(file)
    }
  }

  const openForm = () => inpRef.current?.click()

  const file = "http://example.com/image.png"
  const type = "png"

  return (
    <div className="my-10 flex items-center justify-center">
      <div className="flex w-full flex-col space-y-4">
        <input
          accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,.txt,image/jpeg,image/png"
          type="file"
          style={{ display: "none" }}
          ref={inpRef}
          onChange={handleFileInputChange}
        />
        <button
          className="w-full rounded-lg border border-black bg-black px-4 py-2 text-center text-lg font-semibold text-white transition-all duration-300 hover:bg-transparent hover:text-black dark:border-lightpurple-200 dark:bg-lightpurple-200 dark:text-black dark:hover:bg-transparent dark:hover:text-white"
          onClick={openForm}>
          SELECT
        </button>
      </div>
    </div>
  )
}

export default DemoPage
