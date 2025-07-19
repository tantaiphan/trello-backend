import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middlewares/authentication';
import authController from '../modules/auth/auth.controller';
import boardController from '../modules/board/board.router';

const router = Router();



router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello from Express + TypeScript!' });
});

router.use('/auth', authController);

router.use(authMiddleware);
router.use('/boards', boardController);


export default router;
