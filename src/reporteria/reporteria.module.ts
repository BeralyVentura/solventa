import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReporteReaseguro } from './entities/reporte-reaseguro.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReporteReaseguro])],
})
export class ReporteriaModule {}
