import { ReactElement } from "react"
import { NextPageWithLayout } from "../../_app"
import { SiteLayout } from "../../../widgets/Layouts/SiteLayout"
import ProfileLayout from "@/src/widgets/Layouts/ProfileLayout"
import OrderItem from "@/src/widgets/Orders/OrderItem"
import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"
import { GetAllResponse } from "@/src/shared/http/services/orderService/types/getAll"
import { OrderService } from "@/src/shared/http/services/orderService"

interface ParamProps extends ParsedUrlQuery {
  userId: string
}

interface PageProps {
  orders: GetAllResponse[]
}

const Page: NextPageWithLayout<PageProps> = ({ orders }) => {
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

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  const orders = OrderService.getAll()
  return { props: { orders } }
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <SiteLayout>
      <ProfileLayout>{page}</ProfileLayout>
    </SiteLayout>
  )
}

export default Page
