import { AuthenticationService } from './authentication.service';
import { RegisterDto } from './dto/register.dto';
import RequestWithUser from './interface/requestWithUser.interface';
export declare class AuthenticationController {
    private readonly authenticationService;
    constructor(authenticationService: AuthenticationService);
    register(registrationData: RegisterDto): Promise<import("../users/user.entity").User>;
    login(request: RequestWithUser): Promise<{
        token: string;
    }>;
}
