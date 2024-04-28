import { Modal } from "./Modal";
import { FormEvent, useState, useEffect } from "react";
import { TextInput} from "flowbite-react";
import { useCreateConductor, useGetConductorById, useUpdateConductor } from "../api";
import { Alert } from "flowbite-react";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	mutateInfoClients: () => void;
	initialData: number;
	action: number;
}

export const ModalConductor = ({ isOpen, onClose, mutateInfoClients, initialData, action }: Props) => {
	const createConductor = useCreateConductor();
	const {mutate} = useGetConductorById();
	const updateConductor = useUpdateConductor();

	const [info, setInfo] = useState({
		nombreConductor: "",
		fechaNacimiento: "",
		curp: "",
        direccionCasa: "",
        salario: "1",
        numeroLicencia: "123456789",
	});

	const [mensaje, setMensaje] = useState("");
	const [mostrarAlerta, setMostrarAlerta] = useState(false);

	useEffect(() => {
		if (action===1) {
			mutate(
					initialData, 
				{
					onSuccess: (data) => setInfo({
                        nombreConductor: data.nombreConductor,
                        fechaNacimiento: data.fechaNacimiento,
                        curp: data.curp,
                        direccionCasa: data.direccionCasa,
                        salario: data.salario.toString(),
                        numeroLicencia: data.numeroLicencia.toString(),
					},),
					onError: (error) => {
						setMensaje(error.message);
						setMostrarAlerta(true);
					}
				}
			);
		}else{
			setInfo({
				nombreConductor: "",
				fechaNacimiento: "",
				curp: "",
                direccionCasa: "",
                salario: "1",
                numeroLicencia: "123456789",
			});
		}
	}, [action, initialData, mutate]);

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();

        if (parseFloat(info.salario) < 0) {
            setMensaje('El valor del salario debe ser un número válido mayor a 0');
			setMostrarAlerta(true);
			return;
        }

        if (info.curp.length != 18) {
            setMensaje('El valor del CURP debe presentar 18 caracteres');
			setMostrarAlerta(true);
			return;
        }

		if (isNaN(Date.parse(info.fechaNacimiento))) {
			console.log(info.fechaNacimiento);
            setMensaje('El valor de la fecha de nacimiento debe presentar un formato de DD/MM/AA');
			setMostrarAlerta(true);
			return;
        }
		
		if (action === 1){
			updateConductor.mutate({conductorId: initialData, conductor: {...info, salario: parseFloat(info.salario), numeroLicencia: parseInt(info.numeroLicencia)}}, {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				onSuccess: (_received) => {
	
					setInfo({
						nombreConductor: "",
						fechaNacimiento: "",
						curp: "",
                        direccionCasa: "",
                        salario: "1",
                        numeroLicencia: "123456789",
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
			createConductor.mutate({...info, salario: parseFloat(info.salario), numeroLicencia: parseInt(info.numeroLicencia)}, {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				onSuccess: (_received) => {
	
					setInfo({
						nombreConductor: "",
						fechaNacimiento: "",
						curp: "",
                        direccionCasa: "",
                        salario: "1",
                        numeroLicencia: "123456789",
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
						htmlFor="nombreConductor"
						className="block mb-2 text-sm font-medium"
					>
						Nombre del conductor
					</label>
					<input
						className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						id="nombreConductor"
						placeholder="John Doe"
						required
						name="nombreConductor"
						type="text"
						value={info.nombreConductor}
						onChange={(e)=> setInfo({...info, nombreConductor: e.target.value})}
					/>
				</div>
				<div className="mb-6">
					<label
						htmlFor="fechaNacimiento"
						className="block mb-2 text-sm font-medium"
					>
						Fecha de nacimiento del conducto
					</label>
					<input
						className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						id="fechaNacimiento"
						placeholder="AA-MM-DD"
						required
						name="fechaNacimiento"
						type="text"
						value={info.fechaNacimiento}
						onChange={(e) => setInfo({ ...info, fechaNacimiento: e.target.value })}
					/>
				</div>
				<div className="mb-6">
					<label
						htmlFor="curp"
						className="block mb-2 text-sm font-medium"
					>
						CURP del conductor
					</label>
					<input
						className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						id="curp"
						placeholder="ABCZ000000MYMXXX00"
						required
						name="curp"
						type="text"
						value={info.curp}
						onChange={(e) => setInfo({ ...info, curp: e.target.value })}
					/>
				</div>
				<div className="mb-6">
					<label
						htmlFor="direccionCasa"
						className="block mb-2 text-sm font-medium"
					>
						Direccion de localidad del conductor
					</label>
					<TextInput
					id="direccionCasa"
					name="direccionCasa"
					placeholder="Direccion" 
					required
					type="text"
					value={info.direccionCasa}
					onChange={(e) => setInfo({...info, direccionCasa: e.target.value})} 
					color="info" />
				</div>
				<div className="mb-6">
					<label
						htmlFor="salario"
						className="block mb-2 text-sm font-medium"
					>
						Salario del conductor
					</label>
					<input
						className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						id="salario"
						placeholder="1"
						required
						name="salario"
						type="text"
						pattern="[0-9]*"
						value={info.salario}
						onChange={(e) => setInfo({ ...info, salario: e.target.value })}
					/>
				</div>
				<div className="mb-6">
					<label
						htmlFor="numeroLicencia"
						className="block mb-2 text-sm font-medium"
					>
						Numero de licencia del conductor
					</label>
					<input
						className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						id="numeroLicencia"
						placeholder="123456789"
						required
						name="numeroLicencia"
						type="text"
						pattern="[0-9]*"
						value={info.numeroLicencia}
						onChange={(e) => setInfo({ ...info, numeroLicencia: e.target.value })}
					/>
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
