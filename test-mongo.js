import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://yordisdurango:1Fd0v8B7tfdckoNH@cluster0.dvuicp5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db('test'); // tu nombre real de base de datos
    const collection = database.collection('usuarios');

    const result = await collection.insertOne({
      nombre: 'Juan Pérez',
      correo: 'juan@example.com',
      clave: '123456',
      fecha: new Date()
    });

    console.log('Insertado:', result.insertedId);
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
  } finally {
    await client.close();
  }
}

run();
