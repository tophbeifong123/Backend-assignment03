import { Injectable } from '@nestjs/common';

@Injectable()
export class StudentsErrorRepository {
  findAll() {
    throw new Error('Database connection failed');
  }

  findById() {
    throw new Error('Database connection failed');
  }

  create() {
    throw new Error('Database connection failed');
  }
}
