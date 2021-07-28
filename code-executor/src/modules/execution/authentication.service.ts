import { Injectable } from '@nestjs/common';
import axios from 'axios';

const { ENV, MAIN_API_URL } = process.env
@Injectable()
export class AuthenticationService {

    async login(data: LoginModel): Promise<Token> {
        console.log("sending login");
        
        const url = `${MAIN_API_URL}/authentication/login`
        try {
            
            let response = await axios.post<Token>(url, data)
            console.log("got login");
            return response.data
        } catch (error) {
            console.log(error);
            
        }

    }
}

export class LoginModel {
    email: string;
    password: string;
}

export class Token {
    token: string
}
