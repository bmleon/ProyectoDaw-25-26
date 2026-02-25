import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { PrismaModule } from '../../../prisma/prisma.module';
import { AccesosModule } from '../accesos/accesos.module';

@Module({
  imports: [PrismaModule, AccesosModule],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {}