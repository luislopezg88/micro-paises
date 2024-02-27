import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaisService } from './pais.service';
import { PaisController } from './pais.controller';
import { Pais, PaisSchema } from './schemas/pais.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Pais.name, schema: PaisSchema }])],
  providers: [PaisService],
  controllers: [PaisController],
})
export class PaisModule {}