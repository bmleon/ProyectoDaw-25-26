import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { ClientesModule } from '../clientes/clientes.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [ClientesModule]
})
export class SeedModule {}
