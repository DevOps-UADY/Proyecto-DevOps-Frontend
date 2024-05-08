import { useMutation } from "@tanstack/react-query";
import { httpClient } from "./http";

export const useGetUsuarios = () => {
	return useMutation({
		mutationKey: ["usuarios"],
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		mutationFn: async(_id: string) => {
			const {data} = await  httpClient.get("/usuarios",{
            })
            return data.usuarios.length;
		}
	});
}

