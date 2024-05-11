"use client";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import { Alert, Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { redirect } from "react-router-dom";
import { NavbardNoAuth } from '../components/NavbardNoAuth';
interface MyInputTypes {
    correo: string;
    contrasenia: string;
    codigoInvitacion:string
  }
  

export const Singup = () => {
    const navigate= useNavigate();
    const [first, setfirst] = useState([])
    const {
        register,
        handleSubmit,
        
      } = useForm<MyInputTypes>();

      const submit = async (data:MyInputTypes) => {   
        try {
            await axios.post("http://localhost:3000/usuarios/register",data)
            localStorage.setItem('auth', 'true');
            navigate('/login')
            return redirect('/login');
       // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error:any) {
            console.log(error.response.data.message)
            setfirst(error.response.data.message)
            localStorage.setItem('auth', 'false');
        }
       
        return   redirect("login");
      }
      
    return (
        <>
        <NavbardNoAuth></NavbardNoAuth>
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12"> 
        <form onSubmit={handleSubmit((data) => submit(data))} className=" mx-auto flex max-w-md flex-col gap-4">
       
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email1" value="Ingresa tu correo"/>
        </div>
        <TextInput id="correo" type="email" placeholder="correo" {...register('correo')} required />
    
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1" value="Tu contraseña" />
        </div>
        <TextInput id="contrasenia" type="password" required  {...register('contrasenia')}  />
     
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="code" value="Ingresa tu código de invitación" />
        </div>
        <TextInput id="code" type="text" required  {...register('codigoInvitacion')}  />
      </div>
      <Button type="submit">Registrarse</Button>

      {first.map((element) => (
         <Alert color="failure" icon={HiInformationCircle}>
         <span className="font-medium"> {element} </span> 
       </Alert>
      ))}
     
    </form>
        </div>
        </>
    );
};
