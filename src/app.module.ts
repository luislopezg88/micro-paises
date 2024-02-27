import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongoDbModule } from './mongoose/mongoose.module';
import { PaisModule } from './pais/pais.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que ConfigModule sea global
    }),
    MongoDbModule.forRoot(),
    PaisModule,
    // Otros módulos...
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
