import React, { useEffect } from 'react';
import Button from '../components/shared/Button';
import { messaging, onMessage } from '../utils/firebase';
import { toast } from 'react-toastify';
import Notification from '../components/Notification';
import NotificationService from '../service/modules/notification';

const NotificationPage: React.FC = () => {
  const handleButton1Click = async () => {
    console.log("Button 1 clicked");
    await NotificationService.sendNotification({ title: 'Button 1 clicked', body: 'You have clicked button 1' })
  };

  const handleButton2Click = async () => {
    console.log("Button 2 clicked");
    await NotificationService.sendNotification({ title: 'Button 2 clicked', body: 'You have clicked button 2' })
  };

  const handleButton3Click = async () => {
    console.log("Button 3 clicked");
    await NotificationService.sendNotification({ title: 'Button 3 clicked', body: 'You have clicked button 3' })
  };

  useEffect(() => {
    onMessage(messaging, (payload) => {
      console.log('receiving', payload)
      toast(<Notification notification={payload.data || {}} />)
    })
  }, [])

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
