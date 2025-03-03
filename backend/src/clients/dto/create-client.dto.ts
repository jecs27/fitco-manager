import { IsString, IsEmail, IsOptional, Length } from 'class-validator';
import { RESPONSE_MESSAGES } from 'src/common/config';

export class CreateClientDto {
  @IsString()
  name: string;

  @IsString()
  @Length(10, 10, { message: RESPONSE_MESSAGES.es.PHONE_NUMBER_INVALID })
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  emergencyContact: string;

  @IsString()
  @IsOptional()
  emergencyPhone: string;
}
