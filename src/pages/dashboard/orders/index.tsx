import { ReactElement } from "react"
import DashboardLayout from "@/src/widgets/Layouts/DashboardLayout"
import { NextPageWithLayout } from "@/pages/_app"
import { SiteLayout } from "@/src/widgets/Layouts/SiteLayout"
import { DashBoardAllOrders } from "@/src/widgets/Dashboard/Orders/DashBoardAllOrders"

interface PageProps {
  page: number
  take: number
  orderBy: string
}

const Page: NextPageWithLayout<PageProps> = ({ page, take, orderBy }) => {
  return <DashBoardAllOrders page={page} take={take} orderBy={orderBy} />
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <SiteLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </SiteLayout>
  )
}

export default Page