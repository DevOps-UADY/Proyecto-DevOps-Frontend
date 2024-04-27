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

export interface RutaDTO {
    nombreRuta: string;
    estadoRuta: boolean;
    latitudDestino: number;
    longitudDestino: number;
}

export interface Conductor {
	nombre: string;
}
