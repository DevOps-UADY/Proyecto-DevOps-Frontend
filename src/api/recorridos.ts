import { useMutation } from "@tanstack/react-query";
import { Recorridos, RecorridosDTO } from "../interfaces";
import { httpClient } from "./http";

export const useGetRecorridos= () => {
    return useMutation({
        mutationKey: ["Recorridos"],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        mutationFn: async(_id: string) => {
            const {data} = await  httpClient.get<Recorridos[]>("/recorridos",{
            })
            return data;
        }
    });
}

export const useCreateRecorrido = () => {
    return useMutation({
        mutationKey: ["Recorridos"],
        mutationFn: async (recorrido: Omit<RecorridosDTO, "id">) => {
            const { data } = await httpClient.post<RecorridosDTO>("/recorridos", {
                ...recorrido,
            });

            return data;
        },
    });
};

export const useGetRecorridoById = () => {
    return useMutation({
        mutationKey: ["Recorridos"],
        mutationFn: async (recorridoId: number) => {
            const { data } = await httpClient.get<Recorridos>(`/recorridos/${recorridoId}`);
            return data;
        },
    });
};

export const useUpdateRecorrido = () => {
    return useMutation({
    mutationKey: ["Recorridos"],
    mutationFn: async ({ recorridoId, recorrido }: { recorridoId: number, recorrido: Omit<RecorridosDTO, "id"> }) => {
        const { data } = await httpClient.put<RecorridosDTO>(`/recorridos/${recorridoId}`, recorrido);
        return data;
    },
    });
}

export const useDeleteRecorrido = () => {
    return useMutation({
        mutationKey: ["Recorridos"],
        mutationFn: async (recorridoId: number) => {
            const { data } = await httpClient.delete<Recorridos>(`/recorridos/${recorridoId}`);
            return data;
        },
    });
};