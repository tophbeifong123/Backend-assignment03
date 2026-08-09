import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from './students.service';
import { StudentsRepository } from './students.repository';

describe('StudentsService', () => {
  let service: StudentsService;

  const mockRepository = {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        {
          provide: StudentsRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<StudentsService>(StudentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all students from repository', () => {
    const students = [
      {
        id: 1,
        name: 'Alice',
        email: 'alice@example.com',
        major: 'Computer Engineering',
      },
    ];

    mockRepository.findAll.mockReturnValue(students);

    const result = service.findAll();

    expect(mockRepository.findAll).toHaveBeenCalled();
    expect(result).toEqual(students);
  });
});
