import { Injectable } from '@nestjs/common';
import { CreateSeedDto } from './dto/create-seed.dto';
import { UpdateSeedDto } from './dto/update-seed.dto';
import * as seedClientes from './data/clientes.json';
import { ClientesService } from '../clientes/clientes.service';


@Injectable()
export class SeedService {
  constructor(
    // en seedService inyectar el servicio de clientes
    private readonly clientesService: ClientesService
  ){}
  
  loadData(){
    console.log ('Cargando datos de prueba');
    return { 
      message: 'Data loaded successfully',
      data: seedClientes 
    };
  }
  private async insertNewClientes() {
        //array para guardar las promesas de inserccion
        // mirar porque esto asi no da error y antes si daba 
        const insertPromisesClientes: Promise<any>[] = [];               
        //recorrer el array seedClientes para su inserccion uno a uno en la BD
        seedClientes.forEach( (cliente: any) => {
            //se manda de forma ipsoFacta(1s) las 20 insercciones a la BD
            insertPromisesClientes.push(this.clientesService.new(cliente))
            console.log(cliente.apellidos);
        })
        const results = await Promise.all(insertPromisesClientes);
        return true
    } 
}
