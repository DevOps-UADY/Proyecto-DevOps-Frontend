import { Modal } from "./Modal";
import { useState, useEffect } from "react";
import { useGetVehiculoById } from "../api";
import { Alert, FileInput, Label } from "flowbite-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { HiInformationCircle } from "react-icons/hi";
interface Props {
    isOpen: boolean;
    onClose: () => void;
    mutateInfoVehiculos: () => void;
    initialData: number;
    action: number;
    setErrores: (data: string[]) => void;
    errores: string[];
}

export const ModalVehiculo = ({ isOpen, onClose, mutateInfoVehiculos, initialData, action, setErrores, errores }: Props) => {
    const { mutate } = useGetVehiculoById();
    const [info, setInfo] = useState({
        marca: "",
        modelo: "",
        vin: "",
        placa: "",
        fechaCompra: "",
        costo: 0,
        fotografia: "",
        estatusAsignacion: false,
    });

    const { register, handleSubmit, reset } = useForm();
    const [mensaje, setMensaje] = useState("");
    const [mostrarAlerta, setMostrarAlerta] = useState(false);

    useEffect(() => {
        if (action === 1) {
            mutate(
                initialData,
                {
                    onSuccess: (response) =>
                        setInfo({
                            marca: response.marca,
                            modelo: response.modelo,
                            vin: response.vin,
                            placa: response.placa,
                            fechaCompra: response.fechaCompra,
                            costo: response.costo,
                            fotografia: response.fotografia,
                            estatusAsignacion: response.estatusAsignacion,
                        },),
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
                estatusAsignacion: false,
            });
        }
    }, [action, initialData, mutate]);

    useEffect(() => {
        reset({
            marca: info.marca,
            modelo: info.modelo,
            vin: info.vin,
            placa: info.placa,
            fechaCompra: info.fechaCompra,
            costo: info.costo,
            // fotografia: info.fotografia,
            estatusAsignacion: info.estatusAsignacion,
        });
    }, [info, reset]);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const onSubmit2 = (data:any) =>{
        console.log({data})
        if(data.marca===""){
            delete data.marca
        }

        if(data.modelo ===""){
            delete data.modelo
        }

        if(data.vin===""){
            delete data.vin
        }

        if(data.placa===""){
            delete data.placa
        }

        if(data.fechaCompra===""){
            delete data.fechaCompra
        }

        if(data.costo===""){
            delete data.costo
        }

        if(data.estatusAsignacion===""){
            delete data.estatusAsignacion
        }

        if(data.fotografia[0]===null || data.fotografia[0]===undefined){
            delete data.fotografia
        }

        if(data.fotografia!=null || data.fotografia!=undefined){
            const fotografia =  data.fotografia[0]
            data = {
               ...data,
              fotografia
           }
        }
        
        const formData = objetoAFormData(data);
        if (action===0) {

            axios.post('http://localhost:3000/vehiculos', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data' // Importante indicar el tipo de contenido
                }
              })
                .then(response => {
                  console.log('Respuesta del servidor:', response.data);
                  onClose();

                          mutateInfoVehiculos();
                })
                .catch(error => {
                    if (Array.isArray(error.response.data.message)) {
                        setErrores(error.response.data.message)
                      }else{
                        const arreglo = [error.response.data.message]
                        setErrores(arreglo)
                      }
                  console.error('Error al enviar el formulario:', error);
                });
        }else{
            console.log({initialData})
            axios.put('http://localhost:3000/vehiculos/'+initialData, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              })
                .then(response => {
                  console.log('Respuesta del servidor:', response.data);
                  onClose();

                          mutateInfoVehiculos();
                })
                .catch(error => {
                    if (Array.isArray(error.response.data.message)) {
                        setErrores(error.response.data.message)
                      }else{
                        const arreglo = [error.response.data.message]
                        setErrores(arreglo)
                      }
                  console.error('Error al enviar el formulario:', error);
                });
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const objetoAFormData = (objeto:any) => {
        const formData = new FormData();

        // Iteramos sobre las propiedades del objeto
        for (const key in objeto) {
          if (Object.hasOwnProperty.call(objeto, key)) {
            const value = objeto[key];
            formData.append(key, value);
          }
        }

        return formData;
      };
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit((data) => onSubmit2(data))  }>
                <div className="mb-6">
                    <label
                        htmlFor="marca"
                        className="block mb-2 text-sm font-medium"
                    >
                        Marca
                    </label>
                    <input
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"

                        placeholder="Toyota"
                        

                        type="text"
                        // value={info.marca}
                        {...register('marca')}
                        // onChange={(e) => setInfo({ ...info, marca: e.target.value })}
                    />
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="modelo"
                        className="block mb-2 text-sm font-medium"
                    >
                        Modelo
                    </label>
                    <input
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        id="modelo"
                        placeholder="Corolla"
                        

                        type="text"
                        // value={info.modelo}
                        // {...register('modelo')}
                        {...register('modelo')}
                    />
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="vin"
                        className="block mb-2 text-sm font-medium"
                    >
                        Vin
                    </label>
                    <input
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        id="vin"
                        placeholder="1G1RC6E42BUXXXXXX"
                        

                        type="text"
                        {...register('vin')}
                    />
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="placa"
                        className="block mb-2 text-sm font-medium"
                    >
                        Placa
                    </label>
                    <input
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        id="placa"
                        placeholder="TKY-28-23"
                        

                        type="text"
                        // value={info.placa}
                        {...register('placa')}

                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="fechaCompra"
                        className="block mb-2 text-sm font-medium"
                    >
                        Fecha compra
                    </label>
                    <input
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        id="fechaCompra"
                        placeholder="2020-12-12"
                        type="text"
                        // value={info.fechaCompra}
                        {...register('fechaCompra')}
                    />
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="costo"
                        className="block mb-2 text-sm font-medium"
                    >
                        Costo
                    </label>
                    <input
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        id="costo"
                        placeholder="Costo"
                        

                        type="text"
                        // value={info.costo}
                        {...register('costo')}
                    />
                </div>

                <div className="mb-6">
                <label
                    htmlFor="estatusAsignacion"
                    className="block mb-2 text-sm font-medium"
                >
                    Estatus Asignacion
                </label>
                <select
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    id="estatusAsignacion"
                    {...register('estatusAsignacion')}
                >
                    <option value="true">Asignado</option>
                    <option value="false">No asignado</option>

                </select>
                </div>


                <div id="fileUpload" className="max-w-md">
      <div className="mb-2 block">
        <Label htmlFor="fotografia" value="Upload file" />
      </div>
      <FileInput {...register('fotografia')} id="fotografia" />
    </div>
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

            {errores.map((element) => (
         <Alert color="failure" icon={HiInformationCircle}>
         <span className="font-medium"> {element} </span>
       </Alert>
      ))}
        </Modal>
    );
};


