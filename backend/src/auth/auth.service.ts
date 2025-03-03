import { Request, Response } from 'express';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import User from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async generateToken(user: User): Promise<string> {
    const payload = { ku: user.uuid, sub: user.userId, email: user.email };
    return this.jwtService.sign(payload, {
      secret: user.token || process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN || '1d',
      algorithm: 'HS256',
    });
  }

  async verifyTokenAndExtractUser(token: string): Promise<User | null> {
    try {
      const decoded = this.jwtService.decode(token);
      if (!decoded || typeof decoded !== 'object') {
        return null;
      }

      const user = await this.usersService.findOne(decoded.ku);
      if (!user) {
        return null;
      }

      try {
        this.jwtService.verify(token, {
          secret: process.env.JWT_SECRET || 'secret',
        });
      } catch (error) {
        console.error(error);
        return null;
      }

      if (decoded.exp < Date.now() / 1000) {
        return null;
      }
      delete user.token;
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getUserFromRequest(req: Request): Promise<User> {
    const token = req.headers.authorization?.split(' ')[1];
    const userData = await this.verifyTokenAndExtractUser(token);
    if (!userData) {
      throw new UnauthorizedException('Unauthorized access');
    }
    return userData;
  }
}
