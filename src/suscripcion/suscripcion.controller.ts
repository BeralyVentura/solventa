import { Body, Controller, Post } from '@nestjs/common';
import { SuscripcionService } from './suscripcion.service';
import { DecidirSuscripcionDto } from './dto/decidir-suscripcion.dto';

@Controller('suscripciones')
export class SuscripcionController {
  constructor(private readonly suscripcionService: SuscripcionService) {}

  @Post()
  decidir(@Body() datos: DecidirSuscripcionDto) {
    return this.suscripcionService.decidir(datos);
  }
}