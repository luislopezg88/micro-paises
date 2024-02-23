import { Module, DynamicModule, Global } from '@nestjs/common';
import { MongooseModule as NestMongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';

type MongoModuleOptions = {
  imports: any[],
  useFactory: (...args: any[]) => MongooseModuleOptions;
  inject: any[]
}

@Global()
@Module({})
export class MongoDbModule {
  static forRoot(options: MongoModuleOptions): DynamicModule {
    const optionsProvider = {
      provide: 'MONGO_OPTIONS_PROVIDER',
      useFactory: options.useFactory,
      inject: options.inject,
    };

    const dbModule = NestMongooseModule.forRootAsync({
      imports: options.imports,
      useFactory: options.useFactory,
      inject: options.inject,
    });

    

    return {
      module: MongoDbModule,
      imports: [dbModule, ...options.imports],
      providers: [optionsProvider],
      exports: [dbModule],
    };
  }
}
