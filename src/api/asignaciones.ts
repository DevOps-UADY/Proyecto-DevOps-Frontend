import { useMutation } from "@tanstack/react-query";
import { Asignacion, AsignacionDTO } from "../interfaces";
import { httpClient } from "./http";

export const useGetAsignaciones= () => {
	return useMutation({
		mutationKey: ["Asignaciones"],
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		mutationFn: async(_id: string) => {
			const {data} = await  httpClient.get<Asignacion[]>("/asignaciones",{
            })
            return data;
		}
	});
}

export const useCreateAsignacion = () => {
	return useMutation({
		mutationKey: ["Asignaciones"],
		mutationFn: async (asignacion: Omit<AsignacionDTO, "id">) => {
			const { data } = await httpClient.post<AsignacionDTO>("/asignaciones", {
				...asignacion,
			});

			return data;
		},
	});
};

export const useGetAsignacionById = () => {
	return useMutation({
		mutationKey: ["Asignaciones"],
		mutationFn: async (asignacionId: number) => {
			const { data } = await httpClient.get<Asignacion>(`/asignaciones/${asignacionId}`);
			return data;
		},
	});
};


export const useUpdateAsignacion = () => {
	return useMutation({
	mutationKey: ["Asignaciones"],
	mutationFn: async ({ asignacionId, asignacion }: { asignacionId: number, asignacion: Omit<AsignacionDTO, "id"> }) => {
		const { data } = await httpClient.put<AsignacionDTO>(`/asignaciones/${asignacionId}`, asignacion);
		return data;
	},
	});
};

export const useDeleteAsignacion = () => {
	return useMutation({
		mutationKey: ["Asignaciones"],
		mutationFn: async (asignacionId: number) => {
			const { data } = await httpClient.delete<Asignacion>(`/asignaciones/${asignacionId}`);
			return data;
		},
	});
};