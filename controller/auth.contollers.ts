import bcrypt from 'bcrypt';
import { createUser, findUser } from '../db/models/user';
import passport from './passportConfig';

export const registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const encryptedPassword = await bcrypt.hash(password, 10);
    const existingUser = await findUser(username);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = await createUser(username, encryptedPassword);
    // res.redirect('/auth/signup');
    const userData = { id: user.id, username: user.username };
    res
      .status(201)
      .json({ message: 'User registered successfully', user: userData });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
};

export const loginUser = async (req, res, next) => {
  passport.authenticate('local', (error, user, info) => {
    if (error) {
      return next(error);
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    req.login(user, (error) => {
      if (error) return next(error);

      // return res.json({ message: 'Login Successful', user });
      // return res.redirect('/');
      const userData = { id: user.id, username: user.username };
      return res.json({ message: 'Login Successful', user: userData });
    });
  })(req, res, next);
};

export const logoutUser = async (req, res) => {
  req.logout((error) => {
    if (error) return res.status(500).json({ message: 'Logout failed' });
  });
  res.json({ message: 'Logged out successfully' });
};
