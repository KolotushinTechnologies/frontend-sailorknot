import { checkIsImage } from "@/src/shared/helpers/checkIsImage"
import { DocumentProps } from "@/src/shared/types/document"
import clsx from "clsx"
import React, { useEffect, useRef } from "react"
import { PhotoProvider, PhotoView } from "react-photo-view"
import { SelectFileProps } from "@/src/shared/types"
import { useRouter } from "next/router"
import { documentModalIsActiveToggle, selectedFileHandler } from "@/src/shared/store/modalStore"

interface ExtendedFile extends File {
  documentName: string
}
interface ComponentProps {
  disabled?: boolean
  selectedImages: SelectFileProps[]

  setSelectedImages: React.Dispatch<React.SetStateAction<SelectFileProps[]>>
  selectedSpecial: DocumentProps | null
  selectedSpecialCount: number
  selectedSpecialCountSet: React.Dispatch<React.SetStateAction<number>>
  removeDirtySet?: React.Dispatch<React.SetStateAction<boolean>>
}

const SelectMultipleImages = ({ disabled = false, selectedSpecial, selectedImages, setSelectedImages, selectedSpecialCount, selectedSpecialCountSet, removeDirtySet }: ComponentProps) => {
  const router = useRouter()

  const fileInputRefs = useRef<Array<HTMLInputElement | null>>([])

  const handleFileInputChange = (index: number, name: string) => async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (files) {
      let file = files[0] as ExtendedFile
      // TODO: Add if need
      // file.documentName = name

      // try {
      //   const formData = new FormData()
      //   formData.set("file", file)
      //   const uploadedFile = await FileConvertService.getImage(formData)
      //   console.log(uploadedFile)
      // } catch (error) {
      //   console.log(error)
      // }

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

  const updateManualFirstField = (documentName: string, manualFirstField: string) => {
    const matchDocument = selectedImages.find((document) => document.name === documentName)
    if (!matchDocument) return
    const updDocument: SelectFileProps = {
      ...matchDocument,
      manualFirstField,
    }
    const filteredDocuments = selectedImages.filter((search) => search.name !== documentName)
    setSelectedImages([...filteredDocuments, updDocument])
  }
  const updateManualSecondField = (documentName: string, manualSecondField: string) => {
    const matchDocument = selectedImages.find((document) => document.name === documentName)
    if (!matchDocument) return
    const updDocument: SelectFileProps = {
      ...matchDocument,
      manualSecondField,
    }

    const filteredDocuments = selectedImages.filter((search) => search.name !== documentName)
    setSelectedImages([...filteredDocuments, updDocument])
  }

  const handleSelectFileButtonClick = (index: number, name: string) => () => {
    fileInputRefs.current[index]?.click()
  }

  const onDelete = (file: SelectFileProps) => (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!file.isNew) {
      if (removeDirtySet) removeDirtySet(true)
    }
    const filtered = selectedImages.filter((search) => search.name !== file.name)
    setSelectedImages(filtered)
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
            disabled={disabled}
            className={clsx(
              "dark:blue-500 text-md w-full rounded-lg border border-blue-500 bg-blue-500 p-2 font-medium text-white transition-all duration-300 hover:bg-transparent hover:text-blue-500 dark:border-lightpurple-200 dark:bg-lightpurple-200 dark:hover:bg-transparent dark:hover:text-white",
              {
                "cursor-not-allowed": disabled,
              },
            )}
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

  const openDocumentModal = (file: SelectFileProps) => (e: React.MouseEvent<HTMLElement>) => {
    if (!file.file.type.includes("pdf")) {
      return window.open(`${file.url}`, "_blank")
    }
    selectedFileHandler(file)
    documentModalIsActiveToggle(true)
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

  return (
    <PhotoProvider>
      <div
        className={clsx("mb-6 rounded-lg border-[1px] border-dashed border-gray-200 bg-gray-50 p-4 transition-all", {
          "pointer-events-none hidden opacity-10": !selectedSpecial,
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
                if (matchFile.url && matchFile.url.length > 0 && !matchFile.url.includes(".doc") && !matchFile.url.includes(".pdf")) {
                  link = matchFile.url
                  isImage = true
                } else {
                  link = window.URL.createObjectURL(matchFile.file)
                  isImage = checkIsImage(matchFile.file)
                }
              }

              if (!doc.additionDocuments) {
                let matchManualFirstField = selectedImages.find((search) => search.name === doc.name && search.manualFirstField?.length)
                let matchManualSecondField = selectedImages.find((search) => search.name === doc.name && search.manualSecondField?.length)

                let defaultFirstField = ""
                let defaultSecondField = ""

                if (matchManualFirstField && matchManualFirstField !== undefined) {
                  defaultFirstField = `${matchManualFirstField.manualFirstField}`
                }
                if (matchManualSecondField && matchManualSecondField !== undefined) {
                  defaultSecondField = `${matchManualSecondField.manualSecondField}`
                }
                  return (
                    <div
                      key={index}
                      className="space-y-4">
                      <ul>
                        <li className="relative rounded-md bg-gray-200 p-2">
                          <span>
                            {index + 1}. {doc.name}
                          </span>
                          <div className="grid grid-cols-2 gap-2">
                            <div className={clsx("transition-all duration-300")}>
                              <label className="mb-1 block text-xs text-black/40 dark:text-white/40">Дата начала</label>
                              <input
                                onChange={(e) => {
                                  const val = e.target.value
                                  updateManualFirstField(doc.name, val)
                                }}
                                defaultValue={defaultFirstField}
                                type="text"
                                placeholder="Дата начала"
                                className="form-input"
                              />
                            </div>
                            <div className={clsx("transition-all duration-300", {})}>
                              <label className="mb-1 block text-xs text-black/40 dark:text-white/40">Дата окончания</label>
                              <input
                                onChange={(e) => {
                                  const val = e.target.value
                                  updateManualSecondField(doc.name, val)
                                }}
                                defaultValue={defaultSecondField}
                                type="text"
                                placeholder="Дата окончания"
                                className="form-input"
                              />
                            </div>
                          </div>
                          {/* INPUT FILE PICKER */}
                          {renderFileInput(selectedSpecial.documents.length - 1 === index ? selectedSpecial.documents.length + 3 : index, doc.name)}

                          {isImage === false && matchFile ? (
                            <div className="flex h-40 w-full flex-col items-center justify-center space-y-2 rounded-md bg-gray-100">
                              <p className="px-2 text-center">Документ {matchFile.file.name}</p>
                              <button
                                onClick={openDocumentModal(matchFile)}
                                type="button"
                                className={clsx("rounded-md bg-gray-300 px-4 py-2 transition-all duration-300 hover:bg-gray-400", {
                                  hidden: matchFile.isNew,
                                })}>
                                Открыть / Скачать
                              </button>
                            </div>
                          ) : isImage === true && matchFile ? (
                            <PhotoView src={link}>
                              <img
                                className="h-40 w-full rounded-md object-cover"
                                src={link}
                              />
                            </PhotoView>
                          ) : null}

                          {!matchFile ? null : (
                            <button
                              onClick={onDelete(matchFile)}
                              type="button"
                              className="absolute bottom-[140px] right-[10px] inline-flex items-center justify-center rounded-md bg-red-600 px-2 py-1 text-white">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-4 w-4 text-white">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          )}
                        </li>
                      </ul>
                    </div>
                  )
              } else {
                let matchManualFirstField = selectedImages.find((search) => search.name === doc.name && search.manualFirstField?.length)
                let matchManualSecondField = selectedImages.find((search) => search.name === doc.name && search.manualSecondField?.length)

                let defaultFirstField = ""
                let defaultSecondField = ""

                if (matchManualFirstField && matchManualFirstField !== undefined) {
                  defaultFirstField = `${matchManualFirstField.manualFirstField}`
                }
                if (matchManualSecondField && matchManualSecondField !== undefined) {
                  defaultSecondField = `${matchManualSecondField.manualFirstField}`
                }
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
                          if (matchFile.url && matchFile.url.length > 0 && !matchFile.url.includes(".doc") && !matchFile.url.includes(".pdf")) {
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
                            className="relative rounded-md bg-gray-300 p-2">
                            <p>
                              {index + 1}.{addIndex + 1} {addDoc}
                            </p>

                            <div className="grid grid-cols-2 gap-2">
                              <div className={clsx("transition-all duration-300", {})}>
                                <label className="mb-1 block text-xs text-black/40 dark:text-white/40">Дата начала</label>
                                <input
                                  onChange={(e) => {
                                    const val = e.target.value
                                    updateManualFirstField(doc.name, val)
                                  }}
                                  defaultValue={defaultFirstField}
                                  type="text"
                                  placeholder="Дата начала"
                                  className="form-input"
                                />
                              </div>
                              <div className={clsx("transition-all duration-300", {})}>
                                <label className="mb-1 block text-xs text-black/40 dark:text-white/40">Дата окончания</label>
                                <input
                                  onChange={(e) => {
                                    const val = e.target.value
                                    updateManualSecondField(doc.name, val)
                                  }}
                                  defaultValue={defaultSecondField}
                                  type="text"
                                  placeholder="Дата окончания"
                                  className="form-input"
                                />
                              </div>
                            </div>

                            {renderFileInput(index + addIndex, addDoc)}

                            {isImage === false && matchFile ? (
                              <div className="flex h-40 w-full flex-col items-center justify-center space-y-2 rounded-md bg-gray-100">
                                <p className="px-2 text-center">Документ {matchFile.file.name}</p>
                                <button
                                  onClick={openDocumentModal(matchFile)}
                                  type="button"
                                  className="rounded-md bg-gray-300 px-4 py-2 transition-all duration-300 hover:bg-gray-400">
                                  Открыть / Скачать
                                </button>
                              </div>
                            ) : isImage === true && matchFile ? (
                              <PhotoView src={link}>
                                <img
                                  className="h-40 w-full rounded-md object-cover"
                                  src={link}
                                />
                              </PhotoView>
                            ) : null}

                            {!matchFile ? null : (
                              <button
                                onClick={onDelete(matchFile)}
                                type="button"
                                className="absolute bottom-[140px] right-[10px] inline-flex items-center justify-center rounded-md bg-red-600 px-2 py-1 text-white">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="h-4 w-4 text-white">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            )}
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
