import Link from "next/link"
import { FC, useRef } from "react"
import clsx from "clsx"
import { useClickAway } from "react-use"
import { GetOneResponse } from "@/src/shared/http/services/userService/types/getOneById"

interface ComponentProps {
  isSideBarActive: boolean
  handler: () => void
  isSmall: boolean
  profileData: GetOneResponse | null
}

const AppSidebar: FC<ComponentProps> = ({ isSideBarActive, handler, isSmall, profileData }) => {

  const ref = useRef(null)
  useClickAway(ref, () => {
    if (isSmall) {
      handler()
    }
  })
  return (
    <nav
      ref={ref}
      className={clsx("sidebar group fixed bottom-0 top-0 z-[200] w-[212px] flex-none border-r border-black/10 transition-all duration-300 dark:border-white/10", {
        "left-0": isSideBarActive,
        "left-[-212px]": !isSideBarActive,

        "animate-pulse bg-white dark:bg-black pointer-events-none": !profileData,
        "bg-white dark:bg-black": profileData,
      })}>
      <div className="h-full">
        <div className="flex p-4">
          <Link
            href="/"
            className="main-logo w-full flex-1">
            {/* TODO: Add icon */}
            {/* <img
              src="https://webonzer.com/snow/assets/images/logo.svg"
              alt="logo"
              className="block dark:hidden"
            />
            <img
              src="https://webonzer.com/snow/assets/images/logo.svg"
              alt="logo"
              className="hidden dark:block"
            /> */}
            <span className="rounded-xl bg-blue-100 px-4 py-1 font-bold uppercase">Sailorknot</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default AppSidebar
