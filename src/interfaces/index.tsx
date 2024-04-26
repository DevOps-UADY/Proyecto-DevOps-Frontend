export interface Ruta {
	id: number;
    nombreRuta: string;
    estadoRuta: boolean;
    latitudInicio: number;
    longitudInicio: number;
    latitudDestino: number;
    longitudDestino: number;
    deletedAt: Date;
    fechaCreacionRuta: Date;
}

export interface Conductor {
	nombre: string;
}

export interface ejemplo{
    userId: number;
    id: number;
    title: string;
    body: string;
}