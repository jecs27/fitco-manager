import {
  Controller,
  Post,
  Body,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import User from 'src/users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() credentials: LoginDto, @Res() res: Response) {
    if (!credentials.username || !credentials.password) {
      return res.status(400).json({
        statusCode: 400,
        message: 'Username and password are required',
        error: 'Unauthorized',
        data: {
          error: 'Username and password are required',
        },
      });
    }

    try {
      const user = await this.userService.loginWithCredentials(credentials);
      if (!user) {
        return res.status(401).json({
          statusCode: 401,
          message: 'Invalid credentials',
          error: 'Unauthorized',
          data: {
            error: 'Invalid credentials',
          },
        });
      }
      const token = await this.authService.generateToken(user);
      delete user.token;
      return res.status(200).json({
        statusCode: 200,
        message: 'Login successful',
        data: {
          user,
          token,
        },
      });
    } catch (error) {
      console.error(error);
      if (error instanceof UnauthorizedException) {
        return res.status(401).json({
          statusCode: 401,
          message: error.message,
          error: 'Unauthorized',
          data: {
            error: error.message,
          },
        });
      }
      return res.status(500).json({
        statusCode: 500,
        message: 'Internal server error',
        error: 'Internal server error',
        data: {
          error: 'An unexpected error occurred: ' + error.message,
        },
      });
    }
  }

  @Post('register')
  async register(@Body() user: User, @Res() res: Response) {
    const newUser = await this.userService.register(user);
    return res.status(201).json({
      statusCode: 201,
      message: 'User registered successfully',
      data: newUser,
    });
  }
}
