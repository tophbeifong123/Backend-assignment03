import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  remainingSeats!: number;
}
