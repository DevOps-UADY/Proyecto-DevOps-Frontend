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

export interface Vehiculo {
    id: number;
    marca: string;
    modelo: string;
    vin: string;
    placa: string;
    fechaCompra: string;
    costo: number;
    fotografia: string;
    estatusAsignacion: boolean;
    fechaIngresoSistema: Date;
}

export interface VehiculoDTO {
    marca: string;
    modelo: string;
    vin: string;
    placa: string;
    fechaCompra: string;
    costo: number;
    fotografia: string;
    estatusAsignacion: boolean;
}

