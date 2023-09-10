import { useEffect } from "react"
import { AuthService } from "../http/services/authService"
import toast from "react-hot-toast"
import { useRouter } from "next/router"
import { profileStoreGetUser } from "../store/profileStore"

const useGetUser = () => {
  const router = useRouter()
    
  const getUser = async () => {
    try {
      const {data} = await AuthService.getUser()
      profileStoreGetUser(data)
    } catch (error) {
      router.push("/")
      toast.error("Выполните вход")
    }
  }
  
  useEffect(() => {
    getUser()
  }, [])
}

export default useGetUser
