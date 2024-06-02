"use client";
import { Table } from "flowbite-react";
import { Vehiculo as IVehiculo } from "../interfaces";
import { ReactNode } from "react";

interface Props {
  vehiculo: IVehiculo;
  children: ReactNode;
}

export const VehiculoRow = ({ vehiculo, children }: Props) => {
  const { id, marca, modelo, placa, fechaCompra, estatusAsignacion, fechaIngresoSistema } = vehiculo;
  const fechaCompraFormateada = new Date(fechaCompra).toLocaleDateString('es-MX', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'America/Mexico_City'
  });
  const fechaIngreso = new Date(fechaIngresoSistema).toLocaleDateString('es-MX', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'America/Mexico_City'
  });

  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {id}
      </Table.Cell>
      <Table.Cell>{marca}</Table.Cell>
      <Table.Cell>{modelo}</Table.Cell>
      <Table.Cell>{placa}</Table.Cell>
      <Table.Cell>{fechaCompraFormateada}</Table.Cell>
      <Table.Cell>{estatusAsignacion ? 'Asignado' : 'No asignado'}</Table.Cell>
      <Table.Cell>{fechaIngreso}</Table.Cell>
      <Table.Cell>
        {children}
      </Table.Cell>
    </Table.Row>
  );
};
