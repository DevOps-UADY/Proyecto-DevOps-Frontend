import { useMutation } from "@tanstack/react-query";
import { Ruta, RutaDTO } from "../interfaces";
import { httpClient } from "./http";

export const useGetRutas = () => {
	return useMutation({
		mutationKey: ["SingUp"],
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		mutationFn: async(_id: string) => {
			const {data} = await  httpClient.get<Ruta[]>("/signup",{
            })
            return data;
		}
	});
}

export const useCreateCRuta = () => {
	return useMutation({
		mutationKey: ["Rutas"],
		mutationFn: async (ruta: Omit<RutaDTO, "id">) => {
			const { data } = await httpClient.post<RutaDTO>("/rutas", {
				...ruta,
			});

			return data;
		},
	});
};

export const useGetRutaById = () => {
	return useMutation({
		mutationKey: ["Rutas"],
		mutationFn: async (rutaId: number) => {
			const { data } = await httpClient.get<Ruta>(`/rutas/${rutaId}`);
			return data;
		},
	});
};


export const useUpdateRuta = () => {
	return useMutation({
	mutationKey: ["Rutas"],
	mutationFn: async ({ rutaId, ruta }: { rutaId: number, ruta: Omit<RutaDTO, "id"> }) => {
		const { data } = await httpClient.put<RutaDTO>(`/rutas/${rutaId}`, ruta);
		return data;
	},
	});
};

export const useDeleteRuta = () => {
	return useMutation({
		mutationKey: ["Rutas"],
		mutationFn: async (rutaId: number) => {
			const { data } = await httpClient.delete<Ruta>(`/rutas/${rutaId}`);
			return data;
		},
	});
};