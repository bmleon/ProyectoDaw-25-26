import { IsString, IsEmail, IsOptional, IsArray, MinLength } from 'class-validator';

export class CreateUsuarioDto {
    @IsString()
    username: string;

    @IsEmail({}, { message: 'El formato del correo no es válido' })
    email: string;

    @IsString()
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    password: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    roles?: string[];
}