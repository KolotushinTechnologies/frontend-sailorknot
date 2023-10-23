import { AVAILABLE_LS_KEYS } from "@/src/shared/constants"
import { documents } from "@/src/shared/documents"
import { IMaskInput } from "react-imask"
import { AuthService } from "@/src/shared/http/services/authService"
import { RegisterRequest } from "@/src/shared/http/services/authService/types/register"
import { SelectFileProps } from "@/src/shared/types"
import { DocumentProps } from "@/src/shared/types/document"
import SelectMultipleImages from "@/src/widgets/SelectImages/selectMultipleImages"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { FC, useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

interface ComponentProps {}
interface FormProps extends RegisterRequest {
  confirmPassword: string
}

const SignUpPage: FC<ComponentProps> = () => {
  const router = useRouter()

  const [selectedImages, setSelectedImages] = useState<SelectFileProps[]>([])
  const [selectedSpecial, selectedSpecialSet] = useState<DocumentProps | null>(null)
  const [selectedSpecialCount, selectedSpecialCountSet] = useState(0)

  const ref = useRef(null)
  const inputRef = useRef(null)

  const onSelectSpecial = (item: string) => {
    const matchItem = documents.find((filteredItem) => filteredItem.title === item)
    if (matchItem) {
      selectedSpecialSet(matchItem)
    }
  }

  const {
    register,
    handleSubmit,
    getValues,
    setValue: formSetValue,
    formState: { errors },
  } = useForm<FormProps>()

  const onSubmit = handleSubmit(async (data, event) => {
    if (data.password !== data.confirmPassword) return toast.error(`Пароли должны совпадать`)
    if (!selectedSpecial) return toast.error(`Выбирете должность`, {})

    try {
      const { confirmPassword, phoneNumber, ...rest } = data as unknown as { [key: string]: string }
      const parsedImages: File[] = selectedImages.map((image) => image.file)
      const manualFirstFieldArray: string[] = []
      const manualSecondFieldArray: string[] = []

      selectedImages.forEach((document) => {
        document.manualFirstField ? manualFirstFieldArray.push(document.manualFirstField) : manualFirstFieldArray.push("")
        document.manualSecondField ? manualSecondFieldArray.push(document.manualSecondField) : manualSecondFieldArray.push("")
      })

      const formData = new FormData()
      for (const key in rest) {
        formData.set(key, rest[key])
      }

      formData.set("speciality", selectedSpecial.title)
      formData.set("phoneNumber", `+7${phoneNumber}`)
      formData.set("manualFirstField", JSON.stringify(manualFirstFieldArray))
      formData.set("manualSecondField", JSON.stringify(manualSecondFieldArray))

      const parseSelectedImages: string[] = selectedImages.map((image) => image.name)

      formData.set("filenames", JSON.stringify(parseSelectedImages))

      for (const file of parsedImages) {
        formData.append("documents", file)
      }
      const { data: res } = await AuthService.register(formData)
      localStorage.setItem(AVAILABLE_LS_KEYS.token, res.token)
      toast.success(`Успех`)
      await router.push("/profile/settings")
    } catch (error) {
      toast.error(`Ошибка`)
      console.log(error)
    }
  })

  return (
    <>
      <div className="my-auto flex min-h-[calc(100vh-134px)] items-center justify-center px-4 py-4 sm:px-12">
        <div className="loginform w-full max-w-[780px] flex-none rounded-2xl bg-white p-4 dark:bg-white/5 sm:p-10 lg:px-[146px] lg:py-[107px]">
          <h1 className="mb-2 text-center text-2xl font-semibold">Регистрация</h1>
          <div className="mb-7 flex items-center">
            <div className="h-[2px] w-full bg-black/10 dark:bg-white/10"></div>
            <div className="whitespace-nowrap px-5 text-black/40 dark:text-white/40">Описание</div>
            <div className="h-[2px] w-full bg-black/10 dark:bg-white/10"></div>
          </div>

          <form
            onSubmit={onSubmit}
            className="mb-4">
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
                {...register("name", { required: true })}
                type="text"
                placeholder="Имя"
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
              <div className="flex h-[46px]">
                <span className="flex h-full items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400">
                  +7
                </span>
                <IMaskInput
                  mask={"(000)000-00-00"}
                  radix="."
                  className="block h-full w-full min-w-0 flex-1 rounded-none rounded-r-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  {...register("phoneNumber", { required: true })}
                  unmask={true}
                  ref={ref}
                  onFocus={undefined}
                  inputRef={inputRef}
                  onAccept={(value, mask) => formSetValue("phoneNumber", value)}
                  placeholder="Введите номер телефона без 8 или +7"
                />
              </div>
            </div>

            <div className="relative mb-2">
              <input
                autoComplete="off"
                {...register("password", { required: true })}
                type="password"
                placeholder="Пароль"
                className="form-input !pr-7"
              />

              <button
                type="submit"
                className="absolute right-3 top-3 hidden text-black/20 hover:text-black dark:text-white/20 dark:hover:text-white"></button>
            </div>

            <div className="mb-3 hidden gap-2">
              <div className="h-1 w-full bg-black/10 dark:bg-white/10"></div>
              <div className="h-1 w-full bg-black/10 dark:bg-white/10"></div>
              <div className="h-1 w-full bg-black/10 dark:bg-white/10"></div>
              <div className="h-1 w-full bg-black/10 dark:bg-white/10"></div>
            </div>
            <p className="mb-4 text-xs text-black/40 dark:text-white/40">Введите 8 и более символов, включая числа</p>
            <div className="mb-4">
              <input
                autoComplete="off"
                {...register("confirmPassword", { required: true })}
                type="password"
                placeholder="Повторите пароль"
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
                htmlFor="spec"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Должность <span>{selectedSpecial?.title}</span>
              </label>
              <select
                id="spec"
                defaultValue={""}
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
              Зарегистрироваться
            </button>
          </form>
          <p className="text-center text-black/40 dark:text-white/40">
            Уже есть аккаунт?{" "}
            <Link
              href="/auth/signin"
              className="text-lightpurple-300">
              Войти
            </Link>
          </p>
          <div></div>
        </div>
      </div>
    </>
  )
}

export default SignUpPage
