import { MongoClient } from 'mongodb';
import fs from 'fs';
import dotenv from 'dotenv';

const env = dotenv.parse(fs.readFileSync('.env'));
const uri = env.DATABASE_URL.replace(/"/g, '');

async function run(){
  const client = new MongoClient(uri);
  try{
    await client.connect();
    let dbName = 'la_mira_noticiosa';
    try{
      const u = new URL(uri);
      // pathname may be like '/dbname' or '/'
      if(u.pathname && u.pathname !== '/') dbName = decodeURIComponent(u.pathname.replace(/\//g, ''));
    }catch(e){}
    const db = client.db(dbName || 'la_mira_noticiosa');
    const cols = await db.listCollections().toArray();
    console.log('DB:', db.databaseName);
    console.log('Colecciones encontradas:', cols.length);
    if(cols.length===0) { console.log('No hay colecciones.'); return; }
    for(const c of cols){
      const name = c.name;
      const count = await db.collection(name).countDocuments();
      const sample = await db.collection(name).findOne();
      console.log(`- ${name}: ${count} doc(s)`);
      if(sample) console.log('  ejemplo:', sample);
    }
  }catch(e){
    console.error('Error:', e.message || e);
  }finally{
    await client.close();
  }
}

run();
