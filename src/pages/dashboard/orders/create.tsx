import { ReactElement } from "react"
import { SiteLayout } from "@/src/widgets/Layouts/SiteLayout"
import { GetServerSideProps } from "next"
import DashboardLayout from "@/src/widgets/Layouts/DashboardLayout"
import { NextPageWithLayout } from "@/pages/_app"
import { DashboardUpsertOrder } from "@/src/widgets/Dashboard/Orders/DashboardUpsertOrder"

interface PageProps {
  orderId: string | undefined
}

const Page: NextPageWithLayout<PageProps> = () => {
  return <DashboardUpsertOrder orderId={undefined} />
}


Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <SiteLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </SiteLayout>
  )
}

export default Page
