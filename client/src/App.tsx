import "./App.module.scss"
import AppRoutes from "./routes/AppRoutes"
import {useAuth} from "./hooks/useAuth.ts"

function App() {
  const {loading} = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="App">
      <AppRoutes />
    </div>
  )
}

export default App
