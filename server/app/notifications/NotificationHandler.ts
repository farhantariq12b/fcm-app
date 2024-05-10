import { Subscription } from "../../models/Subscription";
import { User } from "../../models/User";
import { UserNotification } from "../../models/UserNotification";

class NotificationHandler {
  static createNotification(data: any, userId: number): Promise<any> {
    return UserNotification.create({ data, userId });
  }

  static createSubscription(
    token: string,
    userId: number,
    device: string
  ): Promise<any> {
    return Subscription.create({ token, userId, device });
  }

  static findSubscription(token: string, userId: number): Promise<any> {
    return Subscription.findOne({
      where: {
        userId,
        token,
      },
    });
  }

  static updateSubscription(id: number): Promise<any> {
    return UserNotification.update(
      { readAt: new Date() },
      {
        where: {
          id,
        },
      }
    );
  }

  static findSubscribedUser(): Promise<any> {
    return User.findAll({
      include: {
        model: Subscription,
        required: true,
        attributes: ["token"],
      },
    });
  }
}

export default NotificationHandler;
