import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  ) {
    super(User)
  }

  fillUser(user: User, updateUser: UpdateUserDTO): User{
    user.email = updateUser.email ? updateUser.email : user.email 
    user.name = updateUser.name ? updateUser.name : user.name 
    return user
  }

  async addPrivateFile(userId: number, imageBuffer: Buffer, filename: string) {
    return this.privateFilesService.uploadPrivateFile(imageBuffer, userId, filename);
  }

  async getAllPrivateFiles(userId: number) {
    console.log("pouloulou", userId)
    const userWithFiles = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['files'] }
    
    );
    if (userWithFiles) {
      return Promise.all(
        userWithFiles.files.map(async (file) => {
          const url = await this.privateFilesService.generatePresignedUrl(file.key);
          return {
            ...file,
            url
          }
        })
      )
    }
    throw new NotFoundException('User with this id does not exist');
  }
}
