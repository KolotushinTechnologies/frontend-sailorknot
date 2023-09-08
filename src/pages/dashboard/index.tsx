import { ReactElement } from "react"
import { NextPageWithLayout } from "../_app"
import { DashboardMain } from "@/src/widgets/Dashboard/DashboardMain"
import DashboardLayout from "@/src/widgets/Layouts/DashboardLayout"

interface PageProps {
  
}

const Page: NextPageWithLayout<PageProps> = () => {
  return (
    <DashboardMain />
  )
}


Page.getLayout = function getLayout(page: ReactElement) {
  return (
      <DashboardLayout>{page}</DashboardLayout>
  )
}

export default Page
