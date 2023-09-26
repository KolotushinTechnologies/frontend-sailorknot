import { AuthService } from "../http/services/authService"
import { NextRouter } from "next/router"
import toast from "react-hot-toast"

const updateProfile = async (formData: FormData, router: NextRouter) => {
  try {
    const { data: res } = await AuthService.updateProfile(formData)
    console.log(res)
    toast.success(`Успех`)
    router.push(router.asPath)
  } catch (error) {
    toast.error(`Ошибка`)
  }
}

export default updateProfile
