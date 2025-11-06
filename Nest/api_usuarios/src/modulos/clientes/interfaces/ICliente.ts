import { IAddress } from "src/common/modelo/interfaces/IAddress";

// definir la estructura del objeto  que viene desde Internet
export interface ICliente{
    nif: string;
    nombre: string;
    apellidos: string;
    edad: number;
    comision: number;
    direccion: IAddress;
}