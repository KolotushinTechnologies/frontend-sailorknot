import { DocumentProps } from "@/src/shared/types/document"
import clsx from "clsx"
import React, { useEffect, useRef, useState } from "react"

interface ComponentProps {
  selectedSpecial: DocumentProps | null
}

const SelectMultipleImages = ({ selectedSpecial }: ComponentProps) => {
  const [maxLength, maxLengthSet] = useState(0)
  const [selectedImages, setSelectedImages] = useState<{ file: File; name: string }[]>([])
  const fileInputRefs = useRef<Array<HTMLInputElement | null>>([])

  const handleFileInputChange = (index: number, name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      console.log('name: ', name);
      setSelectedImages((prevSelectedImages) => {
        const updatedSelectedImages = [...prevSelectedImages];
        updatedSelectedImages[index] = {
          file: files[0],
          name: '',
        };
        return updatedSelectedImages;
      });
    }
  };

  const handleSelectFileButtonClick = (index: number) => () => {
    fileInputRefs.current[index]?.click()
  }

  const renderFileInput = (index: number, name: string) => (
    <div className="my-2">
      <input
        type="file"
        style={{ display: "none" }}
        ref={(el) => (fileInputRefs.current[index] = el)}
        onChange={handleFileInputChange(index, name)}
      />
      <div className="grid space-y-2">
        <button
          className="dark:blue-500 text-md w-full rounded-lg border border-blue-500 bg-blue-500 p-2 font-medium text-white transition-all duration-300 hover:bg-transparent hover:text-blue-500 dark:border-lightpurple-200 dark:bg-lightpurple-200 dark:hover:bg-transparent dark:hover:text-white"
          type="button"
          onClick={handleSelectFileButtonClick(index)}>
          Выбрать изображение
        </button>
        <button
          type="button"
          className="dark:blue-500 text-md w-full rounded-lg border border-red-500 bg-red-500 p-2 font-medium text-white transition-all duration-300 hover:bg-transparent hover:text-red-500 dark:border-lightpurple-200 dark:bg-lightpurple-200 dark:hover:bg-transparent dark:hover:text-white">
          Предосмотр
        </button>
      </div>
    </div>
  )

  useEffect(() => {
    setSelectedImages([])
    if (selectedSpecial) {
      let maxLength = selectedSpecial.documents.length - 1
      maxLengthSet(maxLength)
      for (const document of selectedSpecial.documents) {
        if (document.additionDocuments) {
          maxLengthSet((prev) => prev + document.additionDocuments!.length)
        }
      }
    }
  }, [selectedSpecial])

  return (
    <div
      className={clsx("mb-6 rounded-lg border-[1px] border-dashed border-gray-200 bg-gray-50 p-4 transition-all", {
        "pointer-events-none hidden cursor-not-allowed opacity-10": !selectedSpecial,
        "pointer-events-auto block opacity-100": selectedSpecial,
      })}>
      {selectedSpecial && (
        <div>
          <h3 className="mb-4 text-[16px] font-medium">Всего файлов для загрузки: {maxLength} </h3>
          {selectedSpecial.documents.map((doc, index) => {
            if (!doc.additionDocuments) {
              return (
                <ul
                  className="space-y-4"
                  key={index}>
                  <li>
                    <p>
                      {index + 1}. {doc.name}
                    </p>
                    {renderFileInput(index, doc.name)}
                  </li>
                </ul>
              )
            } else {
              return (
                <div key={index} className="mb-2 mt-4 rounded-md bg-gray-200 p-4 pl-4">
                  <p className="mb-2 text-[16px] font-medium">{doc.name}</p>
                  <ul className="list-inside space-y-2">
                    {doc.additionDocuments.map((addDoc, addIndex) => (
                      <li key={addIndex}>
                        <p>
                          {index + 1}.{addIndex + 1} {addDoc}
                        </p>
                        {renderFileInput(index + addIndex + 1, addDoc)} {/* Offset index */}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            }
          })}
        </div>
      )}
    </div>
  )
}

export default SelectMultipleImages
