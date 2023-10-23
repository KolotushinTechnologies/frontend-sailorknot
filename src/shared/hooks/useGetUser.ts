import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { UserService } from "../http/services/userService"
import { GetOneResponse } from "../http/services/userService/types/getOneById"

const useGetUser = (userId: string | undefined) => {
  const [user, setUser] = useState<GetOneResponse | null>(null)
  const [loading, setLoading] = useState(true)

  const getUsers = async () => {
    if (userId) {
      try {
        const { data } = await UserService.getOneById(userId)
        setUser(data)
      } catch (error) {
        toast.error("Failed to fetch user. Please log in or try again later.")
      } finally {
        setLoading(false) // Error occurred, set loading to false
      }
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  return { user, loading }
}

export default useGetUser
