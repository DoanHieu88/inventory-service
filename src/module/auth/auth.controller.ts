import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Login, SignUpDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register-admin')
  public async signUpAdmin(@Body() body: SignUpDTO) {
    return await this.authService.signUpAdmin(body);
  }

  @Post('login-admin')
  public async loginAdmin(@Body() payload: Login) {
    return await this.authService.loginAdmin(payload);
  }

  // @Post('register-customer')
  // public async signUpCustomer(@Body() body: SignUpDTO) {
  //   return await this.authService.registerCustomer(body);
  // }

  // @Post('login-customer')
  // public async loginCustomer(@Body() payload: Login) {
  //   return await this.authService.signInCustomer(payload);
  // }
}
