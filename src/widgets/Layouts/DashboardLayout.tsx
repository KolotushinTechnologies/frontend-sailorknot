import AppHeader from "@/src/widgets/Headers/AppHeader"
import AppSidebar from "@/src/widgets/AppSidebar"
import clsx from "clsx"
import { useEffect, useState } from "react"
import { useMedia } from "react-use"
import { DashboardHeader } from "../DashboardHeader"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const isSmall = useMedia("(max-width: 768px)", true)
  const [isSideBarActive, isSideBarActiveSet] = useState(isSmall ? false : true)
  const toggleSideBarActiveHandler = () => isSideBarActiveSet((prev) => !prev)
  const closeSideBarActiveHandler = () => isSideBarActiveSet(false)

  useEffect(() => {
    if (!isSideBarActive && !isSmall) isSideBarActiveSet(true)
    if (isSideBarActive && isSmall) isSideBarActiveSet(false)
  }, [isSmall])

  return (
    <>
      <div className="main-container flex">
        <AppSidebar
          isSmall={isSmall}
          handler={closeSideBarActiveHandler}
          isSideBarActive={isSideBarActive}
        />
        <div
          className={clsx("main-content flex min-h-screen flex-1 flex-col overflow-x-hidden transition-all", {
            "md:ml-[212px]": isSideBarActive,
          })}>
          <AppHeader
            isSideBarActive={isSideBarActive}
            handler={toggleSideBarActiveHandler}
          />
          <div className="bg-white p-4 sm:p-7 flex-1">
            <DashboardHeader />
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
