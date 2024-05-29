import axios from "axios";

const baseURL = "http://192.168.1.111:3000/";               
export const rutaURL = baseURL;

export const httpClient = axios.create({
	baseURL: baseURL,
});
