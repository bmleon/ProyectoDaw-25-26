import { IsString } from 'class-validator';

export class AdressDto {
    @IsString()
    calle: string;

    @IsString()
    numero: string;
    
    @IsString()
    ciudad: string;

    @IsString()
    pais: string;
}