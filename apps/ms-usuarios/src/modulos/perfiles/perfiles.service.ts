import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma-client/ms-usuarios';
import { CreatePerfilDto, UpdatePerfilDto } from '@ukiyo/common';

@Injectable()
export class PerfilesService extends PrismaClient implements OnModuleInit {
    private readonly logger = new Logger('PerfilesService');

    async onModuleInit() {
        await this.$connect();
    }

    // 1. Crear Perfil
    async create(createPerfilDto: CreatePerfilDto) {
        try {
        return await this.perfil.create({
            data: createPerfilDto,
        });
        } catch (error) {
        this.logger.error(error);
        throw new Error('Error al crear el perfil: ' + error.message);
        }
    }

    // 2. Buscar Todos
    async findAll() {
        return this.perfil.findMany({
        include: { user: true }
        });
    }

    // 3. Buscar por ID de Usuario
    async findByUserId(userId: string) {
        const perfil = await this.perfil.findUnique({
        where: { userId: userId }, 
        });

        if (!perfil) {
        throw new NotFoundException(`Perfil para el usuario ${userId} no encontrado`);
        }

        return perfil;
    }

    // 4. Actualizar
    async update(id: string, updatePerfilDto: UpdatePerfilDto) {
        const idNumero = Number(id);
        const { userId, ...dataToUpdate } = updatePerfilDto;

        const exists = await this.perfil.findUnique({ where: { id: idNumero } });
        if (!exists) {
            throw new NotFoundException(`Perfil con ID ${id} no encontrado`);
        }

        return this.perfil.update({
        where: { id: idNumero },
        data: dataToUpdate,
        });
    }

    // 5. Borrar
    async remove(id: string) {
        const idNumero = Number(id);

        const exists = await this.perfil.findUnique({ where: { id: idNumero } });
        if (!exists) {
            throw new NotFoundException(`Perfil con ID ${id} no encontrado`);
        }

        return this.perfil.delete({
        where: { id: idNumero },
        });
    }
}