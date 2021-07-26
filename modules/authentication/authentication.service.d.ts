import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
export declare class AuthenticationService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(registrationData: RegisterDto): Promise<User>;
    login(user: User): Promise<{
        token: string;
    }>;
    getAuthenticatedUser(email: string, plainTextPassword: string): Promise<User>;
    private verifyPassword;
}
