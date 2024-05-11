import { Modal } from "./Modal";
import { FormEvent, useState, useEffect } from "react";
import { TextInput, Select } from "flowbite-react";
import { useCreateRecorrido, useGetRecorridoById, useUpdateRecorrido } from "../api";
import { Alert } from "flowbite-react";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	mutateInfoClients: () => void;
	initialData: number;
	action: number;
}

export const ModalRecorridoActualizar = ({ isOpen, onClose, mutateInfoClients, initialData, action }: Props) => {
	const createRuta = useCreateRecorrido();
	const {mutate} = useGetRecorridoById();
	const updateRuta = useUpdateRecorrido();

	const [info, setInfo] = useState({
		asignacionId: 0,
		rutaId: 0,
		fechaRecorrido: "2024-04-04",
		exito: true,
        comentarios: "",
	});

	const [mensaje, setMensaje] = useState("");
	const [mostrarAlerta, setMostrarAlerta] = useState(false);

	useEffect(() => {
        // 1 editar
		if (action===1) {
			mutate(
					initialData, 
				{
					onSuccess: (data) => setInfo({
						asignacionId: data.auxAsignacion,
						rutaId: data.rutaId,
						fechaRecorrido: data.fechaRecorrido,
                        exito: data.exito,
						comentarios: data.comentarios,
					},),
					onError: (error) => {
						setMensaje(error.message);
						setMostrarAlerta(true);
					}
				}
			);
		}else{
			setInfo({
                asignacionId: 0,
                rutaId: 0,
                fechaRecorrido: "2024-04-04",
                exito: true,
                comentarios: ""
			});
		}
	}, [action, initialData, mutate]);

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const latitudValue = parseFloat(info.latitudDestino);
		if (isNaN(latitudValue) || latitudValue < -90 || latitudValue > 90) {
			setMensaje('El valor de la latitud debe ser un número válido entre -90 y 90');
			setMostrarAlerta(true);
			return;
		}

		const lonfitugValue = parseInt(info.longitudDestino);
		if (isNaN(lonfitugValue) || lonfitugValue < -180 || lonfitugValue > 180) {
			setMensaje('El valor de la longitud debe estar entre -180 y 180');
			setMostrarAlerta(true);
			return;
		}

		
		if (action === 1){
			updateRuta.mutate({rutaId: initialData, ruta: {...info, latitudDestino: parseFloat(info.latitudDestino), longitudDestino: parseFloat(info.longitudDestino)}}, {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				onSuccess: (_received) => {
	
					setInfo({
						asignacionId: 0,
                        rutaId: 0,
                        fechaRecorrido: "2024-04-04",
                        exito: true,
                        comentarios: ""
					});
	
					onClose();
	
					mutateInfoClients();
				},
				onError: (error) => {
					setMensaje(error.message);
					setMostrarAlerta(true);
				}
			});
		} else {
			createRuta.mutate({...info, latitudDestino: parseFloat(info.latitudDestino), longitudDestino: parseFloat(info.longitudDestino)}, {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				onSuccess: (_received) => {
	
					setInfo({
						asignacionId: 0,
                        rutaId: 0,
                        fechaRecorrido: "2024-04-04",
                        exito: true,
                        comentarios: ""
					});
	
					onClose();
	
					mutateInfoClients();
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
						htmlFor="nombreRuta"
						className="block mb-2 text-sm font-medium"
					>
						Nombre de la ruta
					</label>
					<input
						className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						id="nombreRuta"
						placeholder="Las americas"
						required
						name="nombreRuta"
						type="text"
						value={info.nombreRuta}
						onChange={(e)=> setInfo({...info, nombreRuta: e.target.value})}
					/>
				</div>
				<div className="mb-6">
					<label
						htmlFor="estadoRuta"
						className="block mb-2 text-sm font-medium"
					>
						Estado de la ruta
					</label>
					<Select
						id="estadoRuta"
						required
						value={info.estadoRuta.toString()}
						onChange={(e) => setInfo({...info, estadoRuta: e.target.value === "true"})}
					>
						<option value="true">true</option>
						<option value="false">false</option>
					</Select>
				</div>
				<div className="mb-6">
					<label
						htmlFor="latitudDestino"
						className="block mb-2 text-sm font-medium"
					>
						Latitud de destino
					</label>
					<TextInput
					id="latitudDestino"
					name="latitudDestino"
					placeholder="90" 
					required
					type="text"
					value={info.latitudDestino}
					onChange={(e) => setInfo({...info, latitudDestino: e.target.value})} 
					color="info" />
				</div>
				<div className="mb-6">
					<label
						htmlFor="longitudDestino"
						className="block mb-2 text-sm font-medium"
					>
						Longitud de destino
					</label>
					<TextInput
					id="longitudDestino"
					name="longitudDestino"
					placeholder="180" 
					required
					type="text"
					value={info.longitudDestino}
					onChange={(e) => setInfo({...info, longitudDestino: e.target.value})} 
					color="info" />
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
		</Modal>
	);
};
