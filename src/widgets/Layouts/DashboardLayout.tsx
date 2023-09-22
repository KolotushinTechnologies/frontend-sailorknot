import AppHeader from "@/src/widgets/Headers/AppHeader"
import AppSidebar from "@/src/widgets/AppSidebar"
import clsx from "clsx"
import { useEffect, useState } from "react"
import { useMedia } from "react-use"
import { DashboardHeader } from "../DashboardHeader"
import { ProfileStore } from "@/src/shared/store/profileStore"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: profileData } = ProfileStore.useState((store) => store)
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
          profileData={profileData}
          isSmall={isSmall}
          handler={closeSideBarActiveHandler}
          isSideBarActive={isSideBarActive}
        />
        <div
          className={clsx("main-content flex min-h-screen flex-1 flex-col overflow-x-hidden transition-all", {
            "md:ml-[212px]": isSideBarActive,
          })}>
          <AppHeader
            profileData={profileData}
            isSideBarActive={isSideBarActive}
            handler={toggleSideBarActiveHandler}
          />
          <div className="flex-1 bg-white p-4 sm:p-7">
            <DashboardHeader />
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
