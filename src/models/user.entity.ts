import { Expose, plainToClass } from 'class-transformer';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { v1 as uuidV1 } from 'uuid';

@Entity({
  name: 'users',
})
export class User {
  @Expose()
  @ObjectIdColumn()
  _id: string;

  @Expose()
  @Column()
  email!: string;

  @Expose()
  @Column()
  password!: string;

  @Expose()
  @Column()
  isVerified: boolean;

  constructor(user: Partial<User>) {
    Object.assign(
      this,
      plainToClass(User, user, {
        excludeExtraneousValues: true,
      }),
    );

    this._id = user._id || uuidV1();
    this.isVerified = user.isVerified || false;
  }
}
