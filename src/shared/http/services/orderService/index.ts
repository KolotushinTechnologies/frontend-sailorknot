import { http } from "../../index"
import { GetAllResponse } from "./types/getAll"
import { GetOneResponse } from "./types/getOne"
import demoOrders from "@/src/shared/constants/demo-orders.json"
export class OrderService {
  static getAll() {
    // return await http.get<GetAllResponse>("api/orders")
    return demoOrders
  }

  static getOne(orderId: string | number) {
    // return await http.get<GetOneResponse>(`api/orders/${orderId}`)
    return demoOrders.find((search) => `${search.id}` === `${orderId}`)
  }
}
