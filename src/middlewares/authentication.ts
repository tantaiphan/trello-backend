/* eslint-disable no-console */
import { Request, Response, NextFunction } from 'express';
import { admin } from '../database/firebase';
import { HttpStatusCodeEnum } from '../core/ultils/app-enum';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const requestHeader = req.headers.authorization;

  if (!requestHeader) {
    return res.status(HttpStatusCodeEnum.Unauthorized).json({ message: 'No Unauthorized!' });
  }

  if (!requestHeader.startsWith('Bearer ')) {
    return res.status(HttpStatusCodeEnum.Unauthorized).json({ message: 'Invalid token!' });
  }

  try {
    const accessToken = requestHeader.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(accessToken);
    req.user = decodedToken;

    next();
  } catch (error: any) {
    console.log(error);
    return res.status(HttpStatusCodeEnum.Unauthorized).json({ message: 'No Unauthorized!' });
  }
}
