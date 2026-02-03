import { IsString, IsNumber, IsOptional, IsUUID, Min, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEmpleadoDto {
    @IsString()
    @IsUUID()
    userId: string;

    @IsString()
    puesto: string;

    @IsNumber()
    @Min(0)
    @Type(() => Number)
    salario: number;

    @IsString()
    @IsOptional()
    departamento?: string;

    @IsDateString()
    @IsOptional()
    fechaContratacion?: string;
}