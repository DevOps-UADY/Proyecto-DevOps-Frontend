import { useEffect, useState } from "react";
import { Ruta as IRuta } from "../interfaces";
import { Conductor as IConductor} from "../interfaces";
import { useGetUsuarios } from '../api/usuarios';
import {useGetConductores, useGetRutas, useGetTotalVehiculos } from "../api";

export const Dashboard = () => {
    const [rutas, setRutas] = useState<IRuta[]>([]);
    const { mutate: mutateRutas } = useGetRutas();
    const [conductores, setConductores] = useState<IConductor[]>([]);
    const { mutate:mutateConductores } = useGetConductores();
    const { mutate: mutateUsuarios } = useGetUsuarios();
    const [usuarios,setUsuarios] = useState<number>()
    const [totalVehiculos, setTotalVehiculos] = useState(0);
    const { mutate: mutateTotalVehiculos } = useGetTotalVehiculos();
    
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
        mutateTotalVehiculos("", {
            onSuccess: (data) => {
                setTotalVehiculos(data);
            }
        });

    }, [mutateRutas, mutateConductores,mutateUsuarios, mutateTotalVehiculos]);

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
                        <dt className="text-lg font-medium leading-6 text-gray-900">Candidad de vehiculos existentes</dt>
                        <dd className="mt-1 text-lg leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{totalVehiculos}</dd>
                    </div> 

                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-lg font-medium leading-6 text-gray-900">DevOps</dt>
                        <dd className="mt-1 text-lg leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Segunda entrega</dd>
                    </div>
                    </dl>
                </div>
            </div>
        </section>
        </>
      );
};