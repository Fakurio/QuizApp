import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  email: string;

  @Column({ type: 'varchar', length: 50 })
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  avatarUrl: string | null;

  @Column({ nullable: true })
  refreshToken: string | null;
}
