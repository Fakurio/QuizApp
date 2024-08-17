import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from './question.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 50 })
  name: string;
  @Column({ type: 'varchar', length: 100, nullable: true })
  logo?: string;
  @OneToMany(() => Question, (question) => question.category, {
    cascade: ['insert'],
  })
  questions: Question[];
}
