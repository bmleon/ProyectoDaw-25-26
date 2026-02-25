import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ name: 'password' })
  password: string;
  
  // Referencia al ID del cliente en la BD_Clientes (sin relación TypeORM)
  @Column({ name: 'cliente_id', type: 'uuid', nullable: true })
  clienteId: string | null; 

  // ESTO LO HE PUESTO SOLAMENTE PARA QUE NO HAYA CONFLICTO CON LOS DEMÁS ENTITIES
  
  // Relación con Empleado
  empleado: any;

  // Relación con Perfil
  perfil: any;
}