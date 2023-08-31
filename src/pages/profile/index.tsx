import { ReactElement } from "react"
import { NextPageWithLayout } from "../_app"
import { SiteLayout } from "../../widgets/Layouts/SiteLayout"


interface PageProps {}

const Page: NextPageWithLayout<PageProps> = () => {
  return <div><h1>PROFILE PAGE</h1></div>
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <SiteLayout>{page}</SiteLayout>
}

export default Page
