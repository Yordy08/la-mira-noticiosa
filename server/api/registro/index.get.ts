import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async () => {
  const usuarios = await prisma.registro.findMany({
    select: {
      id: true,
      nombre: true,
      correo: true,
      creadoEn: true
    }
  })
  return usuarios
})
