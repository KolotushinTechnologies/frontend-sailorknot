import useGetMe from "@/src/shared/hooks/useGetMe"

const SiteLayout = ({ children }: any) => {
  useGetMe()
  return (
    <>
      {children}
    </>
  )
}

export { SiteLayout }
