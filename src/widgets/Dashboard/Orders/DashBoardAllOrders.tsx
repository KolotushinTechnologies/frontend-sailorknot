import { ChangeEvent, FC, useEffect } from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { ModalStore, modalStoreToggle } from "@/src/shared/store/modalStore"
import clsx from "clsx"
import toast from "react-hot-toast"
import useGetUsers from "@/src/shared/hooks/useGetUsers"
import { ProfileStore } from "@/src/shared/store/profileStore"
import { GetAllResponse } from "@/src/shared/http/services/orderService/types/getAllAds"
import { OrderService } from "@/src/shared/http/services/orderService"
import useGetOrders from "@/src/shared/hooks/useGetOrders"

interface ComponentProps {
  page: number
  take: number
  orderBy: string
}

export const DashBoardAllOrders: FC<ComponentProps> = ({ page }) => {
  const { data: profile } = ProfileStore.useState((store) => store)
  const [animationParent] = useAutoAnimate()
  const router = useRouter()
  const headerTable = ["Заголовок", "Компания", "Цена", "Действия"]

  const [selectedItems, selectedItemsSet] = useState<GetAllResponse[]>([])
  const [currentItem, currentItemSet] = useState<GetAllResponse | null>(null)

  //   TODO: Добавить получение заявок
  const { orders: items, loading, updOrders } = useGetOrders()
  const [filter, filterSet] = useState("")

  const onChangeFilter = (event: ChangeEvent<HTMLInputElement>) => filterSet(event.target.value.toLowerCase())
  const onClearFilter = () => filterSet("")

  const onSelect = (item: GetAllResponse) => (e: ChangeEvent<HTMLInputElement>) => {
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
      selectedItemsSet(items)
    } else {
      selectedItemsSet([])
    }
  }

  // TODO: Add if need
  // const onArhivateItem = () => {
  //   ModalStore.update((store) => {
  //     store.modalStoreTitle = `В архив ${selectedItems.length} шт.?`
  //     store.modalStoreConfirm = async () => console.log("В архив да")
  //     store.modalStoreCancel = async () => console.log("В архив нет")
  //   })
  //   modalStoreToggle(true)
  // }

  const onDeleteItem = (item: null | GetAllResponse) => async (e: any) => {
    modalStoreToggle(true)
    if (item) {
      ModalStore.update((store) => {
        store.modalStoreTitle = `Удалить ${item.id}?`
        store.modalStoreConfirm = async () => {
          try {
            const deletedItems = await OrderService.deleteOne(item.id)
            toast.success(`Успешно удалено`)
            router.push("/dashboard/orders")
          } catch (error) {
            toast.error("Ошибка во время удаления")
          } finally {
            updOrders()
            selectedItemsSet([])
            modalStoreToggle(false)
          }
        }

        store.modalStoreCancel = async () => {
          modalStoreToggle(false)
        }
      })
    }
    if (!item) {
      ModalStore.update((store) => {
        store.modalStoreTitle = `Удалить ${selectedItems.length} ?`
        store.modalStoreConfirm = async () => {
          try {
            const deletedItems = await Promise.allSettled(selectedItems.map(({ id }) => OrderService.deleteOne(id)))

            toast.success(`Успешно удалено ${deletedItems.length} шт.`)
          } catch (error) {
            toast.error("Ошибка во время удаления")
          } finally {
            updOrders()
            selectedItemsSet([])
            modalStoreToggle(false)
          }
        }

        store.modalStoreCancel = async () => {
          modalStoreToggle(false)
        }
      })
    }
  }

  const renderActions = () => {
    if (selectedItems.length === 0) return null
    return (
      <div className="mr-2 flex items-center space-x-2 whitespace-nowrap">
        <button
          onClick={onDeleteItem(null)}
          className="inline-flex items-center rounded-lg border border-red-300 bg-white px-3 py-1.5 text-sm font-medium text-red-500 hover:bg-red-100 focus:outline-none focus:ring-4 focus:ring-red-200 dark:border-red-600 dark:bg-red-800 dark:text-red-400 dark:hover:border-red-600 dark:hover:bg-red-700 dark:focus:ring-red-700"
          type="button">
          <span className="sr-only">Удалить</span>Удалить
        </button>
        {/* TODO: Add if need */}
        {/* <button
          onClick={onArhivateItem}
          className="inline-flex items-center rounded-lg border border-yellow-300 bg-white px-3 py-1.5 text-sm font-medium text-yellow-500 hover:bg-yellow-100 focus:outline-none focus:ring-4 focus:ring-yellow-200 dark:border-yellow-600 dark:bg-yellow-800 dark:text-yellow-400 dark:hover:border-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-700"
          type="button">
          <span className="sr-only">В архив</span>В архив
        </button> */}
      </div>
    )
  }

  useEffect(() => {
    if (profile && items.length > 0) {
      const match = items.find((search) => search.id === profile._id)
      if (match) {
        currentItemSet(match)
      } else {
        currentItemSet(null)
      }
    }
  }, [items, profile])

  return (
    <>
      <div
        className="flex flex-col items-start justify-between space-y-3 p-2 md:flex-row md:items-center md:space-y-0"
        aria-label="Table navigation">
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Всего <span className="font-semibold text-gray-900 dark:text-white">{items.length}</span>
        </span>
      </div>
      <div
        ref={animationParent}
        className="text-left dark:border-white/10 dark:bg-white/5">
        <div className="table-responsive relative sm:rounded-lg">
          <div className="flex items-center bg-white p-2 pb-4 dark:bg-gray-900">
            <Link
              href="orders/create"
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
                onChange={onChangeFilter}
                value={filter}
                type="text"
                id="table-search-orders"
                className="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 pr-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Поиск"
              />
              <button
                onClick={onClearFilter}
                type="button"
                className="absolute inset-y-0 right-0 z-10 inline-flex w-[38px] items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={clsx("h-6 w-6 text-gray-500 transition-all duration-300 dark:text-gray-400", {
                    "pointer-events-none opacity-0": filter.length <= 0,
                    "pointer-events-all opacity-100": filter.length > 0,
                  })}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
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
                      checked={selectedItems.length === items?.length}
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
              {items
                .filter((item) => item.title.includes(filter))
                .map((item, indx) => {
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
                        <div className="text-base">{item.title}</div>
                      </th>

                      <td className="space-x-2 px-6 py-4">
                        <div className="text-base">{item.companyName}</div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="text-base">{item.salaryPerMonth}</div>
                      </td>

                      <td className="px-6 py-4">
                        <Link
                          href={`${router.pathname}/${item.id}/update`}
                          className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                          Редактировать
                        </Link>{" "}
                        <button
                          onClick={onDeleteItem(item)}
                          className={clsx("inline-block font-medium text-blue-600 transition-all hover:underline dark:text-blue-500", {
                            "sr-only pointer-events-none opacity-0": currentItem && currentItem.id === item.id,
                          })}>
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
      {/* <AdminPagination
        currentPage={page}
        meta={items.meta}
      /> */}
    </>
  )
}
