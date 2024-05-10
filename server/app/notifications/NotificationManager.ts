import FirebaseService from "../../middleware/FIrebase";
import NotificationHandler from "./NotificationHandler";


class NotificationManager {
  static async sendNotification(data: any, userId?: number) {
    const users = await NotificationHandler.findSubscribedUser();


    // TODO: instead of loop create batched to process data and move it to background for sending notification
    for (const user of users) {
      const subscriptions = Array.from(
        user.subscriptions.reduce((map: any, obj: any) => map.set(obj.token, obj), new Map()).values()
      ) as { token: string }[];
      for (const subscription of subscriptions) {
        console.log(subscription.token)

        const notification = (await NotificationHandler.createNotification(data, userId!)).toJSON();
        await FirebaseService.sendNotification({ ...notification, ...data, token: subscription.token })
      }
    }

  }

  static async updateNotification(id: number) {
    await NotificationHandler.updateSubscription(id);
  }

  static async createSubscription({ token, userId, device }: { token: string, userId?: number, device?: string }) {
    const existingSubscription = await NotificationHandler.findSubscription(token, userId!)

    if (existingSubscription) {
      return existingSubscription;
    }

    return NotificationHandler.createSubscription(token, userId!, device!)
  }
}

export default NotificationManager;
