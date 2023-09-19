import Link from "next/link"
import React, { FC } from "react"
import { useEffect, useState } from "react"
import { useMedia } from "react-use"
import clsx from "clsx"
import AppHeader from "../widgets/Headers/AppHeader"
import { ProfileStore } from "../shared/store/profileStore"
import { AVAILABLE_LS_KEYS } from "../shared/constants"
import toast from "react-hot-toast"
import { useRouter } from "next/router"

interface ComponentProps {}

const HomePage: FC<ComponentProps> = () => {
  const router = useRouter()
  const { data } = ProfileStore.useState((store) => store)
  const isSmall = useMedia("(max-width: 768px)", true)
  const [isSideBarActive, isSideBarActiveSet] = useState(isSmall ? false : true)
  const toggleSideBarActiveHandler = () => isSideBarActiveSet((prev) => !prev)

  useEffect(() => {
    if (!isSideBarActive && !isSmall) isSideBarActiveSet(true)
    if (isSideBarActive && isSmall) isSideBarActiveSet(false)
  }, [isSmall])

  const logout = () => {
    try {
      localStorage.removeItem(AVAILABLE_LS_KEYS.token)
      toast.success(`Успех разлогинены`)
      router.reload()
    } catch (error) {
      toast.error("Ошибка")
    }
  }

  return (
    <>
      <div
        className={clsx("main-content flex-1 overflow-hidden transition-all", {
          "md:ml-[212px]": isSideBarActive,
          hidden: !data,
        })}>
        <AppHeader
          isSideBarActive={false}
          handler={toggleSideBarActiveHandler}
        />
      </div>
      <div className="container flex min-h-screen max-w-md flex-col items-center justify-center space-y-2">
        <h1 className="mb-2 rounded-xl bg-blue-100 px-4 py-1 text-center text-2xl font-bold uppercase">Sailorknot</h1>

        <div className="flex flex-col space-y-2">
          {!data ? (
            <>
              <Link
                href={"/auth/signin"}
                className="w-full rounded-lg border border-black bg-black px-4 py-2 text-center text-lg font-semibold text-white transition-all duration-300 hover:bg-transparent hover:text-black dark:border-lightpurple-200 dark:bg-lightpurple-200 dark:text-black dark:hover:bg-transparent dark:hover:text-white">
                Вход
              </Link>
              <Link
                href="/auth/signup"
                className="w-full rounded-lg border border-black bg-black px-4 py-2 text-center text-lg font-semibold text-white transition-all duration-300 hover:bg-transparent hover:text-black dark:border-lightpurple-200 dark:bg-lightpurple-200 dark:text-black dark:hover:bg-transparent dark:hover:text-white">
                Регистрация
              </Link>
            </>
          ) : (
            <>
              <Link
                href={"/profile"}
                className="w-full rounded-lg border border-black bg-black px-4 py-2 text-center text-lg font-semibold text-white transition-all duration-300 hover:bg-transparent hover:text-black dark:border-lightpurple-200 dark:bg-lightpurple-200 dark:text-black dark:hover:bg-transparent dark:hover:text-white">
                Профиль
              </Link>
              <button onClick={logout} className="w-full rounded-lg border border-red-500 bg-red-500 px-4 py-2 text-center text-lg font-semibold text-white transition-all duration-300 hover:bg-transparent hover:text-red-500 dark:border-lightpurple-200 dark:bg-lightpurple-200 dark:text-red-500 dark:hover:bg-transparent dark:hover:text-white">
                Выход
              </button>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default HomePage
