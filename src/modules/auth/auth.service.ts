/* eslint-disable no-console */
import { Response, Request } from 'express';
import { admin } from '../../database/firebase';
import { envConfig } from "../../config/env-config";

export const exchangeCustomTokenForIdToken = async (customToken: string) => {
  const apiKey = envConfig.firebaseApiKey;

  const url = `${envConfig.firebaseAuthDomain}/v1/accounts:signInWithCustomToken?key=${apiKey}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      token: customToken,
      returnSecureToken: true,
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(`Firebase token exchange failed: ${JSON.stringify(err)}`);
  }

  const data = await res.json();

  return data.idToken;
};

export const generateFirebaseToken = async (user: any) => {
  const githubId = user.profile.id;
  const displayName = user.profile.displayName || user.profile.username;

  const firebaseUid = `github:${githubId}`;
  const customToken = await admin.auth().createCustomToken(firebaseUid, {
    name: displayName,
  });

  return {
    firebaseToken: customToken,
    displayName,
  };
};

export const loginCallback = async (req: Request, res: Response) => {
  const user: any = req.user;

  console.log('User data:', user);

  try {
    const tokenData = await generateFirebaseToken(user);

    const idToken = await exchangeCustomTokenForIdToken(tokenData.firebaseToken);

    res.redirect(
      `${envConfig.feRedirectUrl}?accessToken=${idToken}`
    );
  } catch (error) {
    console.error('Token error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
