import { Module } from '@nestjs/common';
import { UsersCrontrollher } from './users.controllher';
import { CreateUsers } from '../users/create-users/create-users';
import { Users } from 'src/entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersCrontrollher],
  providers: [CreateUsers],
})
export class UsersModule {}
