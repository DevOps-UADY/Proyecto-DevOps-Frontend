import { Modal } from "./Modal";
import { FormEvent, useState } from "react";
import { TextInput, Select } from "flowbite-react";
import { useUpdateRecorrido } from "../api";
import { Alert } from "flowbite-react";
import { Ruta as IRuta, Asignacion as IAsignacion, Recorridos as IRecorridos, RecorridosDTO } from "../interfaces";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	mutateInfoClients: () => void;
	rutasArreglo: IRuta[];
	asignacionArreglo: IAsignacion[];
	initialData: IRecorridos[];
	idRe:number;
}

export const ModalRecorridoActualizar = ({ isOpen, onClose, mutateInfoClients, rutasArreglo, asignacionArreglo, initialData, idRe }: Props) => {
	const UpdateRecorrido = useUpdateRecorrido();
	
	const [info, setInfo] = useState({
		asignacionId: 0,
		rutaId: 0,
		fechaRecorrido: "0",
		exito: true,
		comentarios: "string"
	});

	const [mensaje, setMensaje] = useState("");
	const [mostrarAlerta, setMostrarAlerta] = useState(false);

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const cambios: Partial<RecorridosDTO> = {};

		const valorActualRecorrido = initialData.find((recorrido) => recorrido.id === idRe);
		const valorNuevoRecorrido = info;
		
		if ((valorActualRecorrido?.rutaId !== valorNuevoRecorrido.rutaId) && (valorNuevoRecorrido.rutaId !== 0)) {
			cambios.rutaId = valorNuevoRecorrido.rutaId;
		}

		if ((valorActualRecorrido?.auxAsignacion !== valorNuevoRecorrido.asignacionId) && (valorNuevoRecorrido.asignacionId !== 0)) {
			cambios.asignacionId = valorNuevoRecorrido.asignacionId;
		}

		if ((valorActualRecorrido?.fechaRecorrido !== valorNuevoRecorrido.fechaRecorrido) && (valorNuevoRecorrido.fechaRecorrido !== "0")) {
			cambios.fechaRecorrido = valorNuevoRecorrido.fechaRecorrido;
		}

		if ((valorActualRecorrido?.exito !== valorNuevoRecorrido.exito) && (valorNuevoRecorrido.exito !== true)) {
			cambios.exito = valorNuevoRecorrido.exito;
		}

		if ((valorActualRecorrido?.comentario !== valorNuevoRecorrido.comentarios) && (valorNuevoRecorrido.comentarios !== "string")) {
			cambios.comentario = valorNuevoRecorrido.comentarios;
		}
		console.log(cambios);
		
		
		if (isNaN(Date.parse(info.fechaRecorrido))) {
            setMensaje('El valor de la fecha debe presentar un formato de DD/MM/AA');
			setMostrarAlerta(true);
			return;
        }

		UpdateRecorrido.mutate({recorridoId: idRe, recorrido: {...cambios}}, {
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
						Ruta
					</label>
					<Select 
						id="rutaId" 
						name="rutaId"
						required
						onChange={(e) => setInfo({...info, rutaId: parseInt(e.target.value)})}
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
						onChange={(e) => setInfo({...info, asignacionId: parseInt(e.target.value)})}
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
					id="fechaRecorrido2"
					name="fechaRecorrido2"
					placeholder="2024-04-04" 
					type="text"
					onChange={(e) => setInfo({...info, fechaRecorrido: e.target.value})} 
					color="info" />
				</div>
				<div className="mb-6">
					<label
						htmlFor="Exito"
						className="block mb-2 text-sm font-medium"
					>
						Exito
					</label>
					<Select
						id="exito"
						required
						onChange={(e) => setInfo({...info, exito: e.target.value === "true"})}
					>
						<option value="true">true</option>
						<option value="false">false</option>
					</Select>
				</div>
				<div className="mb-6">
					<label
						htmlFor="Comentario"
						className="block mb-2 text-sm font-medium"
					>
						Comentario
					</label>
					<TextInput
					id="comentario"
					name="comentario"
					placeholder="..." 
					required
					type="text"
					onChange={(e) => setInfo({...info, comentarios: e.target.value})} 
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
