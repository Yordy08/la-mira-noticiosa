// server/api/noticias/index.post.ts
import { defineEventHandler, readBody, createError } from 'h3'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    const nuevaNoticia = await prisma.noticia.create({
      data: {
        foto: body.foto,
        titular: body.titular,
        descripcion: body.descripcion,
        metaDescripcion: body.metaDescripcion,
        fraseClave: body.fraseClave,
        slug: body.slug,
        fecha: new Date(body.fecha),
        categoria: body.categoria
      }
    })

    return {
      mensaje: '✅ Noticia creada exitosamente',
      noticia: nuevaNoticia
    }
  } catch (error) {
    console.error('❌ Error al crear noticia:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error al crear la noticia',
    })
  }
})
