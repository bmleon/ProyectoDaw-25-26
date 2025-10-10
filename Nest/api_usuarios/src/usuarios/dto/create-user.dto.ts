import { ArrayMaxSize, ArrayMinSize, IsArray, IsEmail, IsEmpty, IsIn, IsInt, IsNumber, IsOptional, IsString, IsUUID, Matches, Max, MaxLength, Min, MinLength, validate, ValidateNested } from "class-validator";

import { AdressDto } from "./adress.dto";
import { Type } from "class-transformer";

// petición a los roles que hay en la tabla de los roles de la api
const roles: string[] = ['administrador', 'usuario', 'invitado'];

export class CreateUserDto {
    
    //@IsNumber() // Función externa que valida que es un número
    @IsUUID() // Es un identificador único universal. 32 o 36 caracteres(-)
    id : number;

    // Edad esta comprendida entre 18 y 58
    @IsInt({message: 'La edad es un entero'}) // Función externa que valida que es un número
    @Min(18, {message: 'La edad mínima es 18 años'})
    @Max(58, {message: 'La edad máxima es 55 años'})
    edad: number;

    @IsOptional()
    @IsString() // Función externa que valida que es un string
    @MinLength(5, {message: 'Minimo 5 caracteres'})
    @MaxLength(8, {message: 'Máximo 8 caracteres'})
    name: string;

    @IsEmail() // Función externa que valida que es un string
    email: string; 
    
    @IsOptional()
    @IsArray()
    @ArrayMinSize(2, {message: 'Debe tener al menos 2 telefonos'})
    @ArrayMaxSize(3, {message: 'Debe tener como máximo 3 telefonos'})
    telefonos: string[];  
    
    @IsOptional()
    @IsString()
    @Matches(/^\d{8}[A-Z]$/, {message: 'El nif no es correcto, 8 números y una letra mayúscula'})
    nif: string;    

    @IsIn(roles, {message: `El rol debe ser uno de los siguientes: ${roles}`})
    rol: string;
    
    @IsArray()
    @ArrayMinSize(3, {message: 'Debe tener al menos 3 dirección'})
    @ValidateNested({ each: true }) // valida cada uno de los elementos del array
    @Type(() => AdressDto) // transforma el objeto a la clase AdressDto
    direcciones: AdressDto[]; // Array de direcciones
}