import fs from "fs"
import path from "path"
import pdf2image from "pdf2image"
import imageToBase64 from "image-to-base64"
import * as mammoth from "mammoth"
import * as htmlToImage from "html-to-image"
import type { NextApiRequest, NextApiResponse } from "next"
import formidable from "formidable"

type ResponseData = {
  message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const requestMethod = req.method
  switch (requestMethod) {
    case "POST":
      return res.status(200).json({ message: "Ok" })

      // try {
      //   const form = new formidable.IncomingForm({
      //       uploadDir: "./public/uploads"
      //   })

        
      //   return res.status(200).json({ message: "Ok" })

      //   form.parse(req, async (err, fields, files) => {
      //     if (err) {
      //       console.error(err)
      //       return res.status(500).json({ message: "File upload failed." })
      //     }

      //     const file = files.upload

      //     if (!file) {
      //       return res.status(400).json({ message: "No file uploaded." })
      //     }

      //     // Generate a unique file name or use the original file name
      //     const fileName = Date.now() + path.extname(file.name)

      //     // Move the uploaded file to the desired location
      //     const newPath = path.join(form.uploadDir, fileName)
      //     fs.renameSync(file.path, newPath)

      //     return res.status(200).json({ success: "File uploaded successfully." })
      //   })
      // } catch (error) {
      //   console.error(error)
      //   return res.status(500).json({ message: "File upload failed." })
      // }
    //   res.status(200).json({ message: `You submitted the following data` })
    default:
      res.status(200).json({ message: "Welcome to API Routes!" })
  }
}
