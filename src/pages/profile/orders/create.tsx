import { ReactElement } from "react"
import { SiteLayout } from "@/src/widgets/Layouts/SiteLayout"
import { NextPageWithLayout } from "@/pages/_app"
import { DashboardUpsertOrder } from "@/src/widgets/Dashboard/Orders/DashboardUpsertOrder"
import ProfileLayout from "@/src/widgets/Layouts/ProfileLayout"

interface PageProps {
  orderId: string | undefined
}

const Page: NextPageWithLayout<PageProps> = () => {
  return <DashboardUpsertOrder navigateToAfterSubmit={'/profile/orders'} orderId={undefined} />
}


Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <SiteLayout>
      <ProfileLayout>{page}</ProfileLayout>
    </SiteLayout>
  )
}

export default Page