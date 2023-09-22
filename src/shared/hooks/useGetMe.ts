import { useEffect } from "react"
import { AuthService } from "../http/services/authService"
import toast from "react-hot-toast"
import { profileStoreGetUser } from "../store/profileStore"
import { NextRouter } from "next/router"

const useGetMe = (router: NextRouter) => {
  const getUser = async () => {
    try {
      const res = await AuthService.getUser()
      const { data } = res
      profileStoreGetUser(data)
    } catch (error) {
      toast.error("Выполните вход")
      if (window.location.href.includes("profile") || window.location.href.includes("dashboard")) {
        await router.push("/")
      }
    }
  }

  useEffect(() => {
    getUser()
  }, [])
}

export default useGetMe
