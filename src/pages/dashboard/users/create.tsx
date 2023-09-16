import { ReactElement } from "react"
import { SiteLayout } from "@/src/widgets/Layouts/SiteLayout"
import { GetServerSideProps } from "next"
import DashboardLayout from "@/src/widgets/Layouts/DashboardLayout"
import { DashboardUpsertUser } from "@/src/widgets/Dashboard/Users/DashboardUpsertUser"
import { NextPageWithLayout } from "@/pages/_app"

interface PageProps {
  data: any
}

const Page: NextPageWithLayout<PageProps> = () => {
  return <DashboardUpsertUser />
}

export const getServerSideProps: GetServerSideProps<PageProps> = async ({ query, params }) => {
  return { props: { data: "" } }
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <SiteLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </SiteLayout>
  )
}

export default Page
