import * as dotenv from 'dotenv';
dotenv.config();

console.log("FIREBASE_AUTH_EMULATOR_HOST:", process.env.FIREBASE_AUTH_EMULATOR_HOST);

import admin from 'firebase-admin';
import { env } from './src/utils/env.js';
import { appConfig } from './src/config/app.js';

if (appConfig.isDevelopment && process.env.FIREBASE_AUTH_EMULATOR_HOST) {
  admin.initializeApp({
    projectId: appConfig.firebase.projectId || 'demo-project',
  });
  console.log("Initialized with emulator");
} else {
  console.log("Initialized WITHOUT emulator");
}

async function test() {
  try {
    const user = await admin.auth().createUser({
      email: 'test-admin-script@example.com',
      password: 'password123',
    });
    console.log("Created user:", user.uid);
  } catch (err) {
    console.error("Error creating user:", err);
  }
}

test();
