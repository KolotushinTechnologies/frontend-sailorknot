import { LoginRequest, LoginResponse } from "./types/login"
import { http } from "../.."
import { RegisterRequest, RegisterResponse } from "./types/register"

export class AuthService {
  static async register({ phoneNumber, password, city, dateBirth, lastname, name, speciality, surname }: RegisterRequest) {
    return await http.post<RegisterResponse>("auth/registration", {
      phoneNumber,
      password,
      balance: "0",
      city,
      dateBirth,
      lastname,
      name,
      speciality,
      surname,
    })
  }
  static async login({ phoneNumber, password }: LoginRequest) {
    return await http.post<LoginResponse>("auth/login", {
      phoneNumber,
      password,
    })
  }
}
