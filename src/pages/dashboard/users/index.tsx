import { ReactElement } from "react"
import DashboardLayout from "@/src/widgets/Layouts/DashboardLayout"
import { NextPageWithLayout } from "@/pages/_app"
import { DashBoardAllUsers } from "@/src/widgets/Dashboard/Users/DashBoardAllUsers"

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
    <DashboardLayout>{page}</DashboardLayout>
  )
}

export default Page