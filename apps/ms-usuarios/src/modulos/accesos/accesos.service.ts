import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateAccesoDto } from '@ukiyo/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class AccesosService {
    private readonly logger = new Logger('AccesosService');

    constructor(private readonly prisma: PrismaService) {}

    create(createAccesoDto: CreateAccesoDto) {
      return this.prisma.acceso.create({
        data: createAccesoDto,
      });
    }

    findAll() {
      return this.prisma.acceso.findMany({
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
      return this.prisma.acceso.findUnique({
        where: { id },
        include: { user: true },
      });
    }
}