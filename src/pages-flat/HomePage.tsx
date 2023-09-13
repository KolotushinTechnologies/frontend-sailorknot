import Link from "next/link"
import React, { FC } from "react"
import { useEffect, useState } from "react"
import { useMedia } from "react-use"
import clsx from "clsx"
import AppHeader from "../widgets/Headers/AppHeader"
import { ProfileStore } from "../shared/store/profileStore"

interface ComponentProps {}

const HomePage: FC<ComponentProps> = () => {
  const { data } = ProfileStore.useState((store) => store)
  const isSmall = useMedia("(max-width: 768px)", true)
  const [isSideBarActive, isSideBarActiveSet] = useState(isSmall ? false : true)
  const toggleSideBarActiveHandler = () => isSideBarActiveSet((prev) => !prev)

  useEffect(() => {
    if (!isSideBarActive && !isSmall) isSideBarActiveSet(true)
    if (isSideBarActive && isSmall) isSideBarActiveSet(false)
  }, [isSmall])

  return (
    <>
      <div
        className={clsx("main-content flex-1 overflow-hidden transition-all", {
          "md:ml-[212px]": isSideBarActive,
          "hidden": !data,
        })}>
        <AppHeader
          isSideBarActive={false}
          handler={toggleSideBarActiveHandler}
        />
      </div>
      <div className="container flex min-h-screen max-w-md flex-col items-center justify-center space-y-2">
        <h1 className="mb-2 text-center text-2xl rounded-xl bg-blue-100 px-4 py-1 font-bold uppercase">Sailorknot</h1>
        <Link
          href={!data ? `/auth/signin` : `/profile`}
          className="w-full rounded-lg border border-black bg-black px-4 py-2 text-center text-lg font-semibold text-white transition-all duration-300 hover:bg-transparent hover:text-black dark:border-lightpurple-200 dark:bg-lightpurple-200 dark:text-black dark:hover:bg-transparent dark:hover:text-white">
          {!data ? `Вход` : `Профиль`}
        </Link>
        <Link
          href="/auth/signup"
          className="w-full rounded-lg border border-black bg-black px-4 py-2 text-center text-lg font-semibold text-white transition-all duration-300 hover:bg-transparent hover:text-black dark:border-lightpurple-200 dark:bg-lightpurple-200 dark:text-black dark:hover:bg-transparent dark:hover:text-white">
          Регистрация
        </Link>
      </div>
    </>
  )
}

export default HomePage
