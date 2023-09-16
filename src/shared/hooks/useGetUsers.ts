import { GetAllResponse } from "@/src/shared/http/services/userService/types/getAll"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { UserService } from "../http/services/userService"

const useGetUsers = () => {
  const [users, setUsers] = useState<GetAllResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [upd, setUpd] = useState<number>(0)
  
  const setUpdToggle = () => setUpd(Date.now())

  const getUsers = async () => {
    try {
      const { data } = await UserService.getAll()
      setUsers(data)
    } catch (error) {
      toast.error("Failed to fetch users. Please log in or try again later.")
    } finally {
      setLoading(false) // Error occurred, set loading to false
    }
  }

  useEffect(() => {
    getUsers()
  }, [upd])

  return { users, loading, updUsers: setUpdToggle }
}

export default useGetUsers
