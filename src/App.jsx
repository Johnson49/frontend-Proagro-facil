import { Outlet } from 'react-router-dom'
import style from './App.module.css'
import NavBar from './components/navbar/NavBar'

function App() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}

export default App
