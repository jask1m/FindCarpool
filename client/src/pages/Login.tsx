import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import { getErrorMessage } from '../utils/helpers';
import { useForm, type FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TAuthFormSchema, authFormSchema } from '../lib/types';

export default function Login() {
  const { user, dispatch } = useAuthContext();
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const {
    register, 
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TAuthFormSchema>({
    resolver: zodResolver(authFormSchema)
  });

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/user/login`,
        data,
        { headers: { 'Content-Type': 'application/json' } }
      );

      const userData = {
        username: response.data.username,
        email: response.data.email,
        accessToken: response.data.accessToken,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      dispatch({ type: "LOGIN", payload: userData });
    } catch (error: unknown) {
      const msg = getErrorMessage(error);
      setError('root', { type: 'manual', message: msg });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-[calc(100vh-5rem)] flex items-center justify-center">
      <div className="w-[90vw] max-w-md flex flex-col items-center">
        <div className="text-gray-800 items-center mb-4">
          <div className="text-center text-xl font-bold">Welcome back!</div>
        </div>

        <div className="w-full flex flex-col items-center bg-white rounded-md shadow-md pt-6 pb-4">
            <div className="w-3/4 mb-2">
              <input
                {...register('email')}
                type="email"
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
              {errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>}
            </div>

            <div className="w-3/4 mb-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="py-2 bg-blue-600 w-full rounded text-white font-bold hover:bg-blue-700 disabled:bg-gray-400"
              >
                {isSubmitting ? 'Logging in...' : 'LOGIN'}
              </button>
            </div>
            {errors.root && (
              <div className="w-3/4 mb-2">
                <div
                className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-1 text-[15px]"
                  role="alert"
                >
                  <p>{errors.root.message}</p>
                </div>
              </div>
            )}
          </div>
        <div className="flex justify-center mt-2 text-gray-700 text-sm">
          <div className="flex flex-col sm:flex-row justify-between w-full items-center">
              <div
                className="text-[15px] hover:text-blue-600 cursor-pointer font-bold"
                onClick={() => navigate("/user/signup")}
              >
                Don't have an account? Get Started.
              </div>
            </div>
          </div>
        </div>
    </form>
  );
}
