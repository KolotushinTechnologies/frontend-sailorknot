import { LoginRequest, LoginResponse } from "./types/login"
import { http } from "../../index"
import { RegisterResponse } from "./types/register"
import { GetUserResponse } from "./types/getUser"
import { UpdateProfileResponse } from "./types/updateProfile"

export class AuthService {
  static async register(formData: FormData) {
    return await http.post<RegisterResponse>("api/users/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  }
  static async login({ phoneNumber, password }: LoginRequest) {
    return await http.post<LoginResponse>(
      // "auth/login",
      "api/users/login",
      {
        phoneNumber,
        password,
      },
    )
  }
  /**
   * @param name string
   * @param lastname string
   * @param surname string
   * @param dateBirth string
   * @param speciality string
   * @param phoneNumber string
   * @param city string
   * @param documents File[]
   * @param statusChangeFile boolean optional
   */
  static async updateProfile(formData: FormData) {
    return await http.put<UpdateProfileResponse>("api/users/update-my-profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  }

  static async getUser() {
    return await http.get<GetUserResponse>("api/users")
  }
}
