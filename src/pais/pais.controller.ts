import { Body, Controller, Post, Get, Logger, Param, NotFoundException, Delete } from '@nestjs/common';
import { ApiOperation, ApiCreatedResponse, ApiBody, ApiResponse, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { Span } from 'nestjs-otel';
import { PaisService } from './pais.service';
import { CreatePais } from './dto/createPais.dto';
import { Pais } from './schemas/pais.schema';
import { ResponseCreatedDto } from './dto/responsePais.dto';

@Controller('pais')
export class PaisController {
  private readonly logger = new Logger(PaisController.name);

    constructor(private readonly paisService: PaisService) {}

    @Post()
    @ApiOperation({ summary: 'Create country' })
    @ApiCreatedResponse({ description: 'The country has been successfully created.', type: Pais })
    @ApiBody({ description: 'Country Details', type: CreatePais })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    async create(@Body() createPaisDto: CreatePais): Promise<Pais> {
      return this.paisService.create(createPaisDto);
    }



    @Span('GET_ALL_Pais') // Decorador para trazas de OpenTelemetry
@Get()
async findAll(): Promise<ResponseCreatedDto[]> {
  this.logger.log(' >>>> GetAllCountries >>> ');
  
  const countries = await this.paisService.findAll();

  if (countries.length === 0) {
    this.logger.warn('No countries found in the collection.');
  } else {
    this.logger.debug(`Fetched ${countries.length} countries.`);
  }

  // Corrección aquí
  const formattedPais = countries.map(pais => {
    let formattedpais = new ResponseCreatedDto(); // Instancia individual de ResponseCreatedDto
    formattedpais.id = pais.id; // Correcto
    formattedpais.name = pais.name; // Correcto
    formattedpais.alias = pais.alias; // Corrección aplicada aquí
    
    return formattedpais; // Devolvemos el objeto individual correctamente formateado
  });

  return formattedPais;
}



    @Get(':alias')
@ApiOperation({ summary: 'Get country by alias' })
@ApiOkResponse({ description: 'The country has been successfully retrieved.', type: ResponseCreatedDto })
@ApiNotFoundResponse({ description: 'Country not found' })
@ApiResponse({ status: 403, description: 'Forbidden' })
async findOne(@Param('alias') alias: string): Promise<ResponseCreatedDto> {
  // Cambiar aquí para usar findByAlias en lugar de findOne
  const pais = await this.paisService.findByAlias(alias);
  if (!pais) {
    throw new NotFoundException(`Country with alias '${alias}' not found.`);
  }
  this.logger.debug(`Fetched country with alias: ${alias}`);

  // Asumiendo que ResponseCreatedDto ya incluye el id, el nombre, y el alias del país
  return pais;
}



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paisService.remove(id);
  }

  
}
