import { IsString, IsNumber, IsNotEmpty, IsOptional, IsBoolean, Min } from 'class-validator';

export class CreateProductoDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsNumber()
    @Min(0)
    precio: number;

    @IsString()
    @IsOptional()
    descripcion?: string;

    @IsBoolean()
    @IsOptional()
    disponible?: boolean;
}