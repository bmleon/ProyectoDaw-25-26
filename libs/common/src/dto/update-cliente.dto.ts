import { PartialType } from '@nestjs/mapped-types';
import { CreateClienteDto } from './create-cliente.dto';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateClienteDto extends PartialType(CreateClienteDto) {

    @IsString()
    @IsNotEmpty()
    id!: string;

}