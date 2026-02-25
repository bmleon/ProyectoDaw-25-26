import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: 'cliente' })
  rol: string;

  @Column({ name: 'es_empleado', default: false })
  esEmpleado: boolean;

  @Column({ name: 'cliente_id', type: 'uuid', nullable: true })
  clienteId: string;
}