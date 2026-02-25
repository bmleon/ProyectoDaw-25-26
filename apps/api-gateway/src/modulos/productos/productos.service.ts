import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { PRODUCTOS_SERVICE } from '../../../config';

@Injectable()
export class ProductosService {
    constructor(
        @Inject(PRODUCTOS_SERVICE) private readonly productosClient: ClientProxy,
    ) {}

    async create(createProductoDto: any) {
        return this.productosClient.send({ cmd: 'create_producto' }, createProductoDto);
    }

    async findAll() {
        return await lastValueFrom(
        this.productosClient.send({ cmd: 'get_all_productos' }, {})
        );
    }

    async findOne(id: string) {
        return await lastValueFrom(
        this.productosClient.send({ cmd: 'get_producto' }, id)
        );
    }
    
    async update(id: string, updateProductoDto: any) {
        return await lastValueFrom( this.productosClient.send( { cmd: 'update_producto' },
            { 
                id, 
                data: updateProductoDto
            }
        ));
    }

    async remove(id: string) {
        return await lastValueFrom(
        this.productosClient.send({ cmd: 'delete_producto' }, id)
        );
    }

}