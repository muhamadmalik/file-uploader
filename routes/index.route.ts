import express, { Request } from 'express';
import { isAuthenticated } from '../auth/authentication';

const indexRouter = express();

indexRouter.get('/', isAuthenticated, async (req, res) => {
  // @ts-ignore
  const user = req.user;
  res.render('index', { user });
});

export default indexRouter;
