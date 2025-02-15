import express, { Request } from 'express';
import { isAuthenticated } from '../auth/authentication';
import { getFolder } from '../controller/drive.controllers';
import { getFiles } from '../db/models/drive';

const indexRouter = express();

indexRouter.get('/', isAuthenticated, async (req, res) => {
  const files = await getFiles(1)
  console.log(files)
  // @ts-ignore
  const user = req.user;
  res.render('index', { user });
});

export default indexRouter;
