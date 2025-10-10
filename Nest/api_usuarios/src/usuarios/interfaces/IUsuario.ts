//definir la estructura de datos de un objeto usuario
// interfaces --> a las estructuras de datos que se trasmiten por la red
//types --> para definir estructuras de datos internas o esquemas de datos
// dtos --> para validar estructuras de datos que se reciben desde la red


export interface IAdress{
    calle: string;
    numero: string;
    ciudad: string;
    pais: string;
}
export interface IUser {
    id: number;
    name: string;
    email: string; 
    edad: number;  
    rol: string;
    nif?: string;
    telefonos?: string[];
    esMadrid?: boolean;
    direcciones?: IAdress[];  
}

export interface IRespUser{
    status: boolean;
    code: number;
    msg: string;
    data?: IUser[] | IUser;
}

type TUsers = {
    id : number;
    name: string;
    email: string;
}