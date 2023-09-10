import { AVAILABLE_LS_KEYS } from "@/src/shared/constants"
import { documents } from "@/src/shared/documents"
import { AuthService } from "@/src/shared/http/services/authService"
import { RegisterRequest } from "@/src/shared/http/services/authService/types/register"
import { DocumentProps } from "@/src/shared/types/document"
import SelectMultipleImages from "@/src/widgets/SelectImages/selectMultipleImages"
import { useRouter } from "next/router"
import React, { ReactElement, useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { NextPageWithLayout } from "../../_app"
import { SiteLayout } from "@/src/widgets/Layouts/SiteLayout"
import ProfileLayout from "@/src/widgets/Layouts/ProfileLayout"
import { ProfileStore } from "@/src/shared/store/profileStore"
import useUpdateProfile from "@/src/shared/hooks/useUpdateProfile"

interface PageProps {}
interface FormProps extends RegisterRequest {
  confirmPassword: string
}

const Page: NextPageWithLayout<PageProps> = () => {
  const router = useRouter()

  const { data: profileData } = ProfileStore.useState((store) => store)
  const [selectedImages, setSelectedImages] = useState<{ file: File; name: string }[]>([])
  const [selectedSpecial, selectedSpecialSet] = useState<DocumentProps | null>(null)
  const [selectedSpecialCount, selectedSpecialCountSet] = useState(0)

  const selectRef = useRef<HTMLSelectElement>(null)

  const {
    register,
    setValue: formSetValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>()

  const onSelectSpecial = (item: string) => {
    const matchItem = documents.find((filteredItem) => filteredItem.title === item)
    if (matchItem) {
      selectedSpecialSet(matchItem)
    }
  }

  const onSubmit = handleSubmit(async (data, event) => {
    if (data.password !== data.confirmPassword) return toast.error(`Пароли должны совпадать`)
    if (!selectedSpecial) return toast.error(`Выбирете должность`, {})
    try {
      const { password, confirmPassword, speciality, ...rest } = data as unknown as { [key: string]: string }

      // Если специализация такая же и не загружены новые изображения
      // Отправляем базовые поля + statusChangeFile = false
      if (profileData && profileData.speciality === selectedSpecial.title && selectedImages.length === 0) {
        const formData = new FormData()
        for (const key in rest) {
          formData.set(key, rest[key])
        }
        formData.set("speciality", selectedSpecial.title)
        formData.set("statusChangeFile", "false")

        useUpdateProfile(formData, router)
        
      }

      // Если специализация такая же, но загружены новые изображения
      // Отправляем базовые поля + statusChangeFile = true + documentAttachments
      if (profileData && profileData.speciality === selectedSpecial.title && selectedImages.length > 0) {
        if (selectedImages.length !== selectedSpecialCount) return toast.error(`Выбрано файлов ${selectedImages.length} из ${selectedSpecialCount}`)

        const formData = new FormData()
        for (const key in rest) {
          formData.set(key, rest[key])
        }
        formData.set("speciality", selectedSpecial.title)

        formData.set("statusChangeFile", "true")
        const parsedImages: File[] = selectedImages.map((image) => image.file)

        for (const file of parsedImages) {
          formData.append("documents", file)
        }

        useUpdateProfile(formData, router)
      }

      // Если специализация другая
      // Отправляем базовые поля + обновленная специализация + statusChangeFile = true + documentAttachments
      if (profileData && profileData.speciality !== selectedSpecial.title) {
        if (selectedImages.length !== selectedSpecialCount) return toast.error(`Выбрано файлов ${selectedImages.length} из ${selectedSpecialCount}`)

        const formData = new FormData()
        for (const key in rest) {
          formData.set(key, rest[key])
        }
        formData.set("speciality", selectedSpecial.title)

        formData.set("statusChangeFile", "true")
        const parsedImages: File[] = selectedImages.map((image) => image.file)

        for (const file of parsedImages) {
          formData.append("documents", file)
        }
        
        useUpdateProfile(formData, router)
      }
    } catch (error) {
      toast.error(`Ошибка`)
      console.log(error)
    }
  })

  useEffect(() => {
    if (profileData) {
      const { name, lastname, surname, balance, city, dateBirth, phoneNumber, speciality, documents: profileDocuments } = profileData

      formSetValue("name", name)
      formSetValue("lastname", lastname)
      formSetValue("surname", surname)
      formSetValue("dateBirth", dateBirth)
      formSetValue("phoneNumber", phoneNumber)
      formSetValue("city", city)

      const matchSpecial = documents.find((document) => document.title === speciality)

      if (matchSpecial) {
        selectedSpecialSet(matchSpecial)
        if (selectRef.current) {
          selectRef.current.value = matchSpecial.title
        }
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
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Имя"
              className="form-input"
            />
          </div>

          <div className="mb-4">
            <input
              {...register("lastname", { required: true })}
              type="text"
              placeholder="Фамилия"
              className="form-input"
            />
          </div>

          <div className="mb-4">
            <input
              {...register("surname", { required: true })}
              type="text"
              placeholder="Отчество"
              className="form-input"
            />
          </div>

          <div className="mb-4">
            <input
              {...register("dateBirth", { required: true })}
              type="text"
              placeholder="Дата рождения"
              className="form-input"
            />
          </div>

          <div className="mb-4">
            <input
              {...register("phoneNumber", { required: true })}
              type="text"
              placeholder="Номер телефона"
              className="form-input"
            />
          </div>

          <div className="mb-4">
            <input
              {...register("city", { required: true })}
              type="text"
              placeholder="Город присутствия"
              className="form-input"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="countries"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Должность <span>{selectedSpecial?.title}</span>
            </label>
            <select
              ref={selectRef}
              onChange={(e) => onSelectSpecial(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500">
              <option>Выбирете должность</option>
              {documents.map((item) => {
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

          <SelectMultipleImages
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
            selectedSpecial={selectedSpecial}
            selectedSpecialCount={selectedSpecialCount}
            selectedSpecialCountSet={selectedSpecialCountSet}
          />

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
