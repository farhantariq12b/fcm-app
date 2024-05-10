import api from "..";

class NotificationService {

  static sendNotification(data: any) {
    return api({
      method: 'post',
      url: '/notifications/send',
      data
    })
  }

  static updateNotification(id: number) {
    return api({
      method: 'put',
      url: `/notifications/${id}`
    })
  }

  static createSubscription(data: any) {
    return api({
      method: 'post',
      url: `/subscriptions`,
      data
    })
  }
}

export default NotificationService;
