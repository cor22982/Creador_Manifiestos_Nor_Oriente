import React, { useEffect, useState } from 'react';
import './App.css'
import Logo from '@components/Logo'; 
import PopUp from '@components/PopUp';
function App() {
  const [showLogo, setShowLogo] = useState(true);
  const [showpop, setShowpop] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <button onClick={()=> setShowpop(true)}>ABRIR</button>
      <PopUp trigger={showpop} setTrigger={setShowpop}>
        <h1>HOLA POPUP</h1>
      </PopUp>
    </div>
  )
}

export default App
