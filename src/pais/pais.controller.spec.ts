import { Test, TestingModule } from '@nestjs/testing';
import { PaisController } from './pais.controller';

describe('PaisController', () => {
  let controller: PaisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaisController],
    }).compile();

    controller = module.get<PaisController>(PaisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
