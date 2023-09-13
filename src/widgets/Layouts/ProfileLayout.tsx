import AppHeader from "@/src/widgets/Headers/AppHeader"
import AppSidebar from "@/src/widgets/AppSidebar"
import ProfileHeader from "@/src/widgets/ProfileHeader"
import clsx from "clsx"
import { useEffect, useState } from "react"
import { useMedia } from "react-use"

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
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
          className={clsx("main-content flex-1 overflow-hidden transition-all", {
            "md:ml-[212px]": isSideBarActive,
          })}>
          <AppHeader
            isSideBarActive={isSideBarActive}
            handler={toggleSideBarActiveHandler}
          />
          <div className="bg-white p-4 sm:p-7">
            <ProfileHeader />
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
