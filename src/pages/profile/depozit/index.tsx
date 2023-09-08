import { ReactElement } from "react"
import { NextPageWithLayout } from "../../_app"
import { SiteLayout } from "../../../widgets/Layouts/SiteLayout"
import ProfileLayout from "@/src/widgets/Layouts/ProfileLayout"

interface PageProps {}

const Page: NextPageWithLayout<PageProps> = () => {
  return (
    <div>
      <h1 className="mb-6 text-lg font-bold">Депозит</h1>

      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl">
          <div>
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-lg bg-blue-700 px-5 py-3 text-center text-base font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
              Пополнить
              <svg
                className="ml-2 h-3.5 w-3.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10">
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <div className="mt-8 space-y-8 rounded-xl bg-gray-100 p-8 dark:bg-gray-800">
            <div className="flex items-center justify-between text-gray-800 dark:text-gray-200">
              <p className="textlg sm:text-xl">Unlimited Links</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-500 sm:h-7 sm:w-7"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"></path>
              </svg>
            </div>

            <div className="flex items-center justify-between text-gray-800 dark:text-gray-200">
              <p className="textlg sm:text-xl">Own analytics platfrom</p>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-500 sm:h-7 sm:w-7"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"></path>
              </svg>
            </div>

            <div className="flex items-center justify-between text-gray-800 dark:text-gray-200">
              <p className="textlg sm:text-xl">Full Support with discussion</p>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-500 sm:h-7 sm:w-7"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"></path>
              </svg>
            </div>

            <div className="flex items-center justify-between text-gray-800 dark:text-gray-200">
              <p className="textlg sm:text-xl">Optimize hashtags</p>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-red-400 sm:h-7 sm:w-7"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                  clip-rule="evenodd"></path>
              </svg>
            </div>

            <div className="flex items-center justify-between text-gray-800 dark:text-gray-200">
              <p className="textlg sm:text-xl">Mobile app</p>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-500 sm:h-7 sm:w-7"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"></path>
              </svg>
            </div>

            <div className="flex items-center justify-between text-gray-800 dark:text-gray-200">
              <p className="textlg sm:text-xl">Unlimited users</p>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-red-400 sm:h-7 sm:w-7"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                  clip-rule="evenodd"></path>
              </svg>
            </div>
          </div>
        </div>
      </section>
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
