import { Test, TestingModule } from '@nestjs/testing';
import { StarSystemsController } from './star-systems.controller';
import { StarSystemsService } from './star-systems.service';

describe('StarSystemsController', () => {
  let controller: StarSystemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StarSystemsController],
      providers: [StarSystemsService],
    }).compile();

    controller = module.get<StarSystemsController>(StarSystemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
