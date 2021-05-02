import { Body, Controller, Post } from '@nestjs/common';
import { ExecutePythonDTO } from './dto/execute-python.dto';
import { PythonService } from './python.service';

@Controller('python')
export class PythonController {

    constructor(private pythonService: PythonService){}

    @Post()
    async execute(@Body() body: ExecutePythonDTO){
        return await this.pythonService.execute_python(body.codeExecution)
    }
}
