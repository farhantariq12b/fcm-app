import express from 'express';
import NotificationController from '../app/notifications/NotificationController';

const router = express.Router();

router.post('/', NotificationController.createSubscription);

export default router;
