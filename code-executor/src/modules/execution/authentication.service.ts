import { Injectable } from '@nestjs/common';
import axios from 'axios';

const { ENV, MAIN_API_URL } = process.env
@Injectable()
export class AuthenticationService {

    async login(data: LoginModel): Promise<Token> {
        
        const url = `${MAIN_API_URL}/authentication/login`
        
        let response = await axios.post<Token>(url, data)
        
        return response.data
    }
}

export class LoginModel {
    email: string;
    password: string;
}

export class Token {
    token: string
}
