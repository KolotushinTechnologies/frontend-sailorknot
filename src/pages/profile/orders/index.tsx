import { ReactElement, useEffect, useState } from "react"
import { NextPageWithLayout } from "../../_app"
import { SiteLayout } from "../../../widgets/Layouts/SiteLayout"
import ProfileLayout from "@/src/widgets/Layouts/ProfileLayout"
import OrderItem from "@/src/widgets/Orders/OrderItem"
import { OrderService } from "@/src/shared/http/services/orderService"
import { GetAllAdsResponse } from "@/src/shared/http/services/orderService/types/getAllAds"

interface PageProps {}

const Page: NextPageWithLayout<PageProps> = () => {
  const [orders, ordersSet] = useState<GetAllAdsResponse[]>([])
  useEffect(() => {
    try {
      OrderService.getAllAds().then((data) => ordersSet(data.data))
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <div>
      <h1 className="mb-6 text-lg font-bold">Заявки</h1>
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
