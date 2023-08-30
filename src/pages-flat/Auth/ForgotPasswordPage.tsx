import Link from "next/link"
import React, { FC, useState } from "react"
import { useAutoAnimate } from "@formkit/auto-animate/react"

interface ComponentProps {}

const ForgotPasswordPage: FC<ComponentProps> = () => {
  const [animationParent] = useAutoAnimate({
    duration: 300,
  })
  const [showCodeField, showCodeFieldSet] = useState(false)
  const sendCode = async () => {
    showCodeFieldSet((prev) => !prev)
  }

  return (
    <div className="my-auto flex min-h-[calc(100vh-134px)] items-center justify-center px-4 py-4 sm:px-12">
      <div className="loginform w-full max-w-[680px] flex-none rounded-2xl bg-white p-4 dark:bg-white/5 sm:p-10 lg:px-[146px] lg:py-48">
        <h1 className="mb-2 text-center text-2xl font-semibold">Забыли пароль?</h1>
        <p className="mb-7 text-center text-black/40 dark:text-white/40">Введите номер телефона</p>
        <form className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Телефон"
              className="form-input"
            />
          </div>
          <div hidden={!showCodeField}>
            <input
              type="text"
              placeholder="Код"
              className="form-input"
            />
          </div>
          <button
            onClick={sendCode}
            type="button"
            className="mb-4 w-full rounded-lg border border-black bg-black px-4 py-2 text-lg font-semibold text-white transition-all duration-300 hover:bg-transparent hover:text-black dark:border-lightpurple-200 dark:bg-lightpurple-200 dark:text-black dark:hover:bg-transparent dark:hover:text-white">
            Подтвердить
          </button>
          <div className="text-center">
            <Link
              href="/auth/signin"
              className="inline-block text-sm text-lightpurple-300">
              Назад ко входу
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
