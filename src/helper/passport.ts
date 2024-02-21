import passport from 'passport';
import { Request } from 'express';
import bcrypt from 'bcrypt';
import UserModel, { IUser } from '../models/user';
const localStrategy = require('passport-local').Strategy;

// ...
passport.use(
  'register',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req: Request,email:string, password:string, done: (error: any, user?: IUser | false) => void) => {
      try {
        const username = req.body?.username
        const user = await UserModel.create({ email, password, username });
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
// ...

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email: string, password: string, done : (error :any , user?: IUser | false,options?: { message?: string; error?: any })=> void) => {
      try {
        const user = await UserModel.findOne({ email });
        if (!user) {
          return done(null, false, { message: 'User not found' });
        }
        const compare = await bcrypt.compare(password, user.password);
        if (!compare) {
          return done(null, false, { message: 'Wrong Password' });
        }
        return done(null, user, { message: 'Logged in Successfully' });
      } catch (error) {
        return done(error);
      }
    }
  )
);
export default passport