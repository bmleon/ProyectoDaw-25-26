import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '@ukiyo/common';
import { CreateProductoDto, UpdateProductoDto } from '@ukiyo/common'; 

@Injectable()
export class ProductosService {
  private readonly logger = new Logger(ProductosService.name);

  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async create(createDto: CreateProductoDto) {
    this.logger.log(`Creando producto: ${createDto.nombre}`);
    const producto = this.productRepo.create(createDto);
    return await this.productRepo.save(producto);
  }

  async findAll() {
    return await this.productRepo.find();
  }

  async findOne(id: string) {
    return await this.productRepo.findOneBy({ id });
  }

  async update(id: string, updateProductoDto: UpdateProductoDto) {
    const { id: __, ...dataToUpdate } = updateProductoDto;
    await this.productRepo.update(id, dataToUpdate);
    return this.findOne(id);
}

  async remove(id: string) {
    const producto = await this.findOne(id);
    if (producto) {
      await this.productRepo.delete(id);
    }
    return producto;
  }

}