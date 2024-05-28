"use client";
import { Alert, Button, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";
import { Dispatch, SetStateAction, useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { Usuario } from "../interfaces";

export const Configuracion = ({setIsAuthenticated}:LayoutProps) => {
  const navigate= useNavigate();
  const [first, setfirst] = useState([])
    const {
        register,
        handleSubmit,
      } = useForm();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const submit = async (data:any) => {   
        const local: Usuario | null = JSON.parse(localStorage.getItem("data") || 'null');
        try {
          if (local?.jwt) {
            const axiosConfig = {
              headers: {
                'Authorization': `Bearer ${local.jwt}`
              }
            };
           
            await axios.put('http://192.168.1.110:3000/usuarios',data,axiosConfig);
            setIsAuthenticated(false)
            navigate('/login')
            return redirect('/login');
          }
         
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error:any) {
        
          setfirst(error.response.data.message)
        }

      }

      const borrarCuenta = async () =>{
        const local: Usuario | null = JSON.parse(localStorage.getItem("data") || 'null');
        try {
          if (local?.jwt) {
            const axiosConfig = {
              headers: {
                'Authorization': `Bearer ${local.jwt}`
              }
            };
            console.log(local.jwt)
            const response = await axios.delete('http://localhost:3000/usuarios',axiosConfig);
            console.log('Respuesta GET:', response.data);
            setIsAuthenticated(false)
            navigate('/login')
            return redirect('/login');
          }
         
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error:any) {
          console.error('Error en GET:', error);
          setfirst(error.response.data.message)
        }


      }


    return (
        <>
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12"> 
        <form onSubmit={handleSubmit((data) => submit(data) )} className=" mx-auto flex max-w-md flex-col gap-4">
      
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1" value="Ingresa tu nueva contraseña" />
        </div>
        <TextInput id="contrasenia" type="password" required  {...register('contrasenia')}  />
      </div>
      <div className="flex items-center gap-2">
       
      </div>
      <Button type="submit">Cambiar Contraseña</Button>

      
    
    </form>
    <div onClick={borrarCuenta} className="mx-auto mt-4 max-w-screen-xl px-4 lg:px-12">
      <div className="mx-auto flex max-w-md flex-col gap-4 ">
      <Button type="submit" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Borrar cuenta</Button>
      </div>
   
    </div>
  
    {first.map((element) => (
         <Alert color="failure" icon={HiInformationCircle}>
         <span className="font-medium"> {element} </span> 
       </Alert>
      ))}
     
        </div>
        </>
    );
};
interface LayoutProps {
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}