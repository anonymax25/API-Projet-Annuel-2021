import { Controller, Get } from "@nestjs/common"

const { ENV } = process.env
@Controller()
export class AppController {

    @Get()
    async welcome(){
        return "Welcome to the file-coding Executor, currently in " + ENV + " env"
    }
}
