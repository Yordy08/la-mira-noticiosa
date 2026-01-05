// server/api/upload-image.post.ts
import { IncomingForm, Files } from 'formidable'
import { v2 as cloudinary } from 'cloudinary'
import { defineEventHandler, createError } from 'h3'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || ''
})

export default defineEventHandler(async (event) => {
  try {
    const form = new IncomingForm({ keepExtensions: true })

    const { files } = await new Promise<{ files: Files }>((resolve, reject) => {
      form.parse(event.node.req, (err, fields, files) => {
        if (err) return reject(err)
        resolve({ files })
      })
    })

    // Flexible detection: algunos objetos File usan 'filepath', otros 'path'
    let image: any = (files as any).image || Object.values(files || {})[0]

    if (Array.isArray(image)) image = image[0]

    const filePath = image?.filepath || image?.path || image?.file?.path

    if (!image || !filePath) {
      console.error('upload-image: no image or path', { files })
      throw createError({ statusCode: 400, statusMessage: 'No se recibió imagen válida' })
    }

    // Verificar credenciales de Cloudinary
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error('upload-image: Cloudinary env vars missing')
      throw createError({ statusCode: 500, statusMessage: 'Configuración de Cloudinary no encontrada en el servidor' })
    }

    const result = await cloudinary.uploader.upload(filePath, { folder: 'la-mira-noticias' })

    return { url: result.secure_url }
  } catch (err: any) {
    console.error('upload-image error:', err?.message || err)
    throw createError({ statusCode: 500, statusMessage: err?.message || 'Error al subir imagen' })
  }
})
