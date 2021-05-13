import { UsersService } from './users.service';
import { Controller, Req, UseGuards, Get, Put, Body, Query, Param, HttpException, HttpCode, HttpStatus, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import JwtAuthenticationGuard from '../authentication/passport/jwt-authentication.guard';
import RequestWithUser from '../authentication/interface/requestWithUser.interface';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) { }

  @UseGuards(JwtAuthenticationGuard)
  @Get(':id')
  async getProfile(@Param('id') id: number) {
    if (!id)
      throw new BadRequestException();

    const user = await this.usersService.findOne({ id: id });

    if (!user)
      throw new NotFoundException();

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
}
