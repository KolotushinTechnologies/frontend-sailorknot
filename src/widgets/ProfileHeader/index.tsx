
import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"

const ProfileHeader = () => {
  const pathname = usePathname()
  const navs = [
    {
      label: "Профиль",
      value: "/profile",
    },
    {
      label: "Настройки",
      value: "/profile/settings",
    }
  ]

  return (
    <div className="mb-5 grid grid-cols-1 items-center justify-between gap-4 md:grid-cols-3">
      <div className="tabs-list table-responsive flex flex-nowrap overflow-auto text-sm md:col-span-2">
        {navs.map(({ label, value }) => {
          const parseValue = value.toLocaleLowerCase()
          const match = pathname === parseValue
          return (
            <Link
              key={value}
              href={value}
              className={clsx("mx-2 my-1 border-b-2 border-transparent font-normal transition-all hover:text-black dark:text-white/40 dark:hover:text-lightpurple-200", {
                "text-black": match,
                "text-black/40": !match,
              })}>
              {label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default ProfileHeader
