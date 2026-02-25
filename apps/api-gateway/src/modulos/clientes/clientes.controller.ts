import { Controller, Get, Post, Body, Patch, Delete, Param } from '@nestjs/common';
import { ClientesService } from './clientes.service';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  create(@Body() createClienteDto: any) {
    return this.clientesService.create(createClienteDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientesService.findOne(id);
  }

  @Get()
  findAll() {
    return this.clientesService.findAll();
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClienteDto: any) {
    return this.clientesService.update(id, updateClienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientesService.remove(id);
  }

}