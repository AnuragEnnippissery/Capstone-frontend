import { Outlet } from "react-router-dom"
import Header from "./components/Header/Header"
function App() {
  

  return (
    <>
      <h5>Capstone</h5>
      <Header/>
      <Outlet/>
        
    </>
  )
}

export default App
