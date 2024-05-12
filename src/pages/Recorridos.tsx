"use client";
import { SearchForm, AddRecorridoButton, DropDownR, RecorridoRow, ModalRecorridoCrear, ModalRecorridoActualizar } from "../components";
import { Table } from "flowbite-react";
import { useToggle } from "../hooks";
import { useEffect, useState } from "react";
import { Recorridos as IRecorrido } from "../interfaces";
import { useGetRecorridos, useDeleteRecorrido, useGetRutas, useGetAsignaciones } from "../api";
import { Toast } from "flowbite-react";
import { Ruta as IRuta, Asignacion} from "../interfaces";
import { HiCheck, HiExclamation} from "react-icons/hi";


export const Recorridos = () => {
    const [isOpen, toogleIsOpen] = useToggle();
    const [isOpenActualizar, toogleIsOpenActualizar] = useToggle();
    const [recorridos, setRecorridos] = useState<IRecorrido[]>([]);
    const { mutate } = useGetRecorridos();
    const { mutate: getRutas } = useGetRutas();
    const { mutate: getAsignaciones } = useGetAsignaciones();
    const [rutas, setRutas] = useState<IRuta[]>([]);
    const [asignacion, setAsignacion] = useState<Asignacion[]>([]);
    const { mutate: deleteRecorrido } = useDeleteRecorrido();
    const [filtro, setFiltro] = useState<string>("");
    const [toast, setToast] = useState(false);
    const [toastError, setToastError] = useState(false);
    const [idRecorrido, setIdRecorrido] = useState<number>(0);


    const handleEditarClick = (id: number) => {
        getRutas("", {
            onSuccess: (data) => {
                setRutas(data);
                if(data.length === 0){
                    setToastError(true);
                }
            },
            onError: () => {
                setToastError(true);
            }
        });

        mutate("", {
            onSuccess: (data) => {
                
                setRecorridos(data);
                if(data.length === 0){
                    setToastError(true);
                }
            },
            onError: () => {
                setToastError(true);
            }
        });

        getAsignaciones("", {
            onSuccess: (data) => {
                setAsignacion(data);
                if(data.length === 0){
                    setToastError(true);
                }
            },
            onError: () => {
                setToastError(true);
            }
        });
        setIdRecorrido(id);
        toogleIsOpenActualizar();
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
        getRutas("", {
            onSuccess: (data) => {
                setRutas(data);
                if(data.length === 0){
                    setToastError(true);
                }
            },
            onError: () => {
                setToastError(true);
            }
        });

        getAsignaciones("", {
            onSuccess: (data) => {
                setAsignacion(data);
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
        <ModalRecorridoCrear isOpen={isOpen} mutateInfoClients={mutateInfoClients} onClose={() => toogleIsOpen()} rutasArreglo={rutas} asignacionArreglo={asignacion}/>
        <ModalRecorridoActualizar isOpen={isOpenActualizar} mutateInfoClients={mutateInfoClients} onClose={() => toogleIsOpenActualizar()} rutasArreglo={rutas} asignacionArreglo={asignacion} initialData={recorridos} idRe={idRecorrido}/>
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <SearchForm onChangeS={(e) => setFiltro(e.target.value)}/>
                    <AddRecorridoButton onCrearClick={handleModal}/>
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
                                                    <DropDownR onEditarClick={()=>handleEditarClick(recorrido.id)} onEliminarClick={handleEliminarClick} value={recorrido.id} />
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
