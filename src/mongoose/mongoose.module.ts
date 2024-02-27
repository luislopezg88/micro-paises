import { Module, DynamicModule, Global } from '@nestjs/common';
import { MongooseModule as NestMongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({})
export class MongoDbModule {
  static forRoot(): DynamicModule {
    const dbModule = NestMongooseModule.forRootAsync({
      imports: [ConfigModule], // Asegúrate de importar ConfigModule aquí
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        // Aquí puedes añadir más opciones de configuración según necesites
      }),
      inject: [ConfigService], // Inyectar ConfigService para acceder a las variables de entorno
    });

    return {
      module: MongoDbModule,
      imports: [dbModule],
      exports: [dbModule],
    };
  }
}
