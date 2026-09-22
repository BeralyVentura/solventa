import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Poliza } from './entities/poliza.entity';
import { PolizasService } from './polizas.service';

@Module({
  imports: [TypeOrmModule.forFeature([Poliza])],
  providers: [PolizasService],
  exports: [PolizasService],
})
export class PolizasModule {}