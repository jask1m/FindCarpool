import { useAuthContext } from "../hooks/useAuthContext"
import MyCourses from "../components/MyCourses";

const Home = () => {
  const {user} = useAuthContext();

  return <>
    <h1>Welcome {user?.username}</h1>
    <div>
      <MyCourses />
    </div>
  </>
}

export default Home
