import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { Product } from '@ukiyo/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]), 
  ],
  controllers: [ProductosController],
  providers: [ProductosService],
})
export class ProductosModule {}