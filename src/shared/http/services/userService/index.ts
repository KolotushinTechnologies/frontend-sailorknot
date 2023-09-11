import { GetAllResponse } from "./types/getAll"
import allUsers from "@/shared/constants/demo-users.json"
import { GetOneResponse } from "./types/getOneById"
const allUsersParse = allUsers as GetAllResponse

export class UserService {
  static getAll() {
    return allUsersParse as GetAllResponse
  }

  static getOneById(userId: string) {
    const user = allUsersParse.users.find(user=>user.id === userId)
    return user as GetOneResponse
  }
}
