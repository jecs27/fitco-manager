import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Request, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { RESPONSE_MESSAGES } from 'src/common/config';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findOne(@Req() req: Request, @Res() res: Response): Promise<any> {
    const user = await this.authService.validateAndGetUserFromRequest(req);
    return res.status(200).json({
      statusCode: 200,
      message: RESPONSE_MESSAGES.es.USER_DATA_FOUND,
      data: {
        user,
      },
    });
  }
}
