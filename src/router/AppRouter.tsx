import  { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from '../Layout'
import { Conductores, Dashboard, Rutas } from '../pages'
import { Singup } from '../pages/Singup'
import { Login } from '../pages/Login'
import { Configuracion } from '../pages/Configuracion'

export const AppRouter = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);


  return (
   <>
   <Routes>
    {
        (isAuthenticated)
        ? 
        <>
           <Route path="/" element={<Layout setIsAuthenticated={setIsAuthenticated} />}>
              <Route  path="dashboard" element={<Dashboard />} />
              <Route path="conductores" element={<Conductores />} />
              <Route path="rutas" element={<Rutas />} />
              <Route path="configuracion" element={<Configuracion setIsAuthenticated={setIsAuthenticated} />} />
            </Route>
        </>
       :
       <>
      
          
       <Route path="/singup" element={<Singup  />}/>
       <Route path="/login" element={<Login  setIsAuthenticated={setIsAuthenticated} />}/>
         
         
           <Route path="/*" element={ <Navigate to="/singup" /> } />
          
       </>
    
    }
     <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
   </>

  )
}