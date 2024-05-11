import { Modal } from "./Modal";
import { FormEvent, useState, useEffect } from "react";
import { TextInput, Select } from "flowbite-react";
import { useCreateRecorrido } from "../api";
import { Alert } from "flowbite-react";
import { Ruta as IRuta } from "../interfaces";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	mutateInfoClients: () => void;
	rutasArreglo: IRuta[];
}

export const ModalRecorridoCrear = ({ isOpen, onClose, mutateInfoClients, rutasArreglo }: Props) => {
	const createRuta = useCreateRecorrido();
	console.log(rutasArreglo);
		

	const [info, setInfo] = useState({
		asignacionId: "0",
		rutaId: "0",
		fechaRecorrido: "2024-04-04"
	});

	const [mensaje, setMensaje] = useState("");
	const [mostrarAlerta, setMostrarAlerta] = useState(false);

	useEffect(() => {
		setInfo({
            asignacionId: "0",
            rutaId: "0",
            fechaRecorrido: "2024-04-04"
		});
	}, []);

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();
		createRuta.mutate({...info, asignacionId: Number(info.asignacionId), rutaId: Number(info.rutaId)}, {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			onSuccess: (_received) => {

				setInfo({
					asignacionId: "0",
					rutaId: "0",
					fechaRecorrido: "2024-04-04"
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

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<form onSubmit={onSubmit}>
				<div className="mb-6">
					<label
						htmlFor="rutaId"
						className="block mb-2 text-sm font-medium"
					>
						Ruta
					</label>
					<input
						className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						id="rutaId"
						placeholder="Las americas"
						required
						name="rutaId"
						type="text"
						value={info.rutaId}
						onChange={(e)=> setInfo({...info, rutaId: e.target.value})}
					/>
					<Select id="countries" required>
						<option selected>Choose a route</option>
						{rutasArreglo.map((ruta) => (
							<option key={ruta.id} value={ruta.id}>
							{ruta.nombreRuta}
							</option>
						))}
					</Select>
				</div>
				<div className="mb-6">
					<label
						htmlFor="estadoRuta"
						className="block mb-2 text-sm font-medium"
					>
						Asignacion
					</label>
					<input
						className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						id="asignacionId"
						placeholder="Las americas"
						required
						name="asignacionId"
						type="text"
						value={info.asignacionId}
						onChange={(e)=> setInfo({...info, asignacionId: e.target.value})}
					/>
					{/* <Select
						id="asignacionId"
						required
						value={info.asignacionId}
						onChange={(e) => setInfo({...info, asignacionId: e.target.value})}
					>
						<option value="true">true</option>
						<option value="false">false</option>
					</Select> */}
				</div>
				<div className="mb-6">
					<label
						htmlFor="latitudDestino"
						className="block mb-2 text-sm font-medium"
					>
						Fecha de recorrido
					</label>
					<TextInput
					id="fechaRecorrido"
					name="fechaRecorrido"
					placeholder="90" 
					required
					type="text"
					value={info.fechaRecorrido}
					onChange={(e) => setInfo({...info, fechaRecorrido: e.target.value})} 
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
