import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

  const body = await readBody(event)

  const contactos = await prisma.contacto.findMany({
    where: {
      estado: 'activo'
    }
  })

  const mensaje = `${body.titulo}

${body.contexto}

Leer completo:
https://tusitio.com/noticias/${body.slug}`

  let enviados = 0
  let errores = 0

  for (const item of contactos) {

    try {

      // 🔥 NORMALIZAR TELÉFONO
      let telefono = String(item.telefono).replace(/\s/g, '')

      if (!telefono.startsWith('+')) {
        telefono = '+57' + telefono
      }

      console.log('📲 Enviando a:', telefono)

      await $fetch('https://api.httpsms.com/v1/messages/send', {
        method: 'POST',
        headers: {
          'x-api-key': process.env.HTTPSMS_API_KEY,
          'Content-Type': 'application/json'
        },
        body: {
          content: mensaje,
          from: process.env.HTTPSMS_FROM_NUMBER,
          to: telefono
        }
      })

      enviados++

    } catch (error) {
      console.log('❌ Error enviando a:', item.telefono)
      errores++
    }
  }

  return {
    mensaje: `Enviados: ${enviados}, Errores: ${errores}`
  }
})