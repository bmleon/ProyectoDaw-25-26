import { Injectable } from '@nestjs/common';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { IRespUser, IUser } from './interfaces/IUsuario';

type Data = { users: IUser[] }
@Injectable()
export class UsuariosService {
  private db: Low<Data>;
  constructor(){
    const adaptador = new JSONFile<Data>('common/db/db.json');
    this.db = new Low<Data>(adaptador, { users: [] } );
  }

  async findOne(id: number): Promise<IUser>{
    console.log(id)
    const data = await this.db.read();//se bloquea
 //   const usuario = this.db.data.users.find(usuario => usuario.id === parseInt(id));
   // console.log(usuario)
    return null;
  }
  async findAll():Promise<IUser[]>{
    await this.db.read();//se bloquea
    return this.db.data.users;
  }

  async new(usuario: IUser):Promise<IRespUser>{
    console.log(usuario)
    await this.db.read();// cargo la base de datos
    this.db.data.users.push(usuario); //inserta en el array users
    await this.db.write(); //escribe en el fichero
    return {
      status: true,
      code: 200,
      msg: 'Usuario creado',
      data: usuario
    }
  }
}