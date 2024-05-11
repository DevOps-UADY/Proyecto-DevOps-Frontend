"use client";

import { Avatar, Dropdown, Navbar } from "flowbite-react";
import Logo from "../assets/favicon.svg";

import { Link, redirect, useNavigate } from 'react-router-dom';
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Usuario } from "../interfaces";

export function Navbard({setIsAuthenticated}:LayoutProps) {
  const [first, setfirst] = useState<Usuario>({

    id:"test",
    correo:"werwer",
    contrasenia:"wwww",
codigoInvitacion:"swwww",
jwt:"xxxxxxx"
  })
  useEffect(() => {
    const data: Usuario | null = JSON.parse(localStorage.getItem("data") || 'null');
   
    if(data){
      
      setfirst(data)
    }

  }, [])
  
  const navigate= useNavigate();
  const logout = () =>{
    setIsAuthenticated(false)
            navigate('/login')
            return redirect('/login');
  }
  return (
    <Navbar fluid rounded className="bg-red-200">
      <Navbar.Brand href="https://flowbite-react.com">
        <img src={Logo} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{first.correo}</span>
            
          </Dropdown.Header>
          <Dropdown.Item as={Link} to="/dashboard">Dashboard</Dropdown.Item>
          <Dropdown.Item as={Link} to="/configuracion">Configuracion</Dropdown.Item>
        
          <Dropdown.Divider />
          <Dropdown.Item onClick={logout}>Cerrar Sesión</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link as={Link} to="/dashboard">Dashboard</Navbar.Link>
        <Navbar.Link as={Link} to="/rutas">Rutas</Navbar.Link>
        <Navbar.Link as={Link} to="/conductores">Conductores</Navbar.Link>
        <Navbar.Link as={Link} to="/vehiculos">Vehiculos</Navbar.Link>
        <Navbar.Link as={Link} to="#">Asignacciones</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
interface LayoutProps {
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}