import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { UserService } from 'src/services/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Get('/checkStatus')
  async status(): Promise<string> {
    return 'server is healthy';
  }

  @Post('/signup')
  async signup(@Body() user: User): Promise<User> {
    try {
      return await this.userService.signup(user);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/signin')
  async signin(
    @Body() credentials: { email: string; password: string },
  ): Promise<User> {
    try {
      return await this.userService.signin(
        credentials.email,
        credentials.password,
      );
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
