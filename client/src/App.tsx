import { AuthContextProvider } from './context/AuthContext'
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import './axios/api';

function App() {
  return (
    <AuthContextProvider>
      <Navbar />
      <Outlet />
    </AuthContextProvider>
  )
}

export default App
