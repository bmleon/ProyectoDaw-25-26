import { Controller, Get, Post, Body, Param, Inject, ParseIntPipe } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { USUARIOS_SERVICE } from '../../../config';

@Controller('accesos')
export class AccesosController {
    constructor(@Inject(USUARIOS_SERVICE) private readonly client: ClientProxy) {}

    @Post()
    create(@Body() createAccesoDto: any) {
        return this.client.send({ cmd: 'create_acceso' }, createAccesoDto).pipe(
        catchError(error => { throw new RpcException(error); })
        );
    }

    @Get()
    findAll() {
        return this.client.send({ cmd: 'find_all_accesos' }, {}).pipe(
        catchError(error => { throw new RpcException(error); })
        );
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.client.send({ cmd: 'find_one_acceso' }, { id }).pipe(
        catchError(error => { throw new RpcException(error); })
        );
    }
}