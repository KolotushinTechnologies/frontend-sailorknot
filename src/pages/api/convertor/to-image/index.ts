import { NextApiRequest, NextApiResponse } from "next"
import multer from "multer"
const path = require("path")
const upload = multer({ dest: "uploads/", limits: {
  fileSize: 1000000000
}  }) // Define the upload directory

const options = {
  density: 100,
  saveFilename: "untitled",
  savePath: "./images",
  format: "png",
  width: 600,
  height: 600,
}

export const config = {
  api: {
    bodyParser: false, // Disable the default bodyParser
  },
};


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    return res.status(200).json({ msg: "Ok" })

    // Use the 'upload' middleware to handle the file upload
    // upload.single("file")(req, res, (err: any) => {
    //   if (err instanceof multer.MulterError) {
    //     // Handle any multer errors here
    //     return res.status(500).json({ error: "File upload error" })
    //   } else if (err) {
    //     return res.status(500).json({ error: "Internal server error" })
    //   }

    //   // The file should be available in 'req.file'
    //   const file:File = req.file

    //   try {
    //     const fileBuffer = Buffer.from(file, 'base64')
    //     console.log(fileBuffer);
        
    //   } catch (error) {
    //     console.log(error);
        
    //     return res.status(400).json({ error: "Error" })
    //   }

    //   if (!file) {
    //     return res.status(400).json({ error: "No file uploaded" })
    //   }

    //   // You can access file properties like 'originalname' and 'path'
    //   const { originalname, path } = file

    //   // Process the file as needed
    //   // For example, you can move it to a different location, read its contents, etc.

    //   // Send a response
    //   res.status(200).json({ message: "File uploaded successfully" })
    // })
  } else {
    res.status(405).end() // Method not allowed
  }
}
