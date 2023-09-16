import { ProfileStore } from "@/src/shared/store/profileStore"
import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const ProfileHeader = () => {
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
    <div className="mb-5 grid grid-cols-1 items-center justify-between gap-4 md:grid-cols-3">
      <div className="tabs-list table-responsive flex flex-nowrap space-x-2 overflow-auto text-sm md:col-span-2">
        {navs.map(({ label, value }) => {
          const parseValue = value.toLocaleLowerCase()
          const match = pathname === parseValue
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
