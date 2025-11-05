// ***ORM --> Mapeo Objeto-Relacional***
// Realizar automaticamente el create table usuario {id....}

import { AfterInsert, BeforeInsert, Column, CreateDateColumn, Entity, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Address } from "src/common/entities/address";
import { Usuario } from "src/modulos/usuarios/entities/usuario.entity";

@Entity('clientes') //nombre de la tabla en la base de datos 
export class clientes {  
    @PrimaryColumn()
    nif: string; 

    @Column({nullable: true, length: 30})
    nombre: string;

    @Column({nullable: true, length: 30})
    apellidos: string;

    @Column('int', {default: 18})
    edad: number;
    @Column({nullable:false, unique: true})
    email: string;

    @Column()
    comision: number;

    @Column(() => Address, { prefix: '' }) address: Address;

    // 1 cliente ---> 1 usuario
    //Relacion inversa
    @OneToOne(
        () => Usuario,
        (usuario) => usuario.cliente
    )
    usuario: Usuario

}