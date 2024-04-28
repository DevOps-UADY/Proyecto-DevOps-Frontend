"use client";

import { Avatar, Dropdown, Navbar } from "flowbite-react";
import Logo from "../assets/favicon.svg";

import { Link } from 'react-router-dom';

export function Navbard() {
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
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
          </Dropdown.Header>
          <Dropdown.Item as={Link} to="/dashboard">Dashboard</Dropdown.Item>
          <Dropdown.Item as={Link} to="/settings">Settings</Dropdown.Item>
          <Dropdown.Item as={Link} to="/earnings">Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link as={Link} to="/dashboard">Dashboard</Navbar.Link>
        <Navbar.Link as={Link} to="/rutas">Rutas</Navbar.Link>
        <Navbar.Link as={Link} to="/conductores">Conductores</Navbar.Link>
        <Navbar.Link as={Link} to="#">Vehiculos</Navbar.Link>
        <Navbar.Link as={Link} to="#">Asignacciones</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
