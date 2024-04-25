import { useQuery } from "@tanstack/react-query";

import { ejemplo } from "../interfaces";
import { ejemploURL, httpClient } from "./http";

const getExchangeRates = async () => {
	const { data } = await httpClient<ejemplo[]>({
		method: "GET",
		url: ejemploURL,
	});

	return data;
};

export const useGetExchangeRates = () => {
	return useQuery({
		queryKey: ["ejemplo"],
		queryFn: () => getExchangeRates(),
	});
};
