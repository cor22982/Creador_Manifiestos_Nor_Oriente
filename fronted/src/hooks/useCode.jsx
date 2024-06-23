import { useState, useEffect, createContext, useContext } from 'react'

const CodeContext = createContext({code: '', useCode: () => {}});

const CodeProvider = ({ children }) => {
  const [ code, setCode ] = useState(
    localStorage.getItem('code') || null
  )

  useEffect(() => {
    if (code) {
      localStorage.setItem('code', code)
    }
  }, [code])

  return (
    <CodeContext.Provider value={{ code, setCode}}>
      {children}
    </CodeContext.Provider>
  )
}

const useCode = () => {
  return useContext(CodeContext) 
}


export default useCode
export {CodeContext, CodeProvider}