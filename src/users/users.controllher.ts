import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateUsers } from './create-users/create-users';
import RequestUsersDTO from './dtos/request-users';

@Controller('users')
export class UsersCrontrollher {
  constructor(private readonly createUsers: CreateUsers) {}

  @Post()
  CreateUsers(
    @Body() createUsersDto: RequestUsersDTO,
  ): Promise<RequestUsersDTO> {
    return this.createUsers.execute(createUsersDto);
  }
}
