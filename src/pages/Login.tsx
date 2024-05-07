"use client";

import { Button, Label, TextInput } from "flowbite-react";

import { useForm } from "react-hook-form";


export const Login = () => {
    const {
        register,
        handleSubmit,
      
      } = useForm();
    return (
        <>
        <h1>Login</h1>
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12"> 
        <form onSubmit={handleSubmit((data) => console.log(data))} className=" mx-auto flex max-w-md flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email1" value="Ingresa tu correo"/>
        </div>
        <TextInput id="email1" type="email" placeholder="correo" {...register('email')} required />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1" value="Your password" />
        </div>
        <TextInput id="password1" type="password" required  {...register('password')}  />
      </div>
      <div className="flex items-center gap-2">
       
      </div>
      <Button type="submit">Login</Button>
    </form>
        </div>
        </>
    );
};
