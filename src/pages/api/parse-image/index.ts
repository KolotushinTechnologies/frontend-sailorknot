import { ParseImageBody } from "@/src/shared/http/services/parseImageService/types/parseImage"
import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"
import fs from"fs"
const path = require("path")

async function parseImage(imageUrl: string, imageName: string) {
  try {
    const response = await axios.get("https://monoframe.ru/files/documents/attachments/82ec8c5f-5b7a-463e-b6a7-988fc574cdb6.jpeg", { responseType: "arraybuffer" })
    const buffer = Buffer.from(response.data)

    const file = fs.writeFileSync("examplename.jpeg", buffer)
    fs.writeFileSync("examplename.jpeg", buffer);

    console.log(file);

    return file
  } catch (error) {
    console.error("Error fetching or saving image:", error)
    throw error
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { imageUrl, imageName } = req.body as ParseImageBody
    const file = await parseImage(imageUrl, imageName)
    
    return res.status(200).send(file)
  } else {
    res.status(405).end() // Method not allowed
  }
}
