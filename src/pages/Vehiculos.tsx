"use client";
import { SearchForm, AddVehiculoButton, DropDownR, VehiculoRow, ModalVehiculo } from "../components";
import { Table } from "flowbite-react";
import { useToggle } from "../hooks";
import { useEffect, useState } from "react";
import { Vehiculo as IVehiculo } from "../interfaces";
import { useGetVehiculos, useDeleteVehiculo } from "../api";
import { Toast } from "flowbite-react";
import { HiCheck, HiExclamation } from "react-icons/hi";

export const Vehiculos = () => {
    const [isOpen, toggleIsOpen] = useToggle();
    const [vehiculos, setVehiculos] = useState<IVehiculo[]>([]);
    const { mutate } = useGetVehiculos();
    const { mutate: deleteVehiculo } = useDeleteVehiculo();
    const [filtro, setFiltro] = useState<string>("");
    const [toast, setToast] = useState(false);
    const [toastError, setToastError] = useState(false);
    const [accion, setAccion] = useState<number>(0);
    const [idVehiculo, setIdVehiculo] = useState<string>("");

    const handleEditarClick = (id: string) => {
        setAccion(1);
        setIdVehiculo(id);
        toggleIsOpen();
    }

    const handleEliminarClick = (id: string) => {
        deleteVehiculo(id, {
            onSuccess: () => {
                mutateInfoVehiculos();
            },
            onError: () => {
                setToastError(true);
            }
        });
    }

    const handleModal = () => {
        setAccion(0);
        toggleIsOpen();
    }

    useEffect(() => {
        mutate("", {
            onSuccess: (data) => {
                setVehiculos(data);
                if (data.length === 0) {
                    setToastError(true);
                }
            },
            onError: () => {
                setToastError(true);
            }
        });
    }, [mutate]);

    const mutateInfoVehiculos = () => {
        mutate("", {
            onSuccess: (data) => {
                setVehiculos(data);
            }
        });
        setToast(true);
    }

    return (
        <>
            <ModalVehiculo isOpen={isOpen} mutateInfoVehiculos={mutateInfoVehiculos} onClose={() => toggleIsOpen()} initialData={idVehiculo} action={accion} />
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <SearchForm onChangeS={(e) => setFiltro(e.target.value)} />
                            <AddVehiculoButton onCrearClick={handleModal} />
                        </div>
                        <div className="overflow-x-auto">
                            <Table>
                                <Table.Head>
                                    <Table.HeadCell>ID</Table.HeadCell>
                                    <Table.HeadCell>Marca</Table.HeadCell>
                                    <Table.HeadCell>Modelo</Table.HeadCell>
                                    <Table.HeadCell>Placa</Table.HeadCell>
                                    <Table.HeadCell>Fecha de compra</Table.HeadCell>
                                    <Table.HeadCell>Estatus de asignación</Table.HeadCell>
                                    <Table.HeadCell>Fecha de ingreso al sistema</Table.HeadCell>
                                    <Table.HeadCell>
                                        <span className="sr-only">Edit</span>
                                    </Table.HeadCell>
                                </Table.Head>
                                <Table.Body className="divide-y">
                                    {
                                        vehiculos.length === 0 ? (
                                            <Table.Row>
                                                <Table.Cell colSpan={8}>No hay vehículos para mostrar</Table.Cell>
                                            </Table.Row>
                                        ) : (
                                            vehiculos
                                                .filter(vehiculo => vehiculo.marca.toLowerCase().includes(filtro.toLowerCase())) // Filtra los vehículos según el filtro
                                                .map((vehiculo) => (
                                                    <VehiculoRow key={vehiculo.id} vehiculo={vehiculo}>
                                                        <DropDownR onEditarClick={handleEditarClick} onEliminarClick={handleEliminarClick} value={vehiculo.id} />
                                                    </VehiculoRow>
                                                ))
                                        )
                                    }
                                </Table.Body>
                            </Table>
                        </div>
                    </div>
                </div>
            </section>
            {toast && (
                <Toast>
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                        <HiCheck className="h-5 w-5" />
                    </div>
                    <div className="ml-3 text-sm font-normal">Acción realizada con éxito</div>
                    <Toast.Toggle />
                </Toast>
            )}
            {
                toastError && (
                    <Toast>
                        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
                            <HiExclamation className="h-5 w-5" />
                        </div>
                        <div className="ml-3 text-sm font-normal">Ocurrió algo D:</div>
                        <Toast.Toggle />
                    </Toast>
                )
            }
        </>
    );
};
