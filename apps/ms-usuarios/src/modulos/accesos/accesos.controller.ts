import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AccesosService } from './accesos.service';
import { CreateAccesoDto } from '@ukiyo/common';

@Controller()
export class AccesosController {
  constructor(private readonly accesosService: AccesosService) {}

  @MessagePattern({ cmd: 'create_acceso' })
  create(@Payload() createAccesoDto: CreateAccesoDto) {
    return this.accesosService.create(createAccesoDto);
  }

  @MessagePattern({ cmd: 'find_all_accesos' })
  findAll() {
    return this.accesosService.findAll();
  }

  @MessagePattern({ cmd: 'find_one_acceso' })
  findOne(@Payload() payload: { id: number }) {
    return this.accesosService.findOne(payload.id);
  }
}