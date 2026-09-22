import { IsNumber, IsUUID, Max, Min } from 'class-validator';

export class DecidirSuscripcionDto {
  @IsUUID()
  clienteId!: string;

  @IsUUID()
  cotizacionId!: string;

  @IsUUID()
  productoId!: string;

  @IsNumber()
  @Min(0)
  @Max(1)
  score!: number;
}