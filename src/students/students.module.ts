import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { StudentsRepository } from './students.repository';
import { StudentsErrorRepository } from './students-error.repository';

@Module({
  controllers: [StudentsController],
  providers: [
    StudentsService,
    {
      provide: StudentsRepository,
      useClass: StudentsRepository,
    },
  ],
})
export class StudentsModule {}
