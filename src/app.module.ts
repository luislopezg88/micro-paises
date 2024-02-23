import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from './mongoose/mongoose.module';
import { PaisModule } from './pais/pais.module';

@Module({
  imports: [MongooseModule, PaisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
