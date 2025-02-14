import express from 'express';
import { loginUser, logoutUser, registerUser } from '../controller/auth.contollers';

const authRouter = express();

authRouter.get('/login', (req, res) => {
    res.render('login')
});

authRouter.get('/signup', (req, res) => {
    res.render('signup')
})

authRouter.post('/signup', registerUser)
authRouter.post('/login', loginUser )
authRouter.post('/logout', logoutUser)

export default authRouter  