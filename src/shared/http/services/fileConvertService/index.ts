import axios from "axios"

const http = axios.create({
  baseURL: "/api/convertor/to-image",
})

export class FileConvertService {
  static async getImage(formData: FormData) {
    return await axios.post("/api/convertor/to-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  }
}
