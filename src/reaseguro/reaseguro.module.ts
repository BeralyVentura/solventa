import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reaseguradora } from './entities/reaseguradora.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reaseguradora])],
})
export class ReaseguroModule {}
