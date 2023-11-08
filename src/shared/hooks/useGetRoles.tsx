import { useEffect, useState } from "react"
import { ProfileStore } from "../store/profileStore"

const useGetRoles = () => {
  const { data: userData } = ProfileStore.useState((store) => store)

  const [isAdmin, isAdminSet] = useState(false)
  const [isAgent, isAgentSet] = useState(false)
  const [isUser, isUserSet] = useState(false)

  useEffect(() => {
    if (userData && userData.roles.length) {
      const matchUser = userData.roles.find((search) => search.toLowerCase().includes("user"))
      const matchAdmin = userData.roles.find((search) => search.toLowerCase().includes("admin"))
      const matchAgent = userData.roles.find((search) => search.toLowerCase().includes("agent"))

      if (matchUser) {
        isUserSet(true)
      } else {
        isUserSet(false)
      }

      if (matchAdmin) {
        isAdminSet(true)
      } else {
        isAdminSet(false)
      }

      if (matchAgent) {
        isAgentSet(true)
      } else {
        isAgentSet(false)
      }
    }
  }, [userData])

  return { isAdmin, isAgent, isUser }
}

export default useGetRoles
