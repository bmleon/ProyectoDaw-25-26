import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [UsuariosModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '38.242.240.106',
      port: 5432,
      database: 'bdusuarios',
      username: 'admin',
      password: 'admin',
      autoLoadEntities: true,
      synchronize: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
