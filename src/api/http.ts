import axios from "axios";

const baseURL = "http://192.168.1.110:3000/";               
export const rutaURL = baseURL;

export const httpClient = axios.create({
	baseURL: baseURL,
});
