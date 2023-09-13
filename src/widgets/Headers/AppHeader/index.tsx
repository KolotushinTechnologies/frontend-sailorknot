import Link from "next/link"
import { FC } from "react"
import clsx from "clsx"
import { useRouter } from "next/router"
import { ProfileStore } from "@/src/shared/store/profileStore"

interface ComponentProps {
  handler: () => void
  isSideBarActive: boolean
}

const AppHeader: FC<ComponentProps> = ({ handler, isSideBarActive }) => {
  const { data } = ProfileStore.useState((store) => store)
  const toggleSidebar = () => handler()
  const router = useRouter()

  return (
    <>
      <div
        className={clsx("fixed right-0 top-0 z-[100] flex h-[75px] items-center justify-between border-b border-black/10 bg-white px-3 py-[22px] transition-all dark:border-white/10 md:px-7", {
          "left-0 md:left-[212px]": isSideBarActive,
          "left-0": !isSideBarActive,
        })}>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSidebar}
            type="button"
            className="text-black dark:text-white">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7.125 20.25C6.95921 20.25 6.80029 20.1842 6.68303 20.067C6.56584 19.9497 6.5 19.7908 6.5 19.625V8.375C6.5 8.20921 6.56584 8.05029 6.68303 7.93303C6.80029 7.81584 6.95921 7.75 7.125 7.75H10.875V20.25H7.125Z"
                fill="currentColor"
                fillOpacity="0.1"></path>
              <path
                d="M10.25 7.75V20.25C10.25 20.5952 10.5298 20.875 10.875 20.875C11.2202 20.875 11.5 20.5952 11.5 20.25V7.75C11.5 7.40482 11.2202 7.125 10.875 7.125C10.5298 7.125 10.25 7.40482 10.25 7.75Z"
                fill="currentColor"></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.875 8.375C5.875 8.375 5.875 7.85723 6.24112 7.49112C6.24112 7.49112 6.60723 7.125 7.125 7.125H20.875C20.875 7.125 21.3928 7.125 21.7589 7.49112C21.7589 7.49112 22.125 7.85723 22.125 8.375V19.625C22.125 19.625 22.125 20.1428 21.7589 20.5089C21.7589 20.5089 21.3928 20.875 20.875 20.875H7.125C7.125 20.875 6.60723 20.875 6.24112 20.5089C6.24112 20.5089 5.875 20.1428 5.875 19.625V8.375ZM7.125 8.375V19.625H20.875V8.375H7.125Z"
                fill="currentColor"></path>
              <path
                d="M6.5 10.875H8.375C8.72018 10.875 9 10.5952 9 10.25C9 9.90482 8.72018 9.625 8.375 9.625H6.5C6.15482 9.625 5.875 9.90482 5.875 10.25C5.875 10.5952 6.15482 10.875 6.5 10.875Z"
                fill="currentColor"></path>
              <path
                d="M6.5 13.375H8.375C8.72018 13.375 9 13.0952 9 12.75C9 12.4048 8.72018 12.125 8.375 12.125H6.5C6.15482 12.125 5.875 12.4048 5.875 12.75C5.875 13.0952 6.15482 13.375 6.5 13.375Z"
                fill="currentColor"></path>
              <path
                d="M6.5 15.875H8.375C8.72018 15.875 9 15.5952 9 15.25C9 14.9048 8.72018 14.625 8.375 14.625H6.5C6.15482 14.625 5.875 14.9048 5.875 15.25C5.875 15.5952 6.15482 15.875 6.5 15.875Z"
                fill="currentColor"></path>
            </svg>
          </button>
          <button
            type="button"
            className="text-black dark:text-white">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M14.3434 18.8985L18.2809 21.3985C18.7887 21.7188 19.4137 21.2422 19.2653 20.6563L18.1246 16.1719C18.0938 16.0476 18.0987 15.9171 18.1388 15.7955C18.1789 15.6739 18.2525 15.566 18.3512 15.4844L21.8825 12.5391C22.3434 12.1563 22.109 11.3829 21.5074 11.3438L16.898 11.0469C16.7723 11.0396 16.6514 10.9958 16.5501 10.9209C16.4488 10.8459 16.3715 10.7431 16.3277 10.625L14.609 6.29691C14.5635 6.17182 14.4806 6.06379 14.3716 5.98742C14.2626 5.91109 14.1327 5.87012 13.9996 5.87012C13.8665 5.87012 13.7366 5.91109 13.6276 5.98742C13.5186 6.06379 13.4357 6.17182 13.3903 6.29691L11.6715 10.625C11.6277 10.7431 11.5504 10.8459 11.4491 10.9209C11.3479 10.9958 11.227 11.0396 11.1012 11.0469L6.49185 11.3438C5.89027 11.3829 5.6559 12.1563 6.11679 12.5391L9.64806 15.4844C9.74678 15.566 9.8204 15.6739 9.86046 15.7955C9.90059 15.9171 9.90547 16.0476 9.87465 16.1719L8.81996 20.3282C8.64029 21.0313 9.39026 21.6016 9.99184 21.2188L13.6559 18.8985C13.7586 18.8331 13.8779 18.7984 13.9996 18.7984C14.1214 18.7984 14.2406 18.8331 14.3434 18.8985Z"
                fill="currentColor"
                fillOpacity="0.1"></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.008 19.4259C14.008 19.4259 14.0041 19.4234 13.9996 19.4234C13.9996 19.4234 13.995 19.4234 13.9912 19.4259L10.3261 21.7468C10.3261 21.7468 9.93626 21.9949 9.48606 21.9635C9.48606 21.9635 9.07178 21.9345 8.73462 21.6782C8.73462 21.6782 8.40168 21.4252 8.2568 21.0357C8.2568 21.0357 8.10101 20.6169 8.21434 20.1734L9.26877 16.0182C9.26877 16.0182 9.27176 16.0061 9.26682 15.9911C9.26682 15.9911 9.26188 15.9761 9.24973 15.9661L5.71643 13.019C5.71643 13.019 5.39679 12.7536 5.29192 12.3555C5.29192 12.3555 5.19608 11.9918 5.30876 11.6277C5.30876 11.6277 5.4227 11.2596 5.7111 11.0158C5.7111 11.0158 6.02856 10.7475 6.45125 10.7201L11.061 10.4232C11.061 10.4232 11.0718 10.4225 11.0774 10.4184C11.0774 10.4184 11.083 10.4142 11.0854 10.4077L11.0906 10.3943L12.8065 6.07343C12.8065 6.07343 12.9444 5.70285 13.269 5.47549C13.269 5.47549 13.598 5.24512 13.9996 5.24512C13.9996 5.24512 14.4011 5.24512 14.7301 5.47549C14.7301 5.47549 15.0547 5.70285 15.1927 6.07343L16.9086 10.3943L16.9137 10.4077C16.9137 10.4077 16.9161 10.4142 16.9217 10.4184C16.9217 10.4184 16.9273 10.4225 16.9343 10.4229L21.5475 10.7201C21.5475 10.7201 21.9706 10.7475 22.288 11.0158C22.288 11.0158 22.5764 11.2596 22.6904 11.6277C22.6904 11.6277 22.8031 11.9918 22.7072 12.3555C22.7072 12.3555 22.6023 12.7536 22.2817 13.0199L18.7515 15.9644C18.7515 15.9644 18.7372 15.9761 18.7323 15.9911C18.7323 15.9911 18.7274 16.0061 18.7312 16.0214L19.8709 20.5022C19.8709 20.5022 19.9727 20.904 19.8308 21.2834C19.8308 21.2834 19.6988 21.6365 19.3964 21.8655C19.3964 21.8655 19.0899 22.0976 18.7126 22.1235C18.7126 22.1235 18.3035 22.1517 17.9474 21.9271L14.0088 19.4264L14.0083 19.4261L14.008 19.4259ZM18.6143 20.8698L14.6788 18.3711L14.6783 18.3708C14.6783 18.3708 14.3677 18.1734 13.9996 18.1734C13.9996 18.1734 13.6313 18.1734 13.3205 18.3711L9.65737 20.6907C9.65737 20.6907 9.57231 20.7449 9.49107 20.6831C9.49107 20.6831 9.39325 20.6088 9.42542 20.4829L10.4804 16.3256C10.4804 16.3256 10.5718 15.9572 10.454 15.5999C10.454 15.5999 10.3363 15.2425 10.0463 15.0027L6.51708 12.0591C6.51708 12.0591 6.49056 12.0371 6.50287 11.9973C6.50287 11.9973 6.5117 11.9688 6.53225 11.9675L11.1413 11.6706C11.1413 11.6706 11.516 11.6488 11.8208 11.4233C11.8208 11.4233 12.1223 11.2003 12.2546 10.8501L13.9711 6.52757L13.9775 6.51054C13.9775 6.51054 13.9801 6.5036 13.9861 6.49936C13.9861 6.49936 13.9922 6.49512 13.9996 6.49512C13.9996 6.49512 14.007 6.49512 14.013 6.49936C14.013 6.49936 14.0191 6.5036 14.0216 6.51054L14.0281 6.52757L15.7446 10.8501C15.7446 10.8501 15.8768 11.2003 16.1784 11.4233C16.1784 11.4233 16.4832 11.6488 16.8617 11.6708L21.4672 11.9675C21.4672 11.9675 21.4874 11.9688 21.4963 11.9973C21.4963 11.9973 21.5086 12.0371 21.4831 12.0583L17.9508 15.0044C17.9508 15.0044 17.6629 15.2425 17.5451 15.5999C17.5451 15.5999 17.4273 15.9572 17.518 16.3224L18.6595 20.8103C18.6595 20.8103 18.6691 20.8483 18.6418 20.869C18.6418 20.869 18.6286 20.8789 18.6143 20.8698Z"
                fill="currentColor"></path>
            </svg>
          </button>
          <div className="hidden sm:block">
            {/* TODO: Add breadcrumbs */}
            {/* <nav
              aria-label="breadcrumb"
              className="w-full px-2 py-1">
              <ol className="flex space-x-3">
                <li className="flex items-center">
                  <Link
                    href="/"
                    className="flex items-center text-black/40 hover:text-black dark:text-white/40 dark:hover:text-white">
                    Главная
                  </Link>
                </li>
                <li className="flex items-center space-x-1">
                  <span className="text-black/40 dark:text-white/40">/</span>
                  <Link
                    href="/"
                    className="flex items-center px-3 text-black dark:text-white">
                    Название
                  </Link>
                </li>
              </ol>
            </nav> */}
          </div>
        </div>

        <div className="flex items-center gap-5">
          {/* TODO: Add search */}
          {/* <form className="hidden items-center md:flex">
            <label
              htmlFor="voice-search"
              className="sr-only">
              Поиск...
            </label>
            <div className="relative w-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-[6px]">
                <svg
                  className="text-black/20 dark:text-white/20"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M14.3496 14.3563C14.2563 14.4483 14.1306 14.4999 13.9996 14.5001C13.8668 14.4995 13.7393 14.4481 13.6434 14.3563L10.9434 11.6501C9.80622 12.6052 8.34425 13.0845 6.86236 12.9879C5.38046 12.8913 3.99306 12.2264 2.98951 11.1317C1.98596 10.0371 1.44375 8.59729 1.47597 7.1126C1.50818 5.62791 2.11233 4.21298 3.16241 3.1629C4.21249 2.11282 5.62743 1.50867 7.11212 1.47645C8.59681 1.44424 10.0366 1.98645 11.1313 2.99C12.2259 3.99355 12.8908 5.38095 12.9874 6.86285C13.084 8.34474 12.6047 9.80671 11.6496 10.9438L14.3496 13.6438C14.3969 13.6904 14.4344 13.7458 14.46 13.807C14.4856 13.8681 14.4988 13.9338 14.4988 14.0001C14.4988 14.0664 14.4856 14.132 14.46 14.1932C14.4344 14.2544 14.3969 14.3098 14.3496 14.3563ZM7.24961 12.0001C8.18907 12.0001 9.10743 11.7215 9.88857 11.1996C10.6697 10.6776 11.2785 9.93579 11.638 9.06784C11.9976 8.19989 12.0916 7.24483 11.9083 6.32342C11.7251 5.40201 11.2727 4.55564 10.6084 3.89134C9.94407 3.22704 9.0977 2.77465 8.17629 2.59137C7.25488 2.40809 6.29981 2.50215 5.43186 2.86167C4.56391 3.22119 3.82206 3.83001 3.30013 4.61114C2.77819 5.39227 2.49961 6.31064 2.49961 7.2501C2.50126 8.50937 3.00224 9.71659 3.89268 10.607C4.78312 11.4975 5.99034 11.9984 7.24961 12.0001Z"
                    fill="currentColor"></path>
                </svg>
              </div>
              <input
                type="text"
                id="voice-search"
                className="block w-full max-w-[160px] rounded-lg border-0 bg-black/5 p-1 px-[26px] text-sm text-black focus:outline-0 focus:ring-0 dark:bg-white/10 dark:text-white/40"
                placeholder="Поиск..."
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-2">
                <svg
                  aria-hidden="true"
                  className="h-4 w-4 text-black/20 hover:text-black dark:text-white/20 dark:hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                    clipRule="evenodd"></path>
                </svg>
              </button>

            </div>
          </form> */}

          <div className="flex items-center gap-2">
            {/* TODO: Add night mode */}
            {/* <div>
              <Link
                href="/"
                className="text-black dark:text-white">
                <svg
                  className="h-5 w-5"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M27.0876 19.0752C25.1243 19.6257 23.0498 19.6438 21.0771 19.1274C19.1045 18.6111 17.3049 17.5789 15.863 16.1372C14.4214 14.6953 13.3892 12.8958 12.8728 10.9231C12.3564 8.95044 12.3745 6.87598 12.925 4.9126C10.9895 5.45142 9.22876 6.48779 7.81836 7.91895C6.40796 9.34985 5.39697 11.1255 4.88647 13.0688C4.37573 15.012 4.38306 17.0552 4.90796 18.9946C5.43262 20.9343 6.4563 22.7024 7.87695 24.1233C9.29785 25.5439 11.0659 26.5676 13.0056 27.0923C14.9451 27.6172 16.9883 27.6245 18.9314 27.1138C20.8748 26.6033 22.6504 25.5923 24.0813 24.1819C25.5125 22.7715 26.5488 21.0107 27.0876 19.0752Z"
                    fill="currentColor"
                    fillOpacity="0.1"></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M28.051 19.3438L28.0506 19.3454C28.0506 19.3454 27.1566 22.5551 24.7835 24.8941C24.7835 24.8941 22.4095 27.2339 19.1858 28.081C19.1858 28.081 15.962 28.9282 12.7445 28.0577C12.7445 28.0577 9.52702 27.1872 7.1701 24.8303C7.1701 24.8303 4.81318 22.4734 3.94271 19.2559C3.94271 19.2559 3.07225 16.0383 3.91937 12.8146C3.91937 12.8146 4.76649 9.59087 7.10626 7.21693C7.10626 7.21693 9.44603 4.84299 12.6572 3.94922C12.9127 3.8781 13.1859 3.9114 13.4169 4.04178C13.6479 4.17217 13.8176 4.38895 13.8887 4.64446C13.9377 4.82052 13.9375 5.00664 13.8882 5.1826C13.8882 5.1826 13.1206 7.91975 13.8404 10.6698C13.8404 10.6698 14.5603 13.4199 16.5704 15.43C16.5704 15.43 18.5805 17.4401 21.3306 18.16C21.3306 18.16 24.0806 18.8798 26.8178 18.1122C26.9882 18.0644 27.1683 18.0628 27.3396 18.1073L27.3559 18.1117C27.6928 18.2055 27.9562 18.4684 28.0507 18.8051C28.0984 18.9755 28.1001 19.1556 28.0556 19.3269L28.051 19.3438ZM23.3795 23.4697C23.3795 23.4697 24.7551 22.114 25.539 20.4099C25.539 20.4099 23.1856 20.7129 20.8241 20.0948C20.8241 20.0948 17.5496 19.2377 15.1562 16.8442C15.1562 16.8442 12.7627 14.4508 11.9056 11.1763C11.9056 11.1763 11.2875 8.81482 11.5905 6.46138C11.5905 6.46138 9.88644 7.24531 8.53069 8.62085C8.53069 8.62085 6.56528 10.615 5.8537 13.3229C5.8537 13.3229 5.14212 16.0308 5.87331 18.7336C5.87331 18.7336 6.6045 21.4363 8.58431 23.4161C8.58431 23.4161 10.5641 25.3959 13.2668 26.1271C13.2668 26.1271 15.9695 26.8583 18.6775 26.1467C18.6775 26.1467 21.3854 25.4351 23.3795 23.4697Z"
                    fill="currentColor"></path>
                </svg>
              </Link>
              <Link
                href="/"
                className="hidden text-black dark:text-white">
                <svg
                  className="h-5 w-5"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M23.5 16C23.5 20.1421 20.1421 23.5 16 23.5C11.8579 23.5 8.5 20.1421 8.5 16C8.5 11.8579 11.8579 8.5 16 8.5C20.1421 8.5 23.5 11.8579 23.5 16Z"
                    fill="currentColor"
                    fillOpacity="0.1"></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16 7.5C16 7.5 17.7287 7.5 19.3089 8.16838C19.3089 8.16838 20.8345 8.81364 22.0104 9.98959C22.0104 9.98959 23.1864 11.1655 23.8316 12.6911C23.8316 12.6911 24.5 14.2713 24.5 16C24.5 16 24.5 17.7287 23.8316 19.3089C23.8316 19.3089 23.1864 20.8345 22.0104 22.0104C22.0104 22.0104 20.8345 23.1864 19.3089 23.8316C19.3089 23.8316 17.7287 24.5 16 24.5C16 24.5 14.2713 24.5 12.6911 23.8316C12.6911 23.8316 11.1655 23.1864 9.98959 22.0104C9.98959 22.0104 8.81364 20.8345 8.16838 19.3089C8.16838 19.3089 7.5 17.7287 7.5 16C7.5 16 7.5 14.2713 8.16838 12.6911C8.16838 12.6911 8.81364 11.1655 9.98959 9.98959C9.98959 9.98959 11.1655 8.81364 12.6911 8.16838C12.6911 8.16838 14.2713 7.5 16 7.5ZM16 9.5C16 9.5 13.3076 9.5 11.4038 11.4038C11.4038 11.4038 9.5 13.3076 9.5 16C9.5 16 9.5 18.6924 11.4038 20.5962C11.4038 20.5962 13.3076 22.5 16 22.5C16 22.5 18.6924 22.5 20.5962 20.5962C20.5962 20.5962 22.5 18.6924 22.5 16C22.5 16 22.5 13.3076 20.5962 11.4038C20.5962 11.4038 18.6924 9.5 16 9.5Z"
                    fill="currentColor"></path>
                  <path
                    d="M17 4.5V2C17 1.44772 16.5523 1 16 1C15.4477 1 15 1.44772 15 2V4.5C15 5.05228 15.4477 5.5 16 5.5C16.5523 5.5 17 5.05228 17 4.5Z"
                    fill="currentColor"></path>
                  <path
                    d="M6.80672 5.39299C6.61918 5.20545 6.36483 5.1001 6.09961 5.1001C5.83439 5.1001 5.58004 5.20545 5.3925 5.39299C5.20497 5.58053 5.09961 5.83488 5.09961 6.1001C5.09961 6.36531 5.20497 6.61967 5.3925 6.8072L7.155 8.5697C7.34254 8.75724 7.59689 8.8626 7.86211 8.8626C8.12733 8.8626 8.38168 8.75724 8.56922 8.5697C8.75675 8.38217 8.86211 8.12781 8.86211 7.8626C8.86211 7.59738 8.75675 7.34303 8.56922 7.15549L6.80672 5.39299Z"
                    fill="currentColor"></path>
                  <path
                    d="M4.5 15H2C1.44772 15 1 15.4477 1 16C1 16.5523 1.44772 17 2 17H4.5C5.05228 17 5.5 16.5523 5.5 16C5.5 15.4477 5.05228 15 4.5 15Z"
                    fill="currentColor"></path>
                  <path
                    d="M5.3925 25.1928C5.20497 25.3804 5.09961 25.6347 5.09961 25.9C5.09961 25.9172 5.10006 25.9345 5.10095 25.9517C5.11375 26.1987 5.21762 26.4322 5.3925 26.6071C5.58004 26.7946 5.83439 26.9 6.09961 26.9C6.36483 26.9 6.61918 26.7946 6.80672 26.6071L8.56922 24.8446C8.75675 24.657 8.86211 24.4027 8.86211 24.1375C8.86211 23.8722 8.75675 23.6179 8.56922 23.4303C8.38168 23.2428 8.12733 23.1375 7.86211 23.1375C7.84485 23.1375 7.8276 23.1379 7.81037 23.1388C7.56338 23.1516 7.32989 23.2555 7.155 23.4303L5.3925 25.1928Z"
                    fill="currentColor"></path>
                  <path
                    d="M15 27.5V30C15 30.5523 15.4477 31 16 31C16.5523 31 17 30.5523 17 30V27.5C17 26.9477 16.5523 26.5 16 26.5C15.4477 26.5 15 26.9477 15 27.5Z"
                    fill="currentColor"></path>
                  <path
                    d="M23.4307 24.8447L25.1931 26.6071C25.3806 26.7946 25.635 26.9 25.9002 26.9C26.1654 26.9 26.4198 26.7946 26.6073 26.6071C26.7948 26.4195 26.9002 26.1652 26.9002 25.9C26.9002 25.6347 26.7948 25.3804 26.6073 25.1928L24.8449 23.4305C24.6573 23.2428 24.4029 23.1375 24.1377 23.1375C23.8725 23.1375 23.6181 23.2428 23.4306 23.4303C23.2431 23.6179 23.1377 23.8722 23.1377 24.1375C23.1377 24.4027 23.2431 24.657 23.4307 24.8447Z"
                    fill="currentColor"></path>
                  <path
                    d="M27.5 17H30C30.5523 17 31 16.5523 31 16C31 15.4477 30.5523 15 30 15H27.5C26.9477 15 26.5 15.4477 26.5 16C26.5 16.5523 26.9477 17 27.5 17Z"
                    fill="currentColor"></path>
                  <path
                    d="M26.6073 6.8072C26.7948 6.61967 26.9002 6.36531 26.9002 6.1001C26.9002 5.83488 26.7948 5.58053 26.6073 5.39299C26.4198 5.20545 26.1654 5.1001 25.9002 5.1001C25.635 5.1001 25.3806 5.20545 25.1931 5.39299L23.4307 7.15537C23.2431 7.34303 23.1377 7.59738 23.1377 7.8626C23.1377 8.12781 23.2431 8.38217 23.4306 8.56971C23.6181 8.75724 23.8725 8.8626 24.1377 8.8626C24.4029 8.8626 24.6573 8.75724 24.8448 8.5697L26.6073 6.8072Z"
                    fill="currentColor"></path>
                </svg>
              </Link>
            </div> */}

            <Link
              href="/profile/notifications"
              type="button"
              className="relative h-7 w-7 p-1 text-black dark:text-white">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4.39087 8.12508C4.3898 7.38415 4.53537 6.65028 4.81918 5.96584C5.103 5.28137 5.51941 4.65984 6.04431 4.137C6.56937 3.61416 7.19269 3.20034 7.87827 2.91939C8.564 2.63847 9.2984 2.49596 10.0394 2.50008C13.1331 2.52354 15.6096 5.09384 15.6096 8.19538V8.75008C15.6096 11.547 16.1955 13.172 16.7111 14.0626C16.7659 14.1574 16.7949 14.265 16.7949 14.3745C16.795 14.4841 16.7664 14.5917 16.7117 14.6866C16.6571 14.7816 16.5785 14.8605 16.4839 14.9155C16.3892 14.9706 16.2816 14.9997 16.1722 15.0001H3.82843C3.71887 14.9997 3.6113 14.9706 3.51669 14.9155C3.42194 14.8605 3.34335 14.7816 3.28873 14.6866C3.2341 14.5917 3.20541 14.4841 3.20557 14.3745C3.20572 14.265 3.23456 14.1574 3.28934 14.0626C3.80493 13.172 4.39087 11.547 4.39087 8.75008V8.12508Z"
                  fill="currentColor"
                  fillOpacity="0.1"></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.76587 8.75007V8.12507C3.76587 8.12507 3.76411 6.87864 4.24182 5.72645C4.24182 5.72645 4.71953 4.57425 5.60334 3.69411C5.60334 3.69411 6.48715 2.81397 7.64132 2.34105C7.64132 2.34105 8.7955 1.86814 10.0428 1.87508C10.0428 1.87508 11.311 1.88468 12.4659 2.39135C12.4659 2.39135 13.5771 2.87881 14.4324 3.75745C14.4324 3.75745 15.2845 4.63266 15.7518 5.76121C15.7518 5.76121 16.2346 6.92735 16.2346 8.19538V8.75007C16.2346 8.75007 16.2346 11.992 17.2521 13.7494C17.2521 13.7494 17.4196 14.0396 17.4199 14.374C17.4199 14.374 17.4202 14.7083 17.2535 14.9982C17.2535 14.9982 17.0869 15.288 16.7978 15.4559C16.7978 15.4559 16.5087 15.6239 16.1743 15.6251L3.82837 15.6251C3.82837 15.6251 3.49182 15.6239 3.20271 15.4559C3.20271 15.4559 2.9136 15.288 2.74693 14.9982C2.74693 14.9982 2.58027 14.7083 2.58057 14.374C2.58057 14.374 2.58086 14.0396 2.74804 13.7501C2.74804 13.7501 3.76587 11.992 3.76587 8.75007ZM5.01587 8.75007C5.01587 8.75007 5.01587 12.3277 3.83057 14.3751L16.1699 14.3751C16.1699 14.3751 14.9846 12.3272 14.9846 8.75007V8.19538C14.9846 8.19538 14.9846 6.11659 13.5368 4.6294C13.5368 4.6294 12.0874 3.1406 10.0358 3.12506C10.0358 3.12506 9.03831 3.11951 8.11526 3.49772C8.11526 3.49772 7.19221 3.87593 6.48538 4.57982C6.48538 4.57982 5.77856 5.28372 5.39651 6.20519C5.39651 6.20519 5.01446 7.12666 5.01587 8.12507V8.75007Z"
                  fill="currentColor"></path>
                <path
                  d="M13.125 15.625V15C13.125 14.6548 12.8452 14.375 12.5 14.375C12.1548 14.375 11.875 14.6548 11.875 15V15.625C11.875 16.4016 11.3258 16.9508 11.3258 16.9508C10.7766 17.5 10 17.5 10 17.5C9.22335 17.5 8.67417 16.9508 8.67417 16.9508C8.125 16.4016 8.125 15.625 8.125 15.625V15C8.125 14.6548 7.84518 14.375 7.5 14.375C7.15482 14.375 6.875 14.6548 6.875 15L6.875 15.625C6.875 16.9194 7.79029 17.8347 7.79029 17.8347C8.70558 18.75 10 18.75 10 18.75C11.2944 18.75 12.2097 17.8347 12.2097 17.8347C13.125 16.9194 13.125 15.625 13.125 15.625Z"
                  fill="currentColor"></path>
              </svg>
              <span className="absolute right-[-8px] top-[-12px] inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-center text-[11px] text-white">10</span>
            </Link>
            <div className="profile">
              <Link
                href="/profile"
                className="flex items-center gap-1.5 xl:gap-0">
                <span className="fw-medium">{!data ? null : data.name}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[75px]"></div>
    </>
  )
}

export default AppHeader
