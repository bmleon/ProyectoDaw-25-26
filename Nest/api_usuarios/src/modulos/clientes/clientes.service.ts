import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { clientes } from './entities/clientes.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ICliente } from 'src/common/interfaces/address';
import { Code } from 'typeorm/browser';

@Injectable()
export class ClientesService {
    // servicio --> Repositorio (inyectar repositorio)
    // repositorio --> SGBD (base de datos)
    constructor(
        @InjectRepository(clientes)
        private readonly clientesRepository: Repository<clientes>
    ){
        // Codigo constructor 
    }

    async new(cliente: ICliente){ // Cliente: DTO/Ifaz
        //transformar el objeto cliente DTO/Ifaz en una entidad cliente (Entity<Cliente>)
        const cliente_data = this.clientesRepository.create(cliente);
        await this.clientesRepository.save(cliente_data);
        return{
            status: true,
            Code: 200,
            msg: 'Cliente creado',
            data: cliente
        }
    }
}