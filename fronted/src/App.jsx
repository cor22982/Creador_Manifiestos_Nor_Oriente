import React, { useEffect, useState } from 'react';
import './App.css'
import Logo from '@components/Logo'; 
import Inicio from './Paginacion/Inicio';
import {CodeProvider} from '@hooks/useCode'
function App() {
  const [showLogo, setShowLogo] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <CodeProvider>
        {showLogo && <Logo />} 
        {!showLogo && (
          <Inicio></Inicio>
          )}
      </CodeProvider>
    </div>
  )
}

export default App
