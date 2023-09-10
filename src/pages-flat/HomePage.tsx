import Link from "next/link"
import React, { FC } from "react"

interface ComponentProps {}

const HomePage: FC<ComponentProps> = () => {
  return (
    <div className="container flex min-h-screen max-w-md flex-col items-center justify-center space-y-2">
      <h1 className="mb-2 text-center text-2xl font-semibold">Sailorknot</h1>
      <Link
        href="/auth/signin"
        className="w-full rounded-lg border border-black bg-black px-4 py-2 text-center text-lg font-semibold text-white transition-all duration-300 hover:bg-transparent hover:text-black dark:border-lightpurple-200 dark:bg-lightpurple-200 dark:text-black dark:hover:bg-transparent dark:hover:text-white">
        Вход
      </Link>
      <Link
        href="/auth/signup"
        className="w-full rounded-lg border border-black bg-black px-4 py-2 text-center text-lg font-semibold text-white transition-all duration-300 hover:bg-transparent hover:text-black dark:border-lightpurple-200 dark:bg-lightpurple-200 dark:text-black dark:hover:bg-transparent dark:hover:text-white">
        Регистрация
      </Link>
    </div>
  )
}

export default HomePage
