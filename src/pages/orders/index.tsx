import { ReactElement } from "react"
import { NextPageWithLayout } from "../_app"
import { SiteLayout } from "../../widgets/Layouts/SiteLayout"
import OrdersPage from "@/src/pages-flat/OrdersPage"

interface PageProps {}

const Page: NextPageWithLayout<PageProps> = () => {
  return <OrdersPage />
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <SiteLayout>{page}</SiteLayout>
}

export default Page
