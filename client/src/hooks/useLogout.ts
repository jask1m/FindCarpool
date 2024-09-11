import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
  const { user, dispatch } = useAuthContext();
  const navigate = useNavigate();

  const logout = async (): Promise<void> => {
    try {
      const BASE_URL = import.meta.env.VITE_BASE_URL;
      localStorage.removeItem('user');
      const response = await axios.post(`${BASE_URL}/user/logout`, {}, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        }
      });
      if (response.status === 200) {
        dispatch({ type: 'LOGOUT' });
        navigate('/user/login');
      }
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

  return { logout };
};