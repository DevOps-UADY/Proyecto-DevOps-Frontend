"use client";
import {  Navbar } from "flowbite-react";
import { Link } from 'react-router-dom';
  
export function NavbardNoAuth() {
  return (
    <Navbar fluid rounded className="bg-red-200">
     
     
      <Navbar.Collapse>
        <Navbar.Link as={Link} to="/singup">Registro</Navbar.Link>
        <Navbar.Link as={Link} to="/login">Iniciar Sesion</Navbar.Link>
  
      </Navbar.Collapse>
    </Navbar>
  );
}
