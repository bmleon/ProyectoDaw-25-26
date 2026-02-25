import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { envs } from '../config';
import { ProductosModule } from './modulos/productos/productos.module';
import { Product } from '@ukiyo/common';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.db.host,
      port: envs.db.port,
      username: envs.db.username,
      password: envs.db.password,
      database: envs.db.name,
      entities: [Product],
      synchronize: true, 
      autoLoadEntities: true,
    }),

    ProductosModule,
  ],
})
export class AppModule {}