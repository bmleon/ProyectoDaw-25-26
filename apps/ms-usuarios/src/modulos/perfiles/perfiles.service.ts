import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreatePerfilDto, UpdatePerfilDto } from '@ukiyo/common';

@Injectable()
    export class PerfilesService {
        private readonly logger = new Logger('PerfilesService');

constructor(private readonly prisma: PrismaService) {}

    async create(createPerfilDto: CreatePerfilDto) {
        try {
        return await this.prisma.perfil.create({
            data: createPerfilDto,
        });
        } catch (error) {
        this.logger.error(error);
        throw new Error('Error al crear el perfil: ' + error.message);
        }
    }

    async findAll() {
        return this.prisma.perfil.findMany();
    }

    async findByUserId(userId: string) {
        const perfil = await this.prisma.perfil.findUnique({
        where: { userId: userId },
        });

        if (!perfil) {
        throw new NotFoundException(`Perfil para el usuario ${userId} no encontrado`);
        }
        return perfil;
    }

    async update(id: string, updatePerfilDto: UpdatePerfilDto) {
        const idNumero = Number(id);
        
        const { userId, ...dataToUpdate } = updatePerfilDto;
        const exists = await this.prisma.perfil.findUnique({ where: { id: idNumero } });
        if (!exists) throw new NotFoundException(`Perfil ${id} no encontrado`);

        return this.prisma.perfil.update({
        where: { id: idNumero },
        data: dataToUpdate,
        });
    }

    async remove(id: string) {
        const idNumero = Number(id);

        const exists = await this.prisma.perfil.findUnique({ where: { id: idNumero } });
        if (!exists) throw new NotFoundException(`Perfil ${id} no encontrado`);

        return this.prisma.perfil.delete({
        where: { id: idNumero },
        });
    }
}