import { PaperClipIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from "react";
import { Ruta as IRuta } from "../interfaces";
import { Conductor as IConductor} from "../interfaces";
import { Asignacion as IAsignacion } from '../interfaces';
import {useGetConductores, useGetRutas, useGetAsignaciones} from "../api";
import { useGetUsuarios } from '../api/usuarios';

export const Dashboard = () => {
    const [rutas, setRutas] = useState<IRuta[]>([]);
    const { mutate: mutateRutas } = useGetRutas();
    const [conductores, setConductores] = useState<IConductor[]>([]);
    const { mutate:mutateConductores } = useGetConductores();
    const { mutate: mutateUsuarios } = useGetUsuarios();
    const [usuarios,setUsuarios] = useState<number>()
    const { mutate:mutateAsignaciones } = useGetAsignaciones();
    const [asignaciones, setAsignaciones] = useState<IAsignacion[]>([]);

    useEffect(() => {
        mutateRutas("", {
            onSuccess: (data) => {
                setRutas(data);
            }
        });
        mutateConductores("", {
            onSuccess: (data) => {
                setConductores(data);
            }
        });
        mutateUsuarios("", {
            onSuccess: (data) => {
                setUsuarios(data);
            }
        });
        mutateAsignaciones("", {
            onSuccess: (data) => {
                setAsignaciones(data);
            }
        });

        
    }, [mutateRutas, mutateConductores,mutateUsuarios, mutateAsignaciones]);

    return (
        <>
        <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
            <div>
                <div className="px-4 sm:px-0">
                    <h3 className="text-base font-semibold leading-7 text-gray-900">Resumen</h3>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Se presentan las entidades creadas</p>
                </div>
                <div className="mt-6 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-lg font-medium leading-6 text-gray-900">Candidad de rutas existentes</dt>
                        <dd className="mt-1 text-lg leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{rutas.length}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-lg font-medium leading-6 text-gray-900">Candidad de conductores existentes</dt>
                        <dd className="mt-1 text-lg leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{conductores.length}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-lg font-medium leading-6 text-gray-900">Candidad de usuarios existentes</dt>
                        <dd className="mt-1 text-lg leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{usuarios}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-lg font-medium leading-6 text-gray-900">Candidad de asignaciones existentes</dt>
                        <dd className="mt-1 text-lg leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{asignaciones.length}</dd>
                    </div>             
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-lg font-medium leading-6 text-gray-900">Application for</dt>
                        <dd className="mt-1 text-lg leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Backend Developer</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">margotfoster@example.com</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Salary expectation</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">$120,000</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">About</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur
                        qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud
                        pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Attachments</dt>
                        <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                            <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                            <div className="flex w-0 flex-1 items-center">
                                <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                <span className="truncate font-medium">resume_back_end_developer.pdf</span>
                                <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                                </div>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Download
                                </a>
                            </div>
                            </li>
                            <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                            <div className="flex w-0 flex-1 items-center">
                                <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                <span className="truncate font-medium">coverletter_back_end_developer.pdf</span>
                                <span className="flex-shrink-0 text-gray-400">4.5mb</span>
                                </div>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Download
                                </a>
                            </div>
                            </li>
                        </ul>
                        </dd>
                    </div>
                    </dl>
                </div>
            </div>
        </section>
        </>
      );
};