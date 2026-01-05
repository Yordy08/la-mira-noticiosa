import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const data = await prisma.noticia.findMany()
  console.log('RESULTADO:', data)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
