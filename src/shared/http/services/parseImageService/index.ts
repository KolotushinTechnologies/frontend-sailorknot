import axios from "axios"
import { ParseImageBody } from "./types/parseImage"

const http = axios.create({
  baseURL: "/api/parse-image",
})

export class ParseImageService {
  static async parseImage(body: ParseImageBody) {
    return await axios.post("/api/parse-image", body)
  }
}
