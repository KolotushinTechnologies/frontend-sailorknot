import { ReactElement } from "react"
import { GetServerSideProps } from "next"
import DashboardLayout from "@/src/widgets/Layouts/DashboardLayout"
import { NextPageWithLayout } from "@/pages/_app"
import { ParsedUrlQuery } from "querystring"
import { SiteLayout } from "@/src/widgets/Layouts/SiteLayout"
import { DashboardUpsertOrder } from "@/src/widgets/Dashboard/Orders/DashboardUpsertOrder"

interface PageProps {
  orderId: string | undefined
}

interface ParamProps extends ParsedUrlQuery {
  orderId: string | undefined
}

const Page: NextPageWithLayout<PageProps> = ({ orderId }) => {
  return <DashboardUpsertOrder orderId={orderId} />
}

export const getServerSideProps: GetServerSideProps<PageProps> = async ({ query, params }) => {
  const { orderId } = params as ParamProps
  return { props: { orderId } }
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <SiteLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </SiteLayout>
  )
}

export default Page
