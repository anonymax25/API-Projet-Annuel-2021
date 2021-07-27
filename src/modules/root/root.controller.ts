import { Body, Controller, Get, Inject, Post, Req } from '@nestjs/common';

@Controller()
export class RootController {

    @Get()
    get(@Req() req) {
        return "Welcome to the File Coding Main API! (GET)";
    }
    
    @Post()
    post(@Req() req) {
        return "Welcome to the File Coding Main API! (POST)";
    }

}
