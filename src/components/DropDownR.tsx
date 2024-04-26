"use client";

import { Dropdown } from "flowbite-react";

interface Props {
  value: number;
  onEditarClick: (id: number) => void;
  onEliminarClick: (id: number) => void;
}

export const DropDownR = ({ onEditarClick, onEliminarClick, value }: Props) => {
  return (
    <Dropdown label="---" dismissOnClick={false}>
      <Dropdown.Item onClick={() => onEditarClick(value)}>Editar</Dropdown.Item>
      <Dropdown.Item onClick={() =>onEliminarClick(value)}>Eliminar</Dropdown.Item>
    </Dropdown>
  );
}