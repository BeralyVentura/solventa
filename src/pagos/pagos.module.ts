import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Desembolso } from './entities/desembolso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Desembolso])],
})
export class PagosModule {}
