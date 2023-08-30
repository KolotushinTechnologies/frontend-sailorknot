import { Meta } from "@/src/shared/types/meta"
import clsx from "clsx"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useState } from "react"

interface ComponentProps {
  meta: Meta
  currentPage: number
}

const AdminPagination = ({ meta, currentPage }: ComponentProps) => {
  const router = useRouter()
  const { page, pageCount } = meta
  const showDots = pageCount > 5

  const getPageLink = (pageNumber: number) => {
    return `${router.pathname}?page=${pageNumber}`
  }

  const getPageLinks = () => {
    const links = []
    // Previous Page Link
    if (page > 1) {
      links.push(
        <Link
          href={getPageLink(page - 1)}
          className="ml-0 flex h-8 items-center justify-center rounded-l-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          Назад
        </Link>,
      )
    }

    // Page Links
    for (let i = 1; i <= pageCount; i++) {
      if (!showDots || i === 1 || i === pageCount || Math.abs(i - page) <= 2) {
        links.push(
          <Link
            href={getPageLink(i)}
            className={clsx("flex h-8 items-center justify-center border border-gray-300 px-3 leading-tight dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white transition-all", {
              "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400": i !== currentPage,
              "bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:text-white": i === currentPage,
            })}>
            {i}
          </Link>,
        )
      } else if (showDots && Math.abs(i - page) === 3) {
        links.push(
          <span className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            ...
          </span>,
        )
      }
    }

    // Next Page Link
    if (page < pageCount) {
      links.push(
        <Link
          href={getPageLink(page + 1)}
          className="flex h-8 items-center justify-center rounded-r-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          Вперед
        </Link>,
      )
    }
    return links
  }

  return (
    <div
      className="flex flex-col items-start justify-between space-y-3 p-2 md:flex-row md:items-center md:space-y-0"
      aria-label="Table navigation">
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
        Показано <span className="font-semibold text-gray-900 dark:text-white">{meta.pageSize}</span> из <span className="font-semibold text-gray-900 dark:text-white">{meta.total}</span>
      </span>
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-sm">
          {getPageLinks().map((item, indx) => (
            <li key={indx}>{item}</li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default AdminPagination
