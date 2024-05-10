import express from 'express';
import AuthController from '../app/auth/AuthController';

const router = express.Router();

router.post('/login', AuthController.login)
router.post('/sign-up', AuthController.signUp)

export default router;
