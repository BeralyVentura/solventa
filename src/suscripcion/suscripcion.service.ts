import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Suscripcion,
  DecisionSuscripcion,
} from './entities/suscripcion.entity';
import { PolizasService } from '../polizas/polizas.service';
import { DecidirSuscripcionDto } from './dto/decidir-suscripcion.dto';

const UMBRAL_APROBADO = 0.8;
const UMBRAL_REVISION_ASISTIDA = 0.5;

@Injectable()
export class SuscripcionService {
  constructor(
    @InjectRepository(Suscripcion)
    private readonly suscripcionRepository: Repository<Suscripcion>,
    private readonly polizasService: PolizasService,
  ) {}

  async decidir(datos: DecidirSuscripcionDto) {
    const decision = this.evaluarUmbral(datos.score);

    const suscripcion = await this.suscripcionRepository.save(
      this.suscripcionRepository.create({
        decision,
        cotizacionId: datos.cotizacionId,
      }),
    );

    if (decision === DecisionSuscripcion.APROBADO) {
      const poliza = await this.polizasService.emitir({
        clienteId: datos.clienteId,
        cotizacionId: datos.cotizacionId,
        productoId: datos.productoId,
        suscripcion,
      });
      return { suscripcion, poliza };
    }

    return { suscripcion };
  }

  private evaluarUmbral(score: number): DecisionSuscripcion {
    if (score >= UMBRAL_APROBADO) return DecisionSuscripcion.APROBADO;
    if (score >= UMBRAL_REVISION_ASISTIDA)
      return DecisionSuscripcion.REVISION_ASISTIDA;
    return DecisionSuscripcion.RECHAZADO;
  }
}