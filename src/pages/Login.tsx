"use client";

import { Alert, Button, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { NavbardNoAuth } from "../components/NavbardNoAuth";
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";
import { Dispatch, SetStateAction, useState } from "react";
import { HiInformationCircle } from "react-icons/hi";


export const Login = ({setIsAuthenticated}:LayoutProps) => {
  const navigate= useNavigate();
  const [first, setFirst] = useState<string[]>([]);
    const {
        register,
        handleSubmit,
      
      } = useForm();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const submit = async (data:any) => {   
        try {
           const response =  await axios.post("http://localhost:3000/usuarios/login",data)
         
            const jwt = response.data.jwt
            const objetoSerializado = JSON.stringify(response.data);
            localStorage.setItem('auth', 'true');
            localStorage.setItem('data',objetoSerializado)
            localStorage.setItem('jwt',jwt)
            console.log(response.data)
            setIsAuthenticated(true)
            navigate('/dashboard')
            return redirect('/dashboard');
       // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error:any) {
           console.log(error)
           
            if (Array.isArray(error.response.data.message)) {
              setFirst(error.response.data.message)
            }else{
              const arreglo = [error.response.data.message]
              setFirst(arreglo)
            }
            localStorage.setItem('auth', 'false');
        }
       
        return redirect("login");
      }



    return (
        <>
        <NavbardNoAuth></NavbardNoAuth>
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12"> 
        <form onSubmit={handleSubmit((data) => submit(data) )} className=" mx-auto flex max-w-md flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email1" value="Ingresa tu correo"/>
        </div>
        <TextInput id="email1" type="email" placeholder="correo" {...register('correo')} required />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1" value="Ingresa tu contraseña" />
        </div>
        <TextInput id="password1" type="password" required  {...register('contrasenia')}  />
      </div>
      <div className="flex items-center gap-2">
       
      </div>
      <Button type="submit">Iniciar Sesión</Button>
    </form>
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