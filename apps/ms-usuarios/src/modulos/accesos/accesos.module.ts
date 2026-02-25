import { Module } from '@nestjs/common';
import { AccesosService } from './accesos.service';
import { AccesosController } from './accesos.controller';
import { PrismaModule } from '../../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AccesosController],
  providers: [AccesosService],
  exports: [AccesosService],
})
export class AccesosModule {}