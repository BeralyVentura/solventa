import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Poliza, EstadoPoliza } from './entities/poliza.entity';
import { EmitirPolizaDto } from './dto/emitir-poliza.dto';

@Injectable()
export class PolizasService {
  constructor(
    @InjectRepository(Poliza)
    private readonly polizaRepository: Repository<Poliza>,
  ) {}

  async emitir(datos: EmitirPolizaDto): Promise<Poliza> {
    const poliza = this.polizaRepository.create({
      estado: EstadoPoliza.EMITIDA,
      clienteId: datos.clienteId,
      cotizacionId: datos.cotizacionId,
      productoId: datos.productoId,
      suscripcion: datos.suscripcion,
    });

    return this.polizaRepository.save(poliza);
  }

  async renovar(id: string): Promise<Poliza> {
    const poliza = await this.polizaRepository.findOneByOrFail({ id });
    poliza.estado = EstadoPoliza.RENOVADA;
    return this.polizaRepository.save(poliza);
  }

  async cancelar(id: string): Promise<Poliza> {
    const poliza = await this.polizaRepository.findOneByOrFail({ id });
    poliza.estado = EstadoPoliza.CANCELADA;
    return this.polizaRepository.save(poliza);
  }
}