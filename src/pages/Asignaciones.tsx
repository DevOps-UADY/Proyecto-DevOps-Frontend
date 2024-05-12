"use client";
import { SearchForm, AddAsignacionButton, DropDownR, AsignacionRow, ModalAsignacionCrear, ModalAsignacionActualizar } from "../components";
import { Table } from "flowbite-react";
import { useToggle } from "../hooks";
import { useEffect, useState } from "react";
import { Asignacion as IAsignacion} from "../interfaces";
import { Conductor as IConductor} from "../interfaces";
import { Vehiculo as IVehiculo} from "../interfaces";
import { useGetAsignaciones, useDeleteAsignacion, useGetConductores, useGetVehiculos} from "../api";
import { Toast } from "flowbite-react";
import { HiCheck, HiExclamation} from "react-icons/hi";


export const Asignaciones = () => {
    const [isOpen, toogleIsOpen] = useToggle();
    const [asignaciones, setAsignaciones] = useState<IAsignacion[]>([]);
    const { mutate } = useGetAsignaciones();
    const { mutate: deleteAsignacion } = useDeleteAsignacion();
    const [filtro, setFiltro] = useState<string>("");
    const [toast, setToast] = useState(false);
    const [toastError, setToastError] = useState(false);
    const [idAsignacion, setIdAsignacion] = useState<number>(0);
    const { mutate: getConductores } = useGetConductores();
    const [conductores, setConductores] = useState<IConductor[]>([]);
    const { mutate: getVehiculos } = useGetVehiculos();
    const [vehiculos, setVehiculos] = useState<IVehiculo[]>([]);
    const [isOpenActualizar, toogleIsOpenActualizar] = useToggle();

    const handleEditarClick = (id: number) => {
        mutate("", {
            onSuccess: (data) => {
                setAsignaciones(data);
                if(data.length === 0){
                    setToastError(true);
                }
            },
            onError: () => {
                setToastError(true);
            }
        });
        getConductores("", {
            onSuccess: (data) => {
                setConductores(data);
                if(data.length === 0){
                    setToastError(true);
                }
            },
            onError: () => {
                setToastError(true);
            }
        });
        getVehiculos("", {
            onSuccess: (data) => {
                setVehiculos(data);
                if(data.length === 0){
                    setToastError(true);
                }
            },
            onError: () => {
                setToastError(true);
            }
        });
        setIdAsignacion(id);
        toogleIsOpenActualizar();
    }

    const handleEliminarClick = (id: number) => {
        deleteAsignacion(id, {
            onSuccess: () => {
                mutateInfoClients()
            },
            onError: () => {
                setToastError(true);
            }
        });
    }

    const handleModal = () => {
        getConductores("", {
            onSuccess: (data) => {
                setConductores(data);
                if(data.length === 0){
                    setToastError(true);
                }
            },
            onError: () => {
                setToastError(true);
            }
        });
        getVehiculos("", {
            onSuccess: (data) => {
                setVehiculos(data);
                if(data.length === 0){
                    setToastError(true);
                }
            },
            onError: () => {
                setToastError(true);
            }
        });
        toogleIsOpen();
    }

    useEffect(() => {
        mutate("", {
            onSuccess: (data) => {
                setAsignaciones(data);
                if(data.length === 0){
                    setToastError(true);
                }
            },
            onError: () => {
                setToastError(true);
            }
        });
    }, [mutate]);

    const mutateInfoClients = () =>{
		mutate("",{
			onSuccess: (data) => {
                setAsignaciones(data);
            }
		});
        setToast(true);
	}

    return (
        <>
     
        <ModalAsignacionCrear isOpen={isOpen} mutateInfoClients={mutateInfoClients} onClose={() => toogleIsOpen()} conductoresArreglo={conductores} vehiculosArreglo={vehiculos}/>
        <ModalAsignacionActualizar isOpen={isOpenActualizar} mutateInfoClients={mutateInfoClients} onClose={() => toogleIsOpenActualizar()} conductoresArreglo={conductores} vehiculosArreglo={vehiculos} initialData={asignaciones} idAsign={idAsignacion}/>
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <SearchForm onChangeS={(e) => setFiltro(e.target.value)}/>
                    <AddAsignacionButton onCrearClick={handleModal}/>
                    </div>
                    <div className="overflow-x-auto">
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>ID</Table.HeadCell>
                            <Table.HeadCell>Placa del vehiculo</Table.HeadCell>
                            <Table.HeadCell>Nombre del conductor</Table.HeadCell>
                            <Table.HeadCell>Estado asignacion</Table.HeadCell>
                            <Table.HeadCell>Fecha de vinculacion al sistema</Table.HeadCell>
                            <Table.HeadCell>
                                <span className="sr-only">Edit</span>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {
                                asignaciones.length === 0 ? (
                                    <Table.Row>
                                        <Table.Cell colSpan={6}>No hay asignaciones para mostrar</Table.Cell>
                                    </Table.Row>
                                ) : (
                                    asignaciones
                                        .filter(asignacion => asignacion.conductor?.nombreConductor.toLowerCase().includes(filtro.toLowerCase())) // Filtra las asignaciones según el filtro
                                        .map((asignacion) => (
                                                <AsignacionRow key={asignacion.id} asignacion={asignacion}>
                                                    <DropDownR onEditarClick={handleEditarClick} onEliminarClick={handleEliminarClick} value={parseInt(asignacion.id)} />
                                                </AsignacionRow>
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
