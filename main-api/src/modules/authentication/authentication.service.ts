import { ConflictException, ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';

@Injectable()
export class AuthenticationService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  public async register(registrationData: RegisterDto) {

    let emailCheck = await this.usersService.findOne({ email: registrationData.email });
    if (emailCheck)
      throw new ConflictException(null, "A User with this email already exists")

    let nameCheck = await this.usersService.findOne({ name: registrationData.name });
    if (nameCheck)
      throw new ConflictException(null, "A User with this name already exists")

    let newUser = new User()
    newUser.email = registrationData.email
    newUser.password = await bcrypt.hash(registrationData.password, 10);
    newUser.name = registrationData.name

    const createdUser = await this.usersService.save(newUser);

    delete createdUser.password;
    return createdUser;
  }

  async login(user: User) {
    const payload = { name: user.name, id: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string): Promise<User> {
    try {
      const user = await (await this.usersService.find({ email })).shift();
      await this.verifyPassword(plainTextPassword, user.password);
      return user;
    } catch (error) {
      throw new ForbiddenException(null, 'Wrong credentials provided')
    }
  }

  private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword
    );
    if (!isPasswordMatching) {
      throw new ForbiddenException(null, 'Wrong credentials provided')
    }
  }
}
