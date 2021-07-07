import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Code from 'modules/code-save/code-save.entity';
import { CodeSaveService } from 'modules/code-save/code-save.service';
import { CodeDTO } from 'modules/code-save/dto/code.dto';
import { PrivateFilesService } from 'modules/private-files/private-files.service';
import { Connection, Repository } from 'typeorm';
import { BaseService } from '../../shared/base.service';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService extends BaseService<User>{
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly privateFilesService: PrivateFilesService,
    private readonly codeSaveService: CodeSaveService,

  ) {
    super(User)
  }

  fillUser(user: User, updateUser: UpdateUserDTO): User{
    user.email = updateUser.email ? updateUser.email : user.email 
    user.name = updateUser.name ? updateUser.name : user.name 
    return user
  }

  async addPrivateFile(userId: number, imageBuffer: Buffer, filename: string, isResult: boolean = false) {
    return this.privateFilesService.uploadPrivateFile(imageBuffer, userId, filename, isResult);
  }

  async getAllPrivateFiles(userId: number) {
    const userWithFiles = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['files'] }
    );
    if (userWithFiles) {
      return Promise.all(
        userWithFiles.files.map(async (file) => {
          const url = await this.privateFilesService.generatePresignedUrl(file.key);
          return {
            id: file.id,
            name: file.key.replace(file.key.match(/((\w{4,12}-?)){5}/)[0],""),
            key: file.key,
            url
          }
        })
      )
    }
    throw new NotFoundException('User with this id does not exist');
  }

  async getAllCodes(userId: number) {
    const userWithCodes = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['codes'] }
    
    );
    if (userWithCodes) {
      return Promise.all(
        userWithCodes.codes.map(async (code) => {
          return {
            ...code
          }
        })
      )
    }
    throw new NotFoundException('User with this id does not exist');
  }

  async addCode(userId: number, name: string, code: string) {
    return this.codeSaveService.saveCode(userId, name, code);
  }
  
  async updateCode(code: CodeDTO | Code) {
    return this.codeSaveService.updateCode(code);
  }
}
