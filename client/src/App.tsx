import { AuthContextProvider } from './context/AuthContext'
import { useAuthContext } from './hooks/useAuthContext'
import './App.css'

function App() {
  const user = useAuthContext();
  return (
    <AuthContextProvider>
      {user && <p>user here</p>}
    </AuthContextProvider>
  )
}

export default App
