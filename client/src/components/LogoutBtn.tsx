import { useLogout } from '../hooks/useLogout';

const LogoutBtn = () => {
  const { logout } = useLogout();
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