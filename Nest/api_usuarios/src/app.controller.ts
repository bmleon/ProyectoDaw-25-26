import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  //Inyectar el servicio AppService en AppController
  //solo se inyectan clases con el decorador @Injectable
  constructor(private readonly appService: AppService) {}

  @Get("/") /*Endpoint raiz*/
  getHello(): string {
    /*return this.appService.getHello();*/
    return "API usuarios funcionando";
  }
  
}
