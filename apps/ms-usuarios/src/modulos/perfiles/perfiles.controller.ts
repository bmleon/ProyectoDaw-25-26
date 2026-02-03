import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PerfilesService } from './perfiles.service';
import { CreatePerfilDto, UpdatePerfilDto } from '@ukiyo/common';

@Controller()
export class PerfilesController {
  constructor(private readonly perfilesService: PerfilesService) {}

  @MessagePattern({ cmd: 'create_perfil' })
  create(@Payload() createPerfilDto: CreatePerfilDto) {
    return this.perfilesService.create(createPerfilDto);
  }

  @MessagePattern({ cmd: 'find_all_perfiles' })
  findAll() {
    return this.perfilesService.findAll();
  }

  @MessagePattern({ cmd: 'find_perfil_by_user' })
  findByUser(@Payload() userId: string) {
    return this.perfilesService.findByUserId(userId);
  }

  @MessagePattern({ cmd: 'update_perfil' })
  update(@Payload() data: UpdatePerfilDto & { id: string }) {
    const { id, ...updatePerfilDto } = data;
    return this.perfilesService.update(id, updatePerfilDto as any);
  }

  @MessagePattern({ cmd: 'delete_perfil' })
  remove(@Payload() id: string) {
    return this.perfilesService.remove(id);
  }
}