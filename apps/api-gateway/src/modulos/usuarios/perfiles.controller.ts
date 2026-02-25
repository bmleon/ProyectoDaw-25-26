import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { USUARIOS_SERVICE } from '../../../config';
import { CreatePerfilDto, UpdatePerfilDto } from '@ukiyo/common';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('perfiles')
@UseGuards(AuthGuard)
export class PerfilesController {
    constructor(
        @Inject(USUARIOS_SERVICE) private readonly client: ClientProxy,
    ) {}

    @Post()
    create(@Body() createPerfilDto: CreatePerfilDto) {
        return this.client.send({ cmd: 'create_perfil' }, createPerfilDto).pipe(
        catchError((error) => { throw new RpcException(error); }),
        );
    }

    @Get(':userId')
    findByUser(@Param('userId') userId: string) {
        return this.client.send({ cmd: 'find_perfil_by_user' }, userId).pipe(
        catchError((error) => { throw new RpcException(error); }),
        );
    }

    @Get()
    findAll() {
        return this.client.send({ cmd: 'find_all_perfiles' }, {}).pipe(
        catchError((error) => { throw new RpcException(error); }),
        );
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePerfilDto: UpdatePerfilDto) {
        return this.client.send({ cmd: 'update_perfil' }, { id, ...updatePerfilDto }).pipe(
        catchError((error) => { throw new RpcException(error); }),
        );
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.client.send({ cmd: 'delete_perfil' }, id).pipe(
        catchError((error) => { throw new RpcException(error); }),
        );
    }
}