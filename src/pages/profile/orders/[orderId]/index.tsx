import { ReactElement, useEffect, useState } from "react"
import { NextPageWithLayout } from "../../../_app"
import { SiteLayout } from "../../../../widgets/Layouts/SiteLayout"
import ProfileLayout from "@/src/widgets/Layouts/ProfileLayout"
import { GetServerSideProps } from "next"
import { ParsedUrlQuery } from "querystring"
import { OrderService } from "@/src/shared/http/services/orderService"
import OrderDetails from "@/src/widgets/Orders/OrderDetails"
import { GetAdByIdResponse } from "@/src/shared/http/services/orderService/types/getAdById"
import { ProfileStore } from "@/src/shared/store/profileStore"
import useGetRoles from "@/src/shared/hooks/useGetRoles"
import { AVAILABLE_USER_ROLES } from "@/src/shared/constants"
interface ParamProps extends ParsedUrlQuery {
  orderId: string
}
interface PageProps {
  orderId: string
}

const Page: NextPageWithLayout<PageProps> = ({ orderId }) => {
  const { data: userData } = ProfileStore.useState((store) => store)
  const [order, orderSet] = useState<GetAdByIdResponse | null | undefined>()
  const { isUser, isAgent, isAdmin } = useGetRoles()

  useEffect(() => {
    if (!userData) return
    if (userData.roles.includes(AVAILABLE_USER_ROLES.agent)) {
      try {
        OrderService.getAgentAdById(orderId).then((data) => orderSet(data.data))
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        OrderService.getAdById(orderId).then((data) => orderSet(data.data))
      } catch (error) {
        console.log(error)
      }
    }
  }, [userData, isAgent, isAdmin])

  return (
    <div>
      <h1 className="mb-6 text-lg font-bold">Заявка {order?._id}</h1>
      <OrderDetails
        routeToEddit={!isAdmin ? `/profile/orders/${order?._id}/update` : `/dashboard/orders/${order?._id}/update`}
        routeToEdditTitle="Редактировать"
        hideLink={isUser ? true : isAdmin ? false : false}
        hideRespondForm={isAdmin || isAgent}
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
