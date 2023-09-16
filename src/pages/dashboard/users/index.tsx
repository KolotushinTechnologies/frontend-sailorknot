import { ReactElement } from "react"
import DashboardLayout from "@/src/widgets/Layouts/DashboardLayout"
import { NextPageWithLayout } from "@/pages/_app"
import { DashBoardAllUsers } from "@/src/widgets/Dashboard/Users/DashBoardAllUsers"
import { SiteLayout } from "@/src/widgets/Layouts/SiteLayout"

interface PageProps {
  page: number
  take: number
  orderBy: string
}

const Page: NextPageWithLayout<PageProps> = ({ page, take, orderBy }) => {
  return <DashBoardAllUsers page={page} take={take} orderBy={orderBy} />
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <SiteLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </SiteLayout>
  )
}

export default Page