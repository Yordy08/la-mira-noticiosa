import { PrismaClient } from '@prisma/client'
import { readBody } from 'h3'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params?.id
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID no proporcionado'
      })
    }

    const body = await readBody(event)

    // Validar campos manualmente para evitar errores
    const {
      titular,
      descripcion,
      fraseClave,
      metaDescripcion,
      categoria,
      slug,
      fecha
    } = body

    const noticiaActualizada = await prisma.noticia.update({
      where: { id },
      data: {
        titular,
        descripcion,
        fraseClave,
        metaDescripcion,
        categoria,
        slug,
        fecha: fecha ? new Date(fecha) : undefined,
      },
    })

    return {
      mensaje: '✅ Noticia actualizada correctamente',
      noticia: noticiaActualizada
    }

  } catch (error) {
    console.error('❌ Error al actualizar noticia:', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Error interno al actualizar la noticia'
    })
  }
})
