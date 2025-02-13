import express from 'express';
import authRouter from './routes/auth.routes';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { getUsers } from './db/models/user';
import expressSession from 'express-session'
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from '@prisma/client/extension';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.set('views', join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs');
app.use('/auth', authRouter);
app.get('/', async (req, res) => {
const users = await getUsers()
console.log(users)
  res.send('this is the index pages.');
});
app.listen(3000, () => {
  console.log('we are here listening at 3000');
});