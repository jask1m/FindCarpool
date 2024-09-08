import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import { useForm, type FieldValues } from 'react-hook-form';
import { authSignUpFormSchema, TAuthSignUpFormSchema } from '../lib/types';
import { zodResolver } from '@hookform/resolvers/zod';

type TCredentials = {
  username: string;
  email: string;
  password: string;
};

export default function SignUp() {
  const { user, dispatch } = useAuthContext();
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const {
    register, 
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TAuthSignUpFormSchema>({
    resolver: zodResolver(authSignUpFormSchema)
  });

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const registerUser = async (data: FieldValues) => {
    const formattedData: TCredentials = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/user/register`, formattedData, {
          headers: {'Content-Type': 'application/json',},
        });

      localStorage.setItem(
        'user',
        JSON.stringify({
          username: response.data.username,
          email: response.data.email,
          accessToken: response.data.accessToken,
        })
      );
      console.log('User registered successfully.');
      dispatch({ type: 'LOGIN', payload: response.data });
    } catch (error) {
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(registerUser)} className="h-[calc(100vh-5rem)] flex items-center justify-center">
      <div className="w-[90vw] max-w-md flex flex-col items-center">
        <div className="text-gray-800 items-center mb-4">
          <div className="text-center text-xl font-bold">Welcome!</div>
        </div>

        <div className="w-full flex flex-col items-center bg-white rounded-md shadow-md pt-6 pb-4">
            <div className="w-3/4 mb-2">
              <input
                {...register('username')}
                type="name"
                className="w-full py-2 px-4 bg-gray-50 placeholder:font-semibold rounded hover:ring-1 hover:ring-gray-400 outline-gray-300 border-solid border-2 border-gray-200"
                placeholder="Username"
              />
              {errors.username && <p className='text-red-500 text-sm mt-1'>{errors.username.message}</p>}
            </div>

            <div className="w-3/4 mb-2">
              <input
                {...register('email')}
                type="email"
                name="email"
                className="w-full py-2 px-4 bg-gray-50 placeholder:font-semibold rounded hover:ring-1 hover:ring-gray-400 outline-gray-300 border-solid border-2 border-gray-200"
                placeholder="Email address"
              />
              {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>}
            </div>

            <div className="w-3/4 mb-2">
              <input
                {...register('password')}
                type="password"
                className="w-full py-2 px-4 bg-gray-50 placeholder:font-semibold rounded hover:ring-1 hover:ring-gray-400 outline-gray-300 border-solid border-2 border-gray-200"
                placeholder="Password"
              />
            </div>

            <div className="w-3/4 mb-2">
              <button
                disabled={isSubmitting}
                type="submit"
                className="py-2 bg-blue-600 w-full rounded text-white font-bold hover:bg-blue-700"
              > 
                {isSubmitting ? 'Registering...' : 'Sign Up'}
              </button>
            </div>
          </div>
        <div className="flex justify-center mt-2 text-gray-700 text-sm">
          <div className="flex flex-col sm:flex-row justify-between w-full items-center">
              <div
              className="text-[15px] hover:text-blue-600 cursor-pointer font-bold"
              onClick={() => navigate('/user/login')}
              >
                Back to login
              </div>
            </div>
          </div>
        </div>
    </form>
  );
}