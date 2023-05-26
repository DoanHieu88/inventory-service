import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignUpDTO {
  @ApiProperty({ required: true, description: 'firstName' })
  @IsString()
  firstName: string;

  @ApiProperty({ required: true, description: 'lastName' })
  @IsString()
  lastName: string;

  @ApiProperty({ required: true, description: 'email' })
  @IsString()
  email: string;

  @ApiProperty({ required: false, description: 'address' })
  @IsString()
  address: string;

  @ApiProperty({ required: false, description: 'phone' })
  @IsString()
  phone: string;

  @ApiProperty({ required: false, description: 'company' })
  @IsString()
  company: string;

  @ApiProperty({ required: true, description: 'password' })
  @IsString()
  password: string;

  @ApiProperty({ required: true, description: 'comfirmPassword' })
  @IsString()
  comfirmPassword: string;
}

export class Login {
  @ApiProperty({ required: true, description: 'email' })
  @IsString()
  email: string;

  @ApiProperty({ required: true, description: 'password' })
  @IsString()
  password: string;
}
