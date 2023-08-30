import Link from "next/link"
import { FC, useRef } from "react"
import clsx from "clsx"
import { useClickAway } from "react-use"

interface ComponentProps {
  isSideBarActive: boolean
  handler: () => void
  isSmall: boolean
}

const AppSidebar: FC<ComponentProps> = ({ isSideBarActive, handler, isSmall }) => {
  const ref = useRef(null)
  useClickAway(ref, () => {
    if (isSmall) {
      handler()
    }
  })
  return (
    <nav
      ref={ref}
      className={clsx("sidebar fixed bottom-0 top-0 z-[200] w-[212px] flex-none border-r border-black/10 transition-all duration-300 dark:border-white/10", {
        "left-0": isSideBarActive,
        "left-[-212px]": !isSideBarActive,
      })}>
      <div className="h-full bg-white dark:bg-black">
        <div className="flex p-4">
          <Link
            href="/"
            className="main-logo w-full flex-1">
            <img
              src="https://webonzer.com/snow/assets/images/logo.svg"
              alt="logo"
              className="block dark:hidden"
            />
            <img
              src="https://webonzer.com/snow/assets/images/logo.svg"
              alt="logo"
              className="hidden dark:block"
            />
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default AppSidebar
