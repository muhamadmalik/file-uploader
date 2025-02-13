import express from 'express';
import { registerUser } from '../controller/auth.contollers';

const authRouter = express();

authRouter.get('/login', (req, res) => {
    res.render('login')
});

authRouter.get('/signup', (req, res) => {
    res.render('signup')
})

authRouter.post('/signup', registerUser)
export default authRouter