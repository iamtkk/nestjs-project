import { Body, Controller, Post, Get, Param, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto'
import { UserLoginDto } from './dto/user-login.dto'
import { VerifyEmailDto } from './dto/verify-email.dto'
import { UserInfo } from './UserInfo'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @Post()
    async creatUser(@Body() dto: CreateUserDto):Promise<void>{
        // console.log(dto);
        const { name, email, password } = dto;
        await this.usersService.createUser(name, email, password)
    }

    @Post('/email-verify')
    async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string> {
        console.log(dto);
        return;
    }

    @Post('/login')
    async login(@Body() dto: UserLoginDto): Promise<string> {
        console.log(dto);
        return;
    }

    @Get('/:id')
    async getUserInfo(@Param('id') userId: string): Promise<UserInfo> {
        console.log(userId);
        return;
    }
}
