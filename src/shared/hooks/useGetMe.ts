import { useEffect } from "react"
import { AuthService } from "../http/services/authService"
import toast from "react-hot-toast"
import { profileStoreGetUser } from "../store/profileStore"

const useGetMe = () => {
  const getUser = async () => {
    try {
      const { data } = await AuthService.getUser()
      profileStoreGetUser(data)
    } catch (error) {
      toast.error("Выполните вход")
    }
  }

  useEffect(() => {
    getUser()
  }, [])
}

export default useGetMe
