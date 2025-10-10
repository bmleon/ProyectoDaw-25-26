import { BadRequestException, Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
//import type { IUsers } from './interfaces/IUsuario';
import { CreateUserDto } from './dto/create-user.dto';
import { identity } from 'rxjs';
import { version } from 'os';

@Controller('usuarios')
export class UsuariosController {
  // inyectar el servicio UsuariosService en UsuariosController
  // solo se inyectan clases con el decorador @Injectable
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get() /*Endpoint raiz */
  getHome(){
    return 'Home de la sección  usuarios'
  }

  // Devuelve todos los productos --> en la bd sera un Select * from ...
  @Get('all')
  getAll(){
    return this.usuariosService.findAll();
  }

  // Se le pasa el SId por Get y se devielve ese objeto
  // En la base de datos sera un Select * from productos where sid = productos.id
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({version: '4'})) id: number){
    console.log('id');
    return this.usuariosService.findOne(id);

  }

  //Métodos ENDPOINT --> DECORADOR get, post, put, delete...
  @Post('new') /* endponit raiz */
  add(@Body() usuarioDTO: CreateUserDto){
    
    console.log('Usuario recibido', usuarioDTO);
    return this.usuariosService.new(usuarioDTO);
  }


  // metodo interno para borrar usuarios..No es un Endpoint
  delete(){
    return 'borrado de usuarios'
  }
}
/*
// variables bandera
    let esNumber : Boolean = true; //supongo que no es un número
    let esMayor18 : Boolean = true; // supongo que no es mayor de 18
    let msgerror: string[] = []; // Lo ponemos asi para inicializarlo 
    // extraer los datos manualmente de los datos (Request)--> Caso express...
    // debemos de validarlo --> email este ok
    // usuario = peticion.body;
    // extraer los datos del body(Post) o paramentros(Get) de la resquest
    console.log (usuario.email, usuario.edad)
    // mi controlador debe de validar los datos: edad > 18 y email correcto
    if (typeof usuario.edad !== "number"){
      esNumber = false;
      msgerror.push('La edad debe ser un número. ');
    }
    if (usuario.edad < 18){
      esMayor18 = false;
      msgerror.push('y la edad debe ser mayor de 18 años. ');
    }
    if (!esNumber || !esMayor18){
      throw new BadRequestException({
        success: false,
        msg: msgerror
      })
    }
    console.log('Usuario recibido', usuario);
    //return this.usuariosService.new(usuario);
*/