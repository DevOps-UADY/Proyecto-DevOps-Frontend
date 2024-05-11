"use client";
import { Table } from "flowbite-react";
import { Recorridos as IRecorrido } from "../interfaces";
import { ReactNode } from "react";

interface Props {
  recorrido: IRecorrido;
  children: ReactNode;
}

export const RecorridoRow = ({ recorrido, children }: Props) => {
  const { id, auxAsignacion, rutaId, fechaRecorrido,
    exito, comentarios, fechaCreacion, asignacion } = recorrido;

  const fechaCreacionAux = new Date(fechaCreacion);
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'America/Mexico_City'
  };
  const fechaFormateada = fechaCreacionAux.toLocaleDateString('es-MX', options);
  console.log(auxAsignacion);
  
  return (
      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          {id}
        </Table.Cell>
        <Table.Cell>{rutaId}</Table.Cell>
        <Table.Cell>{fechaRecorrido}</Table.Cell>
        <Table.Cell>{`${exito}`}</Table.Cell>
        <Table.Cell>{comentarios}</Table.Cell>
        <Table.Cell>{asignacion.id}</Table.Cell>
        <Table.Cell>{fechaFormateada}</Table.Cell>
        <Table.Cell>
          {children}
        </Table.Cell>
      </Table.Row>
    );
}
