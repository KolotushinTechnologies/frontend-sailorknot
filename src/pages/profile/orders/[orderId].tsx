import { ReactElement } from "react"
import { NextPageWithLayout } from "../../_app"
import { SiteLayout } from "../../../widgets/Layouts/SiteLayout"
import ProfileLayout from "@/src/widgets/Layouts/ProfileLayout"
import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"
import { OrderService } from "@/src/shared/http/services/orderService"
import { GetOneResponse } from "@/src/shared/http/services/orderService/types/getOne"
import OrderDetails from "@/src/widgets/Orders/OrderDetails"

interface ParamProps extends ParsedUrlQuery {
  orderId: string
}

interface PageProps {
  order: GetOneResponse
}

const Page: NextPageWithLayout<PageProps> = ({ order }) => {
  return (
    <div>
      <h1 className="mb-6 text-lg font-bold">Заявка {order.id}</h1>
      <OrderDetails order={order} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<PageProps> = async ({ query }) => {
  const { orderId } = query as ParamProps
  const order = OrderService.getOne(orderId)
  if (!order) {
    return {
      notFound: true,
    }
  }
  return { props: { order } }
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <SiteLayout>
      <ProfileLayout>{page}</ProfileLayout>
    </SiteLayout>
  )
}

export default Page
