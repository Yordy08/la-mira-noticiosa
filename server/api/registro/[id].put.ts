import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  const body = await readBody(event)

  const { nombre, correo } = body

  const actualizado = await prisma.registro.update({
    where: { id },
    data: { nombre, correo },
  })

  return {
    mensaje: 'Usuario actualizado exitosamente',
    usuario: actualizado
  }
})
