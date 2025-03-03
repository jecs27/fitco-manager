import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtAuthGuard {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }
    try {
      const realToken = token.split(' ')[1];
      const decodedToken = this.jwtService.decode(realToken);
      if (!decodedToken || typeof decodedToken !== 'object') {
        throw new UnauthorizedException('Invalid token');
      }
      const user = await this.authService.verifyTokenAndExtractUser(realToken);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      request.user = user;
      return true;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
