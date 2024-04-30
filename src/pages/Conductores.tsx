"use client";
import { SearchForm, AddConductorButton, DropDownR, ConductorRow, ModalConductor } from "../components";
import { Table } from "flowbite-react";
import { useToggle } from "../hooks";
import { useEffect, useState } from "react";
import { Conductor as IConductor} from "../interfaces";
import { useGetConductores, useDeleteConductor } from "../api";
import { Toast } from "flowbite-react";
import { HiCheck, HiExclamation} from "react-icons/hi";


export const Conductores = () => {
    const [isOpen, toogleIsOpen] = useToggle();
    const [conductores, setConductores] = useState<IConductor[]>([]);
    const { mutate } = useGetConductores();
    const { mutate: deleteConductor } = useDeleteConductor();
    const [filtro, setFiltro] = useState<string>("");
    const [toast, setToast] = useState(false);
    const [toastError, setToastError] = useState(false);
    const [accion, setAccion] = useState<number>(0);
    const [idConductor, setIdConductor] = useState<number>(-0);


    const handleEditarClick = (id: number) => {
        setAccion(1);
        setIdConductor(id);
        toogleIsOpen();
    }

    const handleEliminarClick = (id: number) => {
        deleteConductor(id, {
            onSuccess: () => {
                mutateInfoClients()
            },
            onError: () => {
                setToastError(true);
            }
        });
    }

    const handleModal = () => {
        setAccion(0);
        toogleIsOpen();
    }

    useEffect(() => {
        mutate("", {
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
    }, [mutate]);

    const mutateInfoClients = () =>{
		mutate("",{
			onSuccess: (data) => {
                setConductores(data);
            }
		});
        setToast(true);
	}

    return (
        <>
        <ModalConductor isOpen={isOpen} mutateInfoClients={mutateInfoClients} onClose={() => toogleIsOpen()} initialData={idConductor} action={accion} />
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <SearchForm onChangeS={(e) => setFiltro(e.target.value)}/>
                    <AddConductorButton onCrearClick={handleModal}/>
                    </div>
                    <div className="overflow-x-auto">
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>ID</Table.HeadCell>
                            <Table.HeadCell>Nombre del conductor</Table.HeadCell>
                            <Table.HeadCell>Fecha de nacimiento del conductor</Table.HeadCell>
                            <Table.HeadCell>CURP del conductor</Table.HeadCell>
                            <Table.HeadCell>Direccion de localidad del conductor</Table.HeadCell>
                            <Table.HeadCell>Salario del conductor</Table.HeadCell>
                            <Table.HeadCell>Numero de licencia del conductor</Table.HeadCell>
                            <Table.HeadCell>Fecha de ingreso al sistema</Table.HeadCell>
                            <Table.HeadCell>
                                <span className="sr-only">Edit</span>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {
                                conductores.length === 0 ? (
                                    <Table.Row>
                                        <Table.Cell colSpan={6}>No hay conductores para mostrar</Table.Cell>
                                    </Table.Row>
                                ) : (
                                    conductores
                                        .filter(conductor => conductor.nombreConductor.toLowerCase().includes(filtro.toLowerCase())) // Filtra los conductores según el filtro
                                        .map((conductor) => (
                                                <ConductorRow key={conductor.id} conductor={conductor}>
                                                    <DropDownR onEditarClick={handleEditarClick} onEliminarClick={handleEliminarClick} value={conductor.id} />
                                                </ConductorRow>
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
