import  { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from '../Layout'
import { Conductores, Dashboard, Rutas } from '../pages'
import { Singup } from '../pages/Singup'
import { Login } from '../pages/Login'

export const AppRouter = () => {

    const [auth] = useState(false)
  return (
   <>
   <Routes>
    {
        (auth===true)
        ? 
        <>
           <Route path="/" element={<Layout />}>
              <Route  path="dashboard" element={<Dashboard />} />
              <Route path="conductores" element={<Conductores />} />
              <Route path="rutas" element={<Rutas />} />
             
            </Route>
        </>
       :
       <>
      
          
       <Route path="/singup" element={<Singup />}/>
       <Route path="/login" element={<Login />}/>
         
         
           <Route path="/*" element={ <Navigate to="/singup" /> } />
          
       </>
    
    }
     <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
   </>

  )
}
