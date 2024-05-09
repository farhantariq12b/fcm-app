import React from 'react';
import Button from '../components/shared/Button';
import { messaging, onMessage } from '../utils/firebase';
import { toast } from 'react-toastify';
import Notification from '../components/Notification';

const NotificationPage: React.FC = () => {
  const handleButton1Click = () => {
    console.log("Button 1 clicked");
  };

  const handleButton2Click = () => {
    console.log("Button 2 clicked");
  };

  const handleButton3Click = () => {
    console.log("Button 3 clicked");
  };


  onMessage(messaging, (payload) => {
    toast(<Notification notification={payload.notification || {}} />)
  })

  return (
    <div className="container mx-auto max-w-md mt-10">
      <h1 className="text-2xl font-bold mb-4">Notification Page</h1>
      <div className="flex space-x-4 mt-4">
        <Button label="Button 1" onClick={handleButton1Click} />
        <Button label="Button 2" onClick={handleButton2Click} />
        <Button label="Button 3" onClick={handleButton3Click} />
      </div>
    </div>
  );
};

export default NotificationPage;
