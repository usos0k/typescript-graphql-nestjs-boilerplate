import { ValidationEntity } from '@/common/entities';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UsersEntity extends ValidationEntity {

  @PrimaryGeneratedColumn()
  readonly _id!: number;

  @Column({default: false})
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;

  @Column()
  title!: string;
}
