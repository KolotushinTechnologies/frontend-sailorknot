import { documents } from "@/src/shared/documents"
import { RegisterRequest } from "@/src/shared/http/services/authService/types/register"
import { DocumentProps } from "@/src/shared/types/document"
import { IMaskInput } from "react-imask"
import SelectMultipleImages from "@/src/widgets/SelectImages/selectMultipleImages"
import { useRouter } from "next/router"
import React, { ReactElement, useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { NextPageWithLayout } from "../../_app"
import { SiteLayout } from "@/src/widgets/Layouts/SiteLayout"
import ProfileLayout from "@/src/widgets/Layouts/ProfileLayout"
import { ProfileStore } from "@/src/shared/store/profileStore"
import updateProfile from "@/src/shared/helpers/updateProfile"
import { ProfileProps, SelectFileProps } from "@/src/shared/types"
import clsx from "clsx"
import { http } from "@/src/shared/http"
import { ParseImageService } from "@/src/shared/http/services/parseImageService"
import { praseUrlToFile } from "@/src/shared/helpers/praseUrlToFile"

interface PageProps {}
interface FormProps extends RegisterRequest {
  confirmPassword: string
}

const Page: NextPageWithLayout<PageProps> = () => {
  const router = useRouter()

  const { data: profileData } = ProfileStore.useState((store) => store)
  const [selectedImages, setSelectedImages] = useState<SelectFileProps[]>([])
  const [selectedSpecial, selectedSpecialSet] = useState<DocumentProps | null>(null)
  const [selectedSpecialCount, selectedSpecialCountSet] = useState(0)
  const [removeDirty, removeDirtySet] = useState(false)

  const ref = useRef(null)
  const inputRef = useRef(null)

  const selectRef = useRef<HTMLSelectElement>(null)

  const {
    register,
    control,
    setValue: formSetValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>()

  const onSelectSpecial = (item: string) => {
    const matchItem = documents.find((filteredItem) => filteredItem.title === item)
    if (matchItem) {
      selectedSpecialSet(matchItem)
    }
  }

  const parseImages = async ({ data }: { data: ProfileProps }) => {
    if (!data || !data.data) return null
    if (data.data.documents.length > 0) {
      const files: SelectFileProps[] = []

      const promises = data.data.documents.map(async (image) => {
        try {
          const file = await praseUrlToFile(image.link, image.name)
          
          const preparedFile: SelectFileProps = {
            file,
            isNew: false,
            name: image.name,
            url: image.link,
            manualFirstField: image.manualFirstField,
            manualSecondField: image.manualSecondField,
          }
          files.push(preparedFile)
        } catch (error) {}
      })

      await Promise.all(promises)
      setSelectedImages(files)
    }
  }

  const onSubmit = handleSubmit(async (data, event) => {
    if (data.password !== data.confirmPassword) return toast.error(`Пароли должны совпадать`)
    if (!selectedSpecial) return toast.error(`Выбирете должность`, {})
    const { password, confirmPassword, speciality, phoneNumber, balance, ...rest } = data
    const manualFirstFieldArray: string[] = []
    const manualSecondFieldArray: string[] = []

    selectedImages.forEach((document) => {
      document.manualFirstField ? manualFirstFieldArray.push(document.manualFirstField) : manualFirstFieldArray.push("")
      document.manualSecondField ? manualSecondFieldArray.push(document.manualSecondField) : manualSecondFieldArray.push("")
    })

    // Оставить все как есть
    if (
      selectedImages.every((search) => search.isNew === false) &&
      profileData &&
      profileData.documents.length === selectedImages.length &&
      profileData &&
      profileData.speciality === selectedSpecial.title
    ) {
      console.log("Оставить все как есть")
      try {
        const formData = new FormData()
        for (const key in rest) {
          // @ts-ignore
          formData.set(key, rest[key])
        }
        formData.set("speciality", selectedSpecial.title)
        formData.set("phoneNumber", `+7${phoneNumber}`)
        formData.set("manualFirstField", JSON.stringify(manualFirstFieldArray))
        formData.set("manualSecondField", JSON.stringify(manualSecondFieldArray))

        formData.set("documents", JSON.stringify([]))
        formData.set("filenames", JSON.stringify([]))

        await updateProfile(formData, router)
      } catch (error) {
      } finally {
        removeDirtySet(false)
      }
      return
    }

    // Удалить все документы
    if (selectedImages.length === 0 && profileData && profileData.documents.length > 0) {
      console.log("Удалить все документы")
      try {
        const formData = new FormData()
        for (const key in rest) {
          // @ts-ignore
          formData.set(key, rest[key])
        }
        formData.set("speciality", selectedSpecial.title)
        formData.set("phoneNumber", `+7${phoneNumber}`)
        formData.set("manualFirstField", JSON.stringify(manualFirstFieldArray))
        formData.set("manualSecondField", JSON.stringify(manualSecondFieldArray))

        formData.set("statusChangeFile", "false")
        formData.set("documents", JSON.stringify([]))
        formData.set("filenames", JSON.stringify([]))

        await updateProfile(formData, router)
      } catch (error) {
      } finally {
        removeDirtySet(false)
      }
      return
    }

    // Изменить документы / Добавить новые
    if ((selectedImages.length > 0 && profileData && profileData.documents.length === 0) || selectedImages.some((search) => search.isNew === true) || removeDirty) {
      console.log("Изменить документы / Добавить новые")

      try {
        const formData = new FormData()
        for (const key in rest) {
          // @ts-ignore
          formData.set(key, rest[key])
        }
        formData.set("speciality", selectedSpecial.title)
        formData.set("phoneNumber", `+7${phoneNumber}`)
        formData.set("manualFirstField", JSON.stringify(manualFirstFieldArray))
        formData.set("manualSecondField", JSON.stringify(manualSecondFieldArray))

        formData.set("statusChangeFile", "true")

        const parsedImages: File[] = selectedImages.map((image) => image.file)
        for (const file of parsedImages) {
          formData.append("documents", file)
        }
        const parseSelectedImages: string[] = selectedImages.map((image) => image.name)
        formData.set("filenames", JSON.stringify(parseSelectedImages))

        console.log("parsedImages: ", parsedImages)
        console.log("filenames: ", parseSelectedImages)

        await updateProfile(formData, router)
      } catch (error) {
      } finally {
        removeDirtySet(false)
      }
      return
    }

    return
    // try {
    //   const { password, confirmPassword, speciality, phoneNumber, balance, ...rest } = data
    //   // Если специализация такая же и не загружены новые изображения
    //   // Отправляем базовые поля + statusChangeFile = false
    //   if (profileData && profileData.speciality === selectedSpecial.title && profileData.documents.length &&) {

    //     const formData = new FormData()
    //     for (const key in rest) {
    //       // @ts-ignore
    //       formData.set(key, rest[key])
    //     }
    //     formData.set("speciality", selectedSpecial.title)
    //     formData.set("phoneNumber", `+${phoneNumber}`)
    //     const parsedImages: File[] = selectedImages.map((image) => image.file)

    //     for (const file of parsedImages) {
    //       formData.append("documents", file)
    //     }
    //     const parseSelectedImages: string[] = selectedImages.map((image) => image.name)
    //     formData.set("filenames", JSON.stringify(parseSelectedImages))

    //     updateProfile(formData, router)
    //   }
    //   return
    //   // Если специализация такая же, но загружены новые изображения
    //   // Отправляем базовые поля + statusChangeFile = true + documentAttachments
    //   if (profileData && profileData.speciality === selectedSpecial.title && selectedImages.length > 0) {
    //     // if (selectedImages.length !== selectedSpecialCount) return toast.error(`Выбрано файлов ${selectedImages.length} из ${selectedSpecialCount}`)

    //     const formData = new FormData()
    //     for (const key in rest) {
    //       // @ts-ignore
    //       formData.set(key, rest[key])
    //     }
    //     formData.set("speciality", selectedSpecial.title)
    //     formData.set("phoneNumber", `+${phoneNumber}`)
    //     formData.set("statusChangeFile", "true")
    //     const parsedImages: File[] = selectedImages.map((image) => image.file)

    //     // TODO: Добавить, когда будет готов метод
    //     // for (const file of parsedImages) {
    //     //   formData.append("documents", file)
    //     // }

    //     updateProfile(formData, router)
    //   }

    //   // Если специализация другая
    //   // Отправляем базовые поля + обновленная специализация + statusChangeFile = true + documentAttachments
    //   if (profileData && profileData.speciality !== selectedSpecial.title) {
    //     if (selectedImages.length !== selectedSpecialCount) return toast.error(`Выбрано файлов ${selectedImages.length} из ${selectedSpecialCount}`)

    //     const formData = new FormData()
    //     for (const key in rest) {
    //       // @ts-ignore
    //       formData.set(key, rest[key])
    //     }
    //     formData.set("speciality", selectedSpecial.title)

    //     formData.set("statusChangeFile", "true")
    //     const parsedImages: File[] = selectedImages.map((image) => image.file)

    //     // TODO: Добавить, когда будет готов метод
    //     // for (const file of parsedImages) {
    //     //   formData.append("documents", file)
    //     // }

    //     updateProfile(formData, router)
    //   }
    // } catch (error) {
    //   toast.error(`Ошибка`)
    //   console.log(error)
    // }
  })

  useEffect(() => {
    if (profileData) {
      const { name, lastname, surname, balance, city, dateBirth, phoneNumber, speciality, documents: profileDocuments } = profileData

      formSetValue("name", name)
      formSetValue("lastname", lastname)
      formSetValue("surname", surname)
      formSetValue("dateBirth", dateBirth)
      const parsedPhone = `${phoneNumber.slice(2)}`
      formSetValue("phoneNumber", parsedPhone)
      formSetValue("city", city)

      const matchSpecial = documents.find((document) => document.title === speciality)

      if (matchSpecial) {
        selectedSpecialSet(matchSpecial)
        if (selectRef.current) {
          selectRef.current.value = matchSpecial.title
        }
      }
      if (selectedImages.length === 0) {
        parseImages({ data: { data: profileData } })
      }
    }
  }, [profileData])

  return (
    <div>
      <h1 className="mb-6 text-lg font-bold">Мои настройки</h1>
      <div className="max-w-lg">
        <form
          onSubmit={onSubmit}
          className="mb-4">
          <div className="mb-4">
            <label className="mb-1 block text-xs text-black/40 dark:text-white/40">Фамилия</label>
            <input
              {...register("lastname", { required: true })}
              type="text"
              placeholder="Фамилия"
              className="form-input"
            />
          </div>

          <div className="mb-4">
            <label className="mb-1 block text-xs text-black/40 dark:text-white/40">Имя</label>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Имя"
              className="form-input"
            />
          </div>

          <div className="mb-4">
            <label className="mb-1 block text-xs text-black/40 dark:text-white/40">Отчество</label>
            <input
              {...register("surname", { required: true })}
              type="text"
              placeholder="Отчество"
              className="form-input"
            />
          </div>

          <div className="mb-4">
            <label className="mb-1 block text-xs text-black/40 dark:text-white/40">Дата рождения</label>
            <input
              {...register("dateBirth", { required: true })}
              type="text"
              placeholder="Дата рождения"
              className="form-input"
            />
          </div>

          <div className="mb-4">
            <div className="flex h-[46px]">
              <span className="flex h-full items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400">
                +7
              </span>
              <IMaskInput
                mask={"(000)000-00-00"}
                radix="."
                className="block h-full w-full min-w-0 flex-1 rounded-none rounded-r-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                {...register("phoneNumber", { required: true })}
                value={profileData ? `${profileData.phoneNumber.slice(2)}` : ""}
                unmask={true}
                ref={ref}
                onFocus={undefined}
                inputRef={inputRef}
                onAccept={(value, mask) => formSetValue("phoneNumber", value)}
                placeholder="Введите номер телефона без 8 или +7"
              />
            </div>
          </div>

          {/* <div className="mb-4">
            <label className="mb-1 block text-xs text-black/40 dark:text-white/40">Номер телефона</label>
            <IMaskInput
                mask={"(000)000-00-00"}
              radix="."
              className="form-input"
              value={getValues("phoneNumber")}
              unmask={true}
              ref={ref}
              onFocus={undefined}
              inputRef={inputRef}
              onAccept={(value, mask) => formSetValue("phoneNumber", value)}
              placeholder="Номер телефона"
            />
          </div> */}

          <div className="mb-4">
            <label className="mb-1 block text-xs text-black/40 dark:text-white/40">Город присутствия</label>
            <input
              {...register("city", { required: true })}
              type="text"
              placeholder="Город присутствия"
              className="form-input"
            />
          </div>

          <div
            className={clsx("mb-4", {
              hidden: profileData && profileData.speciality.toLocaleLowerCase().includes("агент"),
            })}>
            <label
              htmlFor="spec"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Должность <span>{selectedSpecial?.title}</span>
            </label>
            <select
              id="spec"
              ref={selectRef}
              onChange={(e) => onSelectSpecial(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500">
              <option>Выбирете должность</option>
              {documents.slice(1).map((item) => {
                const { title, documents } = item
                return (
                  <option
                    key={item.title}
                    value={`${title}`}>
                    {title}
                  </option>
                )
              })}
            </select>
          </div>

          {profileData && profileData.speciality.toLocaleLowerCase().includes("агент") ? null : (
            <SelectMultipleImages
              selectedImages={selectedImages}
              setSelectedImages={setSelectedImages}
              selectedSpecial={selectedSpecial}
              selectedSpecialCount={selectedSpecialCount}
              selectedSpecialCountSet={selectedSpecialCountSet}
              removeDirtySet={removeDirtySet}
            />
          )}

          <button
            type="submit"
            className="w-full rounded-lg border border-black bg-black px-4 py-2 text-lg font-semibold text-white transition-all duration-300 hover:bg-transparent hover:text-black dark:border-lightpurple-200 dark:bg-lightpurple-200 dark:text-black dark:hover:bg-transparent dark:hover:text-white">
            Сохранить
          </button>
        </form>
      </div>
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <SiteLayout>
      <ProfileLayout>{page}</ProfileLayout>
    </SiteLayout>
  )
}

export default Page
