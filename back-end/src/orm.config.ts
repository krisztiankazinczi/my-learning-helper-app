import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import User from './user/entities/user.entity';
import dotenv from 'dotenv';
dotenv.config();

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // with this the schema will be updated always
  logging: true,
  // entities: ['dist/**/*.entity{.ts,.js}'],
  entities: [User],
};
