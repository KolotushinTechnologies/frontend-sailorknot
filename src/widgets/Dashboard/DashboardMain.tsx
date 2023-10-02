import useGetUsers from "@/src/shared/hooks/useGetUsers"
import Link from "next/link"
import { FC } from "react"

interface ComponentProps {}

export const DashboardMain: FC<ComponentProps> = () => {
  const { users: items, loading, updUsers } = useGetUsers()

  return (
    <>
      <div className="space-y-4">
        <div>
          <div className="flex flex-col gap-7">
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 xl:grid-cols-4">
              <Link href="/dashboard/users" className="rounded-2xl bg-lightblue-100 p-6">
                <div className="mb-1.5 flex items-center justify-between gap-2 text-black">
                  <p className="text-sm font-semibold">Всего пользователей</p>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 8.62489C12 8.62489 13.864 8.62489 15.182 9.94291C15.182 9.94291 16.5 11.2609 16.5 13.1249C16.5 13.1249 16.5 14.9888 15.182 16.3069C15.182 16.3069 13.864 17.6249 12 17.6249C12 17.6249 10.136 17.6249 8.81802 16.3069C8.81802 16.3069 7.5 14.9888 7.5 13.1249C7.5 13.1249 7.5 11.2609 8.81802 9.94291C8.81802 9.94291 10.136 8.62489 12 8.62489ZM12 10.1249C12 10.1249 10.7574 10.1249 9.87868 11.0036C9.87868 11.0036 9 11.8822 9 13.1249C9 13.1249 9 14.3675 9.87868 15.2462C9.87868 15.2462 10.7574 16.1249 12 16.1249C12 16.1249 13.2426 16.1249 14.1213 15.2462C14.1213 15.2462 15 14.3675 15 13.1249C15 13.1249 15 11.8822 14.1213 11.0036C14.1213 11.0036 13.2426 10.1249 12 10.1249Z"
                      fill="currentcolor"></path>
                    <path
                      d="M22.274 13.5736C22.3931 13.7329 22.5708 13.8387 22.7677 13.8672C22.8032 13.8723 22.8391 13.8749 22.875 13.8749L22.8763 13.8749C23.0377 13.8746 23.1947 13.8223 23.324 13.7256C23.5135 13.5841 23.625 13.3614 23.625 13.1249L23.625 13.1163C23.6231 12.9574 23.5709 12.8032 23.4758 12.6759L23.4751 12.675C22.5736 11.4693 21.227 10.7959 21.227 10.7959C19.8799 10.1224 18.3738 10.1249 18.3738 10.1249L18.375 10.1249C18.7892 10.1249 19.125 10.4607 19.125 10.8749C19.125 11.2885 18.7902 11.624 18.3767 11.6249L22.274 13.5736Z"
                      fill="currentcolor"></path>
                    <path
                      d="M3.44384 12.1376C4.47305 11.623 5.62375 11.6249 5.62375 11.6249L5.6248 11.6249C5.63639 11.6249 5.64819 11.6246 5.65977 11.6241C5.84603 11.6154 6.02238 11.5377 6.15444 11.4061C6.29533 11.2657 6.37467 11.0751 6.375 10.8762L6.375 10.8751C6.375 10.8298 6.37088 10.7843 6.36271 10.7397C6.29751 10.384 5.98783 10.1255 5.62625 10.1249L5.625 10.1249C4.11958 10.1227 2.77302 10.7959 2.77302 10.7959C1.42638 11.4693 0.524888 12.675 0.524888 12.675L0.524345 12.6758C0.427356 12.8055 0.375 12.963 0.375 13.1249L0.375041 13.1328C0.37539 13.166 0.377954 13.1993 0.382716 13.2322C0.411176 13.4291 0.516675 13.6066 0.676004 13.7256C0.805645 13.8225 0.963152 13.8749 1.125 13.8749C1.13503 13.8749 1.14505 13.8747 1.15507 13.8743C1.38084 13.8652 1.59049 13.7549 1.72575 13.5739C2.41463 12.6522 3.44384 12.1376 3.44384 12.1376Z"
                      fill="currentcolor"></path>
                    <path
                      d="M14.786 18.4258C16.064 19.224 16.7254 20.5776 16.7254 20.5776L16.7258 20.5785C16.8516 20.836 17.1134 20.9999 17.4 20.9999L17.4205 20.9996C17.5276 20.9967 17.6328 20.9708 17.7291 20.9238C17.9866 20.7981 18.15 20.5365 18.15 20.2499L18.1497 20.2293C18.1468 20.1223 18.1209 20.017 18.0739 19.9208C17.2239 18.1803 15.5806 17.1536 15.5806 17.1536C13.9374 16.1273 12 16.1273 12 16.1273C10.0626 16.1273 8.41936 17.1536 8.41936 17.1536C6.77641 18.1797 5.92633 19.9202 5.92633 19.9202C5.87626 20.0227 5.84999 20.1358 5.84999 20.2499L5.85005 20.2596C5.85109 20.3393 5.86483 20.4184 5.89074 20.4937C5.95542 20.6818 6.09217 20.8365 6.27091 20.9238C6.37339 20.9739 6.48594 20.9999 6.59999 20.9999L6.61721 20.9997C6.89756 20.9932 7.1509 20.8309 7.27394 20.579C7.93538 19.2244 9.21395 18.4258 9.21395 18.4258C10.4925 17.6273 12 17.6273 12 17.6273C13.5074 17.6273 14.786 18.4258 14.786 18.4258Z"
                      fill="currentcolor"></path>
                    <path
                      d="M7.26176 6.33426C7.70944 6.81077 7.83204 7.45299 7.83204 7.45299C7.86933 7.64838 7.98272 7.82095 8.14725 7.93273C8.27158 8.0172 8.41842 8.06237 8.56873 8.06237L8.5736 8.06235C8.61916 8.06206 8.6646 8.05761 8.70936 8.04907C9.06296 7.98157 9.31874 7.67236 9.31874 7.31237L9.31872 7.30814C9.31846 7.26237 9.31402 7.21671 9.30543 7.17174C9.10111 6.10137 8.35497 5.30718 8.35497 5.30718C7.60884 4.513 6.55328 4.24236 6.55328 4.24236C5.49772 3.97173 4.4615 4.30894 4.4615 4.30894C3.42528 4.64615 2.73116 5.48617 2.73116 5.48617C2.03703 6.3262 1.90119 7.4074 1.90119 7.4074C1.76535 8.4886 2.2301 9.47423 2.2301 9.47423C2.69486 10.4599 3.61545 11.0429 3.61545 11.0429C4.53572 11.6258 5.6248 11.6249 5.6248 11.6249L5.62575 11.6249C5.82466 11.6247 6.01534 11.5455 6.15585 11.4047C6.29618 11.2641 6.375 11.0738 6.375 10.8751L6.37498 10.8741C6.37456 10.4602 6.03892 10.1249 5.625 10.1249L5.62422 10.1249C4.9704 10.1255 4.41805 9.7757 4.41805 9.7757C3.86569 9.42586 3.58684 8.83448 3.58684 8.83448C3.30799 8.24311 3.38949 7.59439 3.38949 7.59439C3.471 6.94567 3.88747 6.44165 3.88747 6.44165C4.30395 5.93764 4.92568 5.73531 4.92568 5.73531C5.54741 5.53298 6.18074 5.69537 6.18074 5.69537C6.81408 5.85775 7.26176 6.33426 7.26176 6.33426Z"
                      fill="currentcolor"></path>
                    <path
                      d="M19.5819 9.7757C19.0296 10.1255 18.3758 10.1249 18.3758 10.1249L18.375 10.1249C18.3633 10.1249 18.3515 10.1251 18.3397 10.1257L17.6258 10.9101C17.6346 11.0964 17.7124 11.2727 17.8441 11.4047C17.9846 11.5455 18.1753 11.6247 18.3742 11.6249L18.375 11.6249C19.4643 11.6258 20.3845 11.0429 20.3845 11.0429C21.3051 10.4599 21.7699 9.47423 21.7699 9.47423C22.2346 8.4886 22.0988 7.4074 22.0988 7.4074C21.963 6.3262 21.2688 5.48617 21.2688 5.48617C20.5747 4.64615 19.5385 4.30894 19.5385 4.30894C18.5023 3.97173 17.4467 4.24236 17.4467 4.24236C16.3912 4.513 15.645 5.30718 15.645 5.30718C14.8989 6.10137 14.6946 7.17174 14.6946 7.17174C14.6857 7.2181 14.6813 7.26518 14.6813 7.31237C14.6813 7.33491 14.6823 7.35743 14.6843 7.37988C14.7144 7.71326 14.9618 7.9863 15.2906 8.04907C15.337 8.05792 15.3841 8.06237 15.4313 8.06237C15.4538 8.06237 15.4763 8.06135 15.4988 8.05932C15.8321 8.02919 16.1052 7.78179 16.168 7.45299C16.2906 6.81077 16.7382 6.33426 16.7382 6.33426C17.1859 5.85775 17.8193 5.69537 17.8193 5.69537C18.4526 5.53298 19.0743 5.73531 19.0743 5.73531C19.696 5.93764 20.1125 6.44165 20.1125 6.44165C20.529 6.94566 20.6105 7.59439 20.6105 7.59439C20.692 8.24311 20.4132 8.83448 20.4132 8.83448C20.1343 9.42586 19.5819 9.7757 19.5819 9.7757Z"
                      fill="currentcolor"></path>
                  </svg>
                </div>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold leading-9 text-black">{items.length}</h2>
                </div>
              </Link>

              <div className="rounded-2xl bg-lightblue-100 p-6">
                <div className="mb-1.5 flex items-center justify-between gap-2 text-black">
                  <p className="text-sm font-semibold">Всего изображений</p>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M3.75 18.75V9.75C3.75 9.33579 3.41421 9 3 9C2.58579 9 2.25 9.33579 2.25 9.75V18.75C2.25 19.3713 2.68934 19.8107 2.68934 19.8107C3.12868 20.25 3.75 20.25 3.75 20.25H20.25C20.8713 20.25 21.3107 19.8107 21.3107 19.8107C21.75 19.3713 21.75 18.75 21.75 18.75V8.25C21.75 7.62868 21.3107 7.18934 21.3107 7.18934C20.8713 6.75 20.25 6.75 20.25 6.75H12C11.5858 6.75 11.25 7.08579 11.25 7.5C11.25 7.91421 11.5858 8.25 12 8.25H20.25V18.75H3.75Z"
                      fill="currentcolor"></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.6444 10.2018C9.6444 10.2018 9.24649 10.4977 8.7507 10.5L8.74688 10.5H3C2.58579 10.5 2.25 10.1642 2.25 9.75V6C2.25 6 2.25 5.37868 2.68934 4.93934C2.68934 4.93934 3.12868 4.5 3.75 4.5L8.74996 4.50001C8.74996 4.50001 9.24619 4.50205 9.64655 4.79976L12.4497 6.89976C12.5068 6.94253 12.5575 6.99323 12.6002 7.05032C12.7195 7.20952 12.7706 7.40957 12.7424 7.60646C12.7142 7.80336 12.6089 7.98098 12.4497 8.10024L9.6444 10.2018ZM8.74411 9C8.74411 9 8.747 8.9999 8.74935 8.99815L10.7491 7.5L8.7472 6.00024C8.7472 6.00024 8.74687 6.00001 8.74379 5.99999L3.75 6V9H8.74411Z"
                      fill="currentcolor"></path>
                  </svg>
                </div>

                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold leading-9 text-black">29</h2>
                </div>
              </div>

              <div className="rounded-2xl bg-lightpurple-100 p-6">
                <div className="mb-1.5 flex items-center justify-between gap-2 text-black">
                  <p className="text-sm font-semibold">Всего постов</p>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 12.75H20.25C20.6642 12.75 21 12.4142 21 12C21 11.5858 20.6642 11.25 20.25 11.25H12C11.5858 11.25 11.25 11.5858 11.25 12C11.25 12.4142 11.5858 12.75 12 12.75Z"
                      fill="currentcolor"></path>
                    <path
                      d="M12 6.75H20.25C20.6642 6.75 21 6.41421 21 6C21 5.58579 20.6642 5.25 20.25 5.25H12C11.5858 5.25 11.25 5.58579 11.25 6C11.25 6.41421 11.5858 6.75 12 6.75Z"
                      fill="currentcolor"></path>
                    <path
                      d="M12 18.75H20.25C20.6642 18.75 21 18.4142 21 18C21 17.5858 20.6642 17.25 20.25 17.25H12C11.5858 17.25 11.25 17.5858 11.25 18C11.25 18.4142 11.5858 18.75 12 18.75Z"
                      fill="currentcolor"></path>
                    <path
                      d="M9.13323 5.05155C9.14067 5.04469 9.14818 5.03748 9.15533 5.03033C9.28856 4.8971 9.36677 4.7186 9.37439 4.53033L9.37443 4.52923C9.37481 4.51949 9.375 4.50974 9.375 4.5C9.375 4.31158 9.30408 4.13007 9.17635 3.99155C9.16949 3.98412 9.16248 3.97682 9.15533 3.96967C9.0221 3.83644 8.8436 3.75823 8.65533 3.75061L8.65423 3.75057C8.64449 3.75019 8.63474 3.75 8.625 3.75C8.43658 3.75 8.25507 3.82092 8.11655 3.94865L5.37261 6.47909L4.25924 5.44939C4.12064 5.3212 3.93879 5.25 3.74999 5.25C3.74024 5.25 3.73049 5.25019 3.72074 5.25057C3.52198 5.25833 3.33444 5.34473 3.19939 5.49076C3.0712 5.62936 3 5.81121 3 6C3 6.00976 3.00019 6.01951 3.00057 6.02926C3.00833 6.22802 3.09473 6.41556 3.24076 6.55061L4.86264 8.05061C5.14978 8.31618 5.5928 8.3165 5.88032 8.05135L9.13323 5.05155Z"
                      fill="currentcolor"></path>
                    <path
                      d="M9.13323 11.0515C9.14067 11.0447 9.14818 11.0375 9.15533 11.0303C9.28856 10.8971 9.36677 10.7186 9.37439 10.5303L9.37443 10.5292C9.37481 10.5195 9.375 10.5097 9.375 10.5C9.375 10.3116 9.30408 10.1301 9.17635 9.99155C9.16949 9.98412 9.16248 9.97682 9.15533 9.96967C9.0221 9.83644 8.8436 9.75823 8.65533 9.75061L8.65423 9.75057C8.64449 9.75019 8.63474 9.75 8.625 9.75C8.43658 9.75 8.25507 9.82092 8.11655 9.94865L5.37261 12.4791L4.25924 11.4494C4.12064 11.3212 3.93879 11.25 3.74999 11.25C3.74024 11.25 3.73049 11.2502 3.72074 11.2506C3.52198 11.2583 3.33444 11.3447 3.19939 11.4908C3.0712 11.6294 3 11.8112 3 12C3 12.0098 3.00019 12.0195 3.00057 12.0293C3.00833 12.228 3.09473 12.4156 3.24076 12.5506L4.86264 14.0506C5.14978 14.3162 5.5928 14.3165 5.88032 14.0513L9.13323 11.0515Z"
                      fill="currentcolor"></path>
                    <path
                      d="M9.13323 17.0515C9.14067 17.0447 9.14818 17.0375 9.15533 17.0303C9.28856 16.8971 9.36677 16.7186 9.37439 16.5303L9.37443 16.5292C9.37481 16.5195 9.375 16.5097 9.375 16.5C9.375 16.3116 9.30408 16.1301 9.17635 15.9916C9.16949 15.9841 9.16248 15.9768 9.15533 15.9697C9.0221 15.8364 8.8436 15.7582 8.65533 15.7506L8.65423 15.7506C8.64449 15.7502 8.63474 15.75 8.625 15.75C8.43658 15.75 8.25507 15.8209 8.11655 15.9487L5.37261 18.4791L4.25924 17.4494C4.12064 17.3212 3.93879 17.25 3.74999 17.25C3.74024 17.25 3.73049 17.2502 3.72074 17.2506C3.52198 17.2583 3.33444 17.3447 3.19939 17.4908C3.0712 17.6294 3 17.8112 3 18C3 18.0098 3.00019 18.0195 3.00057 18.0293C3.00833 18.228 3.09473 18.4156 3.24076 18.5506L4.86264 20.0506C5.14978 20.3162 5.5928 20.3165 5.88032 20.0513L9.13323 17.0515Z"
                      fill="currentcolor"></path>
                  </svg>
                </div>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold leading-9 text-black">715</h2>
                </div>
              </div>

              <div className="rounded-2xl bg-lightpurple-100 p-6">
                <div className="mb-1.5 flex items-center justify-between gap-2 text-black">
                  <p className="text-sm font-semibold">Заголовок</p>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M22.5 9V15C22.5 15.4142 22.8358 15.75 23.25 15.75C23.6642 15.75 24 15.4142 24 15V9C24 8.58579 23.6642 8.25 23.25 8.25C22.8358 8.25 22.5 8.58579 22.5 9Z"
                      fill="currentcolor"></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M18.75 4.5C18.75 4.5 19.682 4.5 20.341 5.15901C20.341 5.15901 21 5.81802 21 6.75V17.25C21 17.25 21 18.182 20.341 18.841C20.341 18.841 19.682 19.5 18.75 19.5H4.5C4.5 19.5 3.56802 19.5 2.90901 18.841C2.90901 18.841 2.25 18.182 2.25 17.25V6.75C2.25 6.75 2.25 5.81802 2.90901 5.15901C2.90901 5.15901 3.56802 4.5 4.5 4.5H18.75ZM18.75 6L4.5 6C4.5 6 4.18934 6 3.96967 6.21967C3.96967 6.21967 3.75 6.43934 3.75 6.75V17.25C3.75 17.25 3.75 17.5607 3.96967 17.7803C3.96967 17.7803 4.18934 18 4.5 18H18.75C18.75 18 19.0607 18 19.2803 17.7803C19.2803 17.7803 19.5 17.5607 19.5 17.25V6.75C19.5 6.75 19.5 6.43934 19.2803 6.21967C19.2803 6.21967 19.0607 6 18.75 6Z"
                      fill="currentcolor"></path>
                    <path
                      d="M11.2328 11.25L12.3214 8.52854C12.3568 8.43995 12.375 8.34542 12.375 8.25L12.375 8.248C12.3742 7.94205 12.1876 7.66727 11.9036 7.55364C11.815 7.51821 11.7204 7.5 11.625 7.5L11.6159 7.50006C11.5174 7.50126 11.4201 7.52184 11.3296 7.56064C11.1467 7.639 11.0025 7.78677 10.9287 7.97146L9.42866 11.7215C9.27482 12.106 9.46189 12.5425 9.84647 12.6964C9.93506 12.7318 10.0296 12.75 10.125 12.75H12.0172L10.9288 15.4711C10.8934 15.5597 10.875 15.6546 10.875 15.75L10.8751 15.7591C10.8763 15.8576 10.8969 15.9549 10.9357 16.0454C11.014 16.2283 11.1618 16.3725 11.3465 16.4464C11.4351 16.4818 11.5296 16.5 11.625 16.5L11.627 16.5C11.933 16.4992 12.2077 16.3126 12.3214 16.0285L13.8214 12.2785C13.8568 12.19 13.875 12.0954 13.875 12C13.875 11.5858 13.5392 11.25 13.125 11.25H11.2328Z"
                      fill="currentcolor"></path>
                  </svg>
                </div>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold leading-9 text-black">93.8%</h2>
                  <div className="flex items-center gap-1">
                    <p className="text-xs leading-[18px] text-black">+1.48%</p>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.45488 5.60777L14 4L12.6198 9.6061L10.898 7.9532L8.12069 10.8463C8.02641 10.9445 7.89615 11 7.76 11C7.62385 11 7.49359 10.9445 7.39931 10.8463L5.36 8.72199L2.36069 11.8463C2.16946 12.0455 1.85294 12.0519 1.65373 11.8607C1.45453 11.6695 1.44807 11.3529 1.63931 11.1537L4.99931 7.65373C5.09359 7.55552 5.22385 7.5 5.36 7.5C5.49615 7.5 5.62641 7.55552 5.72069 7.65373L7.76 9.77801L10.1766 7.26067L8.45488 5.60777Z"
                        fill="#1C1C1C"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="rounded-md border border-black/10 bg-lightwhite p-5 text-left dark:border-white/10 dark:bg-white/5">
            <div className="mb-1">
              <p className="text-sm font-semibold">Таблица 1</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <div className="table-responsive">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th>Имя</th>
                      <th>Цена</th>
                      <th>Количество</th>
                      <th>Сумма</th>
                    </tr>
                  </thead>

                  <tbody>
                    {Array.from({ length: 6 }).map((_item, indx) => {
                      return (
                        <tr key={indx}>
                          <td className="whitespace-nowrap">Далеко-далеко за словесными горами.</td>
                          <td>Далеко-далеко, за словесными.</td>
                          <td>{indx * 10}</td>
                          <td>{indx * 20}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="rounded-md border border-black/10 bg-lightwhite p-5 text-left dark:border-white/10 dark:bg-white/5">
            <div className="mb-1">
              <p className="text-sm font-semibold">Таблица 2</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <div className="table-responsive">
                <table className="table-hover w-full border-collapse">
                  <thead>
                    <tr>
                      <th>Имя</th>
                      <th>Фамилия</th>
                      <th>Время</th>
                      <th>Статус</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="whitespace-nowrap">Далеко-далеко, за.</td>
                      <td>
                        <div className="flex items-center justify-start -space-x-1.5">
                          <img
                            className="h-6 w-6 overflow-hidden rounded-full object-cover ring-2 ring-white dark:ring-black"
                            src="https://webonzer.com/snow/assets/images/avatar-12.png"
                            alt=""
                          />
                        </div>
                      </td>
                      <td>3ч</td>
                      <td className="flex items-center py-3 text-xs text-[#8A8CD9]">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M11 8C11 9.65685 9.65685 11 8 11C6.34315 11 5 9.65685 5 8C5 6.34315 6.34315 5 8 5C9.65685 5 11 6.34315 11 8Z"
                            fill="currentcolor"></path>
                        </svg>
                        <p>В прогремме</p>
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap">Далеко-далеко, за словесными.</td>
                      <td>
                        <div className="flex items-center justify-start -space-x-1.5">
                          <img
                            className="h-6 w-6 overflow-hidden rounded-full object-cover ring-2 ring-white dark:ring-black"
                            src="https://webonzer.com/snow/assets/images/avatar-13.png"
                            alt=""
                          />
                          <img
                            className="h-6 w-6 overflow-hidden rounded-full object-cover ring-2 ring-white dark:ring-black"
                            src="https://webonzer.com/snow/assets/images/avatar-14.png"
                            alt=""
                          />
                        </div>
                      </td>
                      <td>12ч</td>
                      <td className="flex items-center py-3 text-xs text-[#4AA785]">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M11 8C11 9.65685 9.65685 11 8 11C6.34315 11 5 9.65685 5 8C5 6.34315 6.34315 5 8 5C9.65685 5 11 6.34315 11 8Z"
                            fill="currentcolor"></path>
                        </svg>
                        <p>Завершено</p>
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap">Далеко-далеко, за словесными.</td>
                      <td>
                        <div className="flex items-center justify-start -space-x-1.5">
                          <img
                            className="h-6 w-6 overflow-hidden rounded-full object-cover ring-2 ring-white dark:ring-black"
                            src="https://webonzer.com/snow/assets/images/avatar-15.png"
                            alt=""
                          />
                          <img
                            className="h-6 w-6 overflow-hidden rounded-full object-cover ring-2 ring-white dark:ring-black"
                            src="https://webonzer.com/snow/assets/images/avatar-16.png"
                            alt=""
                          />
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lightpurple-100 object-cover text-center text-xs ring-2 ring-white dark:ring-black">+3</span>
                        </div>
                      </td>
                      <td>78ч</td>
                      <td className="flex items-center py-3 text-xs text-[#59A8D4]">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M11 8C11 9.65685 9.65685 11 8 11C6.34315 11 5 9.65685 5 8C5 6.34315 6.34315 5 8 5C9.65685 5 11 6.34315 11 8Z"
                            fill="currentcolor"></path>
                        </svg>
                        <p>Остановлено</p>
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap">Далеко-далеко, за словесными.</td>
                      <td>
                        <div className="flex items-center justify-start -space-x-1.5">
                          <img
                            className="h-6 w-6 overflow-hidden rounded-full object-cover ring-2 ring-white dark:ring-black"
                            src="https://webonzer.com/snow/assets/images/avatar-17.png"
                            alt=""
                          />
                        </div>
                      </td>
                      <td>26ч</td>
                      <td className="flex items-center py-3 text-xs text-[#FFC555]">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M11 8C11 9.65685 9.65685 11 8 11C6.34315 11 5 9.65685 5 8C5 6.34315 6.34315 5 8 5C9.65685 5 11 6.34315 11 8Z"
                            fill="currentcolor"></path>
                        </svg>
                        <p>Активно</p>
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap">Далеко-далеко, за словесными.</td>
                      <td>
                        <div className="flex items-center justify-start -space-x-1.5">
                          <img
                            className="h-6 w-6 overflow-hidden rounded-full object-cover ring-2 ring-white dark:ring-black"
                            src="https://webonzer.com/snow/assets/images/avatar-18.png"
                            alt=""
                          />
                        </div>
                      </td>
                      <td>17ч</td>
                      <td className="flex items-center py-3 text-xs text-black/40 dark:text-white/40">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M11 8C11 9.65685 9.65685 11 8 11C6.34315 11 5 9.65685 5 8C5 6.34315 6.34315 5 8 5C9.65685 5 11 6.34315 11 8Z"
                            fill="currentcolor"></path>
                        </svg>
                        <p>Отменено</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
