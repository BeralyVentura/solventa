import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Poliza } from '../../polizas/entities/poliza.entity';

export enum DecisionSuscripcion {
  APROBADO = 'aprobado',
  REVISION_ASISTIDA = 'revision_asistida',
  RECHAZADO = 'rechazado',
}

@Entity('subscripciones')
export class Subscripcion {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'enum', enum: DecisionSuscripcion })
  decision!: DecisionSuscripcion;

  @OneToOne(() => Poliza, (p) => p.subscripcion)
  poliza!: Poliza;
}