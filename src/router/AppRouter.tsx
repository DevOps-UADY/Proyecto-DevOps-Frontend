import  { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from '../Layout'
import { Conductores, Dashboard, Rutas, Asignaciones, Recorridos } from '../pages'
import { Singup } from '../pages/Singup'
import { Login } from '../pages/Login'
import { Vehiculos } from '../pages/Vehiculos'
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
              <Route path="vehiculos" element={<Vehiculos />} />
              <Route path="recorridos" element={<Recorridos />} />
              <Route path="configuracion" element={<Configuracion setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="asignaciones" element={<Asignaciones />} />
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
