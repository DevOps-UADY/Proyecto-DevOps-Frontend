"use client";
import { Table } from "flowbite-react";
import { Conductor as IConductor } from "../interfaces";
import { ReactNode } from "react";

interface Props {
  conductor: IConductor;
  children: ReactNode;
}

export const ConductorRow = ({ conductor, children }: Props) => {
  const { id, nombreConductor, fechaNacimiento, curp, direccionCasa, salario, numeroLicencia, fechaIngresoSistemaConductor } = conductor;
  const fechaCreacionConductor = new Date(fechaIngresoSistemaConductor);
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'America/Mexico_City'
  };
  const fechaCreacionFormateada = fechaCreacionConductor.toLocaleDateString('es-MX', options);
  return (
      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          {id}
        </Table.Cell>
        <Table.Cell>{nombreConductor}</Table.Cell>
        <Table.Cell>{fechaNacimiento}</Table.Cell>
        <Table.Cell>{curp}</Table.Cell>
        <Table.Cell>{direccionCasa}</Table.Cell>
        <Table.Cell>{salario}</Table.Cell>
        <Table.Cell>{numeroLicencia}</Table.Cell>
        <Table.Cell>{fechaCreacionFormateada}</Table.Cell>
        <Table.Cell>
          {children}
        </Table.Cell>
      </Table.Row>
    );
}
