// index.ts
import express from 'express';
const router = express.Router();
import * as authController from '../controllers/authController';
import * as signupController from '../controllers/signupController';
import * as profileController from '../controllers/profileController';
import authenticateMiddleware from '../middlewares/authenticateMiddleware';

router.post('/login', authController.login);
router.post('/signup', signupController.signup);
router.get('/profile', authenticateMiddleware, profileController.getProfile);

export default router;
