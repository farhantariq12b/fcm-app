import React from 'react';

interface NotificationProps {
  notification: {
    title?: string;
    body?: string;
  };
}

const Notification: React.FC<NotificationProps> = ({ notification }) => {
  return (
    <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
      <p className="font-bold">{notification.title}</p>
      <p className="text-sm">{notification.body}</p>
    </div>
  );
};

export default Notification;
