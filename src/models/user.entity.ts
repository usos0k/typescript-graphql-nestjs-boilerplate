import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v1 as uuidV1 } from 'uuid';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  _id!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column({ default: false })
  isVerified!: boolean;

  @Column()
  name!: string;

  constructor(user: Partial<User>) {
    if (user) {
      Object.assign(this, user);
    }
  }
}
