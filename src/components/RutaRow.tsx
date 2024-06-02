"use client";
import { Table } from "flowbite-react";
import { Ruta as IRuta } from "../interfaces";
import { ReactNode } from "react";

interface Props {
  ruta: IRuta;
  children: ReactNode;
}

export const RutaRow = ({ ruta, children }: Props) => {
  const { id, nombreRuta, latitudInicio, longitudInicio, latitudDestino, longitudDestino, fechaCreacionRuta } = ruta;
  const fechaCreacion = new Date(fechaCreacionRuta);
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'America/Mexico_City'
  };
  const fechaFormateada = fechaCreacion.toLocaleDateString('es-MX', options);

  return (
      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          {id}
        </Table.Cell>
        <Table.Cell>{nombreRuta}</Table.Cell>
        <Table.Cell>{`(${latitudInicio}, ${longitudInicio})`}</Table.Cell>
        <Table.Cell>{`(${latitudDestino}, ${longitudDestino})`}</Table.Cell>
        <Table.Cell>{fechaFormateada}</Table.Cell>
        <Table.Cell>
          {children}
        </Table.Cell>
      </Table.Row>
    );
}
