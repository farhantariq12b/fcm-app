import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');

    setUser(null);

    navigate('/login');
  };

  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-white font-bold text-xl">My App</div>
      <button 
        onClick={handleLogout} 
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
