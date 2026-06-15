import { useState } from 'react'
import Header from './components/Header/Header'
import Login from './pages/Login/Login'
import './App.module.scss'

function App() {
  const [isLoggedIn] = useState(false)

  return (
    <div className="App">
      {isLoggedIn ? <Header /> : <Login />}
    </div>
  )

}

export default App
