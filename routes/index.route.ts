import express, { Request } from 'express';
import { isAuthenticated } from '../auth/authentication';
import { getFolder } from '../controller/drive.controllers';

const indexRouter = express();

indexRouter.get('/', isAuthenticated, (req, res) => {
  // @ts-ignore
  const user = req.user;
  res.render('index', { user });
});

export default indexRouter;
