import express, { Request, Response, NextFunction } from 'express';
import NotificationController from '../app/notifications/NotificationController';

const router = express.Router();

router.post('/send', NotificationController.sendNotification);

export default router;
