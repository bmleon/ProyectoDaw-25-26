import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('Usuario')
export class Usuario {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column({ name: 'password_hash' })
    passwordHash: string;

    @Column({ default: 'cliente' })
    rol: string;

    @Column({ name: 'es_empleado', default: false })
    esEmpleado: boolean;

    // Logical reference to the Client ID (from ms-clientes)
    @Column({ name: 'cliente_id', type: 'uuid', nullable: true })
    clienteId: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}