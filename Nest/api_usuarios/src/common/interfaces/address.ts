//import { IAddress } from "src/common/interfaces/address";

export interface IAdress {
    calle: string;
    numero: string;
    ciudad: string;
    provincia?: string;
    pais: string;
    cpostal?: string;
}
