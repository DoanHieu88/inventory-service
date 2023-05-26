import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
// import { UpdateUserDto } from './users.dto';
import { USER_NOT_FOUND } from 'src/common/constant/exception-constant';
import { changeInforUserDto, ForgotPasswordDto } from './users.dto';
import { hashPassword } from 'src/common/until/funtion-until';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async getAllUser() {
    try {
      return this.userRepository.find({ where: { flg_delete: false } });
    } catch (error) {
      console.log('err', error);
      throw new BadRequestException('GET_USER_FAILED');
    }
  }

  public async getUserById(id: string) {
    try {
      return this.userRepository.findOne({ where: { id } });
    } catch (error) {
      console.log('err', error);

      throw new UnauthorizedException();
    }
  }

  public async updateUserById(id: string, payload: changeInforUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new BadRequestException('USER_NOT_FOUND');
    const newUser = { ...user, ...payload };

    try {
      await this.userRepository.save({ ...newUser });
      return { messege: 'success' };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  public async forgotPassword(payload: ForgotPasswordDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: payload.email, flg_delete: false },
      });

      if (!user) throw new BadRequestException(USER_NOT_FOUND);
      const audit = {
        lastModifiedOnDate: new Date(),
      };
      const newPass = await hashPassword(payload.password);
      await this.userRepository.save({ ...user, ...audit, password: newPass });
      return { message: 'success' };
    } catch (error) {
      console.log(error);

      throw new BadRequestException('UPDATE NEW PASSWORD FAILED');
    }
  }

  public async changeInforUser(id: string, payload: changeInforUserDto) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) throw new BadRequestException(USER_NOT_FOUND);

      const audit = {
        lastModifiedOnDate: new Date(),
      };
      const newUser = { ...user, ...payload, ...audit };
      return await this.userRepository.save({ ...newUser });
    } catch (error) {
      console.log(error);

      throw new BadRequestException('CHANGE INFOR FAILED');
    }
  }

  public async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) return false;
    return true;
  }
}
