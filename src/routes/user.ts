import { Router } from 'express';
import authController from '../controllers/user';
import passport from 'passport';

const router = Router();

router.post('/register', authController.signup);
router.post('/login', authController.signin);
router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send('You have accessed a protected route!');
});

export default router;
