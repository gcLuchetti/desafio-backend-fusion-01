import { Test, TestingModule } from '@nestjs/testing';
import { SpaceshipsController } from './spaceships.controller';
import { SpaceshipsService } from './spaceships.service';

describe('SpaceshipsController', () => {
  let controller: SpaceshipsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpaceshipsController],
      providers: [SpaceshipsService],
    }).compile();

    controller = module.get<SpaceshipsController>(SpaceshipsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
