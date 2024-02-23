import { Injectable, ConflictException, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Span } from 'nestjs-otel';
import { Model } from 'mongoose';
import { Pais, PaisDocument } from './entities/pais.entity';
import { CreatePais } from './dto/createPais.dto';
import { ResponseCreatedDto } from './dto/responsePais.dto';
import { UpdatePaisDto } from './dto/updatePais.dto';


@Injectable()
export class PaisService {
  private readonly logger = new Logger(PaisService.name);

    constructor(@InjectModel(Pais.name) private paisModel: Model<PaisDocument>) {}

  async create(createPaisDto: CreatePais): Promise<Pais> {
    // Verifica si ya existe un país con el mismo nombre
    const existingPais = await this.paisModel.findOne({ name: createPaisDto.name }).exec();
    
    if (existingPais) {
      // Si el país ya existe, maneja la situación según necesites. Por ejemplo:
      this.logger.warn(`pais with name ${createPaisDto.name} already exists!`);
      throw new ConflictException(`pais with name ${createPaisDto.name} already exists!`);
    }

    // Si no existe, crea el nuevo país
    const newPais = new this.paisModel(createPaisDto);
    await newPais.save();
    this.logger.debug(`Added pais with ID: ${newPais._id}`);
    
    return newPais;
  }

  @Span('GET_ALL_Paises') 
  async findAll(): Promise<CreatePais[]> {
    this.logger.log(' >>>> GetAllPaises >>> ');
    

    const paises = await this.paisModel.find().exec();
    let responsePaises = new Array<CreatePais>();

    paises.forEach(pais => {
      let responsePais = new CreatePais();
      responsePais.id = pais._id; 
      responsePais.name = pais.name;
     
      responsePaises.push(responsePais);
    });

    this.logger.debug('All paises: ' + responsePaises.length);

    if (responsePaises.length === 0) {
      this.logger.warn('No paises found in the collection.');
    } else {
      this.logger.debug(`Fetched ${responsePaises.length} paises.`);
    }
    return responsePaises;
  }


  @Span('GET_Pais_BY_ID')
  async findOne(id: string): Promise<ResponseCreatedDto> {
    this.logger.log(' >>>> GetPaisById >>> ' + id);
    

    const paisDoc = await this.paisModel.findById(id).exec();

    if (!paisDoc) {
      this.logger.warn('Pais not found!');
      throw new NotFoundException(`Pais with ID '${id}' not found.`);
    }

    this.logger.debug('Document data: ' + JSON.stringify(paisDoc));

    
    let paisDto = new ResponseCreatedDto();
    paisDto.id = paisDoc._id.toString(); 

    return paisDto;
  }


  @Span('UPDATE_PAIS')
  async update(id: string, updatePaisDto: UpdatePaisDto): Promise<ResponseCreatedDto> {
    this.logger.log(`Updating pais with ID: ${id}`);

    const updatedPais = await this.paisModel.findByIdAndUpdate(id, updatePaisDto, { new: true }).exec();

    if (!updatedPais) {
      this.logger.warn('Pais not found!');
      throw new NotFoundException(`Pais with ID '${id}' not found.`);
    }

    this.logger.debug('Document data: ' + JSON.stringify(updatedPais));

    
    let paisDto = new ResponseCreatedDto();
    paisDto.id = updatedPais._id.toString(); 

    return paisDto;
  }

  @Span('REMOVE_PAIS')
  async remove(id: string): Promise<string> {
    this.logger.log(`Attempting to remove pais with ID: ${id}`);

    const result = await this.paisModel.deleteOne({ _id: id }).exec();

    if (result.deletedCount === 0) {
      this.logger.warn(`Pais with ID '${id}' not found.`);
      throw new NotFoundException(`Pais with ID '${id}' not found.`);
    }

    this.logger.debug(`Pais ${id} erased`);
    return `Pais ${id} erased`;
  }

}
