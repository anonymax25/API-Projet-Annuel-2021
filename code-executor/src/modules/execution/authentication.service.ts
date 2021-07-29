import { Injectable } from '@nestjs/common';
import axios from 'axios';

const { ENV, MAIN_API_URL } = process.env
@Injectable()
export class AuthenticationService {

    async login(data: LoginModel): Promise<Token> {
        
        const url = `${MAIN_API_URL}/authentication/login`
        
        console.log(url);
        
        console.log("sending login2", data);
        
        let response = await axios.post<Token>(url, data)
        
        console.log("got login", JSON.stringify(response.data, null, 2));
        
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
