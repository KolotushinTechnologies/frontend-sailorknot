import { http } from "../.."
import { GetAllResponse } from "./types/getAll"

export class UserService {
  static async getAll({ page = 1, take = 10, orderBy = "createdAt_asc" }: { page?: number; take?: number; orderBy?: string }) {
    return await http.post<GetAllResponse>("api/users/query", {
      page,
      take,
      orderBy,
    })
  }

  static async deleteOne(userId: string) {
    return await http.delete<{ userId: string }>(`api/users/${userId}`)
  }
}
