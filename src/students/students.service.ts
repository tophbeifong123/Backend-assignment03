import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentsRepository } from './students.repository';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(private readonly studentsRepository: StudentsRepository) {}

  findAll() {
    return this.studentsRepository.findAll();
  }

  findOne(id: number) {
    return this.studentsRepository.findById(id);
  }

  create(createStudentDto: CreateStudentDto) {
    return this.studentsRepository.create(createStudentDto);
  }

  update(id: number, dto: UpdateStudentDto) {
    return this.studentsRepository.update(id, dto);
  }

  remove(id: number) {
    return this.studentsRepository.remove(id);
  }
}
