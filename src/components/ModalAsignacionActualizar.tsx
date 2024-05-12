import { Modal } from "./Modal";
import { FormEvent, useState } from "react";
import {Select } from "flowbite-react";
import { useUpdateAsignacion } from "../api";
import { Alert } from "flowbite-react";
import { Conductor as IConductor, Vehiculo as IVehiculo, Asignacion as IAsignacion, AsignacionDTO } from "../interfaces";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	mutateInfoClients: () => void;
    conductoresArreglo: IConductor[];
    vehiculosArreglo: IVehiculo[];
    initialData: IAsignacion[];
    idAsign:number;
}

export const ModalAsignacionActualizar = ({ isOpen, onClose, mutateInfoClients, conductoresArreglo, vehiculosArreglo, initialData, idAsign}: Props) => {
	const updateAsignacion = useUpdateAsignacion();

    const [info, setInfo] = useState<{
		vehiculo: IVehiculo | undefined;
		conductor: IConductor | undefined;
		enFuncionamiento: boolean;
	}>({
		vehiculo: undefined,
		conductor: undefined,
		enFuncionamiento: false
	});

	const [mensaje, setMensaje] = useState("");
	const [mostrarAlerta, setMostrarAlerta] = useState(false);

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();
        const cambios: Partial<AsignacionDTO> = {};
		console.log(info);
		
        const valorActualAsignacion = initialData.find((asignacion) => parseInt(asignacion.id) === idAsign);
		const valorNuevaAsignacion = info;

        if ((valorActualAsignacion?.conductor?.id !== valorNuevaAsignacion.conductor?.id) && (valorNuevaAsignacion.conductor !== undefined)) {
			cambios.idConductor = valorNuevaAsignacion.conductor?.id;
		}

        if ((valorActualAsignacion?.vehiculo?.id !== valorNuevaAsignacion.vehiculo?.id) && (valorNuevaAsignacion.vehiculo !== undefined)) {
			cambios.idVehiculo = valorNuevaAsignacion.vehiculo?.id;
		}
        cambios.enFuncionamiento = valorNuevaAsignacion.enFuncionamiento

        console.log(cambios);

        
        updateAsignacion.mutate({asignacionId: idAsign, asignacion: {...cambios}}, {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onSuccess: (_received) => {

                setInfo({
                    vehiculo: undefined,
                    conductor: undefined,
                    enFuncionamiento: false
                });

                onClose();

                mutateInfoClients();
            },
            onError: (error) => {
                console.log(error);
                setMensaje("asignación ya existente");
                setMostrarAlerta(true);
            }
        });
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<form onSubmit={onSubmit}>
                <div className="mb-6">
					<label
						htmlFor="conductorId"
						className="block mb-2 text-sm font-medium"
					>
						Conductor
					</label>
					<Select 
						id="conductorId" 
						name="conductorId"
						required
						onChange={(e) => {
							const selectedConductorId = parseInt(e.target.value);
							const selectedConductor = conductoresArreglo.find(conductor => conductor.id === selectedConductorId);
							if (selectedConductorId) {
								setInfo({...info, conductor: selectedConductor});
							}
						}}
						>
							<option selected>Elegir Conductor</option>
							{conductoresArreglo.map((conductor) => (
								<option key={conductor.id} value={conductor.id}>
								{conductor.nombreConductor}
								</option>
							))}
					</Select>
				</div>
				<div className="mb-6">
					<label
						htmlFor="vehiculoId"
						className="block mb-2 text-sm font-medium"
					>
						Vehiculo
					</label>
					<Select 
						id="vehiculoId" 
						name="vehiculoId"
						required
						onChange={(e) => {
							const selectedVehiculoId = parseInt(e.target.value);
							const selectedVehiculo = vehiculosArreglo.find(vehiculo => vehiculo.id === selectedVehiculoId);
							if (selectedVehiculo) {
								setInfo({...info, vehiculo: selectedVehiculo});
							}
						}}
						>
	
							<option selected>Elegir Vehiculo</option>
							
							{vehiculosArreglo.map((vehiculo:IVehiculo) => (
								<option key={vehiculo.id} value={vehiculo.id}>
								{vehiculo.placa}
								</option>
							))}
							
					</Select>

				</div>

                <div className="mb-6">
					<label
						htmlFor="enFuncionamiento"
						className="block mb-2 text-sm font-medium"
					>
						Estado asignacion
					</label>
					<Select
						id="enFuncionamiento"
						required
						value={info.enFuncionamiento.toString()}
						onChange={(e) => setInfo({...info, enFuncionamiento: e.target.value === "true"})}
					>
						<option value="true">Asignado</option>
						<option value="false">Sin asignar</option>
					</Select>
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