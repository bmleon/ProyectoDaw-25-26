import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EmpleadosService } from './empleados.service';
import { CreateEmpleadoDto, UpdateEmpleadoDto } from '@ukiyo/common';
@Controller()
export class EmpleadosController {
    constructor(private readonly empleadosService: EmpleadosService) {}

    @MessagePattern({ cmd: 'create_empleado' })
    create(@Payload() createEmpleadoDto: CreateEmpleadoDto) {
        return this.empleadosService.create(createEmpleadoDto);
    }

    @MessagePattern({ cmd: 'find_all_empleados' })
    findAll() {
        return this.empleadosService.findAll();
    }

    @MessagePattern({ cmd: 'find_one_empleado' })
    findOne(@Payload() payload: { id: number }) {
        return this.empleadosService.findOne(payload.id);
    }

    @MessagePattern({ cmd: 'update_empleado' })
    update(@Payload() payload: any) {
        const { id, ...updateEmpleadoDto } = payload;
        return this.empleadosService.update(id, updateEmpleadoDto);
    }

    @MessagePattern({ cmd: 'remove_empleado' })
    remove(@Payload() payload: { id: number }) {
        return this.empleadosService.remove(payload.id);
    }
}