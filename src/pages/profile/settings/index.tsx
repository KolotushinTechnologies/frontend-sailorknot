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
        const response = await fetch(image.link)
        const blob = await response.blob()
        const file = new File([blob], image.name)

        const preparedFile: SelectFileProps = {
          file,
          isNew: false,
          name: image.name,
          url: image.link,
        }
        files.push(preparedFile)
      })

      await Promise.all(promises)
      setSelectedImages(files)
    }
  }

  const onSubmit = handleSubmit(async (data, event) => {
    if (data.password !== data.confirmPassword) return toast.error(`Пароли должны совпадать`)
    if (!selectedSpecial) return toast.error(`Выбирете должность`, {})
    try {
      const { password, confirmPassword, speciality, phoneNumber, ...rest } = data

      // Если специализация такая же и не загружены новые изображения
      // Отправляем базовые поля + statusChangeFile = false
      if (profileData && profileData.speciality === selectedSpecial.title && selectedImages.length === 0) {
        const formData = new FormData()
        for (const key in rest) {
          // @ts-ignore
          formData.set(key, rest[key])
        }
        formData.set("speciality", selectedSpecial.title)
        formData.set("phoneNumber", `+${phoneNumber}`)
        formData.set("statusChangeFile", "false")

        updateProfile(formData, router)
      }

      // Если специализация такая же, но загружены новые изображения
      // Отправляем базовые поля + statusChangeFile = true + documentAttachments
      if (profileData && profileData.speciality === selectedSpecial.title && selectedImages.length > 0) {
        // if (selectedImages.length !== selectedSpecialCount) return toast.error(`Выбрано файлов ${selectedImages.length} из ${selectedSpecialCount}`)

        const formData = new FormData()
        for (const key in rest) {
          // @ts-ignore
          formData.set(key, rest[key])
        }
        formData.set("speciality", selectedSpecial.title)
        formData.set("phoneNumber", `+${phoneNumber}`)
        formData.set("statusChangeFile", "true")
        const parsedImages: File[] = selectedImages.map((image) => image.file)

        for (const file of parsedImages) {
          formData.append("documents", file)
        }

        updateProfile(formData, router)
      }

      // Если специализация другая
      // Отправляем базовые поля + обновленная специализация + statusChangeFile = true + documentAttachments
      if (profileData && profileData.speciality !== selectedSpecial.title) {
        if (selectedImages.length !== selectedSpecialCount) return toast.error(`Выбрано файлов ${selectedImages.length} из ${selectedSpecialCount}`)

        const formData = new FormData()
        for (const key in rest) {
          // @ts-ignore
          formData.set(key, rest[key])
        }
        formData.set("speciality", selectedSpecial.title)

        formData.set("statusChangeFile", "true")
        const parsedImages: File[] = selectedImages.map((image) => image.file)

        for (const file of parsedImages) {
          formData.append("documents", file)
        }

        updateProfile(formData, router)
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
      const parsedPhone = `${phoneNumber.slice(1)}`
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
            <label className="mb-1 block text-xs text-black/40 dark:text-white/40">Номер телефона</label>
            <IMaskInput
              mask={"+{7}(000)000-00-00"}
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
          </div>

          {/* <Controller
            control={control}
            name="phoneNumber"
            defaultValue={""}
            render={({ field }) => (
              <input
                {...field}
                value={field.value}
                type="text"
                placeholder="Номер телефона"
                className="form-input"
              />
            )}
          /> */}

          <div className="mb-4">
            <label className="mb-1 block text-xs text-black/40 dark:text-white/40">Город присутствия</label>
            <input
              {...register("city", { required: true })}
              type="text"
              placeholder="Город присутствия"
              className="form-input"
            />
          </div>

          <div className="mb-4">
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
