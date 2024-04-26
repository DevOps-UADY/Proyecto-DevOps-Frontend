import axios from "axios";

const baseURL = String(import.meta.env.VITE_API_URL);                  
export const rutaURL = baseURL;

export const httpClient = axios.create({
	baseURL: baseURL,
});
