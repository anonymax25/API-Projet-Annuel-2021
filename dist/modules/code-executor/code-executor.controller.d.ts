import RequestWithUser from '../authentication/interface/requestWithUser.interface';
import { CodeExecutorService } from './code-executor.service';
import { ExecuteDTO } from './dto/execute.dto';
import { CodeResult } from './entity/code-result';
export declare class CodeExecutorController {
    private codeExecutorService;
    constructor(codeExecutorService: CodeExecutorService);
    execute_python(req: RequestWithUser, body: ExecuteDTO): Promise<CodeResult>;
}
