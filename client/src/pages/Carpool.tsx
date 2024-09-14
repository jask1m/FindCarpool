import { useAuthContext } from "../hooks/useAuthContext"
import { useState } from "react";
import { TCarpoolOptions } from "../lib/types";
import NewCourseForm from "../components/NewCourseForm";

const Home = () => {
  const [option, setOption] = useState<TCarpoolOptions>("Create");
  const {user} = useAuthContext();

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="flex flex-col md:flex-row justify-between gap-8">
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">
            {option === "Create" && "Create a new carpool route."}
            {option === "Matches" && "Find potential carpool matches."}
            {option === "View" && "View your active carpool routes."}
          </h1>
          <div className="flex space-x-4 mb-6">
            <button 
              onClick={() => setOption("Create")} 
              className={`px-4 py-2 rounded ${option === "Create" ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Create
            </button>
            <button 
              onClick={() => setOption("Matches")} 
              className={`px-4 py-2 rounded ${option === "Matches" ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Matches
            </button>  
            <button 
              onClick={() => setOption("View")} 
              className={`px-4 py-2 rounded ${option === "View" ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              View
            </button>
          </div>
          {option === "Create" && <NewCourseForm />}
        </div>
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Welcome {user?.username}</h1>
          <p>map</p>
        </div>
      </section>
    </main>
  );
}

export default Home
