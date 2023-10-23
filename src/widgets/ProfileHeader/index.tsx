import { GetOneResponse } from "@/src/shared/http/services/userService/types/getOneById"
import { ProfileStore } from "@/src/shared/store/profileStore"
import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FC, useEffect, useState } from "react"

interface ComponentProps {
  profileData: GetOneResponse | null
}

const ProfileHeader:FC<ComponentProps> = ({profileData}) => {
  const { data: profile } = ProfileStore.useState((store) => store)
  const [isAdmin, isAdminSet] = useState(false)
  const pathname = usePathname()
  const navs = [
    {
      label: "Профиль",
      value: "/profile",
    },
    {
      label: "Настройки",
      value: "/profile/settings",
    },
    {
      label: "Заявки",
      value: "/profile/orders",
    },
    {
      label: "Депозит",
      value: "/profile/depozit",
    },
    {
      label: "Уведомления",
      value: "/profile/notifications",
    },
  ]

  useEffect(() => {
    if (profile) {
      const matchAdmin = profile.roles.find((search) => search.toLowerCase().includes("admin"))
      if (matchAdmin) isAdminSet(true)
    }
  }, [profile])

  return (
    <div className={clsx("mb-5 grid grid-cols-1 items-center justify-between gap-4 md:grid-cols-3", {
      "animate-pulse bg-white dark:bg-black pointer-events-none": !profileData,
      "bg-white dark:bg-black": profileData,
    })}>
      <div className="tabs-list table-responsive flex flex-nowrap space-x-2 overflow-auto text-sm md:col-span-2">
        {navs.map(({ label, value }) => {
          
          const parseValue = value.toLocaleLowerCase()
          let match = pathname.includes(parseValue)

          return (
            <Link
              key={value}
              href={value}
              className={clsx("border-b-2 border-transparent font-normal transition-all hover:text-black dark:text-white/40 dark:hover:text-lightpurple-200", {
                "text-black": match,
                "text-black/40": !match,
              })}>
              {label}
            </Link>
          )
        })}
        {!isAdmin ? null : (
          <Link
            href={"/dashboard"}
            className="border-b-2 border-transparent font-normal text-black/40 transition-all hover:text-black dark:text-white/40 dark:hover:text-lightpurple-200">
            Админка
          </Link>
        )}
      </div>
    </div>
  )
}

export default ProfileHeader
