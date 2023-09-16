import { http } from "../.."
import { GetAllResponse } from "./types/getAll"
import { GetOneResponse } from "./types/getOneById"
import { CreateOneBody, CreateOneResponse } from "./types/createOne"
import { SearchUsersRespone } from "./types/searchUsers"
import { UpdateUserBody, UpdateUserParams, UpdateUserResponse } from "./types/updateOne"

export class UserService {
  static async getAll() {
    return await http.get<GetAllResponse[]>("api/admin/users/all")
  }

  static async getOneById(user_id: string) {
    return await http.get<GetOneResponse>(`api/admin/users/${user_id}`)
  }

  static async createOne(data: CreateOneBody) {
    return await http.post<CreateOneResponse>(`api/admin/users/register-agent`, data)
  }

  /**
   * @descr Search by phone number
   */
  static async searchUsers(content: string) {
    return await http.post<SearchUsersRespone[]>(`api/admin/users/searching/all`)
  }

  static async updateUser({ user_id }: UpdateUserParams, data: UpdateUserBody) {
    return await http.put<UpdateUserResponse>(`/api/admin/users/update/${user_id}`, data)
  }

  static async deleteOne(user_id: string) {
    return await http.delete<string>(`/api/admin/users/${user_id}`)
  }
}
