import { useMutation } from "@tanstack/react-query";
import { Vehiculo, VehiculoDTO } from "../interfaces";
import { httpClient } from "./http";

export const useGetVehiculos = () => {
	return useMutation({
		mutationKey: ["Vehiculos"],
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		mutationFn: async(_id: string) => {
			const {data} = await  httpClient.get("/vehiculos",{
            })
			console.log(data)
            return data.data;
		}
	});
}

export const useCreateVehiculo = () => {
	return useMutation({
		mutationKey: ["Vehiculos"],
		mutationFn: async (vehiculo: Omit<VehiculoDTO, "id">) => {
			const { data } = await httpClient.post<VehiculoDTO>("/vehiculos", {
				...vehiculo,
			});

			return data;
		},
	});
};

export const useGetVehiculoById = () => {
	return useMutation({
		mutationKey: ["Vehiculos"],
		mutationFn: async (vehicuId: number) => {
			const { data } = await httpClient.get<Vehiculo>(`/vehiculos/${vehicuId}`);
			return data;
		},
	});
};


export const useUpdateVehiculo = () => {
	return useMutation({
	mutationKey: ["Vehiculos"],
	mutationFn: async ({ vehiculoId, vehiculo }: { vehiculoId: number, vehiculo: Omit<VehiculoDTO, "id"> }) => {
		const { data } = await httpClient.put<VehiculoDTO>(`/vehiculos/${vehiculoId}`, vehiculo);
		return data;
	},
	});
};

export const useDeleteVehiculo = () => {
	return useMutation({
		mutationKey: ["Vehiculos"],
		mutationFn: async (vehicuId: number) => {
			const { data } = await httpClient.delete<Vehiculo>(`/vehiculos/${vehicuId}`);
			return data;
		},
	});
};

export const useGetTotalVehiculos = () => {
	return useMutation({
		mutationKey: ["Vehiculos"],
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		mutationFn: async (_id: string) => {
			const { data } = await httpClient.get<{ cantidad: number }>("/vehiculos/total");
			return data.cantidad;
		},
	});
};
