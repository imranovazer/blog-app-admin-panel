import React, { useState } from 'react'
import { useEffect } from 'react';
import { createContext } from 'react'

export const AuthContex = createContext(null) ;

function AuthContexProvider({children}) {

    const [isAuth , setIsAuth] = useState(false) ;
    useEffect(()=>
    {
        const token = localStorage.getItem("accesToken") ;
        if(token)
        {
            setIsAuth(true) ;
        }
        else
        {
            setIsAuth(false) ;
        }
    },[])
  return (
    <AuthContex.Provider value={{isAuth, setIsAuth}}> 
        {children}
    </AuthContex.Provider>
  )
}

export default AuthContexProvider