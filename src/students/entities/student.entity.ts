import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  major!: string;

  @Column({ default: false })
  isAdmin!: boolean;

  @Column({ default: 'active' })
  status!: string;
}
