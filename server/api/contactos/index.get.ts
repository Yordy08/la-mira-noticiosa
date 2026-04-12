import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async () => {

  return await prisma.contacto.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

})