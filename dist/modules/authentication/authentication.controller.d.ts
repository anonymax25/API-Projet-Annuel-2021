import { UsersService } from '../users/users.service';
import { AuthenticationService } from './authentication.service';
import { RegisterDto } from './dto/register.dto';
import LoginDto from './dto/login.dto';
export declare class AuthenticationController {
    private readonly authenticationService;
    private readonly usersService;
    constructor(authenticationService: AuthenticationService, usersService: UsersService);
    register(registrationData: RegisterDto): Promise<import("../users/user.entity").User>;
    login(body: LoginDto): Promise<{
        token: string;
    }>;
}
