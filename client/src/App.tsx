import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotificationPage from './views/NotificationPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/shared/Header';
import LoginPage from './views/Login';
import PrivateRoute from './components/shared/PrivateRoute';
import { useUser } from './context/UserContext';
import SignUpPage from './views/SignUp';
import Loader from './components/shared/Loader';


const App: React.FC = () => {
  const { loading } = useUser();

  if (loading) {
    return <Loader />
  }

  return (
    <>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <NotificationPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
