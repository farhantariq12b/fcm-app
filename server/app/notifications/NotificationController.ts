import { Request, Response } from "express";
import NotificationManager from "./NotificationManager";
import Exception from "../../helpers/Exception";
import Validators from "../../utils/Validators";
import ErrorCodes from "../../constants/ErrorCodes";
import UserConstants from "../../constants/UserConstants";


class NotificationController {
  static async sendNotification(req: Request, res: Response) {
    try {
      await NotificationManager.sendNotification(req.body, req.user?.id);

      res.json({
        success: true
      });
    } catch (err) {
      const error = err as Exception;

      console.log(`sendNotification:: Request to sendNotification failed. data:: `, req.body, err);

      return res
        .status(Validators.validateCode(error.code, ErrorCodes.INTERNAL_SERVER_ERROR) || ErrorCodes.INTERNAL_SERVER_ERROR)
        .json({
          success: false,
          message: error.reportError ? error.message : UserConstants.Notification.SENDING_NOTIFICATION_FAILED,
        });
    }
  }

  static async updateNotification(req: Request, res: Response) {
    try {
      await NotificationManager.updateNotification(+req.params.id);

      res.json({
        success: true
      });
    } catch (err) {
      const error = err as Exception;

      console.log(`sendNotification:: Request to sendNotification failed. data:: `, req.body, err);

      return res
        .status(Validators.validateCode(error.code, ErrorCodes.INTERNAL_SERVER_ERROR) || ErrorCodes.INTERNAL_SERVER_ERROR)
        .json({
          success: false,
          message: error.reportError ? error.message : UserConstants.Notification.SENDING_NOTIFICATION_FAILED,
        });
    }
  }

  static async createSubscription(req: Request, res: Response) {
    try {
      const device = req.headers['user-agent'];

      const userId = req.user?.id

      const subscription = await NotificationManager.createSubscription({ token: req.body.token, userId, device });

      res.json({
        success: true,
        data: subscription
      });
    } catch (err) {
      const error = err as Exception;

      console.log(`createSubscription:: Request to createSubscription failed. data:: `, req.body, err);

      return res
        .status(Validators.validateCode(error.code, ErrorCodes.INTERNAL_SERVER_ERROR) || ErrorCodes.INTERNAL_SERVER_ERROR)
        .json({
          success: false,
          message: error.reportError ? error.message : UserConstants.Subscription.CREATION_OF_SUBSCRIPTION_FAILED,
        });
    }
  }
}

export default NotificationController;

