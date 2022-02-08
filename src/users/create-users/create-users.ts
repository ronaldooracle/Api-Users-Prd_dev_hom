import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../../entities/users.entity';
import { Repository } from 'typeorm';
import RequestUsersDTO from '../dtos/request-users';

const log = new Logger('CreateUsers');

@Injectable()
export class CreateUsers {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}
  async execute({
    email,
    password,
  }: RequestUsersDTO): Promise<RequestUsersDTO> {
    try {
      const createUsersRepository = this.usersRepository.create();
      createUsersRepository.email = email;
      createUsersRepository.password = password;

      const createdEntity = await this.usersRepository.save(
        createUsersRepository,
      );

      return createdEntity;
    } catch (error) {
      log.error(`Erro ao salvar users na base de dados`);
      throw new InternalServerErrorException(
        'Erro ao salvar a users na base de dados',
      );
    }
  }
}
