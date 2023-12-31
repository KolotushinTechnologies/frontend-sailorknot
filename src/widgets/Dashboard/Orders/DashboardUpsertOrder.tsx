import { ModalStore, modalStoreToggle } from "@/src/shared/store/modalStore"
import clsx from "clsx"
import Link from "next/link"
import { useRouter } from "next/router"
import { ChangeEvent, FC, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { OrderService } from "@/src/shared/http/services/orderService"
import { CreateAdRequest } from "@/src/shared/http/services/orderService/types/createAd"
import { GetAllAdsResponse } from "@/src/shared/http/services/orderService/types/getAllAds"
import { UpdateAdByIdRequest } from "@/src/shared/http/services/orderService/types/updateAdById"
import { ProfileStore } from "@/src/shared/store/profileStore"
import { GetUserResponsesResponse } from "@/src/shared/http/services/orderService/types/getUserResponses"
import useLoading from "@/src/shared/hooks/useLoading"
import LoadingSpinner from "@/src/shared/ui/Loader/LoadingSpinner"
import { formatDate } from "@/src/shared/helpers/formatDate"
import useGetRoles from "@/src/shared/hooks/useGetRoles"
import { AVAILABLE_USER_ROLES } from "@/src/shared/constants"

interface ComponentProps {
  orderId: string | undefined
  navigateToAfterSubmit: string
}

interface FormProps extends CreateAdRequest { }

export const DashboardUpsertOrder: FC<ComponentProps> = ({ orderId, navigateToAfterSubmit }) => {
  const router = useRouter()

  const { loading, updLoading } = useLoading({})
  const { data: profileData } = ProfileStore.useState((store) => store)
  const [isDeleteChecked, isDeleteCheckedSet] = useState(false)
  const [item, itemSet] = useState<GetAllAdsResponse | null>(null)
  const { isAdmin, isAgent } = useGetRoles()
  const [orderResponses, setOrderResponses] = useState<GetUserResponsesResponse[]>([])

  const onDeleteHandler = () => {
    if (!item || !isDeleteChecked) return
    ModalStore.update((store) => {
      store.modalStoreTitle = "Удалить?"
      store.modalStoreConfirm = async () => {
        try {
          const deletedItem = await OrderService.deleteAdById(item._id)
          toast.success(`Успешно удалено`)
          router.push(navigateToAfterSubmit)
        } catch (error) {
          toast.error("Ошибка во время удаления")
        } finally {
          modalStoreToggle(false)
        }
      }
      store.modalStoreCancel = async () => console.log("Удалить нет")
    })
    modalStoreToggle(true)
  }

  const {
    register,
    setValue: formSetValue,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormProps>()

  const onCheckHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked
    if (isChecked) {
      isDeleteCheckedSet(true)
    } else {
      isDeleteCheckedSet(false)
    }
  }

  const createForm = useForm<CreateAdRequest>({})
  const updateForm = useForm<UpdateAdByIdRequest>({
    defaultValues: {
      ad_id: !item ? "" : item._id,
      title: !item ? "" : item.title,
      companyName: !item ? "" : item.companyName,
      ship: !item ? "" : item.ship,
      typeOfFishing: !item ? "" : item.typeOfFishing,
      flightDuration: !item ? "" : item.flightDuration,
      jobTitle: !item ? "" : item.jobTitle,
      salaryPerMonth: !item ? "" : item.salaryPerMonth,
      description: !item ? "" : item.description,
    },
  })

  const onSubmitCreate = createForm.handleSubmit(async (data) => {
    try {
      const { data: createdAd } = await OrderService.createAd(data)
      toast.success("Успешно создано")
      router.push(navigateToAfterSubmit)
    } catch (error) {
      console.log(error)
      toast.error("Ошибка")
    }
  })

  const onSubmitUpdate = updateForm.handleSubmit(async (data) => {
    try {
      const { data: updatedAd } = await OrderService.updateAdById(data.ad_id, data)
      toast.success("Успешно обновлено")
    } catch (error) {
      console.log(error)
      toast.error("Ошибка")
    }
  })

  useEffect(() => {
    if (!orderId || !profileData) return
    if (profileData.roles.includes(AVAILABLE_USER_ROLES.agent)) {
      OrderService.getAgentAdById(`${orderId}`).then((data) => {
        itemSet(data.data)
        updateForm.setValue("ad_id", data.data._id)
        updateForm.setValue("title", data.data.title)
        updateForm.setValue("companyName", data.data.companyName)
        updateForm.setValue("ship", data.data.ship)
        updateForm.setValue("typeOfFishing", data.data.typeOfFishing)
        updateForm.setValue("flightDuration", data.data.flightDuration)
        updateForm.setValue("jobTitle", data.data.jobTitle)
        updateForm.setValue("salaryPerMonth", data.data.salaryPerMonth)
        updateForm.setValue("description", data.data.description)
      })
    } else {
      OrderService.getAdById(`${orderId}`).then((data) => {
        itemSet(data.data)
        updateForm.setValue("ad_id", data.data._id)
        updateForm.setValue("title", data.data.title)
        updateForm.setValue("companyName", data.data.companyName)
        updateForm.setValue("ship", data.data.ship)
        updateForm.setValue("typeOfFishing", data.data.typeOfFishing)
        updateForm.setValue("flightDuration", data.data.flightDuration)
        updateForm.setValue("jobTitle", data.data.jobTitle)
        updateForm.setValue("salaryPerMonth", data.data.salaryPerMonth)
        updateForm.setValue("description", data.data.description)
      })
    }
  }, [orderId, profileData])

  useEffect(() => {
    if (!profileData || !orderId || !orderId.length) return
    if (profileData.roles.includes(AVAILABLE_USER_ROLES.agent)) {
      OrderService.getAgentResponses({ ad_id: orderId }).then(({ data }) => setOrderResponses(data))
    } else {
      OrderService.getUserResponses({ ad_id: orderId }).then(({ data }) => setOrderResponses(data))
    }
  }, [orderId, profileData])

  return (
    <div className="grid gap-7">
      {!item ? (
        <form
          onSubmit={onSubmitCreate}
          className="flex flex-col gap-7">
          <div className="grid gap-7">
            <div className="rounded-2xl bg-lightwhite p-6 dark:bg-white/5">
              <h2 className="mb-4 text-lg font-semibold">Создать объявление</h2>
              <div className="grid grid-flow-row gap-4 lg:grid-cols-2">
                <div className="relative rounded-lg border border-black/10 bg-white px-5 py-4 dark:border-white/10 dark:bg-white/5">
                  <label className="mb-1 block text-xs text-black/40 dark:text-white/40">Заголовок</label>
                  <input
                    {...createForm.register("title", { required: true })}
                    type="text"
                    placeholder="Заголовок"
                    className="form-input"
                  />
                </div>

                <div className="relative rounded-lg border border-black/10 bg-white px-5 py-4 dark:border-white/10 dark:bg-white/5">
                  <label className="mb-1 block text-xs text-black/40 dark:text-white/40">Название компании</label>
                  <input
                    {...createForm.register("companyName", { required: true })}
                    type="text"
                    placeholder="Название компании"
                    className="form-input"
                  />
                </div>

                <div className="relative rounded-lg border border-black/10 bg-white px-5 py-4 dark:border-white/10 dark:bg-white/5">
                  <label className="mb-1 block text-xs text-black/40 dark:text-white/40">Судно</label>
                  <input
                    {...createForm.register("ship", { required: true })}
                    type="text"
                    placeholder="Судно"
                    className="form-input"
                  />
                </div>

                <div className="relative rounded-lg border border-black/10 bg-white px-5 py-4 dark:border-white/10 dark:bg-white/5">
                  <label className="mb-1 block text-xs text-black/40 dark:text-white/40">Вид промысла</label>
                  <input
                    {...createForm.register("typeOfFishing", { required: true })}
                    type="text"
                    placeholder="Вид промысла"
                    className="form-input"
                  />
                </div>

                <div className="relative rounded-lg border border-black/10 bg-white px-5 py-4 dark:border-white/10 dark:bg-white/5">
                  <label className="mb-1 block text-xs text-black/40 dark:text-white/40">Продолжительность рейса</label>
                  <input
                    {...createForm.register("flightDuration", { required: true })}
                    type="text"
                    placeholder="Продолжительность рейса"
                    className="form-input"
                  />
                </div>

                <div className="relative rounded-lg border border-black/10 bg-white px-5 py-4 dark:border-white/10 dark:bg-white/5">
                  <label className="mb-1 block text-xs text-black/40 dark:text-white/40">Должность</label>
                  <input
                    {...createForm.register("jobTitle", { required: true })}
                    type="text"
                    placeholder="Должность"
                    className="form-input"
                  />
                </div>

                <div className="relative rounded-lg border border-black/10 bg-white px-5 py-4 dark:border-white/10 dark:bg-white/5">
                  <label className="mb-1 block text-xs text-black/40 dark:text-white/40">Заработная плата</label>
                  <input
                    {...createForm.register("salaryPerMonth", { required: true })}
                    type="text"
                    placeholder="Заработная плата"
                    className="form-input"
                  />
                </div>

                <div className="relative rounded-lg border border-black/10 bg-white px-5 py-4 dark:border-white/10 dark:bg-white/5">
                  <label className="mb-1 block text-xs text-black/40 dark:text-white/40">Описание</label>
                  <textarea
                    {...createForm.register("description", { required: false })}
                    placeholder="Описание"
                    className="form-input max-h-[1000px] min-h-[100px]"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg border border-black bg-black px-4 py-2 text-lg font-semibold text-white transition-all duration-300 hover:bg-transparent hover:text-black dark:border-lightpurple-200 dark:bg-lightpurple-200 dark:text-black dark:hover:bg-transparent dark:hover:text-white">
            <span>{!item ? "Создать" : "Обновить"}</span>
          </button>
        </form>
      ) : (
        <form
          onSubmit={onSubmitUpdate}
          className="flex flex-col gap-7">
          <div className="grid gap-7">
            <div className="rounded-2xl bg-lightwhite p-6 dark:bg-white/5">
              <h2 className="mb-4 text-lg font-semibold">{item ? `Обновить объявление ${item._id}` : "Создать объявление"}</h2>
              <div className="grid grid-flow-row gap-4 lg:grid-cols-2">
                <div className="relative rounded-lg border border-black/10 bg-white px-5 py-4 dark:border-white/10 dark:bg-white/5">
                  <label className="mb-1 block text-xs text-black/40 dark:text-white/40">Заголовок</label>
                  <input
                    {...updateForm.register("title", { required: true })}
                    type="text"
                    placeholder="Заголовок"
                    className="form-input"
                  />
                </div>

                <div className="relative rounded-lg border border-black/10 bg-white px-5 py-4 dark:border-white/10 dark:bg-white/5">
                  <label className="mb-1 block text-xs text-black/40 dark:text-white/40">Название компании</label>
                  <input
                    {...updateForm.register("companyName", { required: true })}
                    type="text"
                    placeholder="Название компании"
                    className="form-input"
                  />
                </div>

                <div className="relative rounded-lg border border-black/10 bg-white px-5 py-4 dark:border-white/10 dark:bg-white/5">
                  <label className="mb-1 block text-xs text-black/40 dark:text-white/40">Судно</label>
                  <input
                    {...updateForm.register("ship", { required: true })}
                    type="text"
                    placeholder="Судно"
                    className="form-input"
                  />
                </div>

                <div className="relative rounded-lg border border-black/10 bg-white px-5 py-4 dark:border-white/10 dark:bg-white/5">
                  <label className="mb-1 block text-xs text-black/40 dark:text-white/40">Вид промысла</label>
                  <input
                    {...updateForm.register("typeOfFishing", { required: true })}
                    type="text"
                    placeholder="Вид промысла"
                    className="form-input"
                  />
                </div>

                <div className="relative rounded-lg border border-black/10 bg-white px-5 py-4 dark:border-white/10 dark:bg-white/5">
                  <label className="mb-1 block text-xs text-black/40 dark:text-white/40">Продолжительность рейса</label>
                  <input
                    {...updateForm.register("flightDuration", { required: true })}
                    type="text"
                    placeholder="Продолжительность рейса"
                    className="form-input"
                  />
                </div>

                <div className="relative rounded-lg border border-black/10 bg-white px-5 py-4 dark:border-white/10 dark:bg-white/5">
                  <label className="mb-1 block text-xs text-black/40 dark:text-white/40">Должность</label>
                  <input
                    {...updateForm.register("jobTitle", { required: true })}
                    type="text"
                    placeholder="Должность"
                    className="form-input"
                  />
                </div>

                <div className="relative rounded-lg border border-black/10 bg-white px-5 py-4 dark:border-white/10 dark:bg-white/5">
                  <label className="mb-1 block text-xs text-black/40 dark:text-white/40">Заработная плата</label>
                  <input
                    {...updateForm.register("salaryPerMonth", { required: true })}
                    type="text"
                    placeholder="Заработная плата"
                    className="form-input"
                  />
                </div>

                <div className="relative rounded-lg border border-black/10 bg-white px-5 py-4 dark:border-white/10 dark:bg-white/5">
                  <label className="mb-1 block text-xs text-black/40 dark:text-white/40">Описание</label>
                  <textarea
                    {...updateForm.register("description", { required: true })}
                    placeholder="Описание"
                    className="form-input max-h-[1000px] min-h-[100px]"
                  />
                </div>

                <div className="relative rounded-lg border border-black/10 bg-white px-5 py-4 dark:border-white/10 dark:bg-white/5">
                  <label className="mb-1 block text-xs text-black/40 dark:text-white/40">Отклики ({orderResponses.length})</label>
                  <div>
                    {!orderResponses.length
                      ? null
                      : orderResponses
                        .sort((a, b) => {
                          const dateA = new Date(a.createdAt)
                          const dateB = new Date(b.createdAt)
                          // @ts-ignore
                          return dateB - dateA
                        })
                        .map((item) => {
                          return (
                            <div
                              key={item._id}
                              className="border-b border-gray-200 py-6 text-base last:border-b-0 last:pb-0 dark:border-gray-700 dark:bg-gray-900">
                              <div className="mb-2 flex items-center justify-between">
                                <div className="flex items-center">
                                  <p className="mr-3 inline-flex items-center space-x-2 text-sm font-semibold text-gray-900 dark:text-white">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1}
                                      stroke="currentColor"
                                      className="h-6 w-6 text-gray-500">
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                                      />
                                    </svg>
                                    <span>{item.user.name}</span>
                                  </p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    <time
                                      dateTime="2022-06-23"
                                      title="June 23rd, 2022">
                                      {formatDate(item.createdAt)}
                                    </time>
                                  </p>
                                </div>
                              </div>
                              <p className="text-gray-500 dark:text-gray-400">{item.description}</p>
                              <div className="border-gray-500 mt-5 border-2 rounded-lg p-5">
                                <h4>Информация:</h4>
                                <div className="text-gray-500 mt-2 dark:text-gray-400">
                                  ФИО: <span className="text-black">{item.user.lastname} {item.user.name} {item.user.surname}</span>
                                </div>
                                <div className="text-gray-500 mt-2 dark:text-gray-400">
                                  Дата рождения: <span className="text-black">{item.user.dateBirth}</span>
                                </div>
                                <div className="text-gray-500 mt-2 dark:text-gray-400">
                                  Должность: <span className="text-black">{item.user.speciality}</span>
                                </div>
                                <div className="text-gray-500 mt-2 dark:text-gray-400">
                                  Город: <span className="text-black">{item.user.city}</span>
                                </div>
                                <div className="text-gray-500 mt-2 dark:text-gray-400">
                                  Телефон: <span className="text-black">{item.user.phoneNumber}</span>
                                </div>
                                <div className="text-gray-500 mt-2 dark:text-gray-400">
                                  Документы: {item.user.documents.map(item => {
                                    return (
                                      <>
                                        <Link target="_blank" href={item.link} className="text-blue-500">{item.name + " "}</Link>
                                      </>
                                    )
                                  })}
                                </div>
                              </div>
                            </div>
                          )
                        })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg border border-black bg-black px-4 py-2 text-lg font-semibold text-white transition-all duration-300 hover:bg-transparent hover:text-black dark:border-lightpurple-200 dark:bg-lightpurple-200 dark:text-black dark:hover:bg-transparent dark:hover:text-white">
            <span>Обновить</span>
          </button>
        </form>
      )}

      <div
        className={clsx("rounded-2xl bg-lightwhite p-6 dark:bg-white/5", {
          hidden: !item,
          block: item,
        })}>
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <h2 className="text-sm font-semibold">Удалить заявку</h2>
          <button
            type="button"
            disabled={!onDeleteHandler}
            onClick={onDeleteHandler}
            className="btn rounded-md bg-lightred px-2 py-[5px] text-xs text-white">
            Удалить заявку
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
            <p className="text-xs">Вы удаляете завку</p>
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
  )
}
