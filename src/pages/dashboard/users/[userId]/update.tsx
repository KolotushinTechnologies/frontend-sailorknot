import { ReactElement } from "react"
import { SiteLayout } from "@/src/widgets/Layouts/SiteLayout"
import { GetServerSideProps } from "next"
import DashboardLayout from "@/src/widgets/Layouts/DashboardLayout"
import { NextPageWithLayout } from "@/pages/_app"
import { ParsedUrlQuery } from "querystring"
import { DashboardUpsertUser } from "@/src/widgets/Dashboard/Users/DashboardUpsertUser"
import { UserService } from "@/src/shared/http/services/userService"
import { GetOneResponse } from "@/src/shared/http/services/userService/types/getOneById"

interface PageProps {
  user: GetOneResponse
}

interface ParamProps extends ParsedUrlQuery {
  userId: string
}

const Page: NextPageWithLayout<PageProps> = ({ user }) => {
  return (
    <DashboardUpsertUser
      item={user}
      title={`Редактировать пользователя ${user.id}`}
    />
  )
}

export const getServerSideProps: GetServerSideProps<PageProps> = async ({ query, params }) => {
  const { userId } = params as ParamProps
  const user = UserService.getOneById(userId)
  return { props: { user } }
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>{page}</DashboardLayout>
  )
}

export default Page
