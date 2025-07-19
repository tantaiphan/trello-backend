import admin from 'firebase-admin';
import path from 'path';
import { envConfig } from '../config/env-config';


const serviceAccountPath = path.resolve(envConfig.firebaseKeyPath || '');

const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: envConfig.firebaseProjectId,
});

const db = admin.firestore();

export { db, admin };
