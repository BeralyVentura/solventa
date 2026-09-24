import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Suscripcion } from '../../suscripcion/entities/suscripcion.entity';

export enum EstadoPoliza {
  PENDIENTE = 'pendiente',
  EMITIDA = 'emitida',
  RENOVADA = 'renovada',
  CANCELADA = 'cancelada',
}

@Entity('polizas')
export class Poliza {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'enum', enum: EstadoPoliza, default: EstadoPoliza.PENDIENTE })
  estado!: EstadoPoliza;

  @Column({ type: 'uuid' })
  clienteId!: string; 

  @Column({ type: 'uuid' })
  cotizacionId!: string; 

  @Column({ type: 'uuid' })
  productoId!: string;

  @OneToOne(() => Suscripcion, (s) => s.poliza, { cascade: true })
  @JoinColumn()
  suscripcion!: Suscripcion;

}