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
import userRouter from './routes/index.route';
import { deflateSync } from 'zlib';
import { addFile, createFolder, deleteFile, getFiles, getFolder } from './db/models/drive';
import driveRouter from './routes/drive.routes';
import cors from 'cors';

configDotenv();


const app = express();
app.use(cors({
  origin: 'http://localhost:8080', 
  credentials: true 
}));
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users/', userRouter);
app.use('/api/auth/', authRouter);
app.use('/api/drive/', driveRouter);
app.set('view engine', 'ejs');
const port = 5000
app.listen(port, async () => {
  console.log(await getFolder(6))
  console.log('we are here listening at 5000');
});
  