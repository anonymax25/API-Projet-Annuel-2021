import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { url } from 'inspector';

@Injectable()
export class AuthenticationService {

    async login(data: LoginModel): Promise<Token> {
        const url = "http://localhost:3030/api/v1/authentication/login"
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
