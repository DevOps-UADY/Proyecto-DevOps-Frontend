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
	id: number;
    nombreConductor: string;
    fechaNacimiento: string;
    curp: string;
    direccionCasa: string;
    salario: number;
    numeroLicencia: number;
    deletedAt: Date;
    fechaIngresoSistemaConductor: Date;
}

export interface ConductorDTO {
    nombreConductor: string;
    fechaNacimiento: string;
    curp: string;
    direccionCasa: string;
    salario: number;
    numeroLicencia: number;
}

export interface Usuario {
    id:               string;
    correo:           string;
    contrasenia:      string;
    codigoInvitacion: string;
    jwt:              string;
}

export interface Usuarios {
    id:               string;
    correo:           string;
    codigoInvitacion: string;
}
