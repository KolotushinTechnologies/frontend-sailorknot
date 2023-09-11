import { ReactElement } from "react"
import { SiteLayout } from "@/src/widgets/Layouts/SiteLayout"
import { GetServerSideProps } from "next"
import DashboardLayout from "@/src/widgets/Layouts/DashboardLayout"
import { NextPageWithLayout } from "@/pages/_app"
import { DashBoardAllUsers } from "@/src/widgets/Dashboard/Users/DashBoardAllUsers"
import { UserService } from "@/src/shared/http/services/userService"
import { GetAllResponse } from "@/src/shared/http/services/userService/types/getAll"

interface PageProps {
  items: GetAllResponse
  page: number
  take: number
  orderBy: string
}

const Page: NextPageWithLayout<PageProps> = ({ items, page, take, orderBy }) => {
  return <DashBoardAllUsers items={items} page={page} take={take} orderBy={orderBy} />
}

export const getServerSideProps: GetServerSideProps<PageProps> = async ({ query, params }) => {
  let { page = 1, take = 20, orderBy = "createdAt_asc" } = query

  let parsePage = 1
  let parseTake = 20
  let parseOrderBy = "createdAt_asc"

  if (!Array.isArray(page) && page !== "undefined") parsePage = parseInt(`${page}`)
  if (!Array.isArray(take) && take !== "undefined") parseTake = parseInt(`${take}`)
  if (!Array.isArray(orderBy) && orderBy !== "undefined" && typeof orderBy === "string") parseOrderBy = orderBy

  const items = UserService.getAll();
  return { props: { items, page: parsePage, take: parseTake, orderBy: parseOrderBy } }
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>{page}</DashboardLayout>
  )
}

export default Page
