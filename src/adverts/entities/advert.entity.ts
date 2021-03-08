import { User } from '../../users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Advert {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  name: string;

  @Column()
  sale: boolean;

  @Column()
  price: number;

  @Column('simple-array')
  tags: string[];

  @Column({ nullable: true })
  photo: string;

  @ManyToOne(() => User)
  user: User;
}
