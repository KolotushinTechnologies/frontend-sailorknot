import useGetMe from "@/src/shared/hooks/useGetMe"
import { useRouter } from "next/router"

const SiteLayout = ({ children }: any) => {
  const router = useRouter()
  useGetMe(router)
  return <>{children}</>
}

export { SiteLayout }
