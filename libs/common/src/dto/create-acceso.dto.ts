import { IsString, IsNotEmpty, IsUUID, IsIP } from 'class-validator';

export class CreateAccesoDto {
    @IsUUID()
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    @IsIP()
    ipOrigen: string;

    @IsString()
    @IsNotEmpty()
    resultado: string;
}