import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './modulos/usuarios/usuarios.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SeedModule } from './modulos/seed/seed.module';

@Module({
  imports: [UsuariosModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USERNAME,
      port: 5432,  
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    SeedModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor( private readonly configService: ConfigService ) {}
}
