import { DASHBOARD_NAVIGATION } from "@/src/shared/constants/navigation/dashboard"
import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const DashboardHeader = () => {
  const pathname = usePathname()
  const navigationArray = Object.values(DASHBOARD_NAVIGATION)
  const parseNavigationArray = navigationArray.filter((item) => {
    const condition = item.title !== "Редактировать пользователя" && item.title !== "Создать пост"
    return condition
  })

  return (
    <div className="mb-5 flex items-center justify-between">
      <div className="tabs-list table-responsive flex flex-nowrap space-x-[20px] overflow-auto text-sm md:col-span-2">
        {parseNavigationArray.map(({ link, title, icon }) => {
          const parseValue = link().toLocaleLowerCase()
          const match = pathname.includes(parseValue)
          return (
            <Link
              key={link()}
              href={link()}
              className={clsx(
                "my-1 flex items-center space-x-2 whitespace-nowrap border-b-2 border-transparent font-normal transition-all hover:text-black dark:text-white/40 dark:hover:text-lightpurple-200",
                {
                  "text-black": match,
                  "text-black/40": !match,
                },
              )}>
              <span dangerouslySetInnerHTML={{ __html: icon }} />
              <span>{title}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
