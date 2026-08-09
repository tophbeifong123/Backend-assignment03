import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity/course.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async enroll(courseId: number) {
    const course = await this.courseRepository.findOne({
      where: { id: courseId },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    if (course.remainingSeats <= 0) {
      throw new BadRequestException('No seats available');
    }

    // จำลองช่วงเวลาที่ request ถูก interrupt
    await new Promise((resolve) => setTimeout(resolve, 3000));

    course.remainingSeats -= 1;

    await this.courseRepository.save(course);

    return {
      message: 'Enrollment successful',
      remainingSeats: course.remainingSeats,
    };
  }
}
