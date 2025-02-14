import express, { Request } from 'express';
import { isAuthenticated } from '../auth/authentication';

const indexRouter = express();

indexRouter.get('/', isAuthenticated, (req, res) => {
  // @ts-ignore
  const user = req.user;
  // console.log('User retrieved:', JSON.parse(JSON.stringify(user)));
  res.render('index', { user });
});

export default indexRouter;
