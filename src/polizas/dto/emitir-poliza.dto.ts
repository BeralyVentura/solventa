import { Suscripcion } from '../../suscripcion/entities/suscripcion.entity';

export class EmitirPolizaDto {
  clienteId!: string;
  cotizacionId!: string;
  productoId!: string;
  suscripcion!: Suscripcion;
}