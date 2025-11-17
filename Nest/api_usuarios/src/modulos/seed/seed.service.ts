import { Injectable } from '@nestjs/common';
import { CreateSeedDto } from './dto/create-seed.dto';
import { UpdateSeedDto } from './dto/update-seed.dto';
import * as seedClientes from './data/clientes.json';
import * as seedUsuarios from './data/usuarios.json'
import { ClientesService } from '../clientes/clientes.service';
import { UsuariosService } from '../usuarios/usuarios.service';
import { IUser } from '../usuarios/interfaces/IUsuario';


@Injectable()
export class SeedService {
  constructor(
    // en seedService inyectar el servicio de clientes
    private readonly clientesService: ClientesService,
    private readonly usuarioService: UsuariosService
  ){}
  
  async loadData(){
    console.log ('Cargando datos de prueba...');
    await this.clientesService.deleteAllclientes();
    await this.usuarioService.deleteAllUsuarios();
    await this.insertNewClientes();
    await this.insertNewUsuarios();
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
  
  private async insertNewUsuarios(){
    // array para guardar las promesas de insercion
    // para que no de error y que este como lo del profesor ponemos Promise<any>[]
    const insertPromisesUsuarios: Promise<any>[] = []
    // recorre el array seesClientes para su inserccion uno a uno  en la bd 
    // para solucionar el error de aqui debemos cambiar lo que tiene el profesor por esta linea 
    seedUsuarios.forEach((usuario: any) =>{
    //seedUsuarios.forEach( ( usuario: IUser) => {  
      // se manda de forma ipsoFacta(1s) las 20 inserciones a la bd
      insertPromisesUsuarios.push(this.usuarioService.new(usuario))
      console.log(usuario.username);  
    })
    const results = await Promise.all(insertPromisesUsuarios);
    return true
  }
}
