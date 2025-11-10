import { Injectable } from '@nestjs/common';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { IRespUser, IUser } from './interfaces/IUsuario';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientesService } from '../clientes/clientes.service';
import { clientes } from '../clientes/entities/clientes.entity';

type Data = { users: IUser[] }
@Injectable()
export class UsuariosService {
  //private db: Low<Data>;
  // Inyectar el repositorio usuarios en el servicio UsuariosService
  
  constructor(
    @InjectRepository(Usuario) 
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly clientesService: ClientesService
  ) {
    // const adaptador = new JSONFile<Data>('common/db/db.json');
    // this.db = new Low<Data>(adaptador, { users: [] } );
  }
  
async findOne(id: number): Promise<IUser | null>{
  console.log(id)
  //await this.db.read();//se bloquea
  //const usuario = this.db.data?.users.find(usuario => usuario.id === id) ?? null;
  // console.log(usuario)
  return null;
}
  async findAll(){
    //await this.db.read();//se bloquea
    //return this.db.data.users;
  }

  async new(usuarioDTO: IUser):Promise<IRespUser>{

    if (usuarioDTO.nif){
      console.log("Buscar cliente existe");
      const cliente = await this.clientesService.findOne(usuarioDTO.nif)
      //transforma el objeto DTO/IFaz ---> obj Entity
      const usuarioEntity = this.usuarioRepository.create(usuarioDTO);
      //Prepara FK, u.cliente = puntero (direccion de memoria del ob cliente)
      //no hace copia del obje cliente
      usuarioEntity.cliente = cliente; //direccion de memoria
      console.log(cliente, usuarioEntity)
      await this.usuarioRepository.save(usuarioEntity)
    } else {
      const usuarioEntity = this.usuarioRepository.create(usuarioDTO);
      //insert into Uusario (nif, nombre)...
      await this.usuarioRepository.save(usuarioEntity) //insert --> bd
    
    }
     
    return {
      status: true,
      code: 200,
      msg: 'Usuario creado'
      // data: usuarioEntity
    }
  }
}