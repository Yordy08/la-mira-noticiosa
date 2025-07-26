import { MongoClient, Db, Collection, Document } from 'mongodb'
import { useRuntimeConfig } from '#imports'

let cachedClient: MongoClient | null = null

export async function connect(): Promise<MongoClient> {
  if (cachedClient) return cachedClient

  const config = useRuntimeConfig()
  const uri = config.MONGO_URI

  if (!uri) throw new Error('MONGO_URI no definido')

  const client = new MongoClient(uri)
  await client.connect()
  cachedClient = client
  return client
}

export function getDatabase(client: MongoClient): Db {
  const config = useRuntimeConfig()
  const dbName = config.MONGO_DB

  if (!dbName) throw new Error('MONGO_DB no definido')

  return client.db(dbName)
}

// ✅ Restricción de tipo para cumplir con lo que espera MongoDB
export function getCollection<T extends Document>(db: Db, name: string): Collection<T> {
  return db.collection<T>(name)
}
