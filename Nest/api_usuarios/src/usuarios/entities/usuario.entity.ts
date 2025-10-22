// ***ORM --> Mapeo Objeto-Relacional***
// Realizar automaticamente el create table usuario {id....}

import { Column, Entity, PrimaryColumn } from "typeorm";

// Logica de negocio de la entidad usuario
@Entity('usuario') //nombre de la tabla en la base de datos 
export class Usuario {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;
    @Column()
    edad: number;
    @Column()
    email: string;
    @Column()
    nif: string;
    @Column()
    rol: string;
}