import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Query,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserInfo } from './UserInfo';
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from 'src/auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('/test')
  getHello(): string {
    return process.env.DATABASE_HOST;
  }

  @Post()
  async creatUser(@Body() dto: CreateUserDto): Promise<void> {
    // console.log(dto);
    const { name, email, password } = dto;
    await this.usersService.createUser(name, email, password);
  }

  @Post('/email-verify')
  async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string> {
    // console.log(dto);
    const { signupVerifyToken } = dto;
    return await this.usersService.verifyEmail(signupVerifyToken);
  }

  @Post('/login')
  async login(@Body() dto: UserLoginDto): Promise<string> {
    const { email, password } = dto;
    // console.log(dto);
    return await this.usersService.login(email, password);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getUserInfo(
    @Headers() headers: any,
    @Param('id') userId: string,
  ): Promise<UserInfo> {
    // UseGuards(AuthGuard)를 DI하여 아래 구문을 대체
    // const jwtString = headers.authorization.split('Bearer ')[1];
    // this.authService.verify(jwtString);

    return this.usersService.getUserInfo(userId);
  }
}
