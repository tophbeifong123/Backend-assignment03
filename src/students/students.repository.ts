import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsRepository {
  constructor(
    @InjectRepository(Student)
    private readonly repository: Repository<Student>,
  ) {}

  findAll() {
    return this.repository.find();
  }

  findById(id: number) {
    return this.repository.findOne({
      where: { id },
    });
  }

  create(data: DeepPartial<Student>) {
    const student = this.repository.create(data);

    return this.repository.save(student);
  }

  update(id: number, data: Partial<Student>) {
    return this.repository
      .findOne({
        where: { id },
      })
      .then(async (student) => {
        if (!student) {
          return null;
        }

        Object.assign(student, data);

        return this.repository.save(student);
      });
  }

  remove(id: number) {
    return this.repository
      .findOne({
        where: { id },
      })
      .then(async (student) => {
        if (!student) {
          return null;
        }

        await this.repository.remove(student);

        return student;
      });
  }
}
