import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { USUARIOS_SERVICE } from '../../../config';

@Injectable()
export class UsuariosService {
  constructor(
    @Inject(USUARIOS_SERVICE) private readonly usuariosClient: ClientProxy,
  ) {}

  async create(createUsuarioDto: any) {
    return this.usuariosClient.send({ cmd: 'create_usuario' }, createUsuarioDto);
  }

  async findAll() {
    return await lastValueFrom(
      this.usuariosClient.send({ cmd: 'get_all_usuarios' }, {})
    );
  }

  async findOne(id: string) {
    return await lastValueFrom(
      this.usuariosClient.send({ cmd: 'get_usuario' }, id)
    );
  }

  async update(id: string, updateUsuarioDto: any) {
    return this.usuariosClient.send({ cmd: 'update_usuario' }, { id, ...updateUsuarioDto });
  }

  async remove(id: string) {
    return this.usuariosClient.send({ cmd: 'delete_usuario' }, id);
  }
}