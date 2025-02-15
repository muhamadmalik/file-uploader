// @ts-nocheck
import express from 'express';
import authRouter from './routes/auth.routes';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { getUsers } from './db/models/user';
import session from 'express-session';
import { configDotenv } from 'dotenv';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import passport from './controller/passportConfig';
import { PrismaClient } from '@prisma/client';
import indexRouter from './routes/index.route';
import { deflateSync } from 'zlib';
import { addFile, createFolder, deleteFile, getFiles } from './db/models/drive';
import driveRouter from './routes/drive.routes';
configDotenv()
      const app = express();
app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// deleteFile(2)
// createFolder('firstFolder', 1)
const url = 'thisistheurl'
// addFile(url, 1, 'firstsldkfjfile')
app.set('views', join(__dirname, 'views'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/folders', driveRouter)
app.set('view engine', 'ejs');

app.listen(3000, () => {
  console.log('we are here listening at 3000');
});
