import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Request, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findOne(@Req() req: Request, @Res() res: Response): Promise<any> {
    const user = await this.authService.getUserFromRequest(req);
    return res.status(200).json({
      statusCode: 200,
      message: 'User data was found',
      data: {
        user,
      },
    });
  }
}
