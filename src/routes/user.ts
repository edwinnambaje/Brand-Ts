import { Router } from 'express';
import Passport from '../helper/wait'
import * as AuthController from '../controllers/user';
import passport from '../helper/passport'

const router = Router();

router.post('/register', passport.authenticate('register', { session: false }), AuthController.register);
router.post('/login', AuthController.login);
router.get('/profile', Passport.authenticate('jwt', { session: false }), AuthController.secureRoute);

export default router;
