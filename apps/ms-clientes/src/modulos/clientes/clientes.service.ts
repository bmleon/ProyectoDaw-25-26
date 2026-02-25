import { Injectable, Logger, OnModuleInit, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateClienteDto, UpdateClienteDto } from '../../../../../libs/common/src';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ClientesService implements OnModuleInit {
    private readonly logger = new Logger(ClientesService.name);

    constructor(
        private readonly prisma: PrismaService, // Inyectamos Prisma
    ) {}

    async onModuleInit() {
        this.logger.log('MS-Clientes conectado a BD con Prisma');
    }

    async create(createDto: CreateClienteDto) {
        this.logger.log(`Creando cliente: ${createDto.email}`);
        try {
        return await this.prisma.cliente.create({
            data: createDto,
        });
        } catch (error) {
        throw new RpcException(error instanceof Error ? error.message : String(error));
        }
    }

    async findAll() {
        return await this.prisma.cliente.findMany();
    }

    async findOne(id: string) {
        const cliente = await this.prisma.cliente.findUnique({
        where: { id },
        });
        if (!cliente) {
            throw new RpcException({ status: 404, message: `Cliente ${id} no encontrado` });
        }
        return cliente;
    }

    async update(id: string, updateDto: UpdateClienteDto) {
    const { id: __, ...data } = updateDto;

    return await this.prisma.cliente.update({
            where: { id },
            data: data,
        });
    }

    async remove(id: string) {
        return await this.prisma.cliente.delete({
        where: { id },
        });
    }
}