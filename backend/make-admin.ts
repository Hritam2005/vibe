import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

async function makeAdmin() {
  const uri = process.env.DB_URL;
  if (!uri) {
    console.error("No DB_URL found in .env");
    return;
  }
  
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("Connected to MongoDB.");
    
    const db = client.db(process.env.DB_NAME || 'vibe');
    const users = db.collection('users');
    
    const result = await users.updateMany({}, { $set: { roles: 'admin' } });
    console.log(`Successfully updated ${result.modifiedCount} users to have the admin role.`);
  } catch (error) {
    console.error("Error connecting or updating:", error);
  } finally {
    await client.close();
  }
}

makeAdmin();
