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
      <button onClick={handleClick} className="border border-black">get started.</button>
    </div>
  )
}

export default Home;