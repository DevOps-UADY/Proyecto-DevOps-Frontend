"use client";

import { Avatar, Dropdown, Navbar } from "flowbite-react";
import Logo from "../assets/favicon.svg";

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
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/Dashboard">Dashboard</Navbar.Link>
        <Navbar.Link href="/Rutas">Rutas</Navbar.Link>
        <Navbar.Link href="#">Conductores</Navbar.Link>
        <Navbar.Link href="#">Vehiculos</Navbar.Link>
        <Navbar.Link href="#">Asignacciones</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
