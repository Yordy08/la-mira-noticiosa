// test-prisma.js
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    const usuario = await prisma.registro.findMany()
    console.log(usuario)
  } catch (error) {
    console.error('❌ Error Prisma:', error)
  }
}

main()
