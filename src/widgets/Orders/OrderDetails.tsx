import { AVAILABLE_USER_ROLES } from "@/src/shared/constants"
import { formatDate } from "@/src/shared/helpers/formatDate"
import useLoading from "@/src/shared/hooks/useLoading"
import { OrderService } from "@/src/shared/http/services/orderService"
import { CreateRespondBody } from "@/src/shared/http/services/orderService/types/createRespond"
import { GetAdByIdResponse } from "@/src/shared/http/services/orderService/types/getAdById"
import { GetUserResponsesResponse } from "@/src/shared/http/services/orderService/types/getUserResponses"
import { ProfileStore } from "@/src/shared/store/profileStore"
import LoadingSpinner from "@/src/shared/ui/Loader/LoadingSpinner"
import clsx from "clsx"
import Link from "next/link"
import React, { FC, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

interface ComponentProps {
  order: GetAdByIdResponse | null | undefined
  hideLink: boolean
  routeToEddit: string
  routeToEdditTitle: string
  hideRespondForm?: boolean
}

const OrderDetails: FC<ComponentProps> = ({ order, hideLink, routeToEddit, routeToEdditTitle = "Подробнее", hideRespondForm = false }) => {
  const { data: userData } = ProfileStore.useState((store) => store)
  const { loading, updLoading } = useLoading({})
  const [orderResponses, setOrderResponses] = useState<GetUserResponsesResponse[]>([])
  const [tigger, setTrigger] = useState(0)

  const upsertForm = useForm<CreateRespondBody>({
    mode: "onSubmit",
  })

  const onSubmit = upsertForm.handleSubmit(async (data) => {
    if (upsertForm.formState.errors.description && upsertForm.formState.errors.description.message) {
      return toast.error(upsertForm.formState.errors.description.message)
    }

    if (!order) return
    try {
      updLoading(true)
      await OrderService.createRespond({ ad_id: order._id }, { description: data.description })
      setTrigger(Date.now())
      toast.success("Успешно!")
      upsertForm.reset()
    } catch (error) {
      toast.error("Ошибка во время выполнения запроса")
    } finally {
      updLoading(false)
    }
  })

  useEffect(() => {
    if (!userData || !order) return
    try {
      if (userData.roles.includes(AVAILABLE_USER_ROLES.agent)) {
        OrderService.getAgentResponses({ ad_id: order._id }).then(({ data }) => setOrderResponses(data))
      } else {
        OrderService.getUserResponses({ ad_id: order._id }).then(({ data }) => setOrderResponses(data))
      }
    } catch (error) { }
  }, [order, tigger, userData])

  if (!order) return null

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 dark:border-gray-700 dark:bg-gray-800 md:p-12">
      <a
        href="#"
        className="mb-2 inline-flex items-center rounded-md bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-gray-700 dark:text-green-400">
        <svg
          className="mr-1.5 h-2.5 w-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 18">
          <path d="M17 11h-2.722L8 17.278a5.512 5.512 0 0 1-.9.722H17a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1ZM6 0H1a1 1 0 0 0-1 1v13.5a3.5 3.5 0 1 0 7 0V1a1 1 0 0 0-1-1ZM3.5 15.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM16.132 4.9 12.6 1.368a1 1 0 0 0-1.414 0L9 3.55v9.9l7.132-7.132a1 1 0 0 0 0-1.418Z"></path>
        </svg>
        {order.typeOfFishing}
      </a>
      <h2 className="mb-2 text-3xl font-extrabold text-gray-900 dark:text-white">{order.title}</h2>
      <div className="mb-4 space-y-1 text-lg font-normal text-gray-500 dark:text-gray-400">
        <p className="space-x-1">
          <span className="font-medium">Название компании:</span>
          <span>{order.companyName}</span>
        </p>
        <p className="space-x-1">
          <span className="font-medium">Судно:</span>
          <span>{order.ship}</span>
        </p>
        <p className="space-x-1">
          <span className="font-medium">Вид промысла:</span>
          <span>{order.typeOfFishing}</span>
        </p>
        <p className="space-x-1">
          <span className="font-medium">Продолжительность рейса:</span>
          <span>{order.flightDuration}</span>
        </p>
        <p className="space-x-1">
          <span className="font-medium">Должность:</span>
          <span>{order.jobTitle}</span>
        </p>
        <p className="space-x-1">
          <span className="font-medium">Заработная плата:</span>
          <span>{order.salaryPerMonth}</span>
        </p>
      </div>
      <p className="mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">{order.description}</p>
      <Link
        href={routeToEddit}
        className={clsx("inline-flex items-center text-lg font-medium text-blue-600 hover:underline dark:text-blue-500", {
          hidden: hideLink,
        })}>
        {routeToEdditTitle}
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
            d="M1 5h12m0 0L9 1m4 4L9 9"></path>
        </svg>
      </Link>
      <div className="space-y-2">
        <form
          className={clsx("", {
            hidden: hideRespondForm,
          })}>
          <label
            htmlFor="respond"
            className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Отклик
          </label>
          <div
            className={clsx("relative flex w-full flex-col space-y-2 lg:max-w-[50%]", {
              "cursor-not-allowed": loading,
            })}>
            <textarea
              {...upsertForm.register("description", {
                required: {
                  message: "Не меньше 10 символов!",
                  value: true,
                },
                minLength: 10,
              })}
              id="respond"
              className={clsx(
                "block max-h-[600px] min-h-[200px] w-full rounded-lg border border-gray-300 bg-white p-4 pb-[80px] text-sm text-gray-900 transition-all duration-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400",
                {
                  "focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500": !upsertForm.formState.errors.description,
                  "focus:border-red-500 focus:ring-red-500 dark:focus:border-red-500 dark:focus:ring-red-500": upsertForm.formState.errors.description,
                },
              )}
              placeholder="Не меньше 10 символов"
              required
            />
            <div className="ml-auto flex items-center space-x-2">
              <div
                className={clsx("", {
                  "opacity-0": !loading,
                  "opacity-100": loading,
                })}>
                <LoadingSpinner />
              </div>
              <button
                onClick={onSubmit}
                disabled={loading}
                type="button"
                className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Оставить отклик
              </button>
            </div>
          </div>
        </form>
        <div>
          <h2 className="mb-6 text-lg  font-bold text-gray-900 dark:text-white lg:text-2xl">Отклики ({orderResponses.length})</h2>
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
                    className="border-b border-gray-200 py-6 last:pb-0 text-base last:border-b-0 dark:border-gray-700 dark:bg-gray-900">
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
                          <span
                            className={clsx("", {
                              hidden: item.user._id !== userData?._id,
                            })}>
                            (Вы)
                          </span>
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
  )
}

export default OrderDetails
