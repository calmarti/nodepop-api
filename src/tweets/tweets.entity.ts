import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Tweet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @Column({ default: 'ae6aa0ab-2a6c-47e5-bc4f-9cf922f00865' })
  userId: string;

  @CreateDateColumn()
  createdAt: Date;
}
