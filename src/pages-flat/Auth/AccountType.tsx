import Link from "next/link"
import React, { FC } from "react"

interface ComponentProps {}

const AccountType: FC<ComponentProps> = () => {
  return (
    <div className="my-auto flex min-h-[calc(100vh-134px)] items-center justify-center px-4 py-4 sm:px-12">
      <div className="loginform w-full max-w-[680px] flex-none rounded-2xl bg-white p-4 dark:bg-white/5 sm:p-10 lg:px-12 lg:py-[68px]">
        <h1 className="mb-2 text-center text-2xl font-semibold">Выбирете тип аккаунта</h1>
        <p className="mb-7 text-center text-black/40 dark:text-white/10">
          Для дополнительной информации перейдите на {" "}
          <Link
            href="/"
            className="text-lightpurple-300">
            данную страницу
          </Link>
          .
        </p>
        <form className="mb-4">
          <div className="mb-7 grid grid-cols-1 gap-7 sm:grid-cols-2">
            <div className="budget-input relative">
              <label className="bg-lightwhite flex cursor-pointer items-start justify-between gap-4 rounded-lg px-4 py-6 dark:bg-white/5">
                <div className="relative z-10 flex items-start gap-3">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M16 4C13.572 3.99927 11.2007 4.73511 9.19971 6.1106C7.19849 7.48584 5.66187 9.43579 4.79224 11.7031C3.92285 13.9702 3.76147 16.4478 4.32983 18.8083C4.89819 21.1692 6.16919 23.302 7.9751 24.925C8.72754 23.4431 9.87573 22.1987 11.2922 21.3293C12.7087 20.46 14.3381 20 16 20C15.0112 20 14.0444 19.7068 13.2222 19.1575C12.3999 18.6079 11.759 17.8271 11.3806 16.9133C11.0022 15.9998 10.9033 14.9944 11.0962 14.0247C11.2891 13.0547 11.7654 12.1638 12.4646 11.4644C13.1638 10.7651 14.0547 10.2891 15.0247 10.0962C15.9946 9.90308 17 10.0022 17.9136 10.3806C18.8271 10.759 19.6082 11.3999 20.1575 12.2222C20.7068 13.0444 21 14.011 21 15C21 16.3262 20.4734 17.5979 19.5356 18.5356C18.5979 19.4731 17.3262 20 16 20C17.6621 20 19.2915 20.46 20.708 21.3293C22.1245 22.1987 23.2727 23.4431 24.0251 24.925C25.8311 23.302 27.1021 21.1692 27.6704 18.8083C28.2385 16.4478 28.0774 13.9702 27.2078 11.7031C26.3384 9.43579 24.8015 7.48584 22.8005 6.1106C20.7996 4.73511 18.4282 3.99927 16 4Z"
                      fill="currentColor"
                      fillOpacity="0.1"></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16 3C16 3 18.6442 3 21.0605 4.02201C21.0605 4.02201 23.3936 5.00884 25.1924 6.80761C25.1924 6.80761 26.9912 8.60638 27.978 10.9395C27.978 10.9395 29 13.3558 29 16C29 16 29 18.6442 27.978 21.0605C27.978 21.0605 26.9912 23.3936 25.1924 25.1924C25.1924 25.1924 23.3936 26.9912 21.0605 27.978C21.0605 27.978 18.6442 29 16 29C16 29 13.3558 29 10.9395 27.978C10.9395 27.978 8.60638 26.9912 6.80761 25.1924C6.80761 25.1924 5.00884 23.3936 4.02202 21.0605C4.02202 21.0605 3 18.6442 3 16C3 16 3 13.3558 4.02202 10.9395C4.02202 10.9395 5.00885 8.60638 6.80761 6.80761C6.80761 6.80761 8.60638 5.00884 10.9395 4.02201C10.9395 4.02201 13.3558 3 16 3ZM16 5C16 5 13.7614 5 11.7186 5.86402C11.7186 5.86402 9.74476 6.69889 8.22183 8.22182C8.22183 8.22182 6.6989 9.74476 5.86402 11.7186C5.86402 11.7186 5 13.7614 5 16C5 16 5 18.2386 5.86402 20.2814C5.86402 20.2814 6.69889 22.2552 8.22183 23.7782C8.22183 23.7782 9.74476 25.3011 11.7186 26.136C11.7186 26.136 13.7614 27 16 27C16 27 18.2386 27 20.2814 26.136C20.2814 26.136 22.2552 25.3011 23.7782 23.7782C23.7782 23.7782 25.3011 22.2552 26.136 20.2814C26.136 20.2814 27 18.2386 27 16C27 16 27 13.7614 26.136 11.7186C26.136 11.7186 25.3011 9.74476 23.7782 8.22183C23.7782 8.22183 22.2552 6.69889 20.2814 5.86402C20.2814 5.86402 18.2386 5 16 5Z"
                      fill="currentColor"></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16 9C16 9 18.4853 9 20.2426 10.7574C20.2426 10.7574 22 12.5147 22 15C22 15 22 17.4853 20.2426 19.2426C20.2426 19.2426 18.4853 21 16 21C16 21 13.5147 21 11.7574 19.2426C11.7574 19.2426 10 17.4853 10 15C10 15 10 12.5147 11.7574 10.7574C11.7574 10.7574 13.5147 9 16 9ZM16 11C16 11 14.3431 11 13.1716 12.1716C13.1716 12.1716 12 13.3431 12 15C12 15 12 16.6569 13.1716 17.8284C13.1716 17.8284 14.3431 19 16 19C16 19 17.6569 19 18.8284 17.8284C18.8284 17.8284 20 16.6569 20 15C20 15 20 13.3431 18.8284 12.1716C18.8284 12.1716 17.6569 11 16 11Z"
                      fill="currentColor"></path>
                    <path
                      d="M20.185 22.1811C22.1106 23.3631 23.1334 25.3777 23.1334 25.3777C23.2535 25.6141 23.4626 25.7933 23.7147 25.8756C23.8149 25.9083 23.9197 25.925 24.0251 25.925L24.0525 25.9246C24.2005 25.9205 24.3458 25.8837 24.4778 25.8166C24.8136 25.6462 25.0251 25.3015 25.0251 24.925C25.0251 24.9107 25.0248 24.8964 25.0242 24.8821C25.018 24.7394 24.9814 24.5996 24.9168 24.4723L24.9166 24.472L24.9163 24.4713C23.6378 21.9537 21.2313 20.4766 21.2313 20.4766C18.8243 18.9992 16.0001 18.9992 16.0001 18.9992C13.1759 18.9992 10.7689 20.4766 10.7689 20.4766C8.36194 21.954 7.08343 24.4723 7.08343 24.4723C7.01221 24.6126 6.9751 24.7677 6.9751 24.925L6.97513 24.9324C6.9779 25.3063 7.18902 25.6474 7.52241 25.8166C7.66268 25.8879 7.81778 25.925 7.9751 25.925L7.98252 25.9249C8.3564 25.9222 8.6975 25.7111 8.86676 25.3777C9.88957 23.3631 11.8151 22.1811 11.8151 22.1811C13.7407 20.9992 16.0001 20.9992 16.0001 20.9992C18.2595 20.9992 20.185 22.1811 20.185 22.1811Z"
                      fill="currentColor"></path>
                  </svg>
                  <div>
                    <h3 className="mb-1 font-semibold">Тип 1</h3>
                    <p className="text-black/40 dark:text-white/40">Описание</p>
                  </div>
                </div>
                <input
                  name="account-type"
                  type="radio"
                  className="form-checkbox peer relative z-10 hidden"
                />
                <span className="dark:peer-checked:border-lightpurple-200 peer-checked:bg-lightwhite absolute left-0 top-0 z-0 h-full w-full rounded-lg border-2 border-transparent peer-checked:border-black dark:peer-checked:bg-white/5"></span>
              </label>
            </div>
            <div className="budget-input relative">
              <label className="bg-lightwhite flex cursor-pointer items-start justify-between gap-4 rounded-lg px-4 py-6 dark:bg-white/5">
                <div className="relative z-10 flex items-start gap-3">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M28 20V26C28 26.2653 27.8947 26.5195 27.7072 26.7072C27.5195 26.8947 27.2653 27 27 27H5C4.73474 27 4.48047 26.8947 4.29285 26.7072C4.10535 26.5195 4 26.2653 4 26V20"
                      fill="currentColor"
                      fillOpacity="0.1"></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3 10C3 10 3 9.17157 3.58579 8.58579C3.58579 8.58579 4.17157 8 5 8H27C27 8 27.8284 8 28.4142 8.58579C28.4142 8.58579 29 9.17157 29 10V26C29 26 29 26.8284 28.4142 27.4142C28.4142 27.4142 27.8284 28 27 28H5C5 28 4.17157 28 3.58579 27.4142C3.58579 27.4142 3 26.8284 3 26V10ZM5 10V26H27V10H5Z"
                      fill="currentColor"></path>
                    <path
                      d="M10.8787 4.87868C10 5.75736 10 7 10 7V9C10 9.55228 10.4477 10 11 10C11.5523 10 12 9.55228 12 9V7C12 6.58579 12.2929 6.29289 12.2929 6.29289C12.5858 6 13 6 13 6H19C19.4142 6 19.7071 6.29289 19.7071 6.29289C20 6.58579 20 7 20 7V9C20 9.55228 20.4477 10 21 10C21.5523 10 22 9.55228 22 9V7C22 5.75736 21.1213 4.87868 21.1213 4.87868C20.2426 4 19 4 19 4H13C11.7574 4 10.8787 4.87868 10.8787 4.87868Z"
                      fill="currentColor"></path>
                    <path
                      d="M4 21H28C28.5523 21 29 20.5523 29 20C29 19.4477 28.5523 19 28 19H4C3.44772 19 3 19.4477 3 20C3 20.5523 3.44772 21 4 21Z"
                      fill="currentColor"></path>
                  </svg>
                  <div>
                    <h3 className="mb-1 font-semibold">Тип 2</h3>
                    <p className="text-black/40 dark:text-white/40">Описание</p>
                  </div>
                </div>
                <input
                  name="account-type"
                  type="radio"
                  className="form-checkbox peer relative z-10 hidden"
                />
                <span className="dark:peer-checked:border-lightpurple-200 peer-checked:bg-lightwhite absolute left-0 top-0 z-0 h-full w-full rounded-lg border-2 border-transparent peer-checked:border-black dark:peer-checked:bg-white/5"></span>
              </label>
            </div>
          </div>
          <div className="text-center">
            <button
              type="button"
              className="dark:bg-lightpurple-200 dark:border-lightpurple-200 dark:hover:text-lightpurple-300 inline-flex items-center gap-2 rounded-lg border border-black bg-black px-10 py-2 text-lg font-semibold text-white transition-all duration-300 hover:bg-transparent hover:text-black dark:text-black dark:hover:bg-transparent">
              <span>Подтвердить</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.07459 15.4419C6.80847 15.1979 6.80847 14.8021 7.07459 14.5581L11.5625 10.4419C11.8286 10.1979 11.8286 9.80214 11.5625 9.55806L7.07459 5.44194C6.80847 5.19786 6.80847 4.80214 7.07459 4.55806C7.34072 4.31398 7.77219 4.31398 8.03831 4.55806L12.5262 8.67418C13.3246 9.40641 13.3246 10.5936 12.5262 11.3258L8.03831 15.4419C7.77219 15.686 7.34072 15.686 7.07459 15.4419Z"
                  fill="currentcolor"></path>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AccountType
