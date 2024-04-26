import axios from "axios";

const baseURL = "http://localhost:3000/";               
export const rutaURL = baseURL;

export const httpClient = axios.create({
	baseURL: baseURL,
});
