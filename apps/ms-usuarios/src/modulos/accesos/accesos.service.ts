import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateAccesoDto } from '@ukiyo/common';

@Injectable()
export class AccesosService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('AccesosService');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Conectado a la BD para Accesos');
  }

  create(createAccesoDto: CreateAccesoDto) {
    return this.acceso.create({
      data: createAccesoDto,
    });
  }

  findAll() {
    return this.acceso.findMany({
      include: {
        user: {
          select: { email: true, username: true } 
        }
      },
      orderBy: {
        fechaHora: 'desc'
      }
    });
  }

  findOne(id: number) {
    return this.acceso.findUnique({
      where: { id },
      include: { user: true },
    });
  }
}