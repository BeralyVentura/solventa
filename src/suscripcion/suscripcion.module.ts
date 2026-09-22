import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscripcion } from './entities/subscripcion.entity';
import { SuscripcionService } from './suscripcion.service';
import { SuscripcionController } from './suscripcion.controller';
import { PolizasModule } from '../polizas/polizas.module';

@Module({
  imports: [TypeOrmModule.forFeature([Subscripcion]), PolizasModule],
  controllers: [SuscripcionController],
  providers: [SuscripcionService],
})
export class SuscripcionModule {}