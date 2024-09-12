import { useAuthContext } from "../hooks/useAuthContext";
import LogoutBtn from "./LogoutBtn";

const Navbar = () => {
  const { user } = useAuthContext();

  return (
    <nav className="flex items-center justify-center h-20">
      <div className="px-6 py-2 bg-white rounded-full shadow-md border border-gray-200 flex items-center space-x-4">
        <a href="/" className="px-4 py-2 text-black hover:bg-gray-100 rounded-full transition duration-300">Home</a>
        {user ? <>
          <a href="/carpool" className="px-4 py-2 text-black hover:bg-gray-100 rounded-full transition duration-300">Carpool</a>
          <LogoutBtn />
        </> : (
          <>
            <a href="/user/login" className="px-4 py-2 bg-gray-200 text-black hover:bg-gray-300 rounded-full transition duration-300">Login</a>
            <a href="/user/signup" className="px-4 py-2 bg-gray-200 text-black hover:bg-gray-300 rounded-full transition duration-300">Sign Up</a>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar