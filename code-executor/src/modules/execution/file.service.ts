import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';
import * as FormData from "form-data";
import { AuthenticationService, LoginModel, Token } from './authentication.service';

const { ENV, MAIN_API_URL, MAIN_API_EMAIL, MAIN_API_PASSWORD } = process.env

@Injectable()
export class FileService {

    constructor(private authenticationService: AuthenticationService){}

    async uploadFile(key: string, resultFilePath: string, userId: number){

        const mainApiConfig: LoginModel = {
            email: MAIN_API_EMAIL,
            password: MAIN_API_PASSWORD
        }
        const token: Token = await this.authenticationService.login(mainApiConfig)

        const form = new FormData();
        form.append('file', fs.createReadStream(resultFilePath));
        
        const request_config = {
            headers: {
                'Authorization': `Bearer ${token.token}`,
                ...form.getHeaders()
            }
        };

        const sendImgUrl = `${MAIN_API_URL}/user/${userId}/file?isResult=true`
        const uploadResponse = await axios.post(sendImgUrl, form, request_config);


        const updateUserConfig = {
            headers: {
                'Authorization': `Bearer ${token.token}`,
            }
        };

        const updateUserKey = `${MAIN_API_URL}/user/${userId}/fileKey`
        const updateResponse = await axios.put(updateUserKey, { resultKey: key}, updateUserConfig);
    }
}
