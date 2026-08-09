import { Injectable } from '@nestjs/common';

export interface Student {
  id: number;
  name: string;
  email: string;
  major: string;
}

@Injectable()
export class StudentsRepository {
  private students: Student[] = [
    {
      id: 1,
      name: 'John',
      email: 'john@example.com',
      major: 'Computer Engineering',
    },
  ];

  findAll(): Student[] {
    return this.students;
  }

  findById(id: number): Student | undefined {
    return this.students.find((student) => student.id === id);
  }

  create(student: Omit<Student, 'id'>): Student {
    const newStudent: Student = {
      id: this.students.length + 1,
      ...student,
    };

    this.students.push(newStudent);

    return newStudent;
  }

  update(id: number, data: any) {
    const student = this.students.find((student) => student.id === id);

    if (!student) {
      return null;
    }

    Object.assign(student, data);

    return student;
  }

  remove(id: number) {
    const index = this.students.findIndex((student) => student.id === id);

    if (index === -1) {
      return null;
    }

    const deletedStudent = this.students[index];

    this.students.splice(index, 1);

    return deletedStudent;
  }
}
