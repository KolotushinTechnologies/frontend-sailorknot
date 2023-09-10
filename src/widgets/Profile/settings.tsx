import { AVAILABLE_LS_KEYS } from "@/src/shared/constants"
import { documents } from "@/src/shared/documents"
import { AuthService } from "@/src/shared/http/services/authService"
import { RegisterRequest } from "@/src/shared/http/services/authService/types/register"
import { DocumentProps } from "@/src/shared/types/document"
import SelectMultipleImages from "@/src/widgets/SelectImages/selectMultipleImages"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { FC, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
interface FormProps extends RegisterRequest {
  confirmPassword: string
}

export const ProfileSettings = () => {
  const router = useRouter()

  const [selectedImages, setSelectedImages] = useState<{ file: File; name: string }[]>([])
  const [selectedSpecial, selectedSpecialSet] = useState<DocumentProps | null>(null)
  const [selectedSpecialCount, selectedSpecialCountSet] = useState(0)

  const onSelectSpecial = (item: string) => {
    const matchItem = documents.find((filteredItem) => filteredItem.title === item)
    if (matchItem) {
      selectedSpecialSet(matchItem)
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>()

  const onSubmit = handleSubmit(async (data, event) => {
    if (data.password !== data.confirmPassword) return toast.error(`Пароли должны совпадать`)
    if (!selectedSpecial) return toast.error(`Выбирете должность`, {})
    if (selectedImages.length !== selectedSpecialCount) return toast.error(`Выбрано файлов ${selectedImages.length} из ${selectedSpecialCount}`)
    try {
      const { confirmPassword, ...rest } = data as unknown as { [key: string]: string }
      const parsedImages: File[] = selectedImages.map((image) => image.file)

      const formData = new FormData()
      for (const key in rest) {
        formData.set(key, rest[key])
      }

      formData.set("speciality", selectedSpecial.title)

      for (const file of parsedImages) {
        formData.append("documents", file)
      }

      const { data: res } = await AuthService.register(formData)
      localStorage.setItem(AVAILABLE_LS_KEYS.token, res.token)
      console.log(res)

      router.push("/profile")
      toast.success(`Успех`)
    } catch (error) {
      toast.error(`Ошибка`)
      console.log(error)
    }
  })
  return (
    <div className="flex flex-col gap-7">
      <div className="grid gap-7 lg:grid-cols-2">
        <div className="rounded-2xl bg-lightwhite p-6 dark:bg-white/5">
          <h2 className="mb-4 text-lg font-semibold">Настройки профиля</h2>
          
        </div>
      </div>
    </div>
  )
}
