import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '12h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
