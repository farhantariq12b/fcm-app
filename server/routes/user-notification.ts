import express from 'express';
import NotificationController from '../app/notifications/NotificationController';

const router = express.Router();

router.post('/send', NotificationController.sendNotification);
router.put('/:id', NotificationController.updateNotification);

export default router;
