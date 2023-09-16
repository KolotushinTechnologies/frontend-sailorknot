import { ReactElement } from "react"
import { NextPageWithLayout } from "../../_app"
import { SiteLayout } from "../../../widgets/Layouts/SiteLayout"
import ProfileLayout from "@/src/widgets/Layouts/ProfileLayout"

interface PageProps {}

const Page: NextPageWithLayout<PageProps> = () => {
  return (
    <div>
      <h1 className="text-lg font-bold mb-6">Уведомления</h1>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {Array.from({ length: 10 }).map((_item, indx) => {
          return (
            <div
              key={indx}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Уведомление {indx + 1}</h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Далеко-далеко за словесными горами в стране гласных и согласных живут, рыбные тексты.</p>
              <button className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Ответить
                <svg
                  className="ml-2 h-3.5 w-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <SiteLayout>
      <ProfileLayout>{page}</ProfileLayout>
    </SiteLayout>
  )
}

export default Page
