import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';
import * as FormData from "form-data";
import { AuthenticationService, LoginModel, Token } from './authentication.service';
import { config } from 'src/main';

const { ENV, MAIN_API_URL, MAIN_API_EMAIL, MAIN_API_PASSWORD } = process.env


@Injectable()
export class FileService {

    constructor(private authenticationService: AuthenticationService){}

    async uploadFile(key: string, userId: number){
        const mainApiConfig: LoginModel = {
            email: MAIN_API_EMAIL,
            password: MAIN_API_PASSWORD
        }
        const token: Token = await this.authenticationService.login(mainApiConfig)

        const form = new FormData();
        form.append('file', fs.createReadStream(`./file/${key}`));

        try {
            const request_config = {
                headers: {
                    'Authorization': `Bearer ${token.token}`,
                    ...form.getHeaders()
                }
            };

            const sendImgUrl = `${config.mainApiConfig.url}/user/${userId}/file?isResult=true`
            const uploadResponse = await axios.post(sendImgUrl, form, request_config);
        } catch (error) {
            throw new InternalServerErrorException(error)            
        }

        try {
            const updateUserConfig = {
                headers: {
                    'Authorization': `Bearer ${token.token}`,
                }
            };

            const updateUserKey = `${config.mainApiConfig.url}/user/${userId}/fileKey`
            const updateResponse = await axios.put(updateUserKey, { resultKey: key}, updateUserConfig);
        } catch (error) {
            throw new InternalServerErrorException(error)            
        }
        

        
    }
}
