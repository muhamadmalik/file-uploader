import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { findUser, findUserById } from '../db/models/user';
import bcrypt from 'bcrypt';

interface IUser {
  id: number;
  username: string;
  password: string;
  createdAt: Date;
}

interface IDone {
  (error: any, user?: IUser | false, options?: { message: string }): void;
}

passport.use(
  'local',
  new LocalStrategy(
    async (username: string, password: string, done: IDone) => {
      try {
        const user: IUser | null = await findUser(username);
        if (!user) {
          return done(null, false, { message: 'Incorrect username' });
        }
        const isMatch: boolean = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect password' });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    },
    (err, user) => {
      return err;
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await findUserById(id);
    // console.log(user)

    done(null, user);
  } catch (error) {
    return done(error, null);
  }
});

export default passport;
