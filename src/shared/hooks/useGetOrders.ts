import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { OrderService } from "../http/services/orderService"
import { GetAllResponse } from "../http/services/orderService/types/getAllAds"

const useGetOrders = () => {
  const [orders, setOrders] = useState<GetAllResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [upd, setUpd] = useState<number>(0)

  const setUpdToggle = () => setUpd(Date.now())

  const getOrders = async () => {
    try {
      const data = await OrderService.getAll()
      setOrders(data)
    } catch (error) {
      toast.error("Failed to fetch orders. Please log in or try again later.")
    } finally {
      setLoading(false) // Error occurred, set loading to false
    }
  }

  useEffect(() => {
    getOrders()
  }, [upd])

  return { orders, loading, updOrders: setUpdToggle }
}

export default useGetOrders
