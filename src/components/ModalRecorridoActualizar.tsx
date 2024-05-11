import { Modal } from "./Modal";
import { FormEvent, useState } from "react";
import { TextInput, Select } from "flowbite-react";
import { useCreateRecorrido } from "../api";
import { Alert } from "flowbite-react";
import { Ruta as IRuta, Asignacion as IAsignacion } from "../interfaces";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	mutateInfoClients: () => void;
	rutasArreglo: IRuta[];
	asignacionArreglo: IAsignacion[];
}

export const ModalRecorridoActualizar = ({ isOpen, onClose, mutateInfoClients, rutasArreglo, asignacionArreglo }: Props) => {
	const createRuta = useCreateRecorrido();
	console.log(asignacionArreglo);
		

	const [info, setInfo] = useState({
		asignacionId: "0",
		rutaId: "0",
		fechaRecorrido: "2024-04-04"
	});

	const [mensaje, setMensaje] = useState("");
	const [mostrarAlerta, setMostrarAlerta] = useState(false);

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();
		
		if (isNaN(Date.parse(info.fechaRecorrido))) {
            setMensaje('El valor de la fecha de nacimiento debe presentar un formato de DD/MM/AA');
			setMostrarAlerta(true);
			return;
        }

		createRuta.mutate({...info, asignacionId: Number(info.asignacionId), rutaId: Number(info.rutaId)}, {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			onSuccess: (_received) => {

				onClose();

				mutateInfoClients();
			},
			onError: (error) => {
				console.log(error);
				
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
						Editar recorrido
					</label>
					<Select 
						id="rutaId" 
						name="rutaId"
						required
						onChange={(e) => setInfo({...info, rutaId: e.target.value})}
						>
							<option selected>Elegir ruta</option>
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
					<Select 
						id="asignacionId" 
						name="asignacionId"
						required
						onChange={(e) => setInfo({...info, asignacionId: e.target.value})}
						>
							<option selected>Elegir asignacion</option>
							{asignacionArreglo.map((asignacion) => (
								<option key={asignacion.id} value={asignacion.id}>
								{asignacion.id}
								</option>
							))}
					</Select>
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
					placeholder="2024-04-04" 
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
