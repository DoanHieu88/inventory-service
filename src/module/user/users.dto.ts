import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({ description: 'email', required: true })
  email: string;

  @ApiProperty({ description: 'password', required: true })
  password: string;
}

export class changeInforUserDto {
  @ApiProperty({ required: false, description: 'firstName' })
  @IsOptional()
  firstName: string;

  @ApiProperty({ required: false, description: 'lastName' })
  @IsOptional()
  lastName: string;

  @ApiProperty({ required: false, description: 'email' })
  @IsOptional()
  email: string;

  @ApiProperty({ required: false, description: 'address' })
  @IsOptional()
  address: string;

  @ApiProperty({ required: false, description: 'phone' })
  @IsOptional()
  phone: string;

  @ApiProperty({ required: false, description: 'company' })
  @IsOptional()
  company: string;
}

export class GetbyEmailDto {
  @ApiProperty({ description: 'email', required: true })
  email: string;
}
