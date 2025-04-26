import express, { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; username: string };
    }
  }
}
import { isAuthenticated } from '../auth/authentication';

const userRouter = express();
 

userRouter.get('/me', isAuthenticated, (req, res): void => {
  if (!req.user) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
  }
  const userData = { id: req.user.id, username: req.user.username };
  res.json(userData);
});

export default userRouter