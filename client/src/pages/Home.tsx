import { useAuthContext } from "../hooks/useAuthContext"
import MyCourses from "../components/MyCourses";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const {user} = useAuthContext();
  return <>
    <h1>Welcome {user?.username}</h1>
    <div>
      <MyCourses />
    </div>
  </>
}

export default Home
