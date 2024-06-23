import React, { useEffect, useState } from 'react';
import './App.css'
import Logo from '@components/Logo'; 
import Manifiesto from './PopUps/Manifiesto/Manifiesto';
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

      <Manifiesto></Manifiesto>

    </div>
  )
}

export default App
