import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PolizasModule } from './polizas/polizas.module';
import { SuscripcionModule } from './suscripcion/suscripcion.module';
import { IdentidadModule } from './identidad/identidad.module';
import { PerfilamientoModule } from './perfilamiento/perfilamiento.module';
import { CotizacionModule } from './cotizacion/cotizacion.module';
import { SiniestrosModule } from './siniestros/siniestros.module';
import { PagosModule } from './pagos/pagos.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    PolizasModule,
    SuscripcionModule,
    IdentidadModule,
    PerfilamientoModule,
    CotizacionModule,
    SiniestrosModule,
    PagosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}