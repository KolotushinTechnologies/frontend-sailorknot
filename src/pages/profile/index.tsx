import { ReactElement } from "react"
import { NextPageWithLayout } from "../_app"
import { SiteLayout } from "../../widgets/Layouts/SiteLayout"
import ProfileLayout from "@/src/widgets/Layouts/ProfileLayout"

interface PageProps {}

const Page: NextPageWithLayout<PageProps> = () => {
  return (
    <div>
      <h1>PROFILE PAGE</h1>
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <SiteLayout>
      <ProfileLayout>{page}</ProfileLayout>
    </SiteLayout>
  )
}

export default Page
