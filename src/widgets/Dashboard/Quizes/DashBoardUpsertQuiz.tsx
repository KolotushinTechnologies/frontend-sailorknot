import { ModalStore, modalStoreToggle } from "@/src/shared/store/modalStore"
import { Todo } from "@/src/shared/types/todo"
import { UISelect } from "@/src/shared/ui/Select"
import Link from "next/link"
import { ChangeEvent, FC, useState } from "react"

interface ComponentProps {
  title?: string
  item?: Todo | undefined
}

export const DashBoardUpsertQuiz: FC<ComponentProps> = ({ title = "Создать тест", item }) => {

  const [isDeleteChecked, isDeleteCheckedSet] = useState(false)
  const [selectedCategories, selectedCategoriesSet] = useState([])

  const onDeleteHandler = () => {
    if (!isDeleteChecked) return
    ModalStore.update((store) => {
      store.modalStoreTitle = "Удалить?"
      store.modalStoreConfirm = async () => console.log("Удалить да")
      store.modalStoreCancel = async () => console.log("Удалить нет")
    })
    modalStoreToggle(true)
  }
  const onCheckHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked
    if (isChecked) {
      isDeleteCheckedSet(true)
    } else {
      isDeleteCheckedSet(false)
    }
  }
  return (
    <div className="flex flex-col gap-7">
      <div className="grid gap-7 lg:grid-cols-2">
        <div className="rounded-2xl bg-lightwhite p-6 dark:bg-white/5">
          <h2 className="mb-4 text-lg font-semibold">{title}</h2>
          <div className="grid grid-flow-row gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="relative rounded-lg border border-black/10 bg-white px-5 py-4 dark:border-white/10 dark:bg-white/5">
                <input
                  type="text"
                  placeholder="Заголовок"
                  defaultValue={item ? item.todo : ""}
                  className="form-input"
                />
              </div>

              <div className="relative rounded-lg border border-black/10 bg-white px-5 py-4 dark:border-white/10 dark:bg-white/5">
                <input
                  type="text"
                  placeholder="Слаг"
                  defaultValue={item ? item.todo : ""}
                  className="form-input"
                />
              </div>
            </div>

            <div className="relative rounded-lg border border-black/10 bg-white px-5 py-4 dark:border-white/10 dark:bg-white/5">
              <label className="mb-1 block text-xs text-black/40 dark:text-white/40">Описание</label>
              <input
                type="text"
                defaultValue={item ? item.todo : ""}
                placeholder="Описание"
                className="form-input"
              />
            </div>

            <div className="relative rounded-lg border border-black/10 bg-white px-5 py-4 dark:border-white/10 dark:bg-white/5">
              <label className="mb-1 block text-xs text-black/40 dark:text-white/40">Описание</label>
              <input
                type="text"
                placeholder="Описание"
                className="form-input"
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-lightwhite p-6 dark:bg-white/5">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <h2 className="text-sm font-semibold">Удалить тест</h2>
            <button
              disabled={!onDeleteHandler}
              onClick={onDeleteHandler}
              className="btn rounded-md bg-lightred px-2 py-[5px] text-xs text-white">
              Удалить тест
            </button>
          </div>
          <div className="mb-5 flex items-start gap-1 rounded-lg bg-lightpurple-100/50 p-4 dark:bg-white/5">
            <div className="flex-none">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 1.875C10 1.875 11.6526 1.875 13.1628 2.51376C13.1628 2.51376 14.621 3.13053 15.7452 4.25476C15.7452 4.25476 16.8695 5.37899 17.4862 6.83719C17.4862 6.83719 18.125 8.34739 18.125 10C18.125 10 18.125 11.6526 17.4862 13.1628C17.4862 13.1628 16.8695 14.621 15.7452 15.7452C15.7452 15.7452 14.621 16.8695 13.1628 17.4862C13.1628 17.4862 11.6526 18.125 10 18.125C10 18.125 8.34739 18.125 6.83719 17.4862C6.83719 17.4862 5.37899 16.8695 4.25476 15.7452C4.25476 15.7452 3.13053 14.621 2.51376 13.1628C2.51376 13.1628 1.875 11.6526 1.875 10C1.875 10 1.875 8.34739 2.51376 6.83719C2.51376 6.83719 3.13053 5.37899 4.25476 4.25476C4.25476 4.25476 5.37899 3.13053 6.83719 2.51376C6.83719 2.51376 8.34739 1.875 10 1.875ZM10 3.125C10 3.125 8.60087 3.125 7.32413 3.66501C7.32413 3.66501 6.09047 4.18681 5.13864 5.13864C5.13864 5.13864 4.18681 6.09047 3.66502 7.32413C3.66502 7.32413 3.125 8.60087 3.125 10C3.125 10 3.125 11.3991 3.66502 12.6759C3.66502 12.6759 4.18681 13.9095 5.13864 14.8614C5.13864 14.8614 6.09047 15.8132 7.32413 16.335C7.32413 16.335 8.60087 16.875 10 16.875C10 16.875 11.3991 16.875 12.6759 16.335C12.6759 16.335 13.9095 15.8132 14.8614 14.8614C14.8614 14.8614 15.8132 13.9095 16.335 12.6759C16.335 12.6759 16.875 11.3991 16.875 10C16.875 10 16.875 8.60087 16.335 7.32413C16.335 7.32413 15.8132 6.09047 14.8614 5.13864C14.8614 5.13864 13.9095 4.18681 12.6759 3.66501C12.6759 3.66501 11.3991 3.125 10 3.125Z"
                  fill="currentcolor"></path>
                <path
                  d="M9.375 6.25V10.625C9.375 10.9702 9.65482 11.25 10 11.25C10.3452 11.25 10.625 10.9702 10.625 10.625V6.25C10.625 5.90482 10.3452 5.625 10 5.625C9.65482 5.625 9.375 5.90482 9.375 6.25Z"
                  fill="currentcolor"></path>
                <path
                  d="M10.9375 13.4375C10.9375 13.9553 10.5177 14.375 10 14.375C9.48227 14.375 9.0625 13.9553 9.0625 13.4375C9.0625 12.9197 9.48227 12.5 10 12.5C10.5177 12.5 10.9375 12.9197 10.9375 13.4375Z"
                  fill="currentcolor"></path>
              </svg>
            </div>
            <div>
              <p className="text-xs">Вы удаляете тест</p>
              <p className="text-xs text-black/40 dark:text-white/40">
                После удаления, невозможно восстановить{" "}
                <Link
                  href="/"
                  className="text-lightpurple-300">
                  Больше информации
                </Link>
              </p>
            </div>
          </div>
          <div className="flex items-center pl-5">
            <input
              id="phone7"
              type="checkbox"
              checked={isDeleteChecked}
              onChange={onCheckHandler}
              className="h-[18px] w-[18px] rounded border-black/20 bg-white text-black focus:outline-0 focus:outline-offset-0 focus:ring-0 focus:ring-offset-0 dark:border-white/20 dark:bg-transparent dark:text-white/20"
            />
            <label
              htmlFor="phone7"
              className="ml-3">
              Я подтверждаю удаление
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
