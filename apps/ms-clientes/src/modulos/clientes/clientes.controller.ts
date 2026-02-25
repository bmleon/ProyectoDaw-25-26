import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ClientesService } from './clientes.service';
import { CreateClienteDto, UpdateClienteDto } from '../../../../../libs/common/src';

@Controller()
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @MessagePattern({ cmd: 'create_cliente' })
  create(@Payload() data: CreateClienteDto) {
    return this.clientesService.create(data);
  }

  @MessagePattern({ cmd: 'get_all_clientes' })
  findAll() {
    return this.clientesService.findAll();
  }

  @MessagePattern({ cmd: 'get_cliente' })
  findOne(@Payload() id: string) {
    return this.clientesService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_cliente' })
  update(@Payload() payload: { id: string; data: UpdateClienteDto }) {
    return this.clientesService.update(payload.id, payload.data);
  }

  @MessagePattern({ cmd: 'delete_cliente' })
  remove(@Payload() id: string) {
    return this.clientesService.remove(id);
  }
}