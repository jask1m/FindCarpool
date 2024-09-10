import { useAuthContext } from "../hooks/useAuthContext"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LogoutBtn = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { user, dispatch } = useAuthContext();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      localStorage.removeItem('user');
      const response = await axios.post(`${BASE_URL}/user/logout`, {}, { 
        withCredentials: true,
        headers: { 
          Authorization: `Bearer ${user?.accessToken}`,
        }
      });
      if (response.status == 200) {
        dispatch({ type: 'LOGOUT' });
        navigate('/user/login');
      }
    } catch (error) {
      console.log('Error logging out:', error);
    }
  }

  return (
    <button
      onClick={logout}
      className="px-4 py-2 text-black hover:bg-gray-100 rounded-full transition duration-300"
    >
      Logout
    </button>
  )
}

export default LogoutBtn