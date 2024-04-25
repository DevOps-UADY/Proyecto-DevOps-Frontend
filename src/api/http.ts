import axios from "axios";

const baseURL = String(import.meta.env.VITE_API_URL);
                                    // /ruta  /vehiculo  /conductores
export const ejemploURL = baseURL + "/posts";

export const httpClient = axios.create({
	baseURL: baseURL,
});
