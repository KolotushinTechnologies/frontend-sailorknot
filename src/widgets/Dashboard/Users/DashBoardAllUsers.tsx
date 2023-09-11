import { ChangeEvent, FC, use } from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { ModalStore, modalStoreToggle } from "@/src/shared/store/modalStore"
import { GetAllResponse, User } from "@/src/shared/http/services/userService/types/getAll"
import clsx from "clsx"
import AdminPagination from "../../Pagination/AdminPagination"
import { UserService } from "@/src/shared/http/services/userService"
import toast from "react-hot-toast"

interface ComponentProps {
  items: GetAllResponse
  page: number
  take: number
  orderBy: string
}

export const DashBoardAllUsers: FC<ComponentProps> = ({ items, page }) => {
  const [animationParent] = useAutoAnimate()
  const router = useRouter()
  const headerTable = ["Email", "Роли", "Активирован", "Действия"]
  const [selectedItems, selectedItemsSet] = useState<User[]>([])

  const onSelect = (item: User) => (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked
    selectedItemsSet((prevItems) => {
      if (isChecked) {
        return [...prevItems, item]
      } else {
        return prevItems.filter((item) => item !== item)
      }
    })
  }

  const onSelectAll = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked
    if (isChecked) {
      selectedItemsSet(items.users)
    } else {
      selectedItemsSet([])
    }
  }

  const onArhivateItem = () => {
    ModalStore.update((store) => {
      store.modalStoreTitle = `В архив ${selectedItems.length} шт.?`
      store.modalStoreConfirm = async () => console.log("В архив да")
      store.modalStoreCancel = async () => console.log("В архив нет")
    })
    modalStoreToggle(true)
  }

  const onDeleteItem = async () => {
    ModalStore.update((store) => {
      store.modalStoreTitle = `Удалить  ${selectedItems.length} шт.?`
      store.modalStoreConfirm = async () => {
        toast.success("Удалено")
        // try {
        //   const deleteUsers = await Promise.allSettled(selectedItems.map(({ id }) => UserService.deleteOne(id)))
        //   selectedItemsSet([])
        //   console.log('deleteUsers: ', deleteUsers);

        //   router.push(router.asPath)
        // } catch (error) {}
      }
      store.modalStoreCancel = async () => console.log("Удалить нет")
    })
    modalStoreToggle(true)
  }

  const renderActions = () => {
    if (selectedItems.length === 0) return null
    return (
      <div className="mr-2 flex items-center space-x-2 whitespace-nowrap">
        <button
          onClick={onDeleteItem}
          className="inline-flex items-center rounded-lg border border-red-300 bg-white px-3 py-1.5 text-sm font-medium text-red-500 hover:bg-red-100 focus:outline-none focus:ring-4 focus:ring-red-200 dark:border-red-600 dark:bg-red-800 dark:text-red-400 dark:hover:border-red-600 dark:hover:bg-red-700 dark:focus:ring-red-700"
          type="button">
          <span className="sr-only">Удалить</span>Удалить
        </button>
        <button
          onClick={onArhivateItem}
          className="inline-flex items-center rounded-lg border border-yellow-300 bg-white px-3 py-1.5 text-sm font-medium text-yellow-500 hover:bg-yellow-100 focus:outline-none focus:ring-4 focus:ring-yellow-200 dark:border-yellow-600 dark:bg-yellow-800 dark:text-yellow-400 dark:hover:border-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-700"
          type="button">
          <span className="sr-only">В архив</span>В архив
        </button>
      </div>
    )
  }

  return (
    <>
      <AdminPagination
        currentPage={page}
        meta={items.meta}
      />
      <div
        ref={animationParent}
        className="text-left dark:border-white/10 dark:bg-white/5">
        <div className="table-responsive relative sm:rounded-lg">
          <div className="flex items-center bg-white p-2 pb-4 dark:bg-gray-900">
            <Link
              href="users/create"
              className="mr-2 flex items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              <svg
                className="mr-2 h-3.5 w-3.5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true">
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"></path>
              </svg>
              Добавить
            </Link>
            {renderActions()}

            <label
              htmlFor="table-search"
              className="sr-only">
              Поиск
            </label>
            <div className="relative ml-auto">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-4 w-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="table-search-users"
                className="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Поиск"
              />
            </div>
          </div>
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th
                  scope="col"
                  className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 transition-all focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                      checked={selectedItems.length === items.users.length}
                      onChange={onSelectAll}
                    />
                    <label
                      htmlFor="checkbox-all-search"
                      className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                {headerTable.map((item, indx) => {
                  return (
                    <th
                      key={indx}
                      scope="col"
                      className="px-6 py-3">
                      {item}
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {items.users.map((item, indx) => {
                return (
                  <tr
                    key={indx}
                    className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          onChange={onSelect(item)}
                          id={`${indx}`}
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 transition-all focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                          checked={selectedItems.includes(item)}
                        />
                        <label
                          htmlFor={`${indx}`}
                          className="sr-only">
                          checkbox
                        </label>
                      </div>
                    </td>
                    <th
                      scope="row"
                      className="flex items-center whitespace-nowrap px-6 py-4 text-gray-900 dark:text-white">
                      <img
                        className="h-10 w-10 rounded-full"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"
                        alt="Jese image"
                      />
                      <div className="pl-3">
                        <div className="text-base font-semibold">{item.email}</div>
                        <div className="font-normal text-gray-500">{item.email}</div>
                      </div>
                    </th>
                    <td className="space-x-2 px-6 py-4">
                      {item.roles.map((role) => (
                        <span key={role.id}>{role.name}</span>
                      ))}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div
                          className={clsx("mr-2 h-2.5 w-2.5 rounded-full", {
                            "bg-green-500": item.isActivated,
                            "bg-red-500": !item.isActivated,
                          })}></div>
                        <span>{item.isActivated ? "true" : "false"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`${router.pathname}/${item.id}/update`}
                        className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                        Редактировать
                      </Link>
                      {" | "}
                      <button
                        onClick={onDeleteItem}
                        className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                        Удалить
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      <AdminPagination
        currentPage={page}
        meta={items.meta}
      />
    </>
  )
}
