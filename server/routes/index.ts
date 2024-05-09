import express, { Request, Response, NextFunction } from 'express';
import Authentication from '../middleware/Authentication';
import authRouter from './auth';
import notificationRouter from './user-notification';
import UserController from '../app/users/UserController';

const router = express.Router();

/* GET home page. */
router.get('/', function(req: Request, res: Response, next: NextFunction) {
  res.send({ status: 'Server is working' });
});

router.use('/v1/api/auth', authRouter);
router.use(Authentication.authenticate)
router.use('/v1/api/notifications', notificationRouter)
router.use('/v1/api/me', UserController.getUserDetails)

export default router;
