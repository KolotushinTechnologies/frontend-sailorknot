import { ReactElement } from "react"
import { SiteLayout } from "@/src/widgets/Layouts/SiteLayout"
import DashboardLayout from "@/src/widgets/Layouts/DashboardLayout"
import { DashboardUpsertUser } from "@/src/widgets/Dashboard/Users/DashboardUpsertUser"
import { NextPageWithLayout } from "@/pages/_app"

interface PageProps {}

const Page: NextPageWithLayout<PageProps> = () => {
  return <DashboardUpsertUser userId={undefined} />
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <SiteLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </SiteLayout>
  )
}

export default Page
