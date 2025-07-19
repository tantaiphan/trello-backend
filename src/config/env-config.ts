import dotenv from 'dotenv';

dotenv.config();

interface EnvConfig {
  firebaseKeyPath?: string;
  githubClientId?: string;
  githubClientSecretKey?: string;
  githubCallbackUrl?: string;
  sessionSecretKey?: string;
  firebaseApiKey?: string;
  firebaseAuthDomain?: string;
  feRedirectUrl?: string;
  firebaseProjectId?: string;
}

export const envConfig: EnvConfig = {
  firebaseKeyPath: process.env.FIREBASE_KEY_PATH,
  githubClientId: process.env.GITHUB_CLIENT_ID,
  githubClientSecretKey: process.env.GITHUB_CLIENT_SECRET_KEY,
  githubCallbackUrl: process.env.GITHUB_CALLBACK_URL,
  sessionSecretKey: process.env.SESSION_SECRET_KEY,
  firebaseApiKey: process.env.FIREBASE_API_KEY,
  firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
  feRedirectUrl: process.env.FE_REDIRECT_URL,
  firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
};
