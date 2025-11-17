import { Injectable } from '@nestjs/common';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { IRespUser, IUser } from './interfaces/IUsuario';
import { Usuario } from './entities/usuario.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
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
    private readonly clientesService: ClientesService,
    @InjectDataSource()
    private dataSource: DataSource //obj q contiene todo el esquema de la BD
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
  
  async deleteAllUsuarios(){
    console.log('Borrar usuarios')
    const query = this.usuarioRepository.createQueryBuilder('usuario');
    try{
      return await query
          .delete()
          .where({})
          .execute()
    }catch(error){

    }
  }
  async checkCascade(){ //Entidad - relacion - tipo (i/d/u)
      //extrayendo en mtdata todo el esquema de la Entidad/Tabla Usuario
      const metadata = this.dataSource.getMetadata(Usuario);
      //console.log (metadata);
      const relacion = metadata.relations.find(
        (relacion) => relacion.propertyName == "cliente"
      );
      //console.log(relacion)
      // --- ¡¡AQUÍ ESTÁ LA SOLUCIÓN!! ---
      // Si 'relacion' es undefined (no se encontró), 
      // devolvemos un objeto seguro con cascade: false.
      if (!relacion) {
        console.warn("Advertencia: No se encontró la relación 'cliente' en Usuario.");
        return {
          entidad: metadata.name,
          propiedad: "cliente",
          tipoRelacion: "desconocido",
          cascade: false 
        };
      }
      // --- FIN DE LA SOLUCIÓN ---
      // Si el código llega aquí, TypeScript sabe que 'relacion' SÍ existe
      // y ya no da error en las líneas siguientes.
      const chcascade = relacion.isCascadeInsert || relacion.isCascadeUpdate;
      return {
        entidad: metadata.name,
        propiedad: relacion.propertyName,
        tipoRelacion: relacion.relationType,
        cascade: chcascade
      };
    }
  /* ASI ES COMO LO TIENE EL PROFESOR PERO A MI ME DA ERROR 
  async checkCascade(){ //Entidad - relacion - tipo (i/d/u)
      //extrayendo en mtdata todo el esquema de la Entidad/Tabla Usuario
      const metadata = this.dataSource.getMetadata(Usuario);
      //console.log (metadata);
      const relacion = metadata.relations.find(
        (relacion) => relacion.propertyName == "cliente"
      );
      //console.log(relacion)
      const chcascade = relacion.isCascadeInsert || relacion.isCascadeUpdate;
      return {
        entidad: metadata.name,
        propiedad: relacion.propertyName,
        tipoRelacion: relacion.relationType,
        cascade: chcascade
      }
    }*/
}