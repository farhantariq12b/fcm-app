import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../service/modules/auth';
import { useUser } from '../context/UserContext';

interface SignUpForm {
  name: string;
  email: string;
  password: string;
}

const SignUpPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpForm>();
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: SignUpForm) => {
    try {
      setLoading(true);
      setError('');

      const response = await AuthService.signup(data);

      const { data: responseData } = response.data || {} 

      setUser(responseData);
      localStorage.setItem('accessToken', responseData.accessToken)
      navigate('/');
    } catch (error: any) {
      if (error.response) {
        const data = error.response.data;

        setError(data.message || 'An error occurred. Please try again later.');
        return
      }

      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-md">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
            <input 
              type="text" 
              id="name" 
              {...register('name', { required: true })} 
              className="form-input border border-gray-300 rounded-md w-full px-3 py-2" 
              placeholder="Enter your name" 
            />
            {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
            <input 
              type="email" 
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
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
          <p className="mt-4 text-sm">Already have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
