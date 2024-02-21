import { Request, Response, NextFunction } from 'express';
import passport from '../helper/passport'
import jwt from 'jsonwebtoken';
import { IUser } from '../models/user';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: 'register successful',
    user: req.user
  });
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    'login',
    async (err: any, user: IUser | false, info: { message?: string }) => {
      try {
        if (err || !user) {
          const error = new Error(info?.message || 'An error occurred.');
          return next(error);
        }

        req.login(
          user,
          { session: false },
          async (error: any) => {
            if (error) return next(error);

            const body = { _id: user._id, email: user.email };
            const token = jwt.sign({ user: body }, 'TOP_SECRET');
            const message = info.message;

            return res.json({ token, message });
          }
        );
      } catch (error) {
        return next(error);
      }
    }
  )(req, res, next);
};

export const secureRoute = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: 'You made it to the secure route',
    user: req.user,
    token: req.query.secret_token
  });
};
