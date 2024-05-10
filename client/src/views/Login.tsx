import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../service/modules/auth';
import { useUser } from '../context/UserContext';

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (data: LoginForm) => {
    try {
      setLoading(true);
      setError('');

      const response = await AuthService.login(data);

      console.log('Login successful:', response.data);
      const { data: responseData } = response.data || {};
      if (responseData.accessToken) {
        localStorage.setItem('accessToken', responseData.accessToken);
        setUser(responseData);
        navigate('/');
      }
    } catch (error) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
            <input 
              type="text" 
              id="email" 
              {...register('email', { required: true })} 
              className="form-input border border-gray-300 rounded-md w-full px-3 py-2" 
              placeholder="Enter your email" 
            />
            {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
            <input 
              type="password" 
              id="password" 
              {...register('password', { required: true })} 
              className="form-input border border-gray-300 rounded-md w-full px-3 py-2" 
              placeholder="Enter your password" 
            />
            {errors.password && <p className="text-red-500 text-sm">Password is required</p>}
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <p className="mt-4 text-sm">Don't have an account? <Link to="/signup" className="text-blue-500">Sign up</Link></p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
