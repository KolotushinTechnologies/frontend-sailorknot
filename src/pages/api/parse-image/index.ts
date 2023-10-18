import { ParseImageBody } from "@/src/shared/http/services/parseImageService/types/parseImage"
import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"
import Tesseract from "tesseract.js"
import fs from "fs"
const path = require("path")

async function parseImage(imageUrl: string) {
  try {
    Tesseract.recognize(imageUrl, "rus", { logger: (m) => console.log(m) }).then(({ data: { text } }) => {
      console.log('imageUrl: ', imageUrl);
      console.log(text)
    })
  } catch (error) {
    console.error("Error parse image", error)
    throw error
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { imageUrl } = req.body as ParseImageBody

    const file = await parseImage(imageUrl)

    return res.status(200).send(file)
  } else {
    res.status(405).end() // Method not allowed
  }
}
