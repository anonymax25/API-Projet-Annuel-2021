import { Controller, Get, Req } from '@nestjs/common';

@Controller('/')
export class RootController {

    @Get()
    get(@Req() req) {
        return "Welcome!";
    }

}
