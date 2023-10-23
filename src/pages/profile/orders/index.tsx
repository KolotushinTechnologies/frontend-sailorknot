import { ReactElement, useEffect, useState } from "react"
import { NextPageWithLayout } from "../../_app"
import { SiteLayout } from "../../../widgets/Layouts/SiteLayout"
import ProfileLayout from "@/src/widgets/Layouts/ProfileLayout"
import OrderItem from "@/src/widgets/Orders/OrderItem"
import { OrderService } from "@/src/shared/http/services/orderService"
import { GetAllAdsResponse } from "@/src/shared/http/services/orderService/types/getAllAds"
import { ProfileStore } from "@/src/shared/store/profileStore"
import Link from "next/link"

interface PageProps {}

const Page: NextPageWithLayout<PageProps> = () => {
  const { data } = ProfileStore.useState((store) => store)
  const [orders, ordersSet] = useState<GetAllAdsResponse[]>([])
  const [isAgent, isAgentSet] = useState(false)

  useEffect(() => {
    if (data) {
      if (data?.roles.includes("Agent")) {
        isAgentSet(true)
      } else {
        isAgentSet(false)
      }
    }
  }, [data])

  useEffect(() => {
    if (data?.roles.includes("Agent")) {
      try {
        OrderService.getAllAgentAds().then((data) => ordersSet(data.data))
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        OrderService.getAllAds().then((data) => ordersSet(data.data))
      } catch (error) {
        console.log(error)
      }
    }
  }, [data])

  return (
    <div className="space-y-6">
      <h1 className="text-lg font-bold">Заявки</h1>
      <Link
        href="/profile/orders/create"
        className="inline-block rounded-lg border border-black bg-black px-4 py-2 text-lg font-semibold text-white transition-all duration-300 hover:bg-transparent hover:text-black dark:border-lightpurple-200 dark:bg-lightpurple-200 dark:text-black dark:hover:bg-transparent dark:hover:text-white">
        Создать заявку
      </Link>
      <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
        {orders.map((order, indx) => {
          return (
            <OrderItem
              key={indx}
              order={order}
            />
          )
        })}
      </div>
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <SiteLayout>
      <ProfileLayout>{page}</ProfileLayout>
    </SiteLayout>
  )
}

export default Page
