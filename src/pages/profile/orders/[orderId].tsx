import { ReactElement, useEffect, useState } from "react"
import { NextPageWithLayout } from "../../_app"
import { SiteLayout } from "../../../widgets/Layouts/SiteLayout"
import ProfileLayout from "@/src/widgets/Layouts/ProfileLayout"
import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"
import { OrderService } from "@/src/shared/http/services/orderService"
import { GetOneResponse } from "@/src/shared/http/services/orderService/types/getOne"
import OrderDetails from "@/src/widgets/Orders/OrderDetails"
import { GetAdByIdResponse } from "@/src/shared/http/services/orderService/types/getAdById"

interface ParamProps extends ParsedUrlQuery {
  orderId: string
}

interface PageProps {
  orderId: string
}

const Page: NextPageWithLayout<PageProps> = ({ orderId }) => {
  const [order, orderSet] = useState<GetAdByIdResponse | null | undefined>()
  useEffect(() => {
    try {
      OrderService.getAdById(orderId).then((data) => orderSet(data.data))
    } catch (error) {
      console.log(error)
    }
  }, [])
  return (
    <div>
      <h1 className="mb-6 text-lg font-bold">Заявка {order?._id}</h1>
      <OrderDetails
        hideLink={true}
        order={order}
      />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<PageProps> = async ({ query }) => {
  const { orderId } = query as ParamProps
  return { props: { orderId } }
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <SiteLayout>
      <ProfileLayout>{page}</ProfileLayout>
    </SiteLayout>
  )
}

export default Page
