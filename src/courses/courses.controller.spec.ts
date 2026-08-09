import { Test, TestingModule } from '@nestjs/testing';
import { CoursesController } from './courses.controller';
import { DataSource } from 'typeorm';

describe('CoursesController', () => {
  let controller: CoursesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoursesController],
      providers: [
        {
          provide: DataSource,
          useValue: {
            transaction: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CoursesController>(CoursesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});


