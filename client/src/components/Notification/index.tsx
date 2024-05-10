import React, { useEffect } from 'react';
import NotificationService from '../../service/modules/notification';

interface NotificationProps {
  notification: {
    notificationId?: number;
    title?: string;
    body?: string;
  };
}

const Notification: React.FC<NotificationProps> = ({ notification }) => {
  const updateNotification = async () => {
    try {
      await NotificationService.updateNotification(notification.notificationId!)
    } catch (error) {
      // TODO: report to sentry
      console.log('Error: while sending request')
    }
  }

  useEffect(() => {
    if (notification) updateNotification()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification])

  return (
    <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
      <p className="font-bold">{notification.title}</p>
      <p className="text-sm">{notification.body}</p>
    </div>
  );
};

export default Notification;
