import { ReactElement, useEffect } from "react"
import { NextPageWithLayout } from "./_app"
import { SiteLayout } from "../widgets/Layouts/SiteLayout"
import HomePage from "../pages-flat/HomePage"

interface PageProps {}

const Page: NextPageWithLayout<PageProps> = () => {
  console.log('test');
  return <HomePage />
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <SiteLayout>{page}</SiteLayout>
}

export default Page
