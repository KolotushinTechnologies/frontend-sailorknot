import useGetUser from "@/src/shared/hooks/useGetUser"

const SiteLayout = ({ children }: any) => {
  useGetUser()
  return (
    <>
      {children}
    </>
  )
}

export { SiteLayout }
