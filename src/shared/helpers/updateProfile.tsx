import { AuthService } from "../http/services/authService"
import { NextRouter } from "next/router"
import toast from "react-hot-toast"

const updateProfile = async (formData: FormData, router: NextRouter) => {
  const toastId = toast.loading("Обновление...", {
    position: "top-right",
  })
  try {
    const { data: res } = await AuthService.updateProfile(formData)
    router.push(router.asPath)
  } catch (error) {
  } finally {
    toast.success("Завершено", {
      id: toastId,
    })
  }
}

export default updateProfile
