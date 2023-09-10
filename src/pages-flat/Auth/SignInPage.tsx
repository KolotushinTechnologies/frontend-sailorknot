import { AVAILABLE_LS_KEYS } from "@/src/shared/constants"
import { AuthService } from "@/src/shared/http/services/authService"
import { LoginRequest } from "@/src/shared/http/services/authService/types/login"
import Link from "next/link"
import React, { FC } from "react"
import { useForm } from "react-hook-form"

interface ComponentProps {}

const SignInPage: FC<ComponentProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>()
  const onSubmit = handleSubmit(async (data) => {
    try {
      const { data: res } = await AuthService.login(data)
      localStorage.setItem(AVAILABLE_LS_KEYS.token, res.token)
    } catch (error) {
      alert("Ошибка")
      console.log(error)
    }
  })

  return (
    <div className="my-auto flex min-h-[calc(100vh-134px)] items-center justify-center px-4 py-4 sm:px-12">
      <div className="loginform w-full max-w-[680px] flex-none rounded-2xl bg-white p-4 dark:bg-white/5 sm:p-10 lg:px-[146px] lg:py-[107px]">
        <h1 className="mb-2 text-center text-2xl font-semibold">Войти</h1>
        <div className="mb-7 flex items-center">
          <div className="h-[2px] w-full bg-black/10 dark:bg-white/10"></div>
          <div className="whitespace-nowrap px-5 text-black/40 dark:text-white/40">Войти по номеру телeфона</div>
          <div className="h-[2px] w-full bg-black/10 dark:bg-white/10"></div>
        </div>
        <form
          onSubmit={onSubmit}
          className="mb-4">
          <div className="mb-4">
            <input
              {...register("phoneNumber", { required: true })}
              type="text"
              placeholder="Телефон"
              className="form-input"
            />
          </div>
          <div className="mb-2">
            <input
              {...register("password", { required: true })}
              type="password"
              placeholder="Пароль"
              className="form-input"
            />
          </div>
          <div className="mb-7 text-right">
            <Link
              href="/auth/forgot-password"
              className="text-lightpurple-300">
              Забыли пароль?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg border border-black bg-black px-4 py-2 text-lg font-semibold text-white transition-all duration-300 hover:bg-transparent hover:text-black dark:border-lightpurple-200 dark:bg-lightpurple-200 dark:text-black dark:hover:bg-transparent dark:hover:text-white">
            Войти
          </button>
        </form>
        <p className="text-center text-black/40 dark:text-white/40">
          Нет аккаунта?{" "}
          <Link
            href="/auth/signup"
            className="text-lightpurple-300">
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignInPage
