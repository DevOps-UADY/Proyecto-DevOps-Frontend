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

export interface Vehiculo {
    id: string;
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

export interface Asignacion{
    id: string;
    vehiculo: Vehiculo;
    conductor: Conductor;
    idRuta: string;
    fechaAsignacionVinculacion: Date;
    enFuncionamiento: boolean;
}


export interface AsignacionDTO{
    vehiculoAsociado: Vehiculo;
    conductorAsociado: Conductor;
    idRuta: string;
    enFuncionamiento: boolean;
}

export interface Recorridos{
    id: number;
    asignacion: Asignacion;
    auxAsignacion: number;
    rutaId: number;
    fechaRecorrido: string;
    exito: boolean;
    comentarios: string;
    fechaCreacion: Date;
}

export interface RecorridosDTO{
    asignacionId: number;
    rutaId: number;
    fechaRecorrido: string;
    exito?: boolean;
    comentarios?: string;
}
