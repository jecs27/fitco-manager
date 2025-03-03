import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateClientDto {
  @IsString()
  name: string;

  @IsString()
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
