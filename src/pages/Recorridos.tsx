"use client";
import { SearchForm, AddRutaButton, DropDownR, RecorridoRow, ModalRuta } from "../components";
import { Table } from "flowbite-react";
import { useToggle } from "../hooks";
import { useEffect, useState } from "react";
import { Recorridos as IRecorrido } from "../interfaces";
import { useGetRecorridos, useDeleteRecorrido } from "../api";

import { Toast } from "flowbite-react";
import { HiCheck, HiExclamation} from "react-icons/hi";


export const Recorridos = () => {
    const [isOpen, toogleIsOpen] = useToggle();
    const [recorridos, setRecorridos] = useState<IRecorrido[]>([]);
    const { mutate } = useGetRecorridos();
    const { mutate: deleteRecorrido } = useDeleteRecorrido();
    const [filtro, setFiltro] = useState<string>("");
    const [toast, setToast] = useState(false);
    const [toastError, setToastError] = useState(false);
    const [accion, setAccion] = useState<number>(0);
    const [idRecorrido, setIdRecorrido] = useState<number>(-0);


    const handleEditarClick = (id: number) => {
        setAccion(1);
        setIdRecorrido(id);
        toogleIsOpen();
    }

    const handleEliminarClick = (id: number) => {
        deleteRecorrido(id, {
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
                console.log(data);
                
                setRecorridos(data);
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
                setRecorridos(data);
            }
		});
        setToast(true);
	}

    return (
        <>
        <ModalRuta isOpen={isOpen} mutateInfoClients={mutateInfoClients} onClose={() => toogleIsOpen()} initialData={idRecorrido} action={accion} />
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <SearchForm onChangeS={(e) => setFiltro(e.target.value)}/>
                    <AddRutaButton onCrearClick={handleModal}/>
                    </div>
                    <div className="overflow-x-auto">
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>ID</Table.HeadCell>
                            <Table.HeadCell>Ruta</Table.HeadCell>
                            <Table.HeadCell>Recha Recorrido</Table.HeadCell>
                            <Table.HeadCell>Exito</Table.HeadCell>
                            <Table.HeadCell>Comentario</Table.HeadCell>
                            <Table.HeadCell>Asignacion</Table.HeadCell>
                            <Table.HeadCell>Fecha Creación</Table.HeadCell>
                            <Table.HeadCell>
                                <span className="sr-only">Edit</span>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {
                                recorridos.length === 0 ? (
                                    <Table.Row>
                                        <Table.Cell colSpan={6}>No hay recorridos para mostrar</Table.Cell>
                                    </Table.Row>
                                ) : (
                                    recorridos
                                        .filter(recorrido => recorrido.fechaRecorrido.toLowerCase().includes(filtro.toLowerCase()))
                                        .map((recorrido) => (
                                                <RecorridoRow key={recorrido.id} recorrido={recorrido}>
                                                    <DropDownR onEditarClick={handleEditarClick} onEliminarClick={handleEliminarClick} value={recorrido.id} />
                                                </RecorridoRow>
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
