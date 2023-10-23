import { ReactElement } from "react"
import { GetServerSideProps } from "next"
import DashboardLayout from "@/src/widgets/Layouts/DashboardLayout"
import { NextPageWithLayout } from "@/pages/_app"
import { ParsedUrlQuery } from "querystring"
import { DashboardUpsertUser } from "@/src/widgets/Dashboard/Users/DashboardUpsertUser"
import { SiteLayout } from "@/src/widgets/Layouts/SiteLayout"

interface PageProps {
  userId: string
}

interface ParamProps extends ParsedUrlQuery {
  userId: string
}

const Page: NextPageWithLayout<PageProps> = ({ userId }) => {
  return <DashboardUpsertUser />
}

export const getServerSideProps: GetServerSideProps<PageProps> = async ({ query, params }) => {
  const { userId } = params as ParamProps
  return { props: { userId } }
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <SiteLayout>
    <DashboardLayout>{page}</DashboardLayout>
  </SiteLayout>
  )
}

export default Page
