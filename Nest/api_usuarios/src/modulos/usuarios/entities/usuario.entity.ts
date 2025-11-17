// ***ORM --> Mapeo Objeto-Relacional***
// Realizar automaticamente el create table usuario {id....}

import { AfterInsert, BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AddressDto } from "src/common/modelo/dto/addres.dto";
import { clientes } from "src/modulos/clientes/entities/clientes.entity";
// Logica de negocio de la entidad usuario

@Entity('usuario') //nombre de la tabla en la base de datos 
export class Usuario {  
    @PrimaryColumn()
    nif: string;

    @Column('uuid')
    id?: string;

    @Column({nullable: true, length: 30})
    username: string;
    @Column('int', {default: 18})
    edad: number;
    @Column({nullable:false, unique: true})
    email: string;

    @Column()
    rol: string;

    @Column(() => AddressDto, { prefix: 'direccion' }) 
    direccion: AddressDto;

    @OneToOne(
        () => clientes,
        (cliente) => cliente.usuario, {cascade: true}
    )
    @JoinColumn({
        name: 'cliente',
        foreignKeyConstraintName: 'fk_cliente_en_usuario'
    }) // genera la Fkey
    cliente: clientes | null;
    
    /* ***** MECANISMOS DE SEGUIRDAD****** */
    // monitorizar y auditar los registros de ususario y una tabla de accesos
    //--> login/logout/change profile
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updateAt: Date;
    //DeleteAtdate
    //deletedAt: Date;
    
    // podemos tener before/After-insert/update/remove

    @BeforeInsert()
    checkusername(){
        // jsanmar345
        this.username =
            this.cliente?.nombre + '.' +
            this.cliente?.apellidos + '.' +
            this.cliente?.edad
    }
    @BeforeInsert()
    generarCredenciales(){
        
        if (!this.cliente || !this.cliente.nombre || !this.cliente.apellidos || !this.cliente.nif) {
            console.error("ERROR @BeforeInsert: No se pueden generar credenciales. Faltan datos del Cliente (nombre, apellidos, nif).");
            return; 
        }

        try {
            const apellidosArray = this.cliente.apellidos.trim().split(' ');
            const primerApellido = (apellidosArray[0] || '').toLowerCase();
            const segundoApellido = (apellidosArray[1] || '').toLowerCase();
            const inicialNombre = this.cliente.nombre.charAt(0).toLowerCase();
            const partPrimerApellido = primerApellido.slice(0, 3);
            const partSegundoApellido = segundoApellido.slice(0, 3);
            const nifNumeros = this.cliente.nif.slice(0, -1);
            const partNif = nifNumeros.slice(-3);

            if (!inicialNombre || !partPrimerApellido || partNif.length < 3) {
                console.warn("No se pudo auto-generar credenciales: los datos del cliente son muy cortos.");
                return;
            }

            const baseString = '${inicialNombre}${partPrimerApellido}${partSegundoApellido}${partNif}';

            this.username = baseString;
            this.email = '${baseString}@g.educaand.es';

            console.log(`Credenciales auto-generadas: username='${this.username}', email='${this.email}'`);

        } catch (error) {
            console.error("Error fatal al generar credenciales en @BeforeInsert:", error);
        }
    }
}