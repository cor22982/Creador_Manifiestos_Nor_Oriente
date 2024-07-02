import React from 'react'
import './Indice.css'
import MenuButton from '@components/MenuButton'
import GTAdress from '../GTAdress/GTAdress';
import USAdress from '../GTAdress/USAdress';
import { faHome, faFile } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from '../Home/Home';

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
              <Route path="/estados_unidos" element={<USAdress/>} />
              <Route path="/guatemala" element={<GTAdress/>} />
              <Route path="/" element={<Home/>} />
              <Route path="/reports" element={<Report/>}></Route>
            </Routes>
      </div>
      </Router>
    </div>
  )
}



function Report() {
  return <h2>Report</h2>;
}
export default Indice