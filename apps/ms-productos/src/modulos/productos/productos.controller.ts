import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from '@ukiyo/common';
import { UpdateProductoDto } from '@ukiyo/common';

@Controller()
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @MessagePattern({ cmd: 'create_producto' })
  create(@Payload() createProductoDto: CreateProductoDto) {
    return this.productosService.create(createProductoDto);
  }

  @MessagePattern({ cmd: 'get_all_productos' })
  findAll() {
    return this.productosService.findAll();
  }

  @MessagePattern({ cmd: 'get_producto' })
  findOne(@Payload() id: string) {
    return this.productosService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_producto' })
  update(@Payload() payload: { id: string; data: UpdateProductoDto }) {
    return this.productosService.update(payload.id, payload.data);
  }
  @MessagePattern({ cmd: 'delete_producto' })
  remove(@Payload() id: string) {
    return this.productosService.remove(id);
  }
}
