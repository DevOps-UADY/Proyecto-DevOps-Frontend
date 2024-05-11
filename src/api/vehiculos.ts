import { useMutation } from "@tanstack/react-query";
import { Vehiculo, VehiculoDTO } from "../interfaces";
import { httpClient } from "./http";

export const useGetVehiculos = () => {
	return useMutation({
		mutationKey: ["Conductores"],
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		mutationFn: async(_id: string) => {
			const {data} = await  httpClient.get<Vehiculo[]>("/conductores",{
            })
            return data;
		}
	});
}

export const useCreateVehiculo = () => {
	return useMutation({
		mutationKey: ["Conductores"],
		mutationFn: async (conductor: Omit<VehiculoDTO, "id">) => {
			const { data } = await httpClient.post<VehiculoDTO>("/conductores", {
				...conductor,
			});

			return data;
		},
	});
};

export const useGetVehiculoById = () => {
	return useMutation({
		mutationKey: ["Conductores"],
		mutationFn: async (conductorId: number) => {
			const { data } = await httpClient.get<Vehiculo>(`/conductores/${conductorId}`);
			return data;
		},
	});
};


export const useUpdateVehiculo = () => {
	return useMutation({
	mutationKey: ["Conductores"],
	mutationFn: async ({ conductorId, conductor }: { conductorId: number, conductor: Omit<VehiculoDTO, "id"> }) => {
		const { data } = await httpClient.put<VehiculoDTO>(`/conductores/${conductorId}`, conductor);
		return data;
	},
	});
};

export const useDeleteVehiculo = () => {
	return useMutation({
		mutationKey: ["Conductores"],
		mutationFn: async (conductorId: number) => {
			const { data } = await httpClient.delete<Vehiculo>(`/conductores/${conductorId}`);
			return data;
		},
	});
};