import { checkIsImage } from "@/src/shared/helpers/checkIsImage"
import { DocumentProps } from "@/src/shared/types/document"
import clsx from "clsx"
import React, { useEffect, useRef } from "react"
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer"
import { PhotoProvider, PhotoView } from "react-photo-view"
import { SelectFileProps } from "@/src/shared/types"

interface ExtendedFile extends File {
  documentName: string
}
interface ComponentProps {
  selectedImages: SelectFileProps[]

  setSelectedImages: React.Dispatch<React.SetStateAction<SelectFileProps[]>>
  selectedSpecial: DocumentProps | null
  selectedSpecialCount: number
  selectedSpecialCountSet: React.Dispatch<React.SetStateAction<number>>
}

const SelectMultipleImages = ({ selectedSpecial, selectedImages, setSelectedImages, selectedSpecialCount, selectedSpecialCountSet }: ComponentProps) => {
  const fileInputRefs = useRef<Array<HTMLInputElement | null>>([])

  const handleFileInputChange = (index: number, name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (files) {
      let file = files[0] as ExtendedFile
      file.documentName = name

      const updatedSelectedImages: SelectFileProps = {
        file: file,
        name: name,
        isNew: true,
      }

      const matchFile = selectedImages.find((filtered) => filtered.name === name)

      if (!matchFile) {
        setSelectedImages((prev) => [...prev, updatedSelectedImages])
      }
      if (matchFile) {
        const filtered = selectedImages.filter((filtered) => filtered.name !== name)
        setSelectedImages([...filtered, updatedSelectedImages])
      }
    }
  }

  const handleSelectFileButtonClick = (index: number, name: string) => () => {
    fileInputRefs.current[index]?.click()
  }

  const renderFileInput = (index: number, name: string) => {
    return (
      <div className="my-2">
        <input
          accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,.txt,image/jpeg,image/png"
          type="file"
          style={{ display: "none" }}
          ref={(el) => (fileInputRefs.current[index] = el)}
          onChange={handleFileInputChange(index, name)}
        />
        <div className="grid space-y-2">
          <button
            className="dark:blue-500 text-md w-full rounded-lg border border-blue-500 bg-blue-500 p-2 font-medium text-white transition-all duration-300 hover:bg-transparent hover:text-blue-500 dark:border-lightpurple-200 dark:bg-lightpurple-200 dark:hover:bg-transparent dark:hover:text-white"
            type="button"
            onClick={handleSelectFileButtonClick(index, name)}>
            Выбрать изображение
          </button>
          {/* <button
            type="button"
            className="dark:blue-500 text-md w-full rounded-lg border border-red-500 bg-red-500 p-2 font-medium text-white transition-all duration-300 hover:bg-transparent hover:text-red-500 dark:border-lightpurple-200 dark:bg-lightpurple-200 dark:hover:bg-transparent dark:hover:text-white">
            Предосмотр
          </button> */}
        </div>
      </div>
    )
  }

  useEffect(() => {
    setSelectedImages([])
    if (selectedSpecial) {
      let selectedSpecialCount = selectedSpecial.documents.length - 1
      selectedSpecialCountSet(selectedSpecialCount)
      for (const document of selectedSpecial.documents) {
        if (document.additionDocuments) {
          selectedSpecialCountSet((prev) => prev + document.additionDocuments!.length)
        }
      }
    }
  }, [selectedSpecial])

  useEffect(()=>{
    console.log('CHILD selectedImages: ', selectedImages);
  }, [selectedImages])

  return (
    <PhotoProvider>
      <div
        className={clsx("mb-6 rounded-lg border-[1px] border-dashed border-gray-200 bg-gray-50 p-4 transition-all selection:bg-transparent", {
          "pointer-events-none hidden cursor-not-allowed opacity-10": !selectedSpecial,
          "pointer-events-auto block opacity-100": selectedSpecial,
        })}>
        {selectedSpecial && (
          <div className="space-y-2">
            <h3 className="mb-4 text-[16px] font-medium">Всего файлов для загрузки: {selectedSpecialCount} </h3>
            {selectedSpecial.documents.map((doc, index) => {
              const matchFile = selectedImages.find((img) => img.name === doc.name)

              let link = ""
              let isImage = false

              if (matchFile) {
                if (matchFile.url && matchFile.url.length > 0) {
                  link = matchFile.url
                  isImage = true
                } else {
                  link = window.URL.createObjectURL(matchFile.file)
                  isImage = checkIsImage(matchFile.file)
                }
              }

              if (!doc.additionDocuments) {
                return (
                  <div
                    key={index}
                    className="space-y-4">
                    <ul>
                      <li className="rounded-md bg-gray-200 p-2">
                        <span>
                          {index + 1}. {doc.name}
                        </span>
                        {/* INPUT FILE PICKER */}
                        {renderFileInput(selectedSpecial.documents.length - 1 === index ? selectedSpecial.documents.length + 3 : index, doc.name)}

                        {isImage === false && matchFile ? (
                          <div className="flex h-40 w-full items-center justify-center rounded-md bg-gray-100">{matchFile.file.name}</div>
                        ) : isImage === true && matchFile ? (
                          <PhotoView src={link}>
                            <img
                              className="h-40 w-full rounded-md object-cover"
                              src={link}
                            />
                          </PhotoView>
                        ) : null}
                      </li>
                    </ul>
                  </div>
                )
              } else {
                return (
                  // INNER LIST
                  <div
                    key={index}
                    className="mb-2 mt-4 rounded-md bg-gray-200 p-4 pl-4">
                    {/* Общий заголовок */}
                    <p className="mb-2 text-[16px] font-medium">{doc.name}</p>

                    <ul className="list-inside space-y-2">
                      {doc.additionDocuments.map((addDoc, addIndex) => {
                        const matchFile = selectedImages.find((img) => img.name === addDoc)

                        let link = ""
                        let isImage = false

                        if (matchFile) {
                          if (matchFile.url && matchFile.url.length > 0) {
                            link = matchFile.url
                            isImage = true
                          } else {
                            link = window.URL.createObjectURL(matchFile.file)
                            isImage = checkIsImage(matchFile.file)
                          }
                        }

                        return (
                          <li
                            key={addIndex}
                            className="rounded-md bg-gray-300 p-2">
                            <p>
                              {index + 1}.{addIndex + 1} {addDoc}
                            </p>
                            {renderFileInput(index + addIndex, addDoc)}
                            {isImage === false && matchFile ? (
                              <div className="flex h-40 w-full items-center justify-center rounded-md bg-gray-100">{matchFile.file.name}</div>
                            ) : isImage === true && matchFile ? (
                              <PhotoView src={link}>
                                <img
                                  className="h-40 w-full rounded-md object-cover"
                                  src={link}
                                />
                              </PhotoView>
                            ) : null}
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )
              }
            })}
          </div>
        )}
      </div>
    </PhotoProvider>
  )
}

export default SelectMultipleImages
