import RequestWithUser from '../authentication/interface/requestWithUser.interface';
import { PrivateFilesService } from './private-files.service';
export declare class PrivateFilesController {
    private privateFilesService;
    constructor(privateFilesService: PrivateFilesService);
    execute_python(req: RequestWithUser, key: string): Promise<URL>;
}
export declare class URL {
    url: string;
    key: string;
    constructor(url: string, key: string);
}
