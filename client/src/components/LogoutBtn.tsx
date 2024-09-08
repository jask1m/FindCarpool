import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const LogoutBtn = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
    navigate('/user/login');
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