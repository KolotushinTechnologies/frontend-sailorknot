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
import React, { FC, useRef, useState } from "react"
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

      const formData = new FormData()
      for (const key in rest) {
        formData.set(key, rest[key])
      }

      formData.set("speciality", selectedSpecial.title)
      formData.set("phoneNumber", `+${phoneNumber}`)

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
                className="absolute right-3 top-3 hidden text-black/20 hover:text-black dark:text-white/20 dark:hover:text-white">
                {/* TODO: Add icon */}
                {/* <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.36997 2.16366C3.36464 2.1578 3.35916 2.15205 3.35355 2.14645C3.2656 2.05849 3.14803 2.00648 3.02378 2.00057L3.02229 2.0005C3.01486 2.00017 3.00743 2 3 2C2.87562 2 2.7557 2.04636 2.66366 2.13003C2.6578 2.13536 2.65205 2.14084 2.64645 2.14645C2.55849 2.2344 2.50648 2.35198 2.50057 2.47622L2.5005 2.47771C2.50017 2.48514 2.5 2.49257 2.5 2.5C2.5 2.62438 2.54636 2.7443 2.63003 2.83634L3.84171 4.16918C3.23848 4.55628 2.25633 5.28172 1.45928 6.32254C1.45928 6.32254 0.835699 7.13684 0.5429 7.79734C0.485632 7.92653 0.485703 8.07391 0.543094 8.20304C0.543094 8.20304 0.68271 8.51718 0.967508 8.96951C0.967508 8.96951 1.52865 9.86073 2.27145 10.6035C2.27145 10.6035 4.66789 13 7.99592 13C7.99592 13 9.65073 13.0134 11.2526 12.3212L12.63 13.8363C12.7248 13.9406 12.8591 14 13 14L13.0021 14C13.1258 13.9995 13.2448 13.9532 13.3363 13.87C13.4406 13.7752 13.5 13.6409 13.5 13.5L13.5 13.4979C13.4995 13.3742 13.4532 13.2552 13.37 13.1637L6.70203 5.82893C6.70123 5.82797 6.70041 5.827 6.6996 5.82604C6.69606 5.82188 6.69244 5.81778 6.68876 5.81372C6.6842 5.8087 6.67954 5.80379 6.6748 5.79897L3.36997 2.16366ZM4.51978 4.91506C3.19831 5.69639 2.25322 6.93053 2.25322 6.93053C1.80156 7.52034 1.55568 7.99738 1.55568 7.99738C1.65729 8.18822 1.81374 8.43669 1.81374 8.43669C2.3151 9.23297 2.97855 9.89642 2.97855 9.89642C5.08211 12 8.00408 12 8.00408 12C9.00561 12.0082 9.94264 11.7398 10.5291 11.5253L9.61064 10.515C9.24971 10.7372 8.67633 11.0026 7.99996 11C7.99996 11 7.0704 10.9999 6.30376 10.4743C6.30376 10.4743 5.53711 9.94859 5.202 9.08154C5.202 9.08154 4.8669 8.21449 5.08074 7.30987C5.08074 7.30987 5.22208 6.71195 5.64458 6.15235L4.51978 4.91506ZM6.05392 7.53992C6.1121 7.29381 6.2229 7.07872 6.33367 6.91034L8.92885 9.76504C8.45821 10.0018 8.00006 10 8.00006 10C7.38036 9.99996 6.86926 9.64951 6.86926 9.64951C6.35817 9.29907 6.13476 8.72104 6.13476 8.72104C5.91136 8.143 6.05392 7.53992 6.05392 7.53992Z"
                    fill="currentcolor"></path>
                  <path
                    d="M6.62369 3.11313C6.4929 3.13502 6.37617 3.20797 6.29917 3.31593C6.23872 3.40068 6.20624 3.50217 6.20624 3.60627L6.20625 3.6104C6.20647 3.63668 6.20876 3.6629 6.2131 3.68881C6.23499 3.8196 6.30794 3.93634 6.41591 4.01334C6.50065 4.07378 6.60215 4.10627 6.70624 4.10627L6.71038 4.10625C6.73665 4.10603 6.76287 4.10374 6.78879 4.0994C7.38971 3.99881 7.999 4.00001 7.999 4.00001C10.9179 4.00002 13.0214 6.10357 13.0214 6.10357C13.6849 6.76702 14.1862 7.5633 14.1862 7.5633C14.3419 7.81044 14.4432 8.00055 14.4432 8.00055C14.316 8.24048 14.1112 8.55372 14.1112 8.55372C13.5069 9.47782 12.705 10.1954 12.705 10.1954L12.7045 10.1958C12.5985 10.2906 12.5375 10.4265 12.5375 10.5688C12.5375 10.5747 12.5376 10.5807 12.5378 10.5867L12.5379 10.5897L12.5381 10.5927C12.5435 10.7073 12.5883 10.8166 12.6648 10.9021C12.7597 11.0082 12.8952 11.0688 13.0375 11.0688C13.0455 11.0688 13.0534 11.0686 13.0614 11.0682C13.176 11.0627 13.2853 11.0179 13.3708 10.9414C14.2713 10.1359 14.9481 9.101 14.9481 9.101C15.2905 8.57742 15.4569 8.20308 15.4569 8.20308C15.5144 8.0738 15.5144 7.92623 15.4569 7.79695C15.3173 7.4828 15.0325 7.03048 15.0325 7.03048C14.4713 6.13926 13.7285 5.39646 13.7285 5.39646C11.3321 3.00002 8.00097 3.00002 8.00097 3.00002C7.30771 2.99865 6.62369 3.11313 6.62369 3.11313Z"
                    fill="currentcolor"></path>
                  <path
                    d="M9.98966 7.80885C9.98966 7.80885 9.9278 7.14514 9.4792 6.6521C9.4792 6.6521 9.0306 6.15905 8.37567 6.03496C8.24538 6.01027 8.13023 5.93484 8.05556 5.82526C7.99969 5.74327 7.96948 5.64651 7.96876 5.54729L7.96875 5.5437C7.96875 5.51247 7.97168 5.48131 7.97749 5.45062C8.01903 5.23137 8.20084 5.06618 8.42306 5.04579C8.43825 5.0444 8.4535 5.0437 8.46875 5.0437C8.49998 5.0437 8.53115 5.04663 8.56183 5.05244C8.56183 5.05244 9.54525 5.23877 10.2189 5.97911C10.2189 5.97911 10.8924 6.71963 10.9853 7.71605C10.9867 7.73099 10.9875 7.74598 10.9875 7.76097L10.9875 7.76245C10.9875 8.02062 10.7909 8.23634 10.5339 8.26029C10.519 8.26169 10.504 8.2624 10.489 8.26245L10.4875 8.26245C10.2293 8.26245 10.0136 8.0659 9.98966 7.80885Z"
                    fill="currentcolor"></path>
                </svg> */}
              </button>
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
