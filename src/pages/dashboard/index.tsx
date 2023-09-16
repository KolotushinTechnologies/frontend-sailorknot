import { ReactElement } from "react"
import { NextPageWithLayout } from "../_app"
import { DashboardMain } from "@/src/widgets/Dashboard/DashboardMain"
import DashboardLayout from "@/src/widgets/Layouts/DashboardLayout"
import { SiteLayout } from "@/src/widgets/Layouts/SiteLayout"

interface PageProps {}

const Page: NextPageWithLayout<PageProps> = () => {
  return <DashboardMain />
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <SiteLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </SiteLayout>
  )
}

export default Page
