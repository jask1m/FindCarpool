import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import { getErrorMessage } from '../utils/helpers';

export default function SignUp() {
  const { user, dispatch } = useAuthContext();
  const [error, setError] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const registerUser = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post
        (`${BASE_URL}/user/register`, {
          username: username,
          email: email,
          password: password,
        },
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );

      localStorage.setItem(
        'user',
        JSON.stringify({
          username: response.data.username,
          email: response.data.email,
          token: response.data.token,
        })
      );
      alert("User registered succesfully.");
      dispatch({ type: 'LOGIN', payload: response.data });
    } catch (error: unknown) {
      const msg = getErrorMessage(error);
      setError(msg);
      return {
        error: msg,
      }
    }
    setError('');
    setEmail('');
    setPassword('');
    setUsername('');
  };

  return (
    <form onSubmit={registerUser}>
      <div className="bg-black">
        <div className="flex justify-center container mx-auto my-auto w-[90vw] h-screen items-center flex-col">
          <div className="text-slate-100 items-center">
            <div className="text-center pb-1">Welcome!</div>
          </div>

          <div className="w-full md:w-3/4  lg:w-1/2 flex flex-col items-center bg-gray-300 rounded-md pt-6">
            <div className="w-3/4 mb-2">
              <input
                type="name"
                name="name"
                id="name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full py-2 px-4 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 hover:ring-gray-600 outline-slate-500 border-solid border-2 border-slate-300"
                placeholder="Name"
              />
            </div>

            <div className="w-3/4 mb-2">
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full py-2 px-4 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 hover:ring-gray-600 outline-slate-500 border-solid border-2 border-slate-300"
                placeholder="Email address"
              />
            </div>

            <div className="w-3/4 mb-2">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                name="password"
                id="password"
                className="w-full py-2 px-4 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 hover:ring-gray-600 outline-slate-500  border-solid border-2 border-slate-300"
                placeholder="Password"
              />
            </div>

            <div className="w-3/4 mb-2">
              <button
                type="submit"
                className="py-2 bg-black w-full rounded text-blue-50 font-bold hover:bg-blue-700"
              >
                SIGN UP
              </button>
            </div>

            {error && (
              <div className="w-3/4 mb-2">
                <div
                  className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-1 text-[15px] "
                  role="alert"
                >
                  <p>{error}</p>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-center container mx-auto mt-2 text-slate-100 text-sm">
            <div className="flex flex-col sm:flex-row  justify-between md:w-1/2 items-center">
              <div
                className="flex text-[15px] hover:text-blue-300 cursor-pointer"
                onClick={() => navigate("/user/login")}
              >
                Back to login
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}