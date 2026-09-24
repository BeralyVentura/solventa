import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Poliza } from '../../polizas/entities/poliza.entity';

export enum DecisionSuscripcion {
  APROBADO = 'aprobado',
  REVISION_ASISTIDA = 'revision_asistida',
  RECHAZADO = 'rechazado',
}

@Entity('suscripciones')
export class Suscripcion {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'enum', enum: DecisionSuscripcion })
  decision!: DecisionSuscripcion;

  @Column({ type: 'uuid', unique: true })
  cotizacionId!: string;

  @OneToOne(() => Poliza, (p) => p.suscripcion)
  poliza!: Poliza;
}