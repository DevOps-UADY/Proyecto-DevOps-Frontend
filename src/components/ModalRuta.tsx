import { Modal } from "./Modal";
import { FormEvent, useState, useEffect } from "react";
import { useCreateCRuta, useGetRutaById, useUpdateRuta } from "../api";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	mutateInfoClients: () => void;
	initialData: number;
	action: number;
}

export const ModalRuta = ({ isOpen, onClose, mutateInfoClients, initialData, action }: Props) => {
	const createRuta = useCreateCRuta();
	const {mutate} = useGetRutaById();
	const updateRuta = useUpdateRuta();

	const [info, setInfo] = useState({
		nombreRuta: "",
		estadoRuta: true,
		latitudDestino: 90,
		longitudDestino: 180,
	});

	useEffect(() => {
		if (action===1) {
			mutate(initialData, {
				onSuccess: (data) => setInfo({
					nombreRuta: data.nombreRuta,
					estadoRuta: data.estadoRuta,
					latitudDestino: data.latitudDestino,
					longitudDestino: data.longitudDestino,
				}
				)
			});
		}else{
			setInfo({
				nombreRuta: "",
				estadoRuta: true,
				latitudDestino: 90,
				longitudDestino: 180,
			});
		}
	}, [action, initialData, mutate]);

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (action === 1){
			console.log(initialData, info);
			updateRuta.mutate({rutaId: initialData, ruta: info}, {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				onSuccess: (_received) => {
	
					setInfo({
						nombreRuta: "",
						estadoRuta: true,
						latitudDestino: 90,
						longitudDestino: 180,
					});
	
					onClose();
	
					mutateInfoClients();
				},
			});
		} else {
			createRuta.mutate(info, {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				onSuccess: (_received) => {
	
					setInfo({
						nombreRuta: "",
						estadoRuta: true,
						latitudDestino: 90,
						longitudDestino: 180,
					});
	
					onClose();
	
					mutateInfoClients();
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
						estado de la ruta
					</label>
					<input
						className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						id="estadoRuta"
						placeholder="true"
						required
						name="estadoRuta"
						type="text"
						value={info.estadoRuta.toString()}
						onChange={(e) => setInfo({...info, estadoRuta: e.target.value === "true"})} 
					/>
				</div>
				<div className="mb-6">
					<label
						htmlFor="latitudDestino"
						className="block mb-2 text-sm font-medium"
					>
						latitud de destino
					</label>
					<input
						className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						id="latitudDestino"
						required
						name="latitudDestino"
						value={info.latitudDestino}
						placeholder="90"
						onChange={(e) => setInfo({...info, latitudDestino: parseInt(e.target.value)})} 
					/>
				</div>
				<div className="mb-6">
					<label
						htmlFor="longitudDestino"
						className="block mb-2 text-sm font-medium"
					>
						latitud de destino
					</label>
					<input
						className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						id="longitudDestino"
						required
						name="longitudDestino"
						value={info.longitudDestino}
						placeholder="180"
						onChange={(e) => setInfo({...info, longitudDestino: parseInt(e.target.value)})} 
					/>
				</div>
				<button
					type="submit"
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
				>
					Añadir ruta
				</button>
			</form>
		</Modal>
	);
};
