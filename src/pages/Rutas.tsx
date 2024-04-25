"use client";
import { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { useGetExchangeRates } from "../api";
import { ejemplo as IEjemplo } from "../interfaces";

export const Rutas = () => {
    const [ejemplos, setEjemplos] = useState<IEjemplo[]>([]);
    // incluir mutate en la linea 10 cuando se agreguen el update, delete, create
	const { data, isError, isLoading } = useGetExchangeRates();

    useEffect(() => {
        if (data) {
            setEjemplos(data);
        }
	}, [data, isError, isLoading]);

    return (
        <>
            <div className="flex flex-wrap gap-2">
                <Button>Default</Button>
            </div>
            <div>
                {!isLoading && !isError ? (
                    <ul
                    role="list"
                    className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3 divide-y my-7 divide-gray-100 overflow-auto w-full"
                    >
                    {ejemplos.map((example) => (
                        <div key={example.id} className="p-4 border rounded">
                        <h3 className="text-lg font-semibold">{example.title + example.id}</h3>
                        <p className="text-gray-600">{example.body}</p>
                        {/* Puedes mostrar otros campos según sea necesario */}
                        </div>
                    ))}
                    </ul>
                ) : null}
            </div>
        </>

      );
};
