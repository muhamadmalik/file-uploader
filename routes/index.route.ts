import express, { Request } from 'express';
import { isAuthenticated } from '../auth/authentication';
import { getFolder } from '../controller/drive.controllers';
import { getFile, getFiles } from '../db/models/drive';
import { delCloudFile } from '../controller/upload';
// import { deleteFile } from '../controller/upload';

const indexRouter = express();

indexRouter.get('/', isAuthenticated, async (req, res) => {
  // @ts-ignore
  const user = req.user;
  res.render('index', { user });
});

export default indexRouter;
