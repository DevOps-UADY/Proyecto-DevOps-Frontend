import { Modal } from "./Modal";
import { FormEvent, useState, useEffect } from "react";
// import { TextInput, Select } from "flowbite-react";
import { useCreateVehiculo, useGetVehiculoById } from "../api";
import { Alert } from "flowbite-react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    mutateInfoVehiculos: () => void;
    initialData: number;
    action: number;
}

export const ModalVehiculo = ({ isOpen, onClose, mutateInfoVehiculos, initialData, action }: Props) => {
    const createVehiculo = useCreateVehiculo();
    const { mutate } = useGetVehiculoById();
    // const updateVehiculo = useUpdateVehiculo();

    const [info, setInfo] = useState({
        marca: "",
        modelo: "",
        vin: "",
        placa: "",
        fechaCompra: "",
        costo: 0,
        fotografia: "",
        estatusAsignacion: true,
    });

    const [mensaje, setMensaje] = useState("");
    const [mostrarAlerta, setMostrarAlerta] = useState(false);

    useEffect(() => {
        if (action === 1) {
            mutate(
                initialData,
                {
                    onSuccess: (data) => setInfo({
                        marca: data.marca,
                        modelo: data.modelo,
                        vin: data.vin,
                        placa: data.placa,
                        fechaCompra: data.fechaCompra,
                        costo: data.costo,
                        fotografia: data.fotografia,
                        estatusAsignacion: data.estatusAsignacion,
                    }),
                    onError: (error) => {
                        setMensaje(error.message);
                        setMostrarAlerta(true);
                    }
                }
            );
        } else {
            setInfo({
                marca: "",
                modelo: "",
                vin: "",
                placa: "",
                fechaCompra: "",
                costo: 0,
                fotografia: "",
                estatusAsignacion: true,
            });
        }
    }, [action, initialData, mutate]);

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (action === 1) {
            // updateVehiculo.mutate({ vehiculoId: initialData, vehiculo: info }, {
            //     onSuccess: () => {
            //         setInfo({
            //             marca: "",
            //             modelo: "",
            //             vin: "",
            //             placa: "",
            //             fechaCompra: "",
            //             costo: 0,
            //             fotografia: "",
            //             estatusAsignacion: true,
            //         });

            //         onClose();

            //         mutateInfoVehiculos();
            //     },
            //     onError: (error) => {
            //         setMensaje(error.message);
            //         setMostrarAlerta(true);
            //     }
            // });
        } else {
            createVehiculo.mutate(info, {
                onSuccess: () => {
                    setInfo({
                        marca: "",
                        modelo: "",
                        vin: "",
                        placa: "",
                        fechaCompra: "",
                        costo: 0,
                        fotografia: "",
                        estatusAsignacion: true,
                    });

                    onClose();

                    mutateInfoVehiculos();
                },
                onError: (error) => {
                    setMensaje(error.message);
                    setMostrarAlerta(true);
                },
            });
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={onSubmit}>
                <div className="mb-6">
                    <label
                        htmlFor="marca"
                        className="block mb-2 text-sm font-medium"
                    >
                        Marca
                    </label>
                    <input
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        id="marca"
                        placeholder="Toyota"
                        required
                        name="marca"
                        type="text"
                        value={info.marca}
                        onChange={(e) => setInfo({ ...info, marca: e.target.value })}
                    />
                </div>
                {/* Otros campos del formulario como modelo, vin, placa, etc. */}
                {/* Aquí puedes agregar más campos del vehículo según tus necesidades */}
                {mostrarAlerta && (
                    <Alert color="warning" rounded onDismiss={() => setMostrarAlerta(false)}>
                        <span className="font-medium">Incorrecto</span> {mensaje}
                    </Alert>
                )}
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    Enviar información
                </button>
            </form>
        </Modal>
    );
};
