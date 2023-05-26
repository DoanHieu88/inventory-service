import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/repository/users.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { CustomerRepository } from 'src/repository/customer.repository';
import { JwtStrategy } from './jwt.strategy';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, CustomerRepository]),
    forwardRef(() => AuthModule),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY || 'secret',
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || 86400000 },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
