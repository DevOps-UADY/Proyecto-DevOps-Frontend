"use client";
import { Table } from "flowbite-react";
import { Asignacion as IAsignacion } from "../interfaces";
import { ReactNode } from "react";

interface Props {
  asignacion: IAsignacion;
  children: ReactNode;
}

export const AsignacionRow = ({ asignacion, children }: Props) => {
  const { id, vehiculo, conductor, enFuncionamiento,fechaAsignacionVinculacion } = asignacion;
  const fechaCreacionAsignacion = new Date(fechaAsignacionVinculacion);
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'America/Mexico_City'
  };
  let asignado:string = "Sin asignar";

  if(enFuncionamiento){
    asignado = "Asignado";
  }

  const fechaCreacionFormateada = fechaCreacionAsignacion.toLocaleDateString('es-MX', options);
  return (
      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          {id}
        </Table.Cell>
        <Table.Cell>{vehiculo?.placa}</Table.Cell>
        <Table.Cell>{conductor?.nombreConductor}</Table.Cell>
        <Table.Cell>{asignado}</Table.Cell>
        <Table.Cell>{fechaCreacionFormateada}</Table.Cell>
        <Table.Cell>
          {children}
        </Table.Cell>
      </Table.Row>
    );
}
