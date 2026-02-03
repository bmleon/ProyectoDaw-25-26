import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreatePerfilDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  nombre: string;

  @IsString()
  apellido: string;

  @IsString()
  @IsOptional()
  telefono?: string;

  @IsString()
  @IsOptional()
  direccion?: string;
}