import { useMutation } from "@tanstack/react-query";
import { Conductor, ConductorDTO } from "../interfaces";
import { httpClient } from "./http";

export const useGetConductores = () => {
	return useMutation({
		mutationKey: ["Conductores"],
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		mutationFn: async(_id: string) => {
			const {data} = await  httpClient.get<Conductor[]>("/conductores",{
            })
            return data;
		}
	});
}

export const useCreateConductor = () => {
	return useMutation({
		mutationKey: ["Conductores"],
		mutationFn: async (conductor: Omit<ConductorDTO, "id">) => {
			const { data } = await httpClient.post<ConductorDTO>("/conductores", {
				...conductor,
			});

			return data;
		},
	});
};

export const useGetConductorById = () => {
	return useMutation({
		mutationKey: ["Conductores"],
		mutationFn: async (conductorId: number) => {
			const { data } = await httpClient.get<Conductor>(`/conductores/${conductorId}`);
			return data;
		},
	});
};


export const useUpdateConductor = () => {
	return useMutation({
	mutationKey: ["Conductores"],
	mutationFn: async ({ conductorId, conductor }: { conductorId: number, conductor: Omit<ConductorDTO, "id"> }) => {
		const { data } = await httpClient.put<ConductorDTO>(`/conductores/${conductorId}`, conductor);
		return data;
	},
	});
};

export const useDeleteConductor = () => {
	return useMutation({
		mutationKey: ["Conductores"],
		mutationFn: async (conductorId: number) => {
			const { data } = await httpClient.delete<Conductor>(`/conductores/${conductorId}`);
			return data;
		},
	});
};