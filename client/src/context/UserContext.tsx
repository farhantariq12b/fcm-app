import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../interfaces/User';
import { useNavigate } from 'react-router-dom';
import UserService from '../service/modules/user';

interface UserContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
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

    fetchUserDetails();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, setUser }}>
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
