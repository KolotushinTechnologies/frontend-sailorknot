import { useEffect, useState } from "react"
import { AuthService } from "../http/services/authService"
import toast from "react-hot-toast"
import { profileStoreGetUser } from "../store/profileStore"
import { NextRouter } from "next/router"

const useGetMe = (router: NextRouter) => {
  const [upd, setUpd] = useState<number>(0)

  const getUser = async () => {
    try {
      const res = await AuthService.getUser()
      const { data } = res
      profileStoreGetUser(data)
    } catch (error) {
      toast.error("Выполните вход")
      if (window.location.href.includes("profile") || window.location.href.includes("dashboard")) {
        // await router.push("/")
      }
    }
  }

  useEffect(() => {
    getUser()
  }, [upd])

  return { setUpd }
}

export default useGetMe
