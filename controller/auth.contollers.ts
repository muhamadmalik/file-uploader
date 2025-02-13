import bcrypt from 'bcrypt';
import { createUser, findUser } from '../db/models/user';

export const registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const encryptedPassword = await bcrypt.hash(password, 10);
    const existingUser = await findUser(username);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = await createUser(username, encryptedPassword);
    res.redirect('/auth/signup')
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
};

export const loginUser = async (req, res) => {
    const {username, password} = req.body
    try {
        const user =  await findUser(username)
        if(user) {
            const match = bcrypt.match(user?.password, password)
            
           
        }
        res.status('401').json({message: 'User not Found.'})
    }catch(error) {
        res.status(500).json({message: 'Error Signing In the User'})
    }
}

