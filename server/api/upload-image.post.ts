// server/api/upload-image.post.ts
import { IncomingForm, Files } from 'formidable'
import { v2 as cloudinary } from 'cloudinary'
import { defineEventHandler, createError } from 'h3'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!
})

export default defineEventHandler(async (event) => {
  const form = new IncomingForm({ keepExtensions: true })

  const { files } = await new Promise<{ files: Files }>((resolve, reject) => {
    form.parse(event.node.req, (err, fields, files) => {
      if (err) reject(err)
      else resolve({ files })
    })
  })

  const image = Array.isArray(files.image) ? files.image[0] : files.image

  if (!image || !image.filepath) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No se recibió imagen válida'
    })
  }

  const result = await cloudinary.uploader.upload(image.filepath, {
    folder: 'la-mira-noticias'
  })

  return { url: result.secure_url }
})
