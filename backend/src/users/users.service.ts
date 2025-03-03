import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { LoginDto } from 'src/auth/dto/login.dto';
import User from './entities/user.entity';
import { compareHash, hashString } from 'src/common/security/hash.security';
import { generateRandomToken } from 'src/common/security/token.security';

@Injectable()
export class UsersService {
  private userRepository: Repository<User>;

  constructor(private dataSource: DataSource) {
    this.userRepository = this.dataSource.getRepository(User);
  }

  async register(user: User): Promise<User> {
    const existingUsername = await this.userRepository.findOne({
      where: { username: user.username },
      select: {
        uuid: true,
        username: true,
        email: true,
        name: true,
        password: true,
        token: true,
      },
    });
    if (existingUsername) {
      throw new UnauthorizedException('Username is already taken');
    }

    const existingEmail = await this.userRepository.findOne({
      where: { email: user.email },
    });
    if (existingEmail) {
      throw new UnauthorizedException('Email is already registered');
    }

    user.password = await hashString(user.password);
    user.token = await generateRandomToken();

    const newUser = await this.userRepository.save(user);
    delete newUser.password;
    return newUser;
  }

  async loginWithCredentials(loginDto: LoginDto): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { username: loginDto.username },
        select: {
          uuid: true,
          userId: true,
          username: true,
          email: true,
          password: true,
          name: true,
        },
      });
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const isPasswordValid = await compareHash(
        loginDto.password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }
      delete user.password;
      return user;
    } catch (error) {
      console.error('Error during login:', error);
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new Error('An error occurred during login');
    }
  }

  async findOne(userUuid: string): Promise<User | undefined> {
    try {
      const user = await this.userRepository.findOne({
        where: { uuid: userUuid },
        select: ['uuid', 'userId', 'username', 'email', 'name', 'token'],
      });

      if (!user) {
        throw new Error(`User with id ${userUuid} not found`);
      }

      return user;
    } catch (error) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  }
}
