import { Module } from '@nestjs/common';
import { ClientesModule } from './modulos/clientes/clientes.module';
import { ConfigModule } from '@nestjs/config';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientesModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}