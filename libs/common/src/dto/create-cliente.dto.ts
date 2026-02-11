import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateClienteDto {

    @IsString()
    @IsNotEmpty()
    nombre!: string;

    @IsEmail()
    email!: string;

    @IsString()
    @IsOptional()
    telefono?: string;
    
}