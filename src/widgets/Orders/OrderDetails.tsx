import { GetAdByIdResponse } from "@/src/shared/http/services/orderService/types/getAdById"
import clsx from "clsx"
import Link from "next/link"
import React, { FC } from "react"

interface ComponentProps {
  order: GetAdByIdResponse | null | undefined
  hideLink: boolean
  routeToEddit: string
  routeToEdditTitle: string
}

const OrderDetails: FC<ComponentProps> = ({ order, hideLink, routeToEddit, routeToEdditTitle="Подробнее" }) => {
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
      
    </div>
  )
}

export default OrderDetails
