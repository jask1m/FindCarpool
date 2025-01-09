import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const handleClick = () => {
    if (!user) {
      navigate('/user/login');
    } else {
      navigate('/carpool');
    }
  }
  
  return (
    <div>
      <h1>Let's get started. Find Carool.</h1>
      <button type="submit" onClick={handleClick} className="py-2 bg-blue-600 w-32 rounded text-white font-bold hover:bg-blue-700 disabled:bg-gray-400">
        get started.
      </button>
    </div>
  )
}

export default Home;