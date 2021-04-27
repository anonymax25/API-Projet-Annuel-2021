import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../shared/base.service';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService extends BaseService<User>{
  constructor(
  ) {
    super(User)
  }

  fillUser(user: User, updateUser: UpdateUserDTO): User{
    user.email = updateUser.email ? updateUser.email : user.email 
    user.name = updateUser.name ? updateUser.name : user.name 
    return user
  }
}
