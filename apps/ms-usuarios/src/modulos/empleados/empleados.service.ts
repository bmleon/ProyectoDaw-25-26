import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateEmpleadoDto, UpdateEmpleadoDto } from '@ukiyo/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class EmpleadosService {
    private readonly logger = new Logger('EmpleadosService');

    constructor(private readonly prisma: PrismaService) {}

    async create(createEmpleadoDto: CreateEmpleadoDto) {
        try {
        return await this.prisma.empleado.create({
            data: createEmpleadoDto,
        });
        } catch (error) {
        this.logger.error(error);

        throw new Error(`Error creando empleado: ${error.message}`);
        }
    }

    async findAll() {
        return await this.prisma.empleado.findMany();
    }

    async findOne(id: number) {
        const empleado = await this.prisma.empleado.findUnique({
        where: { id },
        });
        if (!empleado) {
        throw new NotFoundException(`Empleado #${id} no encontrado`);
        }
        return empleado;
    }

    async update(id: number, updateEmpleadoDto: UpdateEmpleadoDto) {
        await this.findOne(id);

        const { id: idEnDto, ...dataToUpdate } = updateEmpleadoDto as any;

        return await this.prisma.empleado.update({
        where: { id },
        data: dataToUpdate,
        });
    }

    async remove(id: number) {
        await this.findOne(id);
        return await this.prisma.empleado.delete({
        where: { id },
        });
    }
}