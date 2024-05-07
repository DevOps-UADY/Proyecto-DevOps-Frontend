"use client";

import axios from "axios";
import { Alert, Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { useForm } from "react-hook-form";
interface MyInputTypes {
    correo: string;
    contrasenia: string;
    codigo:string
  }
  

export const Singup = () => {
    const [first, setfirst] = useState([])
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<MyInputTypes>();

      const submit = async (data:MyInputTypes) => {
        
     
        
        try {
            await axios.post("http://localhost:3000/usuarios/register",data)
        } catch (error:any) {
            console.log(error.response.data.message)
            setfirst(error.response.data.message)
        }
       
      
      }
      
    return (
        <>
        <h1>REGISTERrrr</h1>
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12"> 
        <form onSubmit={handleSubmit((data) => submit(data))} className=" mx-auto flex max-w-md flex-col gap-4">
       
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email1" value="Ingresa tu correo"/>
        </div>
        <TextInput id="email1" type="email" placeholder="correo" {...register('correo')} required />
    
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1" value="Your password" />
        </div>
        <TextInput id="password1" type="password" required  {...register('contrasenia')}  />
        {errors.contrasenia ? <p>{errors.contrasenia.message}</p> : null}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="code" value="Ingresa tu código de invitación" />
        </div>
        <TextInput id="code" type="text" required  {...register('codigo')}  />
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
