import { MongoClient, Db, Collection, Document } from 'mongodb'

let cachedClient: MongoClient | null = null

export async function connect(): Promise<MongoClient> {
  if (cachedClient) return cachedClient

  const uri = process.env.DATABASE_URL

  if (!uri) {
    throw new Error('DATABASE_URL no definido en el archivo .env')
  }

  const client = new MongoClient(uri)
  await client.connect()

  console.log('🟢 MongoDB conectado correctamente')
  cachedClient = client
  return client
}

export function getDatabase(client: MongoClient): Db {
  // 👇 toma la DB directamente desde la URL
  return client.db()
}

export function getCollection<T extends Document>(
  db: Db,
  name: string
): Collection<T> {
  return db.collection<T>(name)
}
