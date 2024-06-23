import React from 'react'
import './Indice.css'
import MenuButton from '@components/MenuButton'
import { faHome, faFile } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
function Indice() {
  return (
    <div className='pantalla-indice'>
       <Router>
      <div className="opciones-navegacion">
        <MenuButton icono={faHome} goto='/'></MenuButton>
        <MenuButton icono={faFile} goto='/reports'></MenuButton>
        <MenuButton  text= 'GT' goto='/guatemala'></MenuButton>
        <MenuButton  text= 'USA' goto='/estados_unidos'></MenuButton>
      </div>
      <div className="interfaz">
      <Routes>
              <Route path="/estados_unidos" element={<About />} />
              <Route path="/guatemala" element={<Users />} />
              <Route path="/" element={<Home />} />
              <Route path="/reports" element={<Report/>}></Route>
            </Routes>
      </div>
      </Router>
    </div>
  )
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

function Report() {
  return <h2>Report</h2>;
}
export default Indice