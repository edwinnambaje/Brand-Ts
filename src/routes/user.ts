import { NextFunction, Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';

import Passport from '../helper/wait'
import passport from '../helper/passport'
import { IUser } from '../models/user';

const router = Router();

router.post(
  '/register',
  passport.authenticate('register', { session: false }),
  async (req, res, next) => {
    res.json({
      message: 'register successful',
      user: req.user
    });
  }
);
// ...
router.post(
  '/login',
  async (req: Request, res: Response, next: NextFunction) => {
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
              const mes = info.message
              return res.json({ token, mes });
            }
          );
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }
);
router.get(
  '/profile',
  Passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    res.json({
      message: 'You made it to the secure route',
      user: req.user,
      token: req.query.secret_token
    })
  }
);

export default router;
