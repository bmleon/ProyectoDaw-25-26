// ***ORM --> Mapeo Objeto-Relacional***
// Realizar automaticamente el create table usuario {id....}

import { AfterInsert, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

// Logica de negocio de la entidad usuario
@Entity('usuario') //nombre de la tabla en la base de datos 
export class Usuario {  
    @PrimaryColumn()
    nif: string;

    @Column('uuid')
    id: string;

    @Column({nullable: true, length: 30})
    name: string;
    @Column('int', {default: 18})
    edad: number;
    @Column({nullable:false, unique: true})
    email: string;

    @Column()
    rol: string;
    
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updateAt: Date;
    //DeleteAtdate
    //deletedAt: Date;
    
    // podemos tener before/After-insert/update/remove
    
    @BeforeInsert() // evento disparador
    checkName(){ // metodo manejardor del evento
        console.log('Antes de insertar el usuario en la BD')
        if (!this.name){
            this.name = 'invitado';
        }
        this.name = this.name
                    .replaceAll(' ', '_')
                    .toUpperCase();
        
    }
    @BeforeInsert()
    checkNif(){
        console.log('Antes de insertar el nif en la bd')
        if (!this.nif.includes ('-')){
            const letra = this.nif.slice(-1);
            const numeros = this.nif.slice(0, -1);
            this.nif = `${numeros}-{letra}`;
        }    
    }
}