import { Body, Controller, Post, Get, Logger, Param, NotFoundException, Delete } from '@nestjs/common';
import { ApiOperation, ApiCreatedResponse, ApiBody, ApiResponse, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { Span } from 'nestjs-otel';
import { PaisService } from './pais.service';
import { CreatePais } from './dto/createPais.dto';
import { Pais } from './entities/pais.entity';
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
  
      
      const formattedPais = countries.map(pais => {
        let formattedpais = new ResponseCreatedDto();
        formattedPais.id = pais.id;
        formattedPais.name = pais.name;
        
        return formattedPais;
      });
  
      return formattedPais;
    }



    @Get(':id')
  @ApiOperation({ summary: 'Get country' })
  @ApiOkResponse({ description: 'The country has been successfully retrieved.', type: ResponseCreatedDto })
  @ApiNotFoundResponse({ description: 'Country not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async findOne(@Param('id') id: string): Promise<ResponseCreatedDto> {
    const pais = await this.paisService.findOne(id);
    if (!pais) {
      throw new NotFoundException(`Country with ID '${id}' not found.`);
    }
    this.logger.debug(`Fetched country with ID: ${id}`);
  
    const responseDto = new ResponseCreatedDto();
    responseDto.id = pais.id; 
    
    return responseDto;
  }



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paisService.remove(id);
  }

  
}
