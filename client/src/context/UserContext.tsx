import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../interfaces/User';
import { useNavigate } from 'react-router-dom';
import UserService from '../service/modules/user';
import { useNotification } from './NotificationContext';
import { getToken } from 'firebase/messaging';
import { messaging } from '../utils/firebase';
import { toast } from 'react-toastify';
import NotificationService from '../service/modules/notification';

interface UserContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  requestPermission: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { token: appToken, setToken } = useNotification();
  const navigate = useNavigate();

  const fetchUserDetails = async () => {
    try {
      const response = await UserService.getUserDetails();
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  async function requestPermission() {
    try {
      if (appToken) {
        return;
      }

      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        const token = await getToken(messaging, {
          vapidKey: process.env.REACT_APP_FIREBASE_VAPID_TOKEN,
        });

        setToken(token)
        await NotificationService.createSubscription({ token })
      } else if (permission === "denied") {
        //notifications are blocked
        throw new Error('You have denined the notification access kindly enable it to see notification')
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong while enabling notifications");
    }

  }

  useEffect(() => {
    if (user) {
      requestPermission()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  useEffect(() => {
    fetchUserDetails();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, setUser, requestPermission }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
