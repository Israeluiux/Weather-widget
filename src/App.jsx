import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Weather from "./Pages/Weather/Weather"
import './App.css'

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Weather />}/>
      </Routes>
    </Router>
  )
}

export default App
