import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export default class RequestUsersDTO {
  @Length(1, 300, { message: 'Campo email pode ter até 300 caracteres' })
  @IsNotEmpty({ message: 'Campo email é obrigatório' })
  @IsString({ message: 'Campo email precisa ser um texto' })
  email: string;

  @IsBoolean()
  @IsOptional()
  password: string;
}
