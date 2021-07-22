import { UsersService } from './users.service';
import { Controller, Req, UseGuards, Get, Put, Body, Query, Param, HttpException, HttpCode, HttpStatus, BadRequestException, NotFoundException, ForbiddenException, UseInterceptors, UploadedFile, Delete } from '@nestjs/common';
import JwtAuthenticationGuard from '../authentication/passport/jwt-authentication.guard';
import RequestWithUser from '../authentication/interface/requestWithUser.interface';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { ApiTags } from '@nestjs/swagger';
import { Post } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CodeDTO } from 'modules/code-save/dto/code.dto';
import { PrivateFilesService } from 'modules/private-files/private-files.service';
import Code from 'modules/code-save/code-save.entity';

@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly privateFilesService: PrivateFilesService
  ) { }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  async getProfile(@Req() request: RequestWithUser) {

    const user = await this.usersService.findOne({ id: request.user.id });

    delete user.password;
    return user;
  }


  @Get('file')
  @UseGuards(JwtAuthenticationGuard)
  async getAllPrivateFiles(@Req() request: RequestWithUser) {
    return this.usersService.getAllPrivateFiles(request.user.id);
  }
  
  @Delete('file/:key')
  @UseGuards(JwtAuthenticationGuard)
  async deletePrivateFiles(@Req() request: RequestWithUser, @Param('key') key: string) {
    return this.privateFilesService.deleteFile(key)
  }

  @Get('code')
  @UseGuards(JwtAuthenticationGuard)
  async getAllCodes(@Req() request: RequestWithUser) {
    return this.usersService.getAllCodes(request.user.id);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get(':id')
  async getUserById(@Req() request: RequestWithUser, @Param('id') uid: number) {

    const user = await this.usersService.findOne({ id: uid });

    delete user.password;
    return user;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Put()
  async update(@Req() req: RequestWithUser, @Body() updateUser: UpdateUserDTO) {
    if (updateUser.id !== req.user.id)
      throw new ForbiddenException(null, 'Not allowed to modify other users');

    let user = await this.usersService.findOne({ id: req.user.id });

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
  
  @Post(':id/file')
  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(FileInterceptor('file'))
  async addPrivateFileById(@Req() request: RequestWithUser, @Param('id') id: number, @Query('isResult') isResult: boolean, @UploadedFile() file: Express.Multer.File) {
    return this.usersService.addPrivateFile(id, file.buffer, file.originalname, isResult);
  }

  @Post('code')
  @UseGuards(JwtAuthenticationGuard)
  async addCode(@Req() request: RequestWithUser, @Body() code: CodeDTO) {
    return this.usersService.addCode(request.user.id, code.name, code.code, code.language);
  }
  
  @Put('code')
  @UseGuards(JwtAuthenticationGuard)
  async updateCode(@Req() request: RequestWithUser, @Body() code:  CodeDTO | Code) {
    return this.usersService.updateCode(code);
  }
  
  @Delete('code/:id')
  @HttpCode(204)
  @UseGuards(JwtAuthenticationGuard)
  async deleteCode(@Req() request: RequestWithUser, @Param('id') id: number) {
    return this.usersService.deleteCode(id);
  }

  @Put(':id/fileKey')
  @UseGuards(JwtAuthenticationGuard)
  async updateResultFile(@Req() request: RequestWithUser, @Param('id') id: number, @Body() body: { resultKey: string}) {
    let user = await this.usersService.findOne({ id });

    user.resultKey = body.resultKey

    const savedUser = await this.usersService.save(user);
    delete savedUser.password
    return savedUser;
  }
}
