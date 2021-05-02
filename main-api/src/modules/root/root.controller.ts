import { Body, Controller, Get, Inject, Post, Req } from '@nestjs/common';

@Controller()
export class RootController {

    @Get()
    get(@Req() req) {
        return "Welcome!";
    }
    
    @Post()
    post(@Req() req) {
        return "Welcome!";
    }

}
