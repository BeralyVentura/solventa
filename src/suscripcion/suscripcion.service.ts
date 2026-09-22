import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Subscripcion,
  DecisionSuscripcion,
} from './entities/subscripcion.entity';
import { PolizasService } from '../polizas/polizas.service';
import { DecidirSuscripcionDto } from './dto/decidir-suscripcion.dto';

const UMBRAL_APROBADO = 0.8;
const UMBRAL_REVISION_ASISTIDA = 0.5;

@Injectable()
export class SuscripcionService {
  constructor(
    @InjectRepository(Subscripcion)
    private readonly subscripcionRepository: Repository<Subscripcion>,
    private readonly polizasService: PolizasService,
  ) {}

  async decidir(datos: DecidirSuscripcionDto) {
    const decision = this.evaluarUmbral(datos.score);

    const subscripcion = await this.subscripcionRepository.save(
      this.subscripcionRepository.create({ decision }),
    );

    if (decision === DecisionSuscripcion.APROBADO) {
      const poliza = await this.polizasService.emitir({
        clienteId: datos.clienteId,
        cotizacionId: datos.cotizacionId,
        productoId: datos.productoId,
        subscripcion,
      });
      return { subscripcion, poliza };
    }

    return { subscripcion };
  }

  private evaluarUmbral(score: number): DecisionSuscripcion {
    if (score >= UMBRAL_APROBADO) return DecisionSuscripcion.APROBADO;
    if (score >= UMBRAL_REVISION_ASISTIDA)
      return DecisionSuscripcion.REVISION_ASISTIDA;
    return DecisionSuscripcion.RECHAZADO;
  }
}