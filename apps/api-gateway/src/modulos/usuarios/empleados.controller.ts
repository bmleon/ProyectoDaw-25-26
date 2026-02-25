import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, ParseIntPipe } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { CreateEmpleadoDto, UpdateEmpleadoDto } from '@ukiyo/common';

@Controller('empleados')
export class EmpleadosController {

    constructor(@Inject('CLIENTES_SERVICE') private readonly client: ClientProxy) {}

    @Post()
    create(@Body() createEmpleadoDto: CreateEmpleadoDto) {
        return this.client.send({ cmd: 'create_empleado' }, createEmpleadoDto).pipe(
        catchError(error => { throw new RpcException(error); })
        );
    }

    @Get()
    findAll() {
        return this.client.send({ cmd: 'find_all_empleados' }, {}).pipe(
        catchError(error => { throw new RpcException(error); })
        );
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.client.send({ cmd: 'find_one_empleado' }, { id }).pipe(
        catchError(error => { throw new RpcException(error); })
        );
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number, 
        @Body() updateEmpleadoDto: UpdateEmpleadoDto
    ) {
        return this.client.send({ cmd: 'update_empleado' }, { id, ...updateEmpleadoDto }).pipe(
        catchError(error => { throw new RpcException(error); })
        );
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.client.send({ cmd: 'remove_empleado' }, { id }).pipe(
        catchError(error => { throw new RpcException(error); })
        );
    }
}