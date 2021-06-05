import { UsersService } from './users.service';
import { Controller, Req, UseGuards, Get, Put, Body, Query, Param, HttpException, HttpCode, HttpStatus, BadRequestException, NotFoundException, ForbiddenException, UseInterceptors, UploadedFile } from '@nestjs/common';
import JwtAuthenticationGuard from '../authentication/passport/jwt-authentication.guard';
import RequestWithUser from '../authentication/interface/requestWithUser.interface';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { ApiTags } from '@nestjs/swagger';
import { Post } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) { }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  async getProfile(@Req() request: RequestWithUser) {

    const user = await this.usersService.findOne({ id: request.user.id });

    delete user.password;
    return user;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Put()
  async update(@Req() req: RequestWithUser, @Body() updateUser: UpdateUserDTO) {
    if(updateUser.id !== req.user.id)
      throw new ForbiddenException(null, 'Not allowed to modify other users');

    let user = await this.usersService.findOne({id: req.user.id});

    const savedUser = await this.usersService.save(this.usersService.fillUser(user, updateUser));
    delete savedUser.password
    return savedUser;
  }

  @Post('file')
  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(FileInterceptor('file'))
  async addPrivateFile(@Req() request: RequestWithUser, @UploadedFile() file: Express.Multer.File) {
    return this.usersService.addPrivateFile(request.user.id, file.buffer, file.originalname);
  }
  
  @Get('file')
  @UseGuards(JwtAuthenticationGuard)
  async getAllPrivateFiles(@Req() request: RequestWithUser) {
    return this.usersService.getAllPrivateFiles(request.user.id);
  }
}
