import {
  BadRequestException,
  Controller,
  NotFoundException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Course } from './entities/course.entity/course.entity';
import { Student } from '../students/entities/student.entity';

@Controller('courses')
export class CoursesController {
  constructor(private readonly dataSource: DataSource) {}

  async enroll(courseId: number, studentId: number) {
    return this.dataSource.transaction(async (manager) => {
      const courseRepository = manager.getRepository(Course);
      const studentRepository = manager.getRepository(Student);

      // 1. Lock course row
      const course = await courseRepository.findOne({
        where: {
          id: courseId,
        },
        lock: {
          mode: 'pessimistic_write',
        },
      });

      // 2. ตรวจสอบ course
      if (!course) {
        throw new NotFoundException('Course not found');
      }

      // 3. ตรวจสอบจำนวนที่นั่ง
      if (course.remainingSeats <= 0) {
        throw new BadRequestException('No seats available');
      }

      // 4. ตรวจสอบ student
      const student = await studentRepository.findOne({
        where: {
          id: studentId,
        },
      });

      if (!student) {
        throw new NotFoundException('Student not found');
      }

      // 5. ลดจำนวนที่นั่ง
      course.remainingSeats -= 1;

      // 6. Save ภายใน transaction
      await courseRepository.save(course);

      return {
        message: 'Enrollment successful',
        studentId,
        courseId,
        remainingSeats: course.remainingSeats,
      };
    });
  }
}
