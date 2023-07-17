import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContex } from '../contex/AuthContex';
function ProectedRoute({shouldAuth}) {
    const {isAuth} = useContext(AuthContex) ;
    if(shouldAuth )
    {
       return isAuth?<Outlet/> : <Navigate to="/login"/>
    }
    else if(!shouldAuth)
    {
        return isAuth?<Navigate to="/"/> : <Outlet/>
    }
    
  
}

export default ProectedRoute