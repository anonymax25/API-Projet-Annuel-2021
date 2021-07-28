import {
  Body,
  Req,
  Controller,
  Post,
  UseGuards, 
  ClassSerializerInterceptor, 
  UseInterceptors,
  ForbiddenException
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { AuthenticationService } from './authentication.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import LoginDto from './dto/login.dto';

@ApiTags('authentication')
@Controller('authentication')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly usersService: UsersService

  ) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authenticationService.register(registrationData);
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    
    let user = await this.usersService.findOne({email: body.email});
    if(!user){
      throw new ForbiddenException("wrong email, user not found")
    }

    const hasedTest = require("crypto").createHmac("sha256", "password")
      .update(body.password)
      .digest("hex");
    
    if(hasedTest !== user.password){
      throw new ForbiddenException("wrong password")
    }

    return this.authenticationService.login(user)
  }
}