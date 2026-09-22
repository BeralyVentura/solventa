import { Subscripcion } from '../../suscripcion/entities/subscripcion.entity';

export class EmitirPolizaDto {
  clienteId!: string;
  cotizacionId!: string;
  productoId!: string;
  subscripcion!: Subscripcion;
}