"use client";
import { SearchForm, AddRutaButton, DropDownR, RutaRow, ModalRuta } from "../components";
import { Table } from "flowbite-react";
import { useToggle } from "../hooks";
import { useEffect, useState } from "react";
import { Ruta as IRuta} from "../interfaces";
import { useGetRutas, useDeleteRuta } from "../api";
import { Toast } from "flowbite-react";
import { HiCheck, HiExclamation} from "react-icons/hi";


export const Rutas = () => {
    const [isOpen, toogleIsOpen] = useToggle();
    const [rutas, setRutas] = useState<IRuta[]>([]);
    const { mutate } = useGetRutas();
    const { mutate: deleteRuta } = useDeleteRuta();
    const [filtro, setFiltro] = useState<string>("");
    const [toast, setToast] = useState(false);
    const [toastError, setToastError] = useState(false);
    const [accion, setAccion] = useState<number>(0);
    const [idRuta, setIdRuta] = useState<number>(-0);


    const handleEditarClick = (id: number) => {
        setAccion(1);
        setIdRuta(id);
        toogleIsOpen();
    }

    const handleEliminarClick = (id: number) => {
        deleteRuta(id, {
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
                setRutas(data);
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
                setRutas(data);
            }
		});
        setToast(true);
	}

    return (
        <>
        <ModalRuta isOpen={isOpen} mutateInfoClients={mutateInfoClients} onClose={() => toogleIsOpen()} initialData={idRuta} action={accion} />
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
                            <Table.HeadCell>Nombre de la ruta</Table.HeadCell>
                            <Table.HeadCell>Punto inicial</Table.HeadCell>
                            <Table.HeadCell>Punto Final</Table.HeadCell>
                            <Table.HeadCell>Fecha de creación</Table.HeadCell>
                            <Table.HeadCell>
                                <span className="sr-only">Edit</span>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {
                                rutas.length === 0 ? (
                                    <Table.Row>
                                        <Table.Cell colSpan={6}>No hay rutas para mostrar</Table.Cell>
                                    </Table.Row>
                                ) : (
                                    rutas
                                        .filter(ruta => ruta.nombreRuta.toLowerCase().includes(filtro.toLowerCase())) // Filtra las rutas según el filtro
                                        .map((ruta) => (
                                                <RutaRow key={ruta.id} ruta={ruta}>
                                                    <DropDownR onEditarClick={handleEditarClick} onEliminarClick={handleEliminarClick} value={ruta.id} />
                                                </RutaRow>
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
