import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import NotificationPage from './views/NotificationPage';
import { getToken } from 'firebase/messaging';
import { messaging } from './utils/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNotification } from './context/NotificationContext';
import Header from './components/shared/Header';


const App: React.FC = () => {
  const { setToken } = useNotification();

  async function requestPermission() {
    try {

      //requesting permission using Notification API
      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        const token = await getToken(messaging, {
          vapidKey: process.env.REACT_APP_FIREBASE_VAPID_TOKEN,
        });

        setToken(token)
      } else if (permission === "denied") {
        //notifications are blocked
        throw new Error('You have denined the notification access kindly enable it to see notification')
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong while enabling notifications");
    }

  }

  useEffect(() => {
    requestPermission();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<NotificationPage />} />
      </Routes>
    </>
  );
}

export default App;
