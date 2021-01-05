import { IsEmail, Length } from 'class-validator';
import {
  Entity as TOEntity,
  Column,
  Index,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import Entity from '../../utils/base.entity';

@TOEntity('users')
export default class User extends Entity {
  // with this Partial<user> when we initialize this class we can pass only these keys as the columns
  // are named here,  but if some parameter are missing, that is no problem
  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }

  // @Index() - makes the queries much faster!!!
  @Index()
  @Length(1, 255, { message: 'Email is empty' })
  @IsEmail(undefined, { message: 'Must be a valid email address' })
  @Column({
    unique: true,
  })
  email: string;

  @Index()
  @Length(3, 255, { message: 'Must be at least 3 characters long' })
  @Column({
    unique: true,
  })
  username: string;

  // this column information will never be returned
  @Exclude()
  @Column()
  @Length(6, 255, { message: 'Must be at least 6 characters long' })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6);
  }
}
