"use client";
import { SearchForm, AddRutaButton, DropDownR, RutaRow} from "../components";
import { Table } from "flowbite-react";

export const Rutas = () => {
    const handleEditarClick = (id: number) => {
        console.log(`Editar ruta con id: ${id}`);
    }

    const handleEliminarClick = (id: number) => {
        console.log(`Eliminar ruta con id: ${id}`);
    }

    const rutaEjemplo = {
        id: 1,
        nombreRuta: "San Nicolass",
        estadoRuta: true,
        latitudInicio: 190,
        longitudInicio: 80,
        latitudDestino: 190,
        longitudDestino: 80,
        fechaCreacionRuta: new Date(),
        deletedAt: new Date(),
    }

    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <SearchForm />
                    <AddRutaButton />
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
                            <RutaRow ruta={rutaEjemplo}>
                                <DropDownR onEditarClick={handleEditarClick} onEliminarClick={handleEliminarClick} value={rutaEjemplo.id} />
                            </RutaRow>
                        </Table.Body>
                    </Table>
                    </div>
                </div>
                </div>
            </section>
        </>
    );
};
