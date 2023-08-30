import { ChangeEvent, FC, useState } from "react"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import Link from "next/link"
import { ModalStore, modalStoreToggle } from "@/src/shared/store/modalStore"

interface ComponentProps {}

const Folders = () => {
  return (
    <div className="mb-10 grid gap-[16px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 5 }).map((_item, indx) => (
        <div key={indx} className="relative h-[100px] rounded-md border-2 border-gray-200 bg-white"></div>
      ))}
    </div>
  )
}

export const DashboardMedia: FC<ComponentProps> = () => {
  const allAvailableItems = Array.from({ length: 7 }).map((_item, indx) => `${indx}`)
  const [allItems, allItemsSet] = useState(allAvailableItems)
  const [animationParent] = useAutoAnimate()
  const [selectedItems, selectedItemsSet] = useState<string[]>([])

  const onSelect = (item: string) => (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked
    selectedItemsSet((prevItems) => {
      if (isChecked) {
        return [...prevItems, item]
      } else {
        return prevItems.filter((item) => item !== item)
      }
    })
  }

  const onSelectAll = () => {
    if (allItems.length !== selectedItems.length) {
      selectedItemsSet(allItems)
    } else {
      selectedItemsSet([])
    }
  }

  const onDeleteHandler = () => {
    ModalStore.update((store) => {
      store.modalStoreTitle = "Удалить?"
      store.modalStoreConfirm = async () => {
        const filteredItems = allItems.filter((item: string) => !selectedItems.some((sel) => sel === item))
        console.log(filteredItems)
        allItemsSet(filteredItems)
        selectedItemsSet([])
      }
    })
    modalStoreToggle(true)
  }

  const renderActions = () => {
    if (selectedItems.length === 0) return null
    return (
      <div className="mr-2 flex items-center space-x-2 whitespace-nowrap">
        <button
          onClick={onDeleteHandler}
          className="inline-flex items-center rounded-lg border border-red-300 bg-white px-3 py-1.5 text-sm font-medium text-red-500 hover:bg-red-100 focus:outline-none focus:ring-4 focus:ring-red-200 dark:border-red-600 dark:bg-red-800 dark:text-red-400 dark:hover:border-red-600 dark:hover:bg-red-700 dark:focus:ring-red-700"
          type="button">
          <span className="sr-only">Удалить</span>Удалить
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-4 flex items-center space-x-2">
        <button
          onClick={onSelectAll}
          className="inline-flex items-center rounded-lg border border-blue-300 bg-white px-3 py-1.5 text-sm font-medium text-blue-500 hover:bg-blue-100 focus:outline-none focus:ring-4 focus:ring-blue-200 dark:border-blue-600 dark:bg-blue-800 dark:text-blue-400 dark:hover:border-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-700"
          type="button">
          <span className="sr-only">Выделить все</span>Выделить все
        </button>
        {renderActions()}
      </div>

      <div className="grid gap-[16px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {allItems.map((_item, indx) => {
          return (
            <div ref={animationParent}
              key={indx}
              className="group relative aspect-square object-cover overflow-hidden rounded-md border border-gray-200 transition-all">
              <img
                src="https://fakeimg.pl/200x100/?retina=1&text=こんにちは&font=noto"
                className="absolute inset-0 h-full w-full"
                alt=""
              />
              <input
                id={`${indx}`}
                type="checkbox"
                checked={selectedItems.includes(`${indx}`)}
                onChange={onSelect(`${indx}`)}
                className="absolute left-3 top-3 h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 transition-all focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <label
                htmlFor={`${indx}`}
                className="absolute inset-0 h-full w-full"></label>

              <div className="pointer-events-none absolute bottom-2 left-2 right-2 flex flex-col rounded-lg bg-white/50 p-2 text-sm backdrop-blur-md">
                <span>({indx}) Avatar 43.png</span>
                <span>PNG - 128✕128</span>
                <span>IMAGE</span>
              </div>
            </div>
          )
        })}
      </div>
      <nav
        className="flex flex-col items-start justify-between space-y-3 p-4 md:flex-row md:items-center md:space-y-0"
        aria-label="Table navigation">
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Показано <span className="font-semibold text-gray-900 dark:text-white">1-10 </span>
          из <span className="font-semibold text-gray-900 dark:text-white">1000</span>
        </span>
        <ul className="inline-flex items-stretch -space-x-px">
          <li>
            <Link
              href="#"
              className="ml-0 flex h-full items-center justify-center rounded-l-lg border border-gray-300 bg-white px-3 py-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <span className="sr-only">Previous</span>
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"></path>
              </svg>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center justify-center border border-gray-300 bg-white px-3 py-2 text-sm leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              1
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center justify-center border border-gray-300 bg-white px-3 py-2 text-sm leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              2
            </Link>
          </li>
          <li>
            <Link
              href="#"
              aria-current="page"
              className="z-10 flex items-center justify-center border border-primary-300 bg-primary-50 px-3 py-2 text-sm leading-tight text-primary-600 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
              3
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center justify-center border border-gray-300 bg-white px-3 py-2 text-sm leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              ...
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center justify-center border border-gray-300 bg-white px-3 py-2 text-sm leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              100
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex h-full items-center justify-center rounded-r-lg border border-gray-300 bg-white px-3 py-1.5 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <span className="sr-only">Next</span>
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"></path>
              </svg>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
